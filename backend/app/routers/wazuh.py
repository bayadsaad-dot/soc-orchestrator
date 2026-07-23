from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.incident import Incident
from app.services.wazuh_service import WazuhService
from app.core.config import settings
router = APIRouter(
    prefix="/wazuh",
    tags=["Wazuh"],
)

service = WazuhService()
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/status")
def manager_status():
    try:
        return service.get_manager_status()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/agents")
def agents():
    try:
        return service.get_agents()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/logs")
def logs(limit: int = 10):
    try:
        return service.get_logs(limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/indexer")
def indexer_connection():
    try:
        return service.test_indexer_connection()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/alerts")
def alerts(size: int = 20):
    try:
        return service.search_alerts(size)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.post("/sync")
def sync_alerts(
    db: Session = Depends(get_db)
):
    try:
        data = service.search_alerts(100)

        alerts = data["hits"]["hits"]

        created = 0
        skipped = 0

        for alert in alerts:

            source = alert.get("_source", {})

            rule = source.get("rule", {})
            agent = source.get("agent", {})

            title = rule.get(
                "description",
                "Wazuh Alert"
            )

            description = source.get(
                "full_log",
                str(source)
            )

            level = int(
                rule.get("level", 0)
            )

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
                skipped += 1
                continue

            incident = Incident(
                title=title,
                description=description,
                severity=severity,
                status="Open",
                source="Wazuh"
            )

            db.add(incident)
            created += 1

        db.commit()

        return {
            "success": True,
            "alerts_received": len(alerts),
            "incidents_created": created,
            "duplicates_skipped": skipped
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )    
@router.get("/debug/wazuh-config")
def debug_wazuh_config():
    return {
        "api_url": settings.WAZUH_API_URL,
        "username": settings.WAZUH_USERNAME,
        "password_exists": settings.WAZUH_PASSWORD is not None,
        "indexer_url": settings.WAZUH_INDEXER_URL,
        "indexer_username": settings.WAZUH_INDEXER_USERNAME,
        "indexer_password_exists": settings.WAZUH_INDEXER_PASSWORD is not None,
    }    