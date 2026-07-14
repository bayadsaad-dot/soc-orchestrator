from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.services.audit import log_action
from app.auth.dependencies import (
    get_current_user,
    require_role
)
from app.database.database import SessionLocal
from app.models.incident import Incident
from app.schemas import (
    IncidentCreate,
    IncidentResponse,
    IncidentUpdate
)

router = APIRouter(
    prefix="/incidents",
    tags=["Incidents"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=IncidentResponse)
def create_incident(
    incident: IncidentCreate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    new_incident = Incident(
        title=incident.title,
        description=incident.description,
        severity=incident.severity,
        source=incident.source
    )

    db.add(new_incident)
    db.commit()
    db.refresh(new_incident)

    log_action(
        db=db,
        username=current_user["sub"],
        action="CREATE_INCIDENT",
        target=f"Incident #{new_incident.id}"
    )

    return new_incident


@router.get("/", response_model=list[IncidentResponse])
def get_incidents(
    db: Session = Depends(get_db)
):
    incidents = db.query(Incident).all()
    return incidents


@router.get("/{incident_id}", response_model=IncidentResponse)
def get_incident(
    incident_id: int,
    db: Session = Depends(get_db)
):
    incident = db.query(Incident).filter(
        Incident.id == incident_id
    ).first()

    if not incident:
        raise HTTPException(
            status_code=404,
            detail="Incident not found"
        )

    return incident


@router.put("/{incident_id}", response_model=IncidentResponse)
def update_incident(
    incident_id: int,
    updated_incident: IncidentUpdate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    incident = db.query(Incident).filter(
        Incident.id == incident_id
    ).first()

    if not incident:
        raise HTTPException(
            status_code=404,
            detail="Incident not found"
        )

    incident.title = updated_incident.title
    incident.description = updated_incident.description
    incident.severity = updated_incident.severity
    incident.status = updated_incident.status
    incident.source = updated_incident.source

    db.commit()
    db.refresh(incident)

    log_action(
        db=db,
        username=current_user["sub"],
        action="UPDATE_INCIDENT",
        target=f"Incident #{incident.id}"
    )

    return incident


@router.delete("/{incident_id}")
def delete_incident(
    incident_id: int,
    current_user: dict = Depends(require_role("Admin")),
    db: Session = Depends(get_db)
):
    incident = db.query(Incident).filter(
        Incident.id == incident_id
    ).first()

    if not incident:
        raise HTTPException(
            status_code=404,
            detail="Incident not found"
        )

    deleted_id = incident.id

    db.delete(incident)
    db.commit()

    log_action(
        db=db,
        username=current_user["sub"],
        action="DELETE_INCIDENT",
        target=f"Incident #{deleted_id}"
    )

    return {
        "message": "Incident deleted successfully"
    }