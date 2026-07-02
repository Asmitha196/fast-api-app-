from pydantic import BaseModel

class UserBase(BaseModel):
    name:str
    email:str
    password:str
    role:str

class UserCreate(UserBase):
    pass

class UserLogin(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    role: str

    class Config:
        orm_mode = True

class UserUpdate(BaseModel):
    id: int
    name: str