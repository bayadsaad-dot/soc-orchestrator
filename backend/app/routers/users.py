from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)
from fastapi.security import HTTPAuthorizationCredentials
from app.auth.dependencies import security
from sqlalchemy.orm import Session
from app.utils.audit import create_audit_log
from app.database.database import SessionLocal
from app.models.user import User
from app.schemas import UserCreate, UserLogin
from app.auth.security import (
    hash_password,
    verify_password,
    create_access_token,
    decode_access_token
)

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)




def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/register")
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    existing_user = db.query(User).filter(
        User.username == user.username
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )

    hashed = hash_password(user.password)

    new_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User created successfully",
        "username": new_user.username
    }


@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):
    db_user = db.query(User).filter(
        User.username == user.username
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    if not verify_password(
        user.password,
        db_user.hashed_password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    access_token = create_access_token({
        "sub": db_user.username,
        "role": db_user.role
    })

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


@router.get("/me")
def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    payload = decode_access_token(
        credentials.credentials
    )

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    username = payload.get("sub")

    user = db.query(User).filter(
        User.username == username
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "username": user.username,
        "email": user.email,
        "role": user.role
    }


@router.get("/")
def get_users(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    payload = decode_access_token(
        credentials.credentials
    )

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    if payload.get("role") != "Admin":
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    users = db.query(User).all()

    return [
        {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role
        }
        for user in users
    ]
@router.put("/promote/{username}")
def promote_user(
    username: str,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    payload = decode_access_token(
        credentials.credentials
    )

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    if payload.get("role") != "Admin":
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    user = db.query(User).filter(
        User.username == username
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    user.role = "Admin"

    current_username = payload.get("sub")

    create_audit_log(
        db=db,
        username=current_username,
        action="PROMOTE",
        resource="User",
        details=f"Promoted {username} to Admin"
    )

    db.commit()
    db.refresh(user)

    return {
        "message": f"{user.username} promoted to Admin"
    }


@router.put("/role/{username}")
def update_role(
    username: str,
    role: str,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    payload = decode_access_token(
        credentials.credentials
    )

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    if payload.get("role") != "Admin":
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    if role not in ["Admin", "Analyst"]:
        raise HTTPException(
            status_code=400,
            detail="Invalid role"
        )

    user = db.query(User).filter(
        User.username == username
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    user.role = role

    db.commit()
    db.refresh(user)

    return {
        "message": "Role updated successfully",
        "username": user.username,
        "role": user.role
    }


@router.delete("/{username}")
def delete_user(
    username: str,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    payload = decode_access_token(
        credentials.credentials
    )

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    if payload.get("role") != "Admin":
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    current_username = payload.get("sub")

    if username == current_username:
        raise HTTPException(
            status_code=400,
            detail="You cannot delete your own account"
        )

    user = db.query(User).filter(
        User.username == username
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    create_audit_log(
        db=db,
        username=current_username,
        action="DELETE",
        resource="User",
        details=f"Deleted user {username}"
    )

    db.delete(user)
    db.commit()

    return {
        "message": f"User '{username}' deleted successfully"
    }
 