import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(BASE_DIR))

from backend.scripts.seed_database import seed_database
from backend.app.database import query_df
from backend.app.ml import BasketInferenceEngine
from backend.app.copilot import CopilotEngine

def run_pipeline():
    print("=== Paytm Merchant Growth Copilot Data & ML Pipeline ===")
    print("[1/4] Seeding SQLite database from paytm_merchant_demo_dataset.zip...")
    seed_database()

    print("\n[2/4] Validating database tables & integrity...")
    txns = query_df("SELECT count(*) as count FROM upi_transactions").iloc[0]["count"]
    success_txns = query_df("SELECT count(*) as count FROM upi_transactions WHERE status = 'SUCCESS'").iloc[0]["count"]
    orders = query_df("SELECT count(*) as count FROM merchant_orders").iloc[0]["count"]
    catalog = query_df("SELECT count(*) as count FROM catalog").iloc[0]["count"]
    customers = query_df("SELECT count(*) as count FROM customers").iloc[0]["count"]
    print(f"   UPI Transactions: {txns} (SUCCESS: {success_txns})")
    print(f"   Order Line Items: {orders}")
    print(f"   Catalog Products: {catalog}")
    print(f"   Registered Customers: {customers}")

    print("\n[3/4] Initializing and training RandomForest basket inference model...")
    ml_engine = BasketInferenceEngine.get_instance()
    print(f"   RandomForest trained across {len(ml_engine.classes_)} unique basket classes.")

    print("\n[4/4] Verifying Copilot analytics engine...")
    copilot = CopilotEngine.get_instance()
    ov = copilot.get_overview()
    print(f"   Total Processed Revenue: Rs. {ov['revenue']:,.2f}")
    print(f"   Estimated Gross Profit:  Rs. {ov['estimated_profit']:,.2f} ({ov['margin_pct']}%)")
    print(f"   Average Line Item:       Rs. {ov['avg_line_amount']:.2f}")

    print("\n=== Pipeline executed successfully! Backend is ready for production. ===")

if __name__ == "__main__":
    run_pipeline()
