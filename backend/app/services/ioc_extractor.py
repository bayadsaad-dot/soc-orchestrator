import re


def extract_iocs(text: str):
    if not text:
        return []

    results = []
    seen = set()

    patterns = [
        (
            "URL",
            r"https?://[^\s]+",
        ),
        (
            "Email",
            r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b",
        ),
        (
            "IP",
            r"\b(?:\d{1,3}\.){3}\d{1,3}\b",
        ),
        (
            "Hash",
            r"\b(?:[a-fA-F0-9]{32}|[a-fA-F0-9]{40}|[a-fA-F0-9]{64})\b",
        ),
    ]

    # URL / Email / IP / Hash
    for ioc_type, pattern in patterns:

        matches = re.findall(pattern, text)

        for match in matches:

            value = match.strip()

            if value in seen:
                continue

            seen.add(value)

            results.append(
                {
                    "type": ioc_type,
                    "value": value,
                }
            )

    # Domain (ignore domains already inside URLs or Emails)

    domain_pattern = r"\b(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}\b"

    domains = re.findall(domain_pattern, text)

    for domain in domains:

        if any(domain in item["value"] for item in results):
            continue

        if domain in seen:
            continue

        seen.add(domain)

        results.append(
            {
                "type": "Domain",
                "value": domain,
            }
        )

    return results