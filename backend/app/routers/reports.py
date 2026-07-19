from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.incident import Incident
from app.services.pdf_report import generate_incidents_pdf
from app.auth.dependencies import get_current_user

router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/incidents/pdf")
def export_incidents_pdf(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    incidents = db.query(Incident).all()

    pdf = generate_incidents_pdf(incidents)

    return StreamingResponse(
        pdf,
        media_type="application/pdf",
        headers={
            "Content-Disposition": "attachment; filename=incident_report.pdf"
        }
    )