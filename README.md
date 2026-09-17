# Merchant Growth Copilot — backend

Backend-only FastAPI prototype for merchant analytics. It uses a **public retail dataset as a proxy, not Paytm data**.

## Source and provenance

* Kaggle dataset: [Retail Transactions: Online Sales Dataset](https://www.kaggle.com/datasets/shashanks1202/retail-transactions-online-sales-dataset/data), by Shashank S.
* License shown on the Kaggle data card: MIT.
* Original source fields: `Invoice`, `StockCode`, `Description`, `Quantity`, `InvoiceDate`, `Price`, `Customer ID`, `Country` (some versions use `InvoiceNo`/`UnitPrice`).

The source has line-item purchase records, not merchant records. `merchant_id` is the explicit demo constant `M001`; `cost_price` is a deterministic **synthetic estimate** (72% of selling price, adjusted by product-code hash); `discount` is `0` because no source discount exists; `payment_method` is `Unknown (not supplied by source)`; and `category` is `Uncategorized (not supplied by source)`. `location` is derived from the source `Country`. These generated fields are deliberately distinguishable from source fields.

## Reproduce

Use the bundled/your Python interpreter after installing requirements:

```powershell
python backend/scripts/run_pipeline.py
uvicorn backend.app.main:app --reload
pytest -q
```

`run_pipeline.py` downloads the public archive when absent (no credentials embedded), processes it, validates it, creates `backend/data/merchant.db`, and seeds SQLite. Raw files are ignored by Git; processed artifacts are reproducible and also ignored.

Useful API routes: `/health`, `/analytics/overview`, `/analytics/hourly`, `/opportunities`, `/profitguard/simulate`, `/ai/recommendation`, `/offers`, `/network/intelligence`.
