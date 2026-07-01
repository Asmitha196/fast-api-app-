import json, urllib.request
url = 'http://127.0.0.1:8000/auth/register'
data = json.dumps({'name':'test','email':'t@example.com','password':'secret','role':'Candidate'}).encode('utf-8')
req = urllib.request.Request(url, data=data, headers={'Content-Type':'application/json'})
try:
    with urllib.request.urlopen(req) as res:
        print(res.status)
        print(res.read().decode())
except Exception as exc:
    import traceback
    traceback.print_exc()
