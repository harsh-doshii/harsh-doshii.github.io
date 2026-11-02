#!/usr/bin/env python3
"""Pull workouts from the Hevy API and write static/data/lifting.json for the /body page.

Read-only: this only ever makes GET requests. Needs HEVY_API_KEY in the environment
(locally: `set -a; . ~/.config/blog/hevy.env; set +a`; in CI: a repository secret).

The output keeps exact daily values but leaves out workout titles, descriptions and
notes. If the data hasn't changed, the file isn't rewritten, so the nightly job only
commits when there's a new or edited workout.

Standard library only, Python 3.9+.
"""

import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

API = "https://api.hevyapp.com"
OUT = Path(__file__).resolve().parent.parent / "static" / "data" / "lifting.json"
TZ = ZoneInfo(os.environ.get("BODY_TZ", "America/Los_Angeles"))
KG_TO_LB = 2.2046226218
SCHEMA_VERSION = 1

# Hevy's 20 muscle tags, folded into the page's display groups.
GROUPS = {
    "chest": "Chest",
    "lats": "Back", "upper_back": "Back", "traps": "Back", "lower_back": "Back",
    "quadriceps": "Legs", "hamstrings": "Legs", "glutes": "Legs", "calves": "Legs",
    "abductors": "Legs", "adductors": "Legs",
    "shoulders": "Shoulders", "neck": "Shoulders",
    "biceps": "Arms", "triceps": "Arms", "forearms": "Arms",
    "abdominals": "Core",
}
GROUP_ORDER = ["Chest", "Back", "Legs", "Shoulders", "Arms", "Core", "Other"]

# Epley is only trustworthy for low-rep sets; above this, a set counts as "best set" only.
E1RM_MAX_REPS = 12

# Hevy logs these as exercises, but they aren't training: left out of sets, volume and tables.
EXCLUDE_TITLES = {"warm up", "cool down", "stretching"}

# Where the compound guess (2+ secondary muscles) is wrong. Exact Hevy titles.
COMPOUND = {"Shoulder Press (Dumbbell)", "Overhead Press (Barbell)", "Overhead Press (Dumbbell)", "Seated Shoulder Press (Machine)"}
ISOLATION = set()


def get(path, params=None, retries=4):
    key = os.environ.get("HEVY_API_KEY")
    if not key:
        sys.exit("HEVY_API_KEY is not set")
    url = API + path + ("?" + urllib.parse.urlencode(params) if params else "")
    req = urllib.request.Request(url, headers={"api-key": key, "accept": "application/json"})
    for attempt in range(retries + 1):
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                return json.load(resp)
        except urllib.error.HTTPError as err:
            if err.code in (429, 500, 502, 503, 504) and attempt < retries:
                time.sleep(2 ** attempt)
                continue
            # Never echo the request headers; they contain the key.
            sys.exit(f"Hevy API error {err.code} on {path}")
        except (urllib.error.URLError, TimeoutError) as err:
            if attempt < retries:
                time.sleep(2 ** attempt)
                continue
            sys.exit(f"Could not reach Hevy API ({path}): {err}")


def paged(path, key, page_size):
    page, items = 1, []
    while True:
        data = get(path, {"page": page, "pageSize": page_size})
        items.extend(data.get(key, []))
        if page >= data.get("page_count", 1):
            return items
        page += 1


def local_date(iso):
    return datetime.fromisoformat(iso.replace("Z", "+00:00")).astimezone(TZ).date().isoformat()


def lb(kg):
    return round(kg * KG_TO_LB, 1)


def measure_for(template):
    """Which single number best describes progress on this exercise."""
    kind = template.get("type")
    title = template.get("title")
    if kind == "weight_reps" and title in COMPOUND:
        return "e1rm"
    if kind == "weight_reps" and title in ISOLATION:
        return "best_set"
    if kind == "weight_reps":
        # Hevy has no compound/isolation flag; exercises that work 2+ secondary muscles
        # (bench, squat, rows, presses) get an estimated 1RM, isolation lifts get their best set.
        return "e1rm" if len(template.get("secondary_muscle_groups") or []) >= 2 else "best_set"
    return {
        "reps_only": "reps",
        "bodyweight_reps": "reps",
        "bodyweight_assisted_reps": "assisted_reps",
        "duration": "time",
        "weight_duration": "time",
        "distance_duration": "distance",
        "short_distance_weight": "carry",
    }.get(kind, "reps")


def session_value(measure, sets):
    """Best value for one exercise in one workout, from its working (non-warm-up) sets."""
    def w(s):
        return s.get("weight_kg") or 0

    def r(s):
        return s.get("reps") or 0

    if measure == "e1rm":
        scored = [(w(s) * (1 + r(s) / 30), s) for s in sets if w(s) > 0 and 1 <= r(s) <= E1RM_MAX_REPS]
        if scored:
            value, s = max(scored, key=lambda x: x[0])
            return {"value": lb(value), "weight": lb(w(s)), "reps": r(s)}
        measure = "best_set"  # only high-rep sets this time
    if measure == "best_set":
        s = max((s for s in sets if w(s) > 0), key=lambda s: (w(s), r(s)), default=None)
        return s and {"value": lb(w(s)), "weight": lb(w(s)), "reps": r(s)}
    if measure in ("reps", "assisted_reps"):
        s = max(sets, key=lambda s: (r(s), -w(s)), default=None)
        if not s or not r(s):
            return None
        out = {"value": r(s), "reps": r(s)}
        if w(s):
            out["weight"] = lb(w(s))  # added weight, or assistance for assisted reps
        return out
    if measure == "time":
        s = max(sets, key=lambda s: s.get("duration_seconds") or 0, default=None)
        return s and s.get("duration_seconds") and {"value": s["duration_seconds"], **({"weight": lb(w(s))} if w(s) else {})}
    if measure == "distance":
        s = max(sets, key=lambda s: s.get("distance_meters") or 0, default=None)
        return s and s.get("distance_meters") and {"value": s["distance_meters"], "seconds": s.get("duration_seconds")}
    if measure == "carry":
        s = max(sets, key=lambda s: (w(s), s.get("distance_meters") or 0), default=None)
        return s and w(s) and {"value": lb(w(s)), "weight": lb(w(s)), "meters": s.get("distance_meters")}
    return None


def build(workouts, templates):
    by_id = {t["id"]: t for t in templates}
    days = defaultdict(lambda: {"sessions": 0, "minutes": 0, "working_sets": 0, "volume_lb": 0.0, "groups": defaultdict(int)})
    series = defaultdict(dict)  # template id -> date -> best value that day

    for wk in sorted(workouts, key=lambda w: w["start_time"]):
        date = local_date(wk["start_time"])
        day = days[date]
        day["sessions"] += 1
        if wk.get("end_time"):
            start = datetime.fromisoformat(wk["start_time"].replace("Z", "+00:00"))
            end = datetime.fromisoformat(wk["end_time"].replace("Z", "+00:00"))
            day["minutes"] += max(0, round((end - start).total_seconds() / 60))
        for ex in wk.get("exercises", []):
            tpl = by_id.get(ex.get("exercise_template_id"), {"type": "weight_reps", "primary_muscle_group": "other"})
            if (tpl.get("title") or ex.get("title") or "").strip().lower() in EXCLUDE_TITLES:
                continue
            working = [s for s in ex.get("sets", []) if s.get("type") != "warmup"]
            if not working:
                continue
            group = GROUPS.get(tpl.get("primary_muscle_group"), "Other")
            day["working_sets"] += len(working)
            day["groups"][group] += len(working)
            if tpl.get("type") == "weight_reps":
                day["volume_lb"] += sum((s.get("weight_kg") or 0) * KG_TO_LB * (s.get("reps") or 0) for s in working)
            best = session_value(measure_for(tpl), working)
            if best:
                prev = series[ex["exercise_template_id"]].get(date)
                if not prev or best["value"] > prev["value"]:
                    series[ex["exercise_template_id"]][date] = best

    daily = [
        {
            "date": d,
            "sessions": v["sessions"],
            "minutes": v["minutes"],
            "working_sets": v["working_sets"],
            "volume_lb": round(v["volume_lb"]),
            "groups": {g: v["groups"][g] for g in GROUP_ORDER if v["groups"].get(g)},
        }
        for d, v in sorted(days.items())
    ]
    exercises = []
    for tid, by_date in series.items():
        tpl = by_id.get(tid, {})
        exercises.append({
            "id": tid,
            "title": tpl.get("title") or "Unknown exercise",
            "equipment": tpl.get("equipment") or "other",
            "group": GROUPS.get(tpl.get("primary_muscle_group"), "Other"),
            "type": tpl.get("type") or "weight_reps",
            "measure": measure_for(tpl) if tpl else "best_set",
            "sessions": [{"date": d, **v} for d, v in sorted(by_date.items())],
        })
    exercises.sort(key=lambda e: (GROUP_ORDER.index(e["group"]), -len(e["sessions"]), e["title"]))

    return {
        "schema_version": SCHEMA_VERSION,
        "source": "Hevy",
        "units": "lb",
        "timezone": str(TZ),
        "coverage": {
            "first_date": daily[0]["date"] if daily else None,
            "last_date": daily[-1]["date"] if daily else None,
            "workouts": sum(d["sessions"] for d in daily),
        },
        "methodology": {
            "working_sets": "Warm-up sets are excluded everywhere.",
            "e1rm": f"Estimated 1RM uses the Epley formula (weight x (1 + reps/30)) on the best working set with 1-{E1RM_MAX_REPS} reps.",
            "best_set": "Isolation lifts show the heaviest working set instead of an estimated 1RM.",
            "compound": "Hevy has no compound flag; exercises with 2+ secondary muscle groups are treated as compound.",
            "volume": "Volume is weight x reps across working sets of weighted exercises; bodyweight work is not counted.",
            "dates": f"Dates are local to {TZ}.",
            "excluded": "Warm-up, cool-down and stretching entries are not counted as training.",
            "privacy": "Workout titles, descriptions and notes are not published.",
        },
        "daily": daily,
        "exercises": exercises,
    }


def main():
    workouts = paged("/v1/workouts", "workouts", 10)
    templates = paged("/v1/exercise_templates", "exercise_templates", 100)
    data = build(workouts, templates)

    if OUT.exists():
        try:
            old = json.loads(OUT.read_text())
            if {k: v for k, v in old.items() if k != "generated_at"} == data:
                print(f"No changes ({data['coverage']['workouts']} workouts). Left {OUT.name} as is.")
                return
        except ValueError:
            pass  # unreadable old file: replace it

    data["generated_at"] = datetime.now(timezone.utc).replace(microsecond=0).isoformat()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    tmp = OUT.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(data, indent=1) + "\n")
    os.replace(tmp, OUT)  # atomic: a failed run never leaves a half-written file
    print(f"Wrote {OUT.relative_to(OUT.parent.parent.parent)}: {data['coverage']['workouts']} workouts, {len(data['exercises'])} exercises.")


if __name__ == "__main__":
    main()
