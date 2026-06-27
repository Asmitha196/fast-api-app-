from fastapi import APIRouter,HTTPException,Depends,status
from schemas.company import CompanyCreate,CompanyUpdate,CompanyResponse 
from models import company, job
from sqlalchemy.orm import session
from ..database import get_db,SessionLocal

router=APIRouter(prefix="/company", tags=["company"])
company=[]
@router.post("/",status_code=status.HTTP_201_CREATED)
def create_company(company_create:CompanyCreate,db: session = Depends(get_db)):
    pass
    

@router.get("/",status_code=status.HTTP_200_OK,response_model=list[CompanyResponse])
def get_all_company(db: session = Depends(get_db)):
    pass

@router.get("/{company_id}",status_code=status.HTTP_200_OK, response_model=CompanyResponse)
def get_company(company_id:int,db: session = Depends(get_db)):
    pass

@router.put("/{company_id}",status_code=status.HTTP_201_CREATED)
def update_company(company_id: int, company_update: CompanyUpdate,db: session = Depends(get_db)):
    pass

@router.delete("/{company_id}",status_code=status.HTTP_204_NO_CONTENT)
def delete_company(company_id: int,db: session = Depends(get_db)):
    pass



# @router.get("/")
# def read_company():
#     return {"company": "Company root."}

# @router.get("/{company_id}")
# def read_company(company_id: int):
#     return {"company_id": company_id}