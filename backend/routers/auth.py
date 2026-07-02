from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from models.Users import Users
from schemas.users import UserCreate, UserLogin, UserResponse
from database import get_db
from utils.security import hash_password, verify_password
from utils.token import create_access_token
from schemas.tokens import Token

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=UserResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check if the user already exists
    existing_user = db.query(Users).filter(Users.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    # Hash the password
    hashed_password = hash_password(user.password)

    # Create a new user instance
    db_user = Users(
        username=user.name,
        email=user.email,
        hashed_password=hashed_password,
        role=user.role
    )

    # Add the new user to the database
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


from schemas.tokens import Token

@router.post("/login", response_model=Token)
def login_user(credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(Users).filter(Users.email == credentials.email).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid email or password")
    if not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    access_token = create_access_token(data={"user_id": user.id, "role": user.role})
    return {"access_token": access_token, "token_type": "bearer"}