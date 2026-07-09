from fastapi import HTTPException, Depends, status
from jose import jwt
from datetime import datetime, timedelta, timezone
from sqlalchemy.orm import Session
from database import get_db
from schemas.tokens import Token
import os
from dotenv import load_dotenv
from models.Users import Users


load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")


def create_access_token(data: dict, expires_delta: timedelta = timedelta(hours=2)):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_access_token(token: str):
    try:
        to_decode = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if "user_id" in to_decode and "sub" not in to_decode:
            to_decode["sub"] = to_decode["user_id"]
        return to_decode
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials")


