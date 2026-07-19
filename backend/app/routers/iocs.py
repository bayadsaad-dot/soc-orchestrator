from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.auth.dependencies import (
    get_current_user,
    require_role
)

from app.services.audit import log_action
from app.services.virustotal import check_ioc

from app.database.database import SessionLocal
from app.models.ioc import IOC
from app.schemas import (
    IOCCreate,
    IOCResponse,
    IOCUpdate
)

router = APIRouter(
    prefix="/iocs",
    tags=["IOCs"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# =====================================================
# Create IOC
# =====================================================

@router.post("/", response_model=IOCResponse)
def create_ioc(
    ioc: IOCCreate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    existing = db.query(IOC).filter(
        IOC.value == ioc.value
    ).first()

    if existing:
        raise HTTPException(
            status_code=409,
            detail="IOC already exists"
        )

    new_ioc = IOC(
        ioc_type=ioc.ioc_type,
        value=ioc.value,
        source=ioc.source
    )

    db.add(new_ioc)
    db.commit()
    db.refresh(new_ioc)

    log_action(
        db=db,
        username=current_user["sub"],
        action="CREATE_IOC",
        target=f"IOC #{new_ioc.id}"
    )

    return new_ioc


# =====================================================
# List IOCs
# =====================================================

@router.get("/", response_model=list[IOCResponse])
def get_iocs(
    ioc_type: str | None = Query(None),
    status: str | None = Query(None),
    search: str | None = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    query = db.query(IOC)

    if ioc_type:
        query = query.filter(
            IOC.ioc_type == ioc_type
        )

    if status:
        query = query.filter(
            IOC.status == status
        )

    if search:
        query = query.filter(
            IOC.value.contains(search)
        )

    offset = (page - 1) * limit

    iocs = query.offset(offset).limit(limit).all()

    return iocs
# =====================================================
# Get IOC By ID
# =====================================================

@router.get("/{ioc_id}", response_model=IOCResponse)
def get_ioc(
    ioc_id: int,
    db: Session = Depends(get_db)
):
    ioc = db.query(IOC).filter(
        IOC.id == ioc_id
    ).first()

    if not ioc:
        raise HTTPException(
            status_code=404,
            detail="IOC not found"
        )

    return ioc


# =====================================================
# Update IOC
# =====================================================

@router.put("/{ioc_id}", response_model=IOCResponse)
def update_ioc(
    ioc_id: int,
    updated_ioc: IOCUpdate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    ioc = db.query(IOC).filter(
        IOC.id == ioc_id
    ).first()

    if not ioc:
        raise HTTPException(
            status_code=404,
            detail="IOC not found"
        )

    duplicate = db.query(IOC).filter(
        IOC.value == updated_ioc.value,
        IOC.id != ioc_id
    ).first()

    if duplicate:
        raise HTTPException(
            status_code=409,
            detail="IOC already exists"
        )

    ioc.ioc_type = updated_ioc.ioc_type
    ioc.value = updated_ioc.value
    ioc.source = updated_ioc.source
    ioc.status = updated_ioc.status

    db.commit()
    db.refresh(ioc)

    log_action(
        db=db,
        username=current_user["sub"],
        action="UPDATE_IOC",
        target=f"IOC #{ioc.id}"
    )

    return ioc


# =====================================================
# Delete IOC
# =====================================================

@router.delete("/{ioc_id}")
def delete_ioc(
    ioc_id: int,
    current_user: dict = Depends(require_role("Admin")),
    db: Session = Depends(get_db)
):
    ioc = db.query(IOC).filter(
        IOC.id == ioc_id
    ).first()

    if not ioc:
        raise HTTPException(
            status_code=404,
            detail="IOC not found"
        )

    deleted_id = ioc.id

    db.delete(ioc)
    db.commit()

    log_action(
        db=db,
        username=current_user["sub"],
        action="DELETE_IOC",
        target=f"IOC #{deleted_id}"
    )

    return {
        "message": "IOC deleted successfully"
    }


# =====================================================
# VirusTotal Check
# =====================================================

@router.get("/check/{ioc_id}")
def check_ioc_in_virustotal(
    ioc_id: int,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    ioc = db.query(IOC).filter(
        IOC.id == ioc_id
    ).first()

    if not ioc:
        raise HTTPException(
            status_code=404,
            detail="IOC not found"
        )

    result = check_ioc(ioc.value)

    log_action(
        db=db,
        username=current_user["sub"],
        action="CHECK_IOC",
        target=f"IOC #{ioc.id}"
    )

    return result