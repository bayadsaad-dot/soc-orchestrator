from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.user import User
from app.schemas import UserCreate, UserLogin
from app.auth.security import hash_password, verify_password, create_token


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
        return {
            "error": "User not found"
        }


    if not verify_password(
        user.password,
        db_user.hashed_password
    ):
        return {
            "error": "Wrong password"
        }


    token = create_token({
        "username": db_user.username,
        "role": db_user.role
    })


    return {
        "access_token": token,
        "token_type": "bearer"
    }