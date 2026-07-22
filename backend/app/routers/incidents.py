from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.incident import Incident
from app.models.ioc import IOC

from app.schemas import (
    IncidentCreate,
    IncidentResponse,
    IncidentUpdate,
)

from app.auth.dependencies import (
    get_current_user,
    require_role,
)

from app.services.audit import log_action
from app.services.ioc_extractor import extract_iocs

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
    db: Session = Depends(get_db),
):
    new_incident = Incident(
        title=incident.title,
        description=incident.description,
        severity=incident.severity,
        source=incident.source,
        priority=incident.priority,
        assigned_to=incident.assigned_to,
        due_date=incident.due_date,
    )

    db.add(new_incident)
    db.commit()
    db.refresh(new_incident)

    # ===========================
    # Auto IOC Extraction
    # ===========================

    try:

        iocs = extract_iocs(new_incident.description)

        seen = set()

        for item in iocs:

            value = item["value"].strip()

            # Ignore duplicates in the same incident
            if value in seen:
                continue

            seen.add(value)

            # Ignore if IOC already exists
            exists = (
                db.query(IOC)
                .filter(IOC.value == value)
                .first()
            )

            if exists:
                continue

            db.add(
                IOC(
                    ioc_type=item["type"],
                    value=value,
                    source="Incident",
                )
            )

        db.commit()

    except Exception as e:
        db.rollback()
        print(f"IOC Extraction Error: {e}")

    log_action(
        db=db,
        username=current_user["sub"],
        action="CREATE_INCIDENT",
        resource="Incident",
        details=f"Created incident: {new_incident.title}"
    )

    return new_incident
@router.get("/", response_model=list[IncidentResponse])
def get_incidents(
    severity: str | None = Query(None),
    status: str | None = Query(None),
    source: str | None = Query(None),
    search: str | None = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
):
    query = db.query(Incident)

    if severity:
        query = query.filter(
            Incident.severity == severity
        )

    if status:
        query = query.filter(
            Incident.status == status
        )

    if source:
        query = query.filter(
            Incident.source == source
        )

    if search:
        query = query.filter(
            Incident.title.contains(search)
        )

    offset = (page - 1) * limit

    incidents = (
        query
        .offset(offset)
        .limit(limit)
        .all()
    )

    return incidents


@router.get("/{incident_id}", response_model=IncidentResponse)
def get_incident(
    incident_id: int,
    db: Session = Depends(get_db),
):
    incident = (
        db.query(Incident)
        .filter(Incident.id == incident_id)
        .first()
    )

    if not incident:
        raise HTTPException(
            status_code=404,
            detail="Incident not found",
        )

    return incident
@router.put("/{incident_id}", response_model=IncidentResponse)
def update_incident(
    incident_id: int,
    updated_incident: IncidentUpdate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    incident = (
        db.query(Incident)
        .filter(Incident.id == incident_id)
        .first()
    )

    if not incident:
        raise HTTPException(
            status_code=404,
            detail="Incident not found",
        )

    incident.title = updated_incident.title
    incident.description = updated_incident.description
    incident.severity = updated_incident.severity
    incident.status = updated_incident.status
    incident.source = updated_incident.source
    incident.priority = updated_incident.priority
    incident.assigned_to = updated_incident.assigned_to
    incident.due_date = updated_incident.due_date
    incident.resolution = updated_incident.resolution

    db.commit()
    db.refresh(incident)

    log_action(
        db=db,
        username=current_user["sub"],
        action="UPDATE_INCIDENT",
        resource="Incident",
        details=f"Updated incident: {incident.title}",
    )

    return incident


@router.delete("/{incident_id}")
def delete_incident(
    incident_id: int,
    current_user: dict = Depends(require_role("Admin")),
    db: Session = Depends(get_db),
):
    incident = (
        db.query(Incident)
        .filter(Incident.id == incident_id)
        .first()
    )

    if not incident:
        raise HTTPException(
            status_code=404,
            detail="Incident not found",
        )

    deleted_id = incident.id

    db.delete(incident)
    db.commit()

    log_action(
        db=db,
        username=current_user["sub"],
        action="DELETE_INCIDENT",
        resource="Incident",
        details=f"Deleted incident: {deleted_id}",
    )

    return {
        "message": "Incident deleted successfully"
    }