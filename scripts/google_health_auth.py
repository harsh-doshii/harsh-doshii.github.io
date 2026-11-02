#!/usr/bin/env python3
"""One-time sign-in for the Google Health API (Apple Watch data, via Google Health, for /body).

Opens Google's consent page in your browser, catches the reply on a local port, and
saves a long-lived refresh token to ~/.config/blog/google-health.env (readable only by
you). Nothing is written to the repo and no token is printed.

Needs the Desktop OAuth client JSON at ~/.config/blog/google-oauth-client.json.
Run it again only if the token is revoked or the scopes change.

Standard library only, Python 3.9+.
"""

import base64
import hashlib
import http.server
import json
import os
import secrets
import sys
import threading
import urllib.error
import urllib.parse
import urllib.request
import webbrowser
from pathlib import Path

CONFIG = Path.home() / ".config" / "blog"
CLIENT_FILE = CONFIG / "google-oauth-client.json"
OUT_FILE = CONFIG / "google-health.env"
# Read-only, and only what the page uses: steps, resting heart rate and HRV. No sleep, no location.
SCOPES = [
    "https://www.googleapis.com/auth/googlehealth.activity_and_fitness.readonly",
    "https://www.googleapis.com/auth/googlehealth.health_metrics_and_measurements.readonly",
]
TIMEOUT_SECONDS = 300


def main():
    client = json.loads(CLIENT_FILE.read_text())["installed"]

    # PKCE: proves the code exchange comes from the same program that started the sign-in.
    verifier = secrets.token_urlsafe(64)
    challenge = base64.urlsafe_b64encode(hashlib.sha256(verifier.encode()).digest()).rstrip(b"=").decode()
    state = secrets.token_urlsafe(24)
    result = {}

    class Handler(http.server.BaseHTTPRequestHandler):
        def do_GET(self):
            query = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            if query.get("state", [None])[0] != state:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(b"State mismatch. Close this tab and run the script again.")
                return
            result["code"] = query.get("code", [None])[0]
            result["error"] = query.get("error", [None])[0]
            self.send_response(200)
            self.send_header("Content-Type", "text/plain; charset=utf-8")
            self.end_headers()
            self.wfile.write("Done. You can close this tab and go back to the terminal.".encode())
            threading.Thread(target=server.shutdown, daemon=True).start()

        def log_message(self, *args):
            pass  # keep the auth code out of the terminal output

    server = http.server.HTTPServer(("127.0.0.1", 0), Handler)  # loopback only, random port
    redirect_uri = f"http://127.0.0.1:{server.server_port}/"
    url = client["auth_uri"] + "?" + urllib.parse.urlencode({
        "client_id": client["client_id"],
        "redirect_uri": redirect_uri,
        "response_type": "code",
        "scope": " ".join(SCOPES),
        "access_type": "offline",
        "prompt": "consent",
        "state": state,
        "code_challenge": challenge,
        "code_challenge_method": "S256",
    })

    print("Opening Google's consent page in your browser.")
    print("If it says the app isn't verified: Advanced -> Go to ... (unsafe). It's your own app.")
    webbrowser.open(url)
    timer = threading.Timer(TIMEOUT_SECONDS, server.shutdown)
    timer.start()
    server.serve_forever()
    timer.cancel()
    server.server_close()

    if result.get("error"):
        sys.exit(f"Google returned an error: {result['error']}")
    if not result.get("code"):
        sys.exit(f"No reply within {TIMEOUT_SECONDS // 60} minutes. Run the script again.")

    body = urllib.parse.urlencode({
        "code": result["code"],
        "client_id": client["client_id"],
        "client_secret": client["client_secret"],
        "redirect_uri": redirect_uri,
        "grant_type": "authorization_code",
        "code_verifier": verifier,
    }).encode()
    try:
        with urllib.request.urlopen(urllib.request.Request(client["token_uri"], data=body), timeout=30) as resp:
            tokens = json.load(resp)
    except urllib.error.HTTPError as err:
        sys.exit(f"Token exchange failed ({err.code}): {json.load(err).get('error_description', '')}")

    if "refresh_token" not in tokens:
        sys.exit("Google didn't return a refresh token. Revoke the app's access in your Google Account and run again.")

    granted = set(tokens.get("scope", "").split())
    missing = [s.rsplit("/", 1)[1] for s in SCOPES if s not in granted]

    CONFIG.mkdir(parents=True, exist_ok=True)
    fd = os.open(OUT_FILE, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
    with os.fdopen(fd, "w") as f:
        f.write(f"GOOGLE_CLIENT_ID={client['client_id']}\n")
        f.write(f"GOOGLE_CLIENT_SECRET={client['client_secret']}\n")
        f.write(f"GOOGLE_REFRESH_TOKEN={tokens['refresh_token']}\n")
    os.chmod(OUT_FILE, 0o600)

    print(f"Saved to {OUT_FILE} (only you can read it).")
    print("Granted:", ", ".join(s.rsplit("/", 1)[1] for s in SCOPES if s in granted) or "none")
    if missing:
        print("Not granted (those sections will stay empty):", ", ".join(missing))


if __name__ == "__main__":
    main()
