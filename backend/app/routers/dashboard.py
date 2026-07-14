from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.user import User
from app.models.incident import Incident
from app.models.ioc import IOC

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/stats")
def dashboard_stats(
    db: Session = Depends(get_db)
):
    users = db.query(User).count()

    incidents = db.query(Incident).count()

    open_incidents = db.query(Incident).filter(
        Incident.status == "Open"
    ).count()

    closed_incidents = db.query(Incident).filter(
        Incident.status == "Closed"
    ).count()

    critical = db.query(Incident).filter(
        Incident.severity == "Critical"
    ).count()

    high = db.query(Incident).filter(
        Incident.severity == "High"
    ).count()

    medium = db.query(Incident).filter(
        Incident.severity == "Medium"
    ).count()

    low = db.query(Incident).filter(
        Incident.severity == "Low"
    ).count()

    iocs = db.query(IOC).count()

    return {
        "users": users,
        "incidents": incidents,
        "open_incidents": open_incidents,
        "closed_incidents": closed_incidents,
        "critical": critical,
        "high": high,
        "medium": medium,
        "low": low,
        "iocs": iocs
    }