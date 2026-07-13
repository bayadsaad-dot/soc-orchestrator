import os
import requests

from dotenv import load_dotenv

load_dotenv()

VT_API_KEY = os.getenv("VT_API_KEY")

BASE_URL = "https://www.virustotal.com/api/v3"


def check_ioc(value: str):
    headers = {
        "x-apikey": VT_API_KEY
    }

    url = f"{BASE_URL}/search?query={value}"

    response = requests.get(
        url,
        headers=headers
    )

    if response.status_code != 200:
        return {
            "error": response.text
        }

    return response.json()