from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
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
@router.get("/recent-incidents")
def recent_incidents(
    limit: int = 5,
    db: Session = Depends(get_db)
):
    incidents = (
        db.query(Incident)
        .order_by(Incident.id.desc())
        .limit(limit)
        .all()
    )

    return incidents
@router.get("/severity-distribution")
def severity_distribution(
    db: Session = Depends(get_db)
):
    return {
        "Critical": db.query(Incident).filter(
            Incident.severity == "Critical"
        ).count(),

        "High": db.query(Incident).filter(
            Incident.severity == "High"
        ).count(),

        "Medium": db.query(Incident).filter(
            Incident.severity == "Medium"
        ).count(),

        "Low": db.query(Incident).filter(
            Incident.severity == "Low"
        ).count()
    }
@router.get("/top-sources")
def top_sources(
    db: Session = Depends(get_db)
):
    results = (
        db.query(
            Incident.source,
            func.count(Incident.id).label("count")
        )
        .group_by(Incident.source)
        .order_by(func.count(Incident.id).desc())
        .all()
    )

    return [
        {
            "source": source,
            "count": count
        }
        for source, count in results
    ]