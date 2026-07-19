from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.audit_log import AuditLog
from app.auth.dependencies import require_role

router = APIRouter(
    prefix="/audit",
    tags=["Audit"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def get_audit_logs(
    current_user: dict = Depends(require_role("Admin")),
    db: Session = Depends(get_db)
):
    logs = db.query(AuditLog).order_by(
        AuditLog.timestamp.desc()
    ).all()

    return logs