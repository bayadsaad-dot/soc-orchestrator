from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.database.database import Base, engine

# Database Models
from app.models.user import User
from app.models.incident import Incident
from app.models.ioc import IOC
from app.models.audit import AuditLog

# Routers
from app.routers import users
from app.routers import incidents
from app.routers import iocs
from app.routers import dashboard
from app.routers import audit

# Exception Handlers
from app.core.exceptions import (
    http_exception_handler,
    validation_exception_handler
)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SOC Orchestrator",
    summary="Threat Intelligence & SOC Automation Platform",
    description="""
## SOC Orchestrator

SOC Orchestrator is a Security Operations Center (SOC) platform built with FastAPI.

### Features

- JWT Authentication
- Role-Based Access Control (RBAC)
- Incident Management
- IOC Management
- VirusTotal Integration
- Dashboard Analytics
- Audit Logging
- Input Validation
- Global Exception Handling
- Docker Support

Built for cybersecurity learning and portfolio purposes.
""",
    version="1.0.0",

    contact={
        "name": "Saad Byad",
        "url": "https://github.com/bayadsaad-dot/soc-orchestrator",
    },

    license_info={
        "name": "MIT License",
        "identifier": "MIT",
    },
    terms_of_service="https://github.com/bayadsaad-dot/soc-orchestrator",

    openapi_tags=[
        {
            "name": "Home",
            "description": "Application status endpoints."
        },
        {
            "name": "Users",
            "description": "User registration and authentication."
        },
        {
            "name": "Incidents",
            "description": "Incident management operations."
        },
        {
            "name": "IOCs",
            "description": "Indicators of Compromise management."
        },
        {
            "name": "Dashboard",
            "description": "Dashboard statistics and analytics."
        },
        {
            "name": "Audit",
            "description": "Audit log operations."
        },
    ],
)

# Exception Handlers
app.add_exception_handler(
    StarletteHTTPException,
    http_exception_handler
)

app.add_exception_handler(
    RequestValidationError,
    validation_exception_handler
)

# Routers
app.include_router(users.router)
app.include_router(incidents.router)
app.include_router(iocs.router)
app.include_router(dashboard.router)
app.include_router(audit.router)


@app.get(
    "/",
    tags=["Home"],
    summary="API Status",
    description="Returns the current status and version of the SOC Orchestrator API."
)
def home():
    return {
     "application": "SOC Orchestrator",
     "version": "1.0.0",
     "status": "online",
     "documentation": "/docs",
     "openapi": "/openapi.json"
}
    