from fastapi import FastAPI
from app.database.database import engine, Base

from app.models.user import User
from app.models.incident import Incident
from app.models.ioc import IOC
from app.routers import audit
from app.routers import users
from app.routers import incidents
from app.routers import iocs
from app.routers import dashboard
from app.models.audit import AuditLog

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SOC Orchestrator",
    description="Threat Intelligence and SOC Automation Platform",
    version="1.0"
)

app.include_router(users.router)
app.include_router(dashboard.router)
app.include_router(incidents.router)
app.include_router(iocs.router)
app.include_router(users.router)
app.include_router(dashboard.router)
app.include_router(incidents.router)
app.include_router(iocs.router)
app.include_router(audit.router)

@app.get("/")
def home():
    return {
        "message": "SOC Orchestrator is running",
        "status": "online"
    }