import importlib
import os
import ssl
from urllib.parse import urlparse, parse_qs, urlencode, urlunparse


def load_dotenv() -> bool:
    try:
        dotenv = importlib.import_module("dotenv")
        return bool(dotenv.load_dotenv())
    except ImportError:  # pragma: no cover - fallback for minimal environments
        return False

from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import declarative_base

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Fix old postgres:// URLs
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace(
        "postgres://",
        "postgresql+asyncpg://",
        1,
    )

connect_args = {
    "statement_cache_size": 0,  # Required for Supabase pgbouncer in transaction mode
}
if DATABASE_URL:
    parsed_url = urlparse(DATABASE_URL)
    query_params = parse_qs(parsed_url.query)
    
    if "sslmode" in query_params:
        sslmode = query_params.pop("sslmode")[0]
        if sslmode == "require":
            ctx = ssl.create_default_context()
            ctx.check_hostname = False
            ctx.verify_mode = ssl.CERT_NONE
            connect_args["ssl"] = ctx
        elif sslmode in ("verify-ca", "verify-full"):
            ctx = ssl.create_default_context()
            if sslmode == "verify-ca":
                ctx.check_hostname = False
            ctx.verify_mode = ssl.CERT_REQUIRED
            connect_args["ssl"] = ctx
        elif sslmode == "disable":
            connect_args["ssl"] = False
            
    if "supa" in query_params:
        query_params.pop("supa")
        
    new_query = urlencode(query_params, doseq=True)
    DATABASE_URL = urlunparse(parsed_url._replace(query=new_query))

engine = create_async_engine(
    DATABASE_URL,
    echo=False,
    connect_args=connect_args,
)

SessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    autoflush=False,
    autocommit=False,
    expire_on_commit=False,
)

Base = declarative_base()


async def get_db():
    async with SessionLocal() as db:
        try:
            yield db
        finally:
            await db.close()