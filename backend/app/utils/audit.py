from app.models.audit_log import AuditLog


def create_audit_log(
    db,
    username,
    action,
    resource,
    details=""
):
    log = AuditLog(
        username=username,
        action=action,
        resource=resource,
        details=details,
    )

    db.add(log)
    db.commit()