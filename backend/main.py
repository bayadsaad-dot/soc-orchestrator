from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.database.database import Base, engine
from app.services.scheduler import scheduler

# Database Models
from app.models.user import User
from app.models.incident import Incident
from app.models.ioc import IOC

# Routers
from app.routers import users
from app.routers import incidents
from app.routers import iocs
from app.routers import dashboard
from app.routers import audit
from app.routers import reports
from app.routers import wazuh

# Exception Handlers
from app.core.exceptions import (
    http_exception_handler,
    validation_exception_handler
)

# Base.metadata.create_all(bind=engine)

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
        {
            "name": "Reports",
            "description": "Report generation and export."
        }
    ],
)

# ==========================
# CORS
# ==========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================
# Exception Handlers
# ==========================
app.add_exception_handler(
    StarletteHTTPException,
    http_exception_handler
)

app.add_exception_handler(
    RequestValidationError,
    validation_exception_handler
)

# ==========================
# Routers
# ==========================
app.include_router(users.router)
app.include_router(incidents.router)
app.include_router(iocs.router)
app.include_router(dashboard.router)
app.include_router(audit.router)
app.include_router(reports.router)
app.include_router(wazuh.router)

# ==========================
# Scheduler
# ==========================
@app.on_event("startup")
def startup_event():
    if not scheduler.running:
        scheduler.start()
        print("Scheduler started successfully.")

@app.on_event("shutdown")
def shutdown_event():
    if scheduler.running:
        scheduler.shutdown()
        print("Scheduler stopped.")

# ==========================
# Home
# ==========================
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