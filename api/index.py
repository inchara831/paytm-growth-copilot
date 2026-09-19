import os
import sys
from pathlib import Path

# Add project root to sys.path so backend modules can be imported
ROOT_DIR = Path(__file__).resolve().parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

# Ensure database exists in /tmp if running in serverless environment
try:
    from backend.app.database import ensure_database
    ensure_database()
except Exception as e:
    print(f"Warning during ensure_database: {e}")

from backend.app.main import app

# Handler for Vercel serverless function
# Vercel's Python runtime automatically detects ASGI 'app'
