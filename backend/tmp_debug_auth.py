from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)
response = client.post(
    "/auth/register",
    json={"name": "test", "email": "t@example.com", "password": "secret", "role": "Candidate"},
)
print('status', response.status_code)
print('body', response.text)
print('headers', response.headers)
