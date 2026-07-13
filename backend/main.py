from fastapi import FastAPI  # type: ignore[import]
from app.database.database import engine, Base
from app.models.user import User
from app.routers import users
from app.models.incident import Incident

from app.routers import incidents
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="SOC Orchestrator",
    description="Threat Intelligence and SOC Automation Platform",
    version="1.0"
)


app.include_router(users.router)
app.include_router(incidents.router)

@app.get("/")
def home():
    return {
        "message": "SOC Orchestrator is running",
        "status": "online"
    }