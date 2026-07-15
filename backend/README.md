# 🛡️ SOC Orchestrator

Threat Intelligence & Security Operations Center (SOC) Automation Platform built with **FastAPI**.

---

## 🚀 Overview

SOC Orchestrator is a backend application designed to simulate a modern Security Operations Center (SOC).

It provides:

- User Authentication
- Role-Based Access Control (RBAC)
- Incident Management
- IOC (Indicators of Compromise) Management
- VirusTotal Integration
- Dashboard Analytics
- Audit Logging
- REST API
- Docker Support

---

## 🛠 Tech Stack

- Python 3
- FastAPI
- SQLAlchemy
- SQLite
- JWT Authentication
- Pydantic
- Docker
- Docker Compose

---

## ✨ Features

### Authentication

- User Registration
- User Login
- JWT Authentication

### Authorization

- Role-Based Access Control

### Incident Management

- Create Incident
- Update Incident
- Delete Incident
- Search
- Filtering
- Pagination

### IOC Management

- CRUD Operations
- VirusTotal Lookup

### Dashboard

- Statistics
- Recent Incidents
- Severity Distribution
- Top Sources

### Security

- Password Hashing
- Global Exception Handling
- Input Validation

---

## 📂 Project Structure

```
backend/
│
├── app/
│   ├── auth/
│   ├── core/
│   ├── database/
│   ├── models/
│   ├── routers/
│   ├── services/
│   └── schemas.py
│
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── main.py
└── README.md
```

---

## ▶️ Run Locally

```bash
pip install -r requirements.txt

uvicorn main:app --reload
```

---

## 🐳 Run with Docker

```bash
docker compose build

docker compose up
```

---

## 📖 API Documentation

```
http://localhost:8000/docs
```

---

## 📌 Version

Current Version

```
v1.0.0
```

---

## 👨‍💻 Author

**Saad Byad**

GitHub:

https://github.com/bayadsaad-dot

---

## 📄 License

MIT License