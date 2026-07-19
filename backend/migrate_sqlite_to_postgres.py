import sqlite3
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.models.user import User
from app.models.incident import Incident
from app.models.ioc import IOC
from app.models.audit_log import AuditLog

# ==========================
# DATABASE CONNECTIONS
# ==========================

SQLITE_DB = "soc.db"

POSTGRES_URL = "postgresql://postgres:Winners2005+$@localhost:5432/soc_orchestrator"

sqlite_conn = sqlite3.connect(SQLITE_DB)
sqlite_conn.row_factory = sqlite3.Row

postgres_engine = create_engine(POSTGRES_URL)

Session = sessionmaker(bind=postgres_engine)
db = Session()

print("=" * 60)
print("SOC ORCHESTRATOR DATABASE MIGRATION")
print("=" * 60)


# ==========================
# USERS
# ==========================

print("\nMigrating Users...")

users = sqlite_conn.execute(
    """
    SELECT *
    FROM users
    """
).fetchall()

users_added = 0

for row in users:

    exists = db.query(User).filter(
        User.username == row["username"]
    ).first()

    if exists:
        continue

    user = User(
        username=row["username"],
        email=row["email"],
        hashed_password=row["hashed_password"],
        role=row["role"],
    )

    db.add(user)
    users_added += 1

db.commit()

print(f"Users migrated: {users_added}")


# ==========================
# INCIDENTS
# ==========================

print("\nMigrating Incidents...")

incidents = sqlite_conn.execute(
    """
    SELECT *
    FROM incidents
    """
).fetchall()

incidents_added = 0

for row in incidents:

    exists = db.query(Incident).filter(
        Incident.title == row["title"],
        Incident.description == row["description"],
    ).first()

    if exists:
        continue

    incident = Incident(
        title=row["title"],
        description=row["description"],
        severity=row["severity"],
        status=row["status"],
        source=row["source"],
        created_at=row["created_at"],
    )

    db.add(incident)
    incidents_added += 1

db.commit()

print(f"Incidents migrated: {incidents_added}")
# ==========================
# IOCs
# ==========================

print("\nMigrating IOCs...")

iocs = sqlite_conn.execute(
    """
    SELECT *
    FROM iocs
    """
).fetchall()

iocs_added = 0

for row in iocs:

    exists = db.query(IOC).filter(
        IOC.value == row["value"]
    ).first()

    if exists:
        continue

    ioc = IOC(
        ioc_type=row["ioc_type"],
        value=row["value"],
        source=row["source"],
        status=row["status"],
        created_at=row["created_at"],
    )

    db.add(ioc)
    iocs_added += 1

db.commit()

print(f"IOCs migrated: {iocs_added}")


# ==========================
# AUDIT LOGS
# ==========================

print("\nMigrating Audit Logs...")

audit_logs = sqlite_conn.execute(
    """
    SELECT *
    FROM audit_logs
    """
).fetchall()

audit_added = 0

for row in audit_logs:

    audit = AuditLog(
        username=row["username"],
        action=row["action"],
        resource=row["resource"],
        details=row["details"],
        timestamp=row["timestamp"],
    )

    db.add(audit)
    audit_added += 1

db.commit()

print(f"Audit Logs migrated: {audit_added}")


# ==========================
# FINISH
# ==========================

sqlite_conn.close()
db.close()

print("\n" + "=" * 60)
print("Migration completed successfully!")
print("=" * 60)

print(f"Users        : {users_added}")
print(f"Incidents    : {incidents_added}")
print(f"IOCs         : {iocs_added}")
print(f"Audit Logs   : {audit_added}")

print("\nYour PostgreSQL database is now populated.")