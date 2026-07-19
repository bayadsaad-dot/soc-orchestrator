import requests
import urllib3
from datetime import datetime, timedelta

from app.core.config import settings

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)


class WazuhService:

    def __init__(self):
        self.base_url = settings.WAZUH_API_URL
        self.username = settings.WAZUH_USERNAME
        self.password = settings.WAZUH_PASSWORD

        # Cache JWT token
        self.token = None
        self.token_expiry = None

    def authenticate(self):

        # Reuse the current token if it's still valid
        if (
            self.token
            and self.token_expiry
            and datetime.utcnow() < self.token_expiry
        ):
            return self.token

        response = requests.get(
            f"{self.base_url}/security/user/authenticate",
            auth=(self.username, self.password),
            verify=False,
            timeout=10,
        )

        response.raise_for_status()

        self.token = response.json()["data"]["token"]

        # Refresh before the real expiration
        self.token_expiry = datetime.utcnow() + timedelta(minutes=14)

        return self.token

    def get_headers(self):
        return {
            "Authorization": f"Bearer {self.authenticate()}"
        }

    def get_manager_status(self):

        response = requests.get(
            f"{self.base_url}/manager/status",
            headers=self.get_headers(),
            verify=False,
            timeout=10,
        )

        response.raise_for_status()

        return response.json()

    def get_agents(self):

        response = requests.get(
            f"{self.base_url}/agents",
            headers=self.get_headers(),
            verify=False,
            timeout=10,
        )

        response.raise_for_status()

        return response.json()

    def get_logs(self, limit=10):

        response = requests.get(
            f"{self.base_url}/manager/logs",
            params={"limit": limit},
            headers=self.get_headers(),
            verify=False,
            timeout=10,
        )

        response.raise_for_status()

        return response.json()