from pydantic import BaseModel
from typing import Optional

class UserBase(BaseModel):
    name: Optional[str] = None
    email: str
    password: str
    role: str


class UserCreate(UserBase):
    pass

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    role: str

    class Config:
        from_attributes = True

class Login_User(BaseModel):
    email: str
    password: str
