"""Regression checks for homepage contact and status API routes."""
import os
import uuid

import pytest
import requests


BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/")


@pytest.fixture
def api_client():
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session


def test_root_health(api_client):
    response = api_client.get(f"{BASE_URL}/api/")
    assert response.status_code == 200
    assert response.json()["message"] == "Hello World"


def test_contact_submission(api_client):
    payload = {
        "name": f"TEST_{uuid.uuid4().hex[:8]}",
        "email": "test.regression@example.com",
        "company": "TEST Regression Co",
        "message": "Testing the public contact form persistence path.",
    }
    response = api_client.post(f"{BASE_URL}/api/contact", json=payload)
    assert response.status_code == 200
    assert response.json() == {"success": True, "message": "Inquiry received"}


def test_contact_validation(api_client):
    response = api_client.post(
        f"{BASE_URL}/api/contact",
        json={"name": "TEST_invalid", "email": "not-an-email", "message": "x"},
    )
    # EmailStr must reject malformed addresses at the API boundary.
    assert response.status_code == 422


def test_status_create_and_list(api_client):
    client_name = f"TEST_{uuid.uuid4().hex[:8]}"
    create = api_client.post(f"{BASE_URL}/api/status", json={"client_name": client_name})
    assert create.status_code == 200
    created = create.json()
    assert created["client_name"] == client_name
    assert isinstance(created["id"], str)

    listing = api_client.get(f"{BASE_URL}/api/status")
    assert listing.status_code == 200
    assert any(row["id"] == created["id"] and row["client_name"] == client_name for row in listing.json())