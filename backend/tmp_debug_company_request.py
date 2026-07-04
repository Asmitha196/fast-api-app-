import json
import urllib.request
import urllib.error

url = "http://127.0.0.1:8000/company/"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4LCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3ODMwNjcwMDd9.8CS76zoPh3ukHtp_mqDLp7GQ8UqSelNaHYxAlNNpBvY"
}
data = {
    "name": "Example Company",
    "email": "contact@example.com",
    "phone": "123-456-7890",
    "location": "City, Country"
}
req = urllib.request.Request(url, data=json.dumps(data).encode("utf-8"), headers=headers, method="POST")
try:
    with urllib.request.urlopen(req) as resp:
        print("STATUS", resp.status)
        print(resp.read().decode("utf-8"))
except urllib.error.HTTPError as e:
    print("STATUS", e.code)
    print(e.read().decode("utf-8"))
except Exception as e:
    print("ERROR", repr(e))
