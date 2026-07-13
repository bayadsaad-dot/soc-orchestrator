from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.database.database import Base


class IOC(Base):
    __tablename__ = "iocs"

    id = Column(Integer, primary_key=True, index=True)

    ioc_type = Column(String(50), nullable=False)

    value = Column(String(255), nullable=False, unique=True)

    source = Column(String(100), default="Manual")

    status = Column(String(50), default="Unknown")

    created_at = Column(DateTime, default=datetime.utcnow)