from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, Text
from app.database.database import Base


class Incident(Base):
    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    severity = Column(String(20), default="Low")
    status = Column(String(20), default="Open")
    source = Column(String(100), default="Manual")
    created_at = Column(DateTime, default=datetime.utcnow)