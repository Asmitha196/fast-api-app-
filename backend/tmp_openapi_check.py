import urllib.request, json
url = 'http://127.0.0.1:8000/openapi.json'
with urllib.request.urlopen(url) as r:
    data = json.load(r)
print(sorted(data['paths'].keys()))
