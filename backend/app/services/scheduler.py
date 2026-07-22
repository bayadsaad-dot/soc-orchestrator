from apscheduler.schedulers.background import BackgroundScheduler

from app.database.database import SessionLocal
from app.models.incident import Incident
from app.services.wazuh_service import WazuhService

scheduler = BackgroundScheduler()


def sync_wazuh():

    db = SessionLocal()

    try:
        service = WazuhService()

        data = service.search_alerts(100)

        alerts = data["hits"]["hits"]

        for alert in alerts:

            source = alert.get("_source", {})

            rule = source.get("rule", {})

            title = rule.get(
                "description",
                "Wazuh Alert"
            )

            description = source.get(
                "full_log",
                str(source)
            )

            level = int(rule.get("level", 0))

            if level >= 15:
                severity = "Critical"
            elif level >= 10:
                severity = "High"
            elif level >= 5:
                severity = "Medium"
            else:
                severity = "Low"

            existing = db.query(Incident).filter(
                Incident.title == title,
                Incident.description == description
            ).first()

            if existing:
                continue

            db.add(
                Incident(
                    title=title,
                    description=description,
                    severity=severity,
                    priority=severity,
                    status="Open",
                    source="Wazuh",
                    assigned_to=None,
                    due_date=None,
                    resolution=None,
                    
                    
                )
            )

        db.commit()

    finally:
        db.close()


scheduler.add_job(
    sync_wazuh,
    "interval",
    minutes=5,
)