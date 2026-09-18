# Paytm Merchant Growth Copilot

> **"No Prompts. Just Profits."** — Autonomous merchant decision engine and margin protection copilot.

Paytm Merchant Growth Copilot flips the traditional conversational AI paradigm. Instead of requiring busy merchants to engineer prompts or converse with chatbots, the Copilot continuously analyzes transaction telemetry, isolates margin risks and traffic anomalies, and proactively surfaces high-conviction growth interventions with one-click execution.

---

## Key Highlights

- **Proactive Intelligence ("No Prompts. Just Profits.")**: Zero prompting required. The system detects low-traffic hours, calculates revenue recovery gaps, and formulates prioritized action recommendations.
- **Paytm ProfitGuard™ Engine**: Prevents margin leakage. Evaluates multiple promotional candidate offers and projects exact expected revenue and profit before merchants discount.
- **RandomForest Basket Inference**: Seamlessly infers likely product baskets and attaches a posterior confidence score for unreceipted UPI payments using scikit-learn.
- **Slow-Moving & Dormant Stock Detector**: Flags zero-sales dormant inventory (e.g. Lemon Tea with 250 units in stock) and declining SKUs to release locked-up working capital.
- **Multilingual Voice & Soundbox Ready**: Generates soundbox-ready audio prompts and translations in English, Hindi, Kannada, Tamil, and Telugu.
- **Verified Backend Offers**: Direct promotional offer creation with explicit backend confirmation before activation.
- **Paytm-Inspired Merchant UI**: Crisp, clean fintech dashboard built with light surfaces, Paytm Navy (`#002970`) and Cyan (`#00b9f1`) accents, and responsive layout.

---

## Dataset Provenance & Disclosure

> [!NOTE]
> **Dataset Specification:** This backend operates strictly and exclusively on `paytm_merchant_demo_dataset.zip`, representing synthetic demo merchant data (Merchant: Sri Lakshmi Tea & Snacks, BTM Layout, Bengaluru).
>
> - `upi_transactions.csv`: 6,557 UPI payment records (6,191 SUCCESS).
> - `merchant_orders.csv`: 8,170 exact line-item order details.
> - `merchant_catalog.csv`: 10 catalog SKUs with unit selling and cost prices.
> - `customers.csv`: 1,250 registered customer accounts across 3 segments.
> - `offers.csv`: Promotional campaign records.

---

## Architecture & Tech Stack

```
paytm-growth-copilot/
├── backend/
│   ├── app/
│   │   ├── database.py       # SQLAlchemy SQLite connection & auto-seed
│   │   ├── models.py         # Pydantic schema models
│   │   ├── ml.py             # RandomForest basket inference engine
│   │   ├── copilot.py        # Core analytics, ProfitGuard, & multi-offer ranker
│   │   └── main.py           # FastAPI application endpoints + CORS
│   ├── data/
│   │   └── merchant.db       # Seeded SQLite database
│   └── scripts/
│       ├── seed_database.py  # Unzips & populates SQLite from dataset
│       └── run_pipeline.py   # Full pipeline runner & data validator
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI cards, shell, NextBestAction
│   │   ├── context/          # BackendContext with health monitoring
│   │   ├── pages/            # Dashboard, ProfitGuard, Opportunities, etc.
│   │   ├── services/         # Centralized Axios API service
│   │   ├── App.jsx           # React Router declarations
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── tests/
│   └── test_backend.py       # Comprehensive pytest suite (14 test cases)
├── n8n/                      # n8n automation workflow
├── README.md
└── requirements.txt
```

### Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Backend** | Python 3.10+, FastAPI, SQLAlchemy 2.0, SQLite, Pandas, Scikit-learn, Pytest, Uvicorn |
| **Frontend** | React 18, Vite 6, Tailwind CSS, React Router 6, Recharts, Lucide React, Axios |
| **Orchestration** | n8n workflow integration (`n8n/paytm_growth_copilot_workflow.json`) |

---

## API Endpoints Reference

All endpoints run on `http://127.0.0.1:8000`:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Server health, transaction count, exact order count, ML status |
| `GET` | `/analytics/overview` | Gross revenue, estimated profit, transactions, avg line amount |
| `GET` | `/analytics/hourly` | Sales and transactions aggregated by operating hour (with off-peak flags) |
| `GET` | `/analytics/products` | Catalog performance ranked by revenue and profit margin |
| `GET` | `/analytics/customers` | Customer segment metrics (spend, txns, retention) |
| `GET` | `/analytics/inventory/slow-moving` | Identifies dormant and declining velocity SKUs |
| `GET` | `/opportunities` | Detected low sales hours with 3-4 candidate offers evaluated via ProfitGuard |
| `POST` | `/profitguard/simulate` | Simulates revenue and profit impact of discount depth |
| `GET` | `/ai/recommendation` | Proactive highest-profit recommendation with multilingual voice scripts |
| `GET` | `/alerts/active` | Active merchant alerts ready for soundbox / push broadcast |
| `GET` | `/popups/current` | Popup overlay response for dashboard / mobile app |
| `POST` | `/ml/infer-basket` | Predicts product items & confidence score for unreceipted UPI payments |
| `GET` | `/transactions/{id}` | Returns exact order items or ML inferred basket with confidence |
| `GET` | `/offers` | Active promotional offers list |
| `POST` | `/offers` | Create new promotional offer (confirmed by backend) |
| `GET` | `/network/intelligence` | Aggregated regional network clusters and revenue |
| `GET` | `/n8n/health` | n8n orchestration status check |
| `POST` | `/mock-paytm/action` | Mock payload handler for automated workflow actions |

---

## Local Setup & Quickstart

### Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### 1. Backend Setup

```bash
# Clone the repository
git clone https://github.com/inchara831/paytm-growth-copilot.git
cd paytm-growth-copilot

# Install Python requirements
pip install -r requirements.txt

# Run the data & ML pipeline (seeds database & trains RandomForest model)
python backend/scripts/run_pipeline.py

# Start the FastAPI backend server
uvicorn backend.app.main:app --reload --port 8000
```

FastAPI interactive documentation will be available at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

### 2. Frontend Setup

```bash
# Open a new terminal in the frontend directory
cd frontend

# Install Node dependencies
npm install

# Configure environment (defaults to http://127.0.0.1:8000)
cp .env.example .env

# Start the Vite development server
npm run dev
```

The frontend application will be live at [http://localhost:5173](http://localhost:5173).

---

## Testing & Verification

### Running Backend Tests
```bash
python -m pytest -v tests/test_backend.py
```
