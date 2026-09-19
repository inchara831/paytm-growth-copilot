import os
import zipfile
import sqlite3
import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent
DB_PATH = BASE_DIR / "backend" / "data" / "merchant.db"
ZIP_CANDIDATES = [
    BASE_DIR / "paytm_merchant_demo_dataset.zip",
    BASE_DIR / "backend" / "data" / "paytm_merchant_demo_dataset.zip",
    Path("C:/Users/Navanidhi N/Downloads/paytm_merchant_demo_dataset.zip"),
]

def find_zip_path() -> Path:
    for cand in ZIP_CANDIDATES:
        if cand.exists():
            return cand
    raise FileNotFoundError("paytm_merchant_demo_dataset.zip not found in repo or data directory.")

def seed_database(db_path: Path = DB_PATH, zip_path: Path = None):
    if zip_path is None:
        zip_path = find_zip_path()

    print(f"Loading data from: {zip_path}")
    print(f"Target SQLite database: {db_path}")

    db_path.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(str(db_path))
    cursor = conn.cursor()

    with zipfile.ZipFile(str(zip_path), "r") as z:
        # 1. Merchants
        if "merchants.csv" in z.namelist():
            with z.open("merchants.csv") as f:
                df_merchants = pd.read_csv(f)
                df_merchants.to_sql("merchants", conn, if_exists="replace", index=False)
                print(f"Loaded {len(df_merchants)} records into 'merchants'")

        # 2. Catalog
        if "merchant_catalog.csv" in z.namelist():
            with z.open("merchant_catalog.csv") as f:
                df_catalog = pd.read_csv(f)
                df_catalog.to_sql("catalog", conn, if_exists="replace", index=False)
                print(f"Loaded {len(df_catalog)} records into 'catalog'")

        # 3. Customers
        if "customers.csv" in z.namelist():
            with z.open("customers.csv") as f:
                df_customers = pd.read_csv(f)
                df_customers.to_sql("customers", conn, if_exists="replace", index=False)
                print(f"Loaded {len(df_customers)} records into 'customers'")

        # 4. UPI Transactions
        if "upi_transactions.csv" in z.namelist():
            with z.open("upi_transactions.csv") as f:
                df_upi = pd.read_csv(f)
                # Parse timestamps
                df_upi.to_sql("upi_transactions", conn, if_exists="replace", index=False)
                print(f"Loaded {len(df_upi)} records into 'upi_transactions'")

        # 5. Merchant Orders
        if "merchant_orders.csv" in z.namelist():
            with z.open("merchant_orders.csv") as f:
                df_orders = pd.read_csv(f)
                df_orders.to_sql("merchant_orders", conn, if_exists="replace", index=False)
                print(f"Loaded {len(df_orders)} records into 'merchant_orders'")

        # 6. Offers
        if "offers.csv" in z.namelist():
            with z.open("offers.csv") as f:
                df_offers = pd.read_csv(f)
                df_offers.to_sql("offers", conn, if_exists="replace", index=False)
                print(f"Loaded {len(df_offers)} records into 'offers'")

    # Create helpful indices
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_upi_status ON upi_transactions(status);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_upi_time ON upi_transactions(timestamp);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_upi_cust ON upi_transactions(customer_id_hash);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_orders_txn ON merchant_orders(transaction_id);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_orders_prod ON merchant_orders(product_id);")
    conn.commit()
    conn.close()
    print("Database seeding completed successfully!")

if __name__ == "__main__":
    seed_database()
