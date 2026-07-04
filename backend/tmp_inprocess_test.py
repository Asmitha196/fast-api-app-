from fastapi.testclient import TestClient
from app.main import app
import traceback

client = TestClient(app)

try:
    login_resp = client.post('/auth/login', data={'username':'admin@example.com','password':'AdminPass123!'})
    print('LOGIN', login_resp.status_code, login_resp.text)
    token = login_resp.json().get('access_token')
    headers = {'Authorization': f'Bearer {token}'}
    company_payload = {
        'name':'Example Company',
        'email':'contact@example.com',
        'phone':'123-456-7890',
        'location':'City, Country'
    }
    company_resp = client.post('/company/', json=company_payload, headers=headers)
    print('COMPANY', company_resp.status_code, company_resp.text)
except Exception as e:
    print('EXCEPTION during test client call:')
    traceback.print_exc()
