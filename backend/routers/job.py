from fastapi import APIRouter, HTTPException, Depends, status
from schemas.job import JobCreate, JobUpdate, JobResponse
from models.job import Job
from models.company import Company
from sqlalchemy.orm import session
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from database import get_db
from utils.oauth2 import get_current_user, role_required

router = APIRouter(prefix="/job", tags=["job"])

job = []

@router.post("/",status_code=status.HTTP_201_CREATED,response_model=JobResponse)
async def create_job(job_create: JobCreate, db: AsyncSession = Depends(get_db), current_user=Depends(role_required(["admin"]))):
    company = await db.execute(select(Company).filter(Company.id == job_create.company_id))
    company = company.scalar_one_or_none()
    if not company:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Company with id {job_create.company_id} not found"
        )

    db_job = Job(**job_create.dict())
    db.add(db_job)
    await db.commit()
    await db.refresh(db_job)
    return db_job

@router.get("/")
async def get_all_job(db: AsyncSession = Depends(get_db)):
    jobs = await db.execute(select(Job))
    return jobs.scalars().all()

@router.get("/{job_id}")
async def get_job(job_id: int, db: AsyncSession = Depends(get_db)):
    job = await db.execute(select(Job).filter(Job.id == job_id))
    job = job.scalar_one_or_none()
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Job with id {job_id} not found")
    return job

@router.put("/{job_id}")
async def update_job(job_id: int, job_update: JobUpdate, db: AsyncSession = Depends(get_db)):
    job = await db.execute(select(Job).filter(Job.id == job_id))
    db_job = job.scalar_one_or_none()
    if not db_job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Job with id {job_id} not found")
    for key, value in job_update.dict(exclude_unset=True).items():
        setattr(db_job, key, value)
    await db.commit()
    await db.refresh(db_job)
    return db_job

@router.delete("/{job_id}",status_code=status.HTTP_204_NO_CONTENT)
async def delete_job(job_id: int, db: AsyncSession = Depends(get_db)):
    job = await db.execute(select(Job).filter(Job.id == job_id))
    db_job = job.scalar_one_or_none()
    if not db_job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Job with id {job_id} not found")
    await db.delete(db_job)
    await db.commit()
# @router.get("/")
# def read_job():
#     return {"job": "Job root."}

# @router.get("/{job_id}")
# def read_job(job_id: int):
#     return {"job_id": job_id}