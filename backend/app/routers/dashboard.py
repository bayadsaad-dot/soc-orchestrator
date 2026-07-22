from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta

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


@router.get("/trends")
def get_trends(db: Session = Depends(get_db)):
    seven_days = datetime.utcnow() - timedelta(days=6)

    rows = (
        db.query(
            func.date(Incident.created_at).label("date"),
            func.count(Incident.id).label("count"),
        )
        .filter(Incident.created_at >= seven_days)
        .group_by(func.date(Incident.created_at))
        .order_by(func.date(Incident.created_at))
        .all()
    )

    return [
        {
            "date": str(row.date),
            "count": row.count,
        }
        for row in rows
    ]


@router.get("/stats")
def dashboard_stats(db: Session = Depends(get_db)):
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


@router.get("/ioc-summary")
def ioc_summary(db: Session = Depends(get_db)):
    total = db.query(IOC).count()

    domains = db.query(IOC).filter(
        IOC.ioc_type == "Domain"
    ).count()

    ips = db.query(IOC).filter(
        IOC.ioc_type == "IP"
    ).count()

    urls = db.query(IOC).filter(
        IOC.ioc_type == "URL"
    ).count()

    hashes = db.query(IOC).filter(
        IOC.ioc_type == "Hash"
    ).count()

    return {
        "total": total,
        "domains": domains,
        "ips": ips,
        "urls": urls,
        "hashes": hashes
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


@router.get("/ioc-types")
def ioc_types(
    db: Session = Depends(get_db)
):
    results = (
        db.query(
            IOC.ioc_type,
            func.count(IOC.id).label("count")
        )
        .group_by(IOC.ioc_type)
        .order_by(func.count(IOC.id).desc())
        .all()
    )

    return [
        {
            "type": ioc_type,
            "count": count
        }
        for ioc_type, count in results
    ]


@router.get("/activity-feed")
def activity_feed(
    limit: int = 10,
    db: Session = Depends(get_db)
):
    incidents = (
        db.query(Incident)
        .order_by(Incident.created_at.desc())
        .limit(limit)
        .all()
    )

    feed = []

    for incident in incidents:
        feed.append({
            "title": incident.title,
            "severity": incident.severity,
            "status": incident.status,
            "source": incident.source,
            "created_at": incident.created_at
        })

    return feed
@router.get("/mitre-summary")
def mitre_summary():
    return [
        {"tactic": "Initial Access", "count": 18},
        {"tactic": "Execution", "count": 25},
        {"tactic": "Persistence", "count": 11},
        {"tactic": "Privilege Escalation", "count": 7},
        {"tactic": "Defense Evasion", "count": 13},
        {"tactic": "Credential Access", "count": 9},
        {"tactic": "Discovery", "count": 15},
        {"tactic": "Lateral Movement", "count": 5},
        {"tactic": "Collection", "count": 8},
        {"tactic": "Command & Control", "count": 12},
        {"tactic": "Exfiltration", "count": 3},
        {"tactic": "Impact", "count": 4},
    ]