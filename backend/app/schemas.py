from enum import Enum
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


# ==========================
# Incident Enums
# ==========================

class Severity(str, Enum):
    CRITICAL = "Critical"
    HIGH = "High"
    MEDIUM = "Medium"
    LOW = "Low"


class IncidentStatus(str, Enum):
    OPEN = "Open"
    INVESTIGATING = "Investigating"
    CLOSED = "Closed"


# ==========================
# User Schemas
# ==========================

class UserCreate(BaseModel):
    username: str = Field(min_length=3, max_length=30)
    email: EmailStr
    password: str = Field(min_length=6, max_length=100)


class UserLogin(BaseModel):
    username: str
    password: str


# ==========================
# Incident Schemas
# ==========================

class IncidentCreate(BaseModel):
    title: str = Field(min_length=3, max_length=100)
    description: str = Field(min_length=5)

    severity: Severity
    source: str = Field(min_length=2, max_length=100)

    priority: str = Field(default="Medium")
    assigned_to: Optional[str] = None
    due_date: Optional[datetime] = None


class IncidentUpdate(BaseModel):
    title: str = Field(min_length=3, max_length=100)
    description: str = Field(min_length=5)

    severity: Severity
    status: IncidentStatus
    source: str = Field(min_length=2, max_length=100)

    priority: str = Field(default="Medium")
    assigned_to: Optional[str] = None
    due_date: Optional[datetime] = None
    resolution: Optional[str] = None


class IncidentResponse(BaseModel):
    id: int
    title: str
    description: str

    severity: str
    priority: str

    status: str
    source: str

    assigned_to: Optional[str]
    due_date: Optional[datetime]
    resolution: Optional[str]

    created_at: datetime

    class Config:
        from_attributes = True


# ==========================
# IOC Enums
# ==========================

class IOCStatus(str, Enum):
    ACTIVE = "Active"
    INACTIVE = "Inactive"


class IOCType(str, Enum):
    IP = "IP"
    DOMAIN = "Domain"
    URL = "URL"
    HASH = "Hash"
    EMAIL = "Email"


# ==========================
# IOC Schemas
# ==========================

class IOCCreate(BaseModel):
    ioc_type: IOCType
    value: str = Field(min_length=3, max_length=255)
    source: str = Field(min_length=2, max_length=100)


class IOCUpdate(BaseModel):
    ioc_type: IOCType
    value: str = Field(min_length=3, max_length=255)
    source: str = Field(min_length=2, max_length=100)
    status: IOCStatus


class IOCResponse(BaseModel):
    id: int
    ioc_type: str
    value: str
    source: str
    status: str

    class Config:
        from_attributes = True