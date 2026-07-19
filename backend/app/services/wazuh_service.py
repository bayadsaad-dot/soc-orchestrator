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

        self.indexer_url = settings.WAZUH_INDEXER_URL
        self.indexer_username = settings.WAZUH_INDEXER_USERNAME
        self.indexer_password = settings.WAZUH_INDEXER_PASSWORD

        # JWT Token Cache
        self.token = None
        self.token_expiry = None

    def authenticate(self):

        # Reuse the token if it is still valid
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

        # Refresh before expiration
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

    def test_indexer_connection(self):

        response = requests.get(
            self.indexer_url,
            auth=(self.indexer_username, self.indexer_password),
            verify=False,
            timeout=10,
        )

        response.raise_for_status()

        return response.json()

    def search_alerts(self, size=20):

        url = f"{self.indexer_url}/wazuh-alerts-*/_search"

        query = {
            "size": size,
            "sort": [
                {
                    "@timestamp": {
                        "order": "desc"
                    }
                }
            ],
            "query": {
                "match_all": {}
            }
        }

        response = requests.post(
            url,
            auth=(
                self.indexer_username,
                self.indexer_password,
            ),
            json=query,
            verify=False,
            timeout=15,
        )

        response.raise_for_status()

        return response.json()