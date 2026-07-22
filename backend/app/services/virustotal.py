import os
import re
import ipaddress
import requests

from dotenv import load_dotenv

load_dotenv()

VT_API_KEY = os.getenv("VT_API_KEY")

BASE_URL = "https://www.virustotal.com/api/v3"


def check_ioc(value: str):
    if not VT_API_KEY:
        return {
            "error": "VirusTotal API key not found. Check your .env file."
        }

    headers = {
        "x-apikey": VT_API_KEY
    }

    # Detect IOC type
    try:
        ipaddress.ip_address(value)
        endpoint = f"/ip_addresses/{value}"

    except ValueError:

        # Hash (MD5 / SHA1 / SHA256)
        if re.fullmatch(r"[A-Fa-f0-9]{32}|[A-Fa-f0-9]{40}|[A-Fa-f0-9]{64}", value):
            endpoint = f"/files/{value}"

        # Domain
        elif "." in value:
            endpoint = f"/domains/{value}"

        else:
            return {
                "error": "Unsupported IOC type."
            }

    url = f"{BASE_URL}{endpoint}"

    try:
        response = requests.get(
            url,
            headers=headers,
            timeout=15
        )

        print("========== VirusTotal ==========")
        print("IOC:", value)
        print("Endpoint:", endpoint)
        print("Status:", response.status_code)
        print("Response:", response.text)
        print("================================")

        if response.status_code == 404:
            return {
                "message": "IOC not found in VirusTotal."
            }

        if response.status_code != 200:
            return {
                "error": response.text
            }

        data = response.json()

        if "data" not in data:
            return {
                "message": "IOC not found in VirusTotal."
            }

        ioc = data["data"]

        attributes = ioc.get("attributes", {})
        stats = attributes.get("last_analysis_stats", {})

        return {
            "ioc": value,
            "type": ioc.get("type"),
            "malicious": stats.get("malicious", 0),
            "suspicious": stats.get("suspicious", 0),
            "harmless": stats.get("harmless", 0),
            "undetected": stats.get("undetected", 0),
            "reputation": attributes.get("reputation", 0)
        }

    except requests.RequestException as e:
        return {
            "error": str(e)
        }

    except Exception as e:
        return {
            "error": str(e)
        }