from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker
ROOT=Path(__file__).resolve().parents[1]
engine=create_engine(f"sqlite:///{ROOT / 'data' / 'merchant.db'}",future=True)
SessionLocal=sessionmaker(bind=engine,autoflush=False,autocommit=False)
class Base(DeclarativeBase): pass
