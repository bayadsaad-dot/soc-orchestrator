from sqlalchemy.orm import Session

from app.models.audit import AuditLog


def log_action(
    db: Session,
    username: str,
    action: str,
    target: str
):
    log = AuditLog(
        username=username,
        action=action,
        target=target
    )

    db.add(log)
    db.commit()