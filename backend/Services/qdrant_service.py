import importlib
import os
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload


def load_dotenv() -> bool:
    try:
        dotenv = importlib.import_module("dotenv")
        return bool(dotenv.load_dotenv())
    except ImportError:  # pragma: no cover - fallback for minimal environments
        return False


try:
    qdrant_client = importlib.import_module("qdrant_client")
    qdrant_models = importlib.import_module("qdrant_client.models")
    QdrantClient = qdrant_client.QdrantClient
    Distance = qdrant_models.Distance
    VectorParams = qdrant_models.VectorParams
    PointStruct = qdrant_models.PointStruct
except ImportError:  # pragma: no cover - fallback for minimal environments
    QdrantClient = None
    Distance = None
    VectorParams = None
    PointStruct = None

try:
    fastembed = importlib.import_module("fastembed")
    TextEmbedding = fastembed.TextEmbedding
except ImportError:  # pragma: no cover - fallback for minimal environments
    TextEmbedding = None

from models.job import Job

load_dotenv()

COLLECTION_NAME = "job_descriptions"
VECTOR_SIZE = 384

qdrant = None
if QdrantClient is not None:
    qdrant = QdrantClient(
        url=os.getenv("QDRANT_URL"),
        api_key=os.getenv("QDRANT_API_KEY"),
    )

embeddings_model = None
if TextEmbedding is not None:
    embeddings_model = TextEmbedding("BAAI/bge-small-en-v1.5")


def ensure_collection():
    if qdrant is None or Distance is None or VectorParams is None:
        return False

    collections = [c.name for c in qdrant.get_collections().collections]

    if COLLECTION_NAME not in collections:
        qdrant.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(
                size=VECTOR_SIZE,
                distance=Distance.COSINE,
            ),
        )

    return True


def embed_text(text: str):
    if embeddings_model is None:
        return [0.0] * VECTOR_SIZE
    return next(embeddings_model.embed([text])).tolist()


async def embed_all_jobs(db: AsyncSession):
    if not ensure_collection():
        return 0

    jobs = await db.execute(select(Job).options(selectinload(Job.company)))
    jobs = jobs.scalars().all()

    if not jobs:
        return 0

    points = []

    for job in jobs:
        text = f"{job.title} {job.description or ''}"
        vector = embed_text(text)

        company = getattr(job, "company", None)

        points.append(
            PointStruct(
                id=job.id,
                vector=vector,
                payload={
                    "job_id": job.id,
                    "title": job.title,
                    "description": job.description,
                    "salary": job.salary,
                    "company": company.name if company else None,
                },
            )
        )

    qdrant.upsert(
        collection_name=COLLECTION_NAME,
        points=points,
    )

    return len(points)


def search_jobs(query: str, top_k: int = 5):
    if not ensure_collection():
        return []

    query_vector = embed_text(query)

    results = qdrant.query_points(
        collection_name=COLLECTION_NAME,
        query=query_vector,
        limit=top_k,
    )

    return [
        {
            "job_id": hit.payload.get("job_id"),
            "title": hit.payload.get("title"),
            "description": hit.payload.get("description"),
            "salary": hit.payload.get("salary"),
            "score": round(hit.score, 4),
        }
        for hit in results.points
    ]


def match_jobs_with_query(query: str, top_k: int = 5):
    return search_jobs(query, top_k)


def match_jobs_with_profile(
    skills: str,
    experience: str,
    top_k: int = 5,
):
    if not ensure_collection():
        return []

    profile_text = f"Skills: {skills}. Experience: {experience}"
    profile_vector = embed_text(profile_text)

    results = qdrant.query_points(
        collection_name=COLLECTION_NAME,
        query=profile_vector,
        limit=top_k,
    )

    return [
        {
            "job_id": hit.payload.get("job_id"),
            "title": hit.payload.get("title"),
            "description": hit.payload.get("description"),
            "salary": hit.payload.get("salary"),
            "match_score": round(hit.score, 4),
        }
        for hit in results.points
    ]