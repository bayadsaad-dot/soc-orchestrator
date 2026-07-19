from fastapi import APIRouter, HTTPException

from app.services.wazuh_service import WazuhService

router = APIRouter(
    prefix="/wazuh",
    tags=["Wazuh"],
)

service = WazuhService()


@router.get("/status")
def manager_status():
    try:
        return service.get_manager_status()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/agents")
def agents():
    try:
        return service.get_agents()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/logs")
def logs(limit: int = 10):
    try:
        return service.get_logs(limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/indexer")
def indexer_connection():
    try:
        return service.test_indexer_connection()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))