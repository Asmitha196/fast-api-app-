from fastapi import APIRouter
from schemas.job import JobCreate, JobUpdate

router = APIRouter(prefix="/job", tags=["job"])

job = []

@router.post("/")
def create_job(job_create: JobCreate):
    job.append(job_create)
    return job

@router.get("/")
def get_all_job():
    return job

@router.get("/{job_id}")
def get_job(job_id: int):
    return job[job_id]

@router.put("/{job_id}")
def update_job(job_id: int, job_update: JobUpdate):
    job[job_id] = job_update
    return job[job_id]
# @router.get("/")
# def read_job():
#     return {"job": "Job root."}

# @router.get("/{job_id}")
# def read_job(job_id: int):
#     return {"job_id": job_id}