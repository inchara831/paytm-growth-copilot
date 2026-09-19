import os
import sqlite3
from pathlib import Path
import pandas as pd
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base

BASE_DIR = Path(__file__).resolve().parent.parent.parent

# In Vercel or read-only serverless environments, use /tmp for SQLite
if os.getenv("VERCEL") or not os.access(str(BASE_DIR), os.W_OK):
    DATA_DIR = Path("/tmp") / "data"
    DB_PATH = DATA_DIR / "merchant.db"
else:
    DATA_DIR = BASE_DIR / "backend" / "data"
    DB_PATH = DATA_DIR / "merchant.db"

def ensure_database():
    if not DB_PATH.exists():
        from backend.scripts.seed_database import seed_database
        DATA_DIR.mkdir(parents=True, exist_ok=True)
        seed_database(db_path=DB_PATH)

ensure_database()

SQLALCHEMY_DATABASE_URL = f"sqlite:///{DB_PATH}"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def query_df(sql: str, params=None) -> pd.DataFrame:
    with engine.connect() as conn:
        return pd.read_sql_query(sql, conn, params=params)

def rows(sql: str, params=None):
    with engine.connect() as conn:
        res = conn.execute(text(sql), params or {})
        return [dict(r) for r in res.mappings()]
