from pydantic import BaseModel


class UserCreate(BaseModel):
    username: str
    email: str
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


class IncidentCreate(BaseModel):
    title: str
    description: str
    severity: str
    source: str


class IncidentResponse(BaseModel):
    id: int
    title: str
    description: str
    severity: str
    status: str
    source: str

    class Config:
        from_attributes = True