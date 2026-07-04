import json
import urllib.request
import urllib.error
import urllib.parse

LOGIN_URL = "http://127.0.0.1:8000/auth/login"
COMPANY_URL = "http://127.0.0.1:8000/company/"

login_data = urllib.parse.urlencode({
    "username": "admin@example.com",
    "password": "AdminPass123!"
}).encode("utf-8")

try:
    req = urllib.request.Request(LOGIN_URL, data=login_data, headers={"Content-Type": "application/x-www-form-urlencoded"})
    with urllib.request.urlopen(req) as resp:
        body = resp.read().decode("utf-8")
        print("LOGIN STATUS", resp.status)
        print(body)
        token = json.loads(body).get("access_token")
except urllib.error.HTTPError as e:
    print("LOGIN STATUS", e.code)
    print(e.read().decode())
    raise SystemExit(1)
except Exception as e:
    print("LOGIN ERROR", repr(e))
    raise SystemExit(1)

if not token:
    print("No token obtained")
    raise SystemExit(1)

company_payload = {
    "name": "Example Company",
    "email": "contact@example.com",
    "phone": "123-456-7890",
    "location": "City, Country"
}

req2 = urllib.request.Request(COMPANY_URL, data=json.dumps(company_payload).encode("utf-8"), headers={"Content-Type": "application/json", "Authorization": f"Bearer {token}"})
try:
    with urllib.request.urlopen(req2) as resp:
        print("COMPANY STATUS", resp.status)
        print(resp.read().decode("utf-8"))
except urllib.error.HTTPError as e:
    print("COMPANY STATUS", e.code)
    print(e.read().decode("utf-8"))
except Exception as e:
    print("COMPANY ERROR", repr(e))
