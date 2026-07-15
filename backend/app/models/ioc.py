from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.database.database import Base


class IOC(Base):
    __tablename__ = "iocs"

    id = Column(Integer, primary_key=True, index=True)
    ioc_type = Column(String, nullable=False)
    value = Column(String, unique=True, nullable=False)
    source = Column(String, nullable=False)
    status = Column(String, default="Active")
    created_at = Column(DateTime, default=datetime.utcnow)