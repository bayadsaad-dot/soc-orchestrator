from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

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


@router.post("/", response_model=IOCResponse)
def create_ioc(
    ioc: IOCCreate,
    db: Session = Depends(get_db)
):
    new_ioc = IOC(
        ioc_type=ioc.ioc_type,
        value=ioc.value,
        source=ioc.source
    )

    db.add(new_ioc)
    db.commit()
    db.refresh(new_ioc)

    return new_ioc


@router.get("/", response_model=list[IOCResponse])
def get_iocs(
    db: Session = Depends(get_db)
):
    iocs = db.query(IOC).all()
    return iocs


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


@router.put("/{ioc_id}", response_model=IOCResponse)
def update_ioc(
    ioc_id: int,
    updated_ioc: IOCUpdate,
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

    ioc.ioc_type = updated_ioc.ioc_type
    ioc.value = updated_ioc.value
    ioc.source = updated_ioc.source
    ioc.status = updated_ioc.status

    db.commit()
    db.refresh(ioc)

    return ioc
@router.delete("/{ioc_id}")
def delete_ioc(
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

    db.delete(ioc)
    db.commit()

    return {
        "message": "IOC deleted successfully"
    }
@router.get("/check/{ioc_id}")
def check_ioc_in_virustotal(
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

    result = check_ioc(ioc.value)

    return result