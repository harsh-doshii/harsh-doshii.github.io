#!/usr/bin/env python3
"""Pull daily resting heart rate, HRV and steps from the Google Health API and write
static/data/health.json for the /body page.

The values come from whatever Google Health holds. For me that's my Apple Watch: the
Google Health app on my iPhone imports Apple Health data. Read-only, GET/rollup calls only.

Needs GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET and GOOGLE_REFRESH_TOKEN in the environment
(locally: `set -a; . ~/.config/blog/google-health.env; set +a`; in CI: repository secrets).
If nothing changed, the file isn't rewritten, so the nightly job only commits new days.

Standard library only, Python 3.9+.
"""

import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from collections import Counter, defaultdict
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

API = "https://health.googleapis.com/v4/users/me/dataTypes"
TOKEN_URL = "https://oauth2.googleapis.com/token"
OUT = Path(__file__).resolve().parent.parent / "static" / "data" / "health.json"
TZ = ZoneInfo(os.environ.get("BODY_TZ", "America/Los_Angeles"))
DAYS_BACK = int(os.environ.get("HEALTH_DAYS_BACK", "365"))
ROLLUP_MAX_DAYS = 90  # dailyRollUp returns at most 90 daily points per request
SCHEMA_VERSION = 1

# Daily records: (path name, filter name, field holding the value, how to read it, single source?)
# HRV keeps one device only: Apple Watch measures SDNN, Fitbit measures RMSSD, so mixing them
# would put two different measures on one line. Resting heart rate is bpm on every device.
DAILY = {
    "rhr": ("daily-resting-heart-rate", "daily_resting_heart_rate", "dailyRestingHeartRate", lambda v: int(v["beatsPerMinute"]), False),
    "hrv": ("daily-heart-rate-variability", "daily_heart_rate_variability", "dailyHeartRateVariability", lambda v: round(float(v["averageHeartRateVariabilityMilliseconds"]), 1), True),
}


def access_token():
    env = {k: os.environ.get(k) for k in ("GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "GOOGLE_REFRESH_TOKEN")}
    if not all(env.values()):
        sys.exit("GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET and GOOGLE_REFRESH_TOKEN must be set")
    body = urllib.parse.urlencode({
        "client_id": env["GOOGLE_CLIENT_ID"],
        "client_secret": env["GOOGLE_CLIENT_SECRET"],
        "refresh_token": env["GOOGLE_REFRESH_TOKEN"],
        "grant_type": "refresh_token",
    }).encode()
    try:
        with urllib.request.urlopen(urllib.request.Request(TOKEN_URL, data=body), timeout=30) as resp:
            return json.load(resp)["access_token"]
    except urllib.error.HTTPError as err:
        reason = json.load(err).get("error", "")
        if reason == "invalid_grant":
            sys.exit("Google refresh token expired or was revoked. Run scripts/google_health_auth.py again "
                     "and update the GOOGLE_REFRESH_TOKEN secret.")
        sys.exit(f"Could not get a Google access token ({err.code} {reason})")


def call(token, url, body=None, retries=4):
    req = urllib.request.Request(
        url,
        data=json.dumps(body).encode() if body is not None else None,
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json", "Accept": "application/json"},
    )
    for attempt in range(retries + 1):
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                return json.load(resp)
        except urllib.error.HTTPError as err:
            if err.code in (429, 500, 502, 503, 504) and attempt < retries:
                time.sleep(2 ** attempt)
                continue
            sys.exit(f"Google Health API error {err.code} on {url.split('?')[0]}")
        except (urllib.error.URLError, TimeoutError) as err:
            if attempt < retries:
                time.sleep(2 ** attempt)
                continue
            sys.exit(f"Could not reach Google Health API: {err}")


def source_label(point):
    """A readable name for the device or app that recorded a value."""
    src = point.get("dataSource") or {}
    device = src.get("device") or {}
    if src.get("platform") == "HEALTH_KIT":
        # Apple Health records; my Apple Watch is the only Apple device that measures these.
        return "Apple Watch"
    return device.get("displayName") or device.get("manufacturer") or src.get("platform") or "Unknown"


def ymd(d):
    return date(d["year"], d["month"], d["day"]).isoformat()


def daily_metric(token, start, end, path, filter_name, field, read, single_source):
    flt = f'{filter_name}.date >= "{start}" AND {filter_name}.date < "{end}"'
    points, page = [], None
    while True:
        params = {"filter": flt, "pageSize": 1000}
        if page:
            params["pageToken"] = page
        data = call(token, f"{API}/{path}/dataPoints?{urllib.parse.urlencode(params)}")
        points.extend(data.get("dataPoints", []))
        page = data.get("nextPageToken")
        if not page:
            break

    # One value per day. If two devices reported the same day, keep the one from the
    # device that reported most days overall (for me, the Apple Watch).
    counts = Counter(source_label(p) for p in points)
    if single_source and counts:
        main = counts.most_common(1)[0][0]
        points = [p for p in points if source_label(p) == main]
        counts = Counter({main: counts[main]})
    by_day = defaultdict(list)
    for p in points:
        by_day[ymd(p[field]["date"])].append(p)
    values = {}
    for day, candidates in by_day.items():
        best = max(candidates, key=lambda p: counts[source_label(p)])
        try:
            values[day] = read(best[field])
        except (KeyError, ValueError, TypeError):
            continue
    return values, dict(counts)


def civil(d):
    return {"date": {"year": d.year, "month": d.month, "day": d.day}, "time": {"hours": 0, "minutes": 0, "seconds": 0}}


def daily_steps(token, start, end):
    """Daily step totals, merged by Google across all sources. Today is left out (partial)."""
    values = {}
    chunk_start = start
    while chunk_start < end:
        chunk_end = min(chunk_start + timedelta(days=ROLLUP_MAX_DAYS), end)
        body = {"range": {"start": civil(chunk_start), "end": civil(chunk_end)}, "windowSizeDays": 1, "pageSize": ROLLUP_MAX_DAYS}
        data = call(token, f"{API}/steps/dataPoints:dailyRollUp", body)
        for p in data.get("rollupDataPoints", []):
            count = int((p.get("steps") or {}).get("countSum") or 0)
            if count > 0:  # 0 means nothing was recorded that day, not a day without steps
                values[ymd(p["civilStartTime"]["date"])] = count
        chunk_start = chunk_end
    return values


def build(token):
    today = datetime.now(TZ).date()
    start = today - timedelta(days=DAYS_BACK)
    metrics, sources = {}, {}
    for key, (path, filter_name, field, read, single) in DAILY.items():
        metrics[key], sources[key] = daily_metric(token, start, today + timedelta(days=1), path, filter_name, field, read, single)
    metrics["steps"] = daily_steps(token, start, today)
    sources["steps"] = "All sources, merged by Google"

    days = sorted(set().union(*[set(v) for v in metrics.values()]))
    daily = [{"date": d, **{k: metrics[k][d] for k in ("rhr", "hrv", "steps") if d in metrics[k]}} for d in days]
    return {
        "schema_version": SCHEMA_VERSION,
        "source": "Google Health",
        "timezone": str(TZ),
        "coverage": {"first_date": days[0] if days else None, "last_date": days[-1] if days else None, "days": len(days)},
        "sources": sources,
        "methodology": {
            "rhr": "Resting heart rate is the device's own daily value, in beats per minute.",
            "hrv": "HRV is the daily average in milliseconds from one device only. Apple Watch measures SDNN, which isn't comparable with Fitbit's RMSSD, so the two are never mixed.",
            "steps": "Steps are Google's daily total across all sources; today is left out until the day is over.",
            "duplicates": "If two devices report the same day, the device that reported the most days is used.",
            "missing": "Days with no reading are left empty, never filled in.",
        },
        "daily": daily,
    }


def main():
    data = build(access_token())
    if OUT.exists():
        try:
            old = json.loads(OUT.read_text())
            if {k: v for k, v in old.items() if k != "generated_at"} == data:
                print(f"No changes ({data['coverage']['days']} days). Left {OUT.name} as is.")
                return
        except ValueError:
            pass
    data["generated_at"] = datetime.now(timezone.utc).replace(microsecond=0).isoformat()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    tmp = OUT.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(data, indent=1) + "\n")
    os.replace(tmp, OUT)
    print(f"Wrote {OUT.relative_to(OUT.parent.parent.parent)}: {data['coverage']['days']} days "
          f"({data['coverage']['first_date']} to {data['coverage']['last_date']}).")


if __name__ == "__main__":
    main()
