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
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.core.exceptions import (
    http_exception_handler,
    validation_exception_handler
)


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SOC Orchestrator",
    description="Threat Intelligence and SOC Automation Platform",
    version="1.0"
)

app.add_exception_handler(
    StarletteHTTPException,
    http_exception_handler
)

app.add_exception_handler(
    RequestValidationError,
    validation_exception_handler
)

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