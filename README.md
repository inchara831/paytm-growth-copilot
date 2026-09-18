# Paytm Merchant Growth Copilot

> **"No Prompts. Just Profits."** — Autonomous merchant decision engine and margin protection copilot.

Paytm Merchant Growth Copilot flips the traditional conversational AI paradigm. Instead of requiring busy merchants to engineer prompts or converse with chatbots, the Copilot continuously analyzes transaction telemetry, isolates margin risks and traffic anomalies, and proactively surfaces high-conviction growth interventions with one-click execution.

---

## Key Highlights

- **Proactive Intelligence ("No Prompts. Just Profits.")**: Zero prompting required. The system detects low-traffic hours, calculates revenue recovery gaps, and formulates prioritized action recommendations.
- **Paytm ProfitGuard™ Engine**: Prevents margin leakage. Solves the classic retail pitfall where nominal discounts erode unit profits faster than volume can compensate.
- **Merchant Network Signals**: Macro-level, privacy-safe regional transaction and revenue patterns across merchant clusters without exposing individual store identities.
- **Verified Backend Offers**: Direct promotional offer creation with explicit backend confirmation before activation.
- **Paytm-Inspired Merchant UI**: Crisp, clean fintech dashboard built with light surfaces, Paytm Navy (`#002970`) and Cyan (`#00b9f1`) accents, and responsive layout.

---

## Dataset Provenance & Disclosure

> [!IMPORTANT]
> **Analytical Proxy Notice:** This prototype uses a public retail transactions dataset from Kaggle ([Retail Transactions: Online Sales Dataset](https://www.kaggle.com/datasets/shashanks1202/retail-transactions-online-sales-dataset/data), Shashank S., MIT License) as an analytical proxy.
>
> **It does not use or claim to use live proprietary Paytm merchant records.**
>
> The source data provides line-item transactions. Fields such as demo merchant identifier (`M001`), deterministic cost price estimates (72% baseline adjusted by product code hash), and derived locations are demonstrative and deliberately distinguishable from real production data.

---

## Architecture & Tech Stack

```
paytm-growth-copilot/
├── backend/
│   ├── app/
│   │   ├── database.py       # SQLAlchemy SQLite connection
│   │   ├── main.py           # FastAPI application endpoints + CORS
│   │   └── models.py         # Transaction ORM definitions
│   ├── data/
│   │   ├── merchant.db       # SQLite database (400,916 records)
│   │   ├── processed/        # Processed CSV artifacts
│   │   └── raw/              # Raw data archive
│   └── scripts/
│       ├── process_dataset.py
│       ├── run_pipeline.py
│       ├── seed_database.py
│       └── validate_dataset.py
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI cards, shell, NextBestAction
│   │   ├── context/          # BackendContext with health monitoring
│   │   ├── pages/            # Dashboard, ProfitGuard, Opportunities, etc.
│   │   ├── services/         # Centralized Axios API service
│   │   ├── App.jsx           # React Router declarations
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── tests/
│   └── test_backend.py       # Pytest suite for FastAPI endpoints
├── n8n/                      # n8n automation workflow
├── README.md
└── requirements.txt
```

### Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Backend** | Python 3.14, FastAPI, SQLAlchemy 2.0, SQLite, Pytest, Uvicorn |
| **Frontend** | React 18, Vite 6, Tailwind CSS, React Router 6, Recharts, Lucide React, Axios |
| **Orchestration** | n8n workflow integration (`n8n/paytm_growth_copilot_workflow.json`) |

---

## API Endpoints Reference

All endpoints run on `http://127.0.0.1:8000`:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Server health, transaction count, and proxy disclaimer |
| `GET` | `/analytics/overview` | Gross revenue, estimated profit, transactions, avg line amount |
| `GET` | `/analytics/hourly` | Sales and transactions aggregated by operating hour |
| `GET` | `/analytics/products` | Top 20 products ranked by total revenue |
| `GET` | `/opportunities` | Algorithmically detected off-peak low sales hours |
| `POST` | `/profitguard/simulate` | Simulates revenue and profit impact of discount depth |
| `GET` | `/ai/recommendation` | Proactive priority recommendation with evidence context |
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

# If merchant.db is not populated, run the data pipeline:
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

## Testing & Build

### Running Backend Tests
```bash
pytest -v tests/test_backend.py
```

### Building Frontend for Production
```bash
cd frontend
npm run build
```

The compiled assets will be placed inside `frontend/dist/`.

---

## System Limitations

1. **Customer Intelligence**: The connected backend does not expose customer retention cohorts to preserve privacy; the Customer page clearly renders an unlinked coming-soon status without fabricating figures.
2. **Deterministic Fallback**: AI recommendations currently run on deterministic analytical rules without requiring external LLM API keys.
3. **Proxy Data**: Metrics reflect historical retail transaction structures rather than live Paytm merchant banking feeds.
