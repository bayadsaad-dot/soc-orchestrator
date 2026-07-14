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

    data = response.json()

    if not data.get("data"):
        return {
            "message": "IOC not found in VirusTotal"
        }

    ioc = data["data"][0]

    stats = ioc["attributes"]["last_analysis_stats"]

    return {
        "ioc": value,
        "type": ioc["type"],
        "malicious": stats["malicious"],
        "suspicious": stats["suspicious"],
        "harmless": stats["harmless"],
        "undetected": stats["undetected"],
        "reputation": ioc["attributes"].get("reputation", 0)
    }