# Paytm Merchant Growth Copilot

> **"No Prompts. Just Profits."** — Simple, proactive business assistant for small merchants, tea shops, bakeries, and local stores.

Paytm Merchant Growth Copilot flips the traditional conversational AI paradigm. Instead of forcing busy shop owners to learn technical charts, study analytics, or engineer prompts for chatbots, the Copilot acts as a **simple business assistant**. It watches store data and automatically tells the merchant:
1. How their business is doing today
2. What is going wrong (e.g., slow afternoon hours, slow-moving shelf inventory)
3. Why it matters
4. What they should do (e.g., afternoon tea + snack combo, bundling slow items with top sellers)
5. **Expected Extra Profit: ₹___ per day**
6. Reads advice aloud in their preferred language (English, Hindi, Kannada) with a single click (`🔊 Listen`).

---

## Key Highlights

- **Proactive Intelligence ("No Prompts. Just Profits.")**: Zero prompting required. Proactive in-app business alerts slide in automatically when an opportunity is detected.
- **4-Part Simple Recommendations**:
  - 1. **WHAT IS HAPPENING?** (e.g., Store sales are 42% lower between 3 PM and 5 PM)
  - 2. **WHY DOES IT MATTER?** (Rent, power, and staff costs continue even when walk-ins drop)
  - 3. **WHAT SHOULD I DO?** (Run an Afternoon Chai & Snacks combo at 15% off)
  - 4. **EXPECTED EXTRA PROFIT: ₹___/day** (Quantified daily rupee profit boost)
- **Multi-Language Support**:
  - Full native language switching: **English**, **हिंदी (Hindi)**, and **ಕನ್ನಡ (Kannada)**.
- **Real Voice Playback (🔊 Listen)**:
  - Working browser text-to-speech reading advice aloud in the chosen language.
- **Smart Bundling & RandomForest Basket Inference**:
  - Pairs slow-moving inventory with high-footfall best sellers to recover trapped shelf cash.
  - *"Likely Items in This Payment"* based on past customer purchase patterns and ML inference.
- **1-Click Offer Activation**:
  - Pre-calculated combo offers with best timing (e.g. 3 PM – 5 PM) that can be activated instantly with explicit backend confirmation.
- **Classy Paytm-Inspired UI**:
  - Crisp, white, Paytm Blue (`#002970`) and Cyan (`#00b9f1`) accents, large readable numbers, simple cards, and mobile-friendly responsive layout.
  - No technical jargon, no developer/ML terminology shown to merchants.

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
│   │   ├── database.py         # SQLAlchemy SQLite connection & auto-seed
│   │   ├── models.py           # Pydantic schema models
│   │   ├── ml.py               # RandomForest basket inference engine
│   │   ├── copilot.py          # Core analytics & multi-offer ranker
│   │   └── main.py             # FastAPI backend with multi-lingual assistant endpoints
│   ├── data/
│   │   └── merchant.db         # Seeded SQLite database
│   └── scripts/
│       ├── seed_database.py    # Unzips & populates SQLite from dataset
│       └── run_pipeline.py     # Full pipeline runner & data validator
├── frontend/
│   ├── src/
│   │   ├── components/         # Clean cards, ProactiveBusinessAlert, Header, Sidebar
│   │   ├── context/            # BackendContext & LanguageContext (SpeechSynthesis)
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx   # "Your Shop" (Today's sales, profit, busy/slow hours)
│   │   │   ├── GrowthCopilot.jsx # "What You Can Do" (4-part actionable advice + voice)
│   │   │   ├── Products.jsx    # Products in Your Shop (Best sellers & slow items)
│   │   │   ├── Offers.jsx      # Suggested combos & active offers
│   │   │   ├── LocalTrends.jsx # Real aggregate local business trends
│   │   │   ├── Settings.jsx    # Language choice, voice test, shop profile
│   │   │   └── Help.jsx        # Simple merchant guide & proxy disclosure
│   │   ├── services/
│   │   │   ├── api.js          # Centralized Axios API service
│   │   │   └── translations.js # Full English, Hindi, Kannada translation dictionary
│   │   ├── App.jsx             # Clean merchant routing
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── tests/
│   └── test_backend.py         # 18 Pytest tests for all backend assistant & copilot routes
├── n8n/                        # n8n automation workflow
├── README.md
├── requirements.txt
└── paytm_merchant_demo_dataset.zip
```

### Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Backend** | Python 3.10+, FastAPI, SQLAlchemy 2.0, SQLite, Pandas, Scikit-learn, Pytest, Uvicorn |
| **Frontend** | React 18, Vite 6, Tailwind CSS, React Router 6, Recharts, Lucide React, Axios |
| **Voice & Speech** | Web Speech API (`window.speechSynthesis`, `SpeechSynthesisUtterance`) |
| **Translations** | English, Hindi (हिंदी), Kannada (ಕನ್ನಡ) |

---

## API Endpoints Reference

All endpoints run on `http://127.0.0.1:8000`:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Server health, transaction count, exact order count, ML status |
| `GET` | `/analytics/overview` | Gross revenue, estimated profit, transactions, avg line amount |
| `GET` | `/analytics/hourly` | Sales and transactions aggregated by operating hour |
| `GET` | `/analytics/products` | Catalog performance ranked by revenue and profit margin |
| `GET` | `/analytics/products-attention` | Slow-moving products that need promotional bundles |
| `GET` | `/analytics/basket-suggestions` | Likely companion items based on past frequent purchases |
| `GET` | `/assistant/insights?lang=en` | Proactive 4-part recommendations in English, Hindi, or Kannada |
| `GET` | `/offers/suggested?lang=en` | Suggested bundles with expected extra profit per day |
| `GET` | `/offers` | Active store promotional offers |
| `POST` | `/offers` | Create or activate an offer confirmed by backend |
| `GET` | `/ai/recommendation` | Proactive highest-profit recommendation with multilingual voice scripts |
| `GET` | `/alerts/active` | Active merchant alerts ready for soundbox / push broadcast |
| `GET` | `/popups/current` | Popup overlay response for dashboard / mobile app |
| `POST` | `/ml/infer-basket` | Predicts product items & confidence score for unreceipted UPI payments |
| `GET` | `/transactions/{id}` | Returns exact order items or ML inferred basket with confidence |
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

The application will be live at [http://localhost:5173](http://localhost:5173).

---

## Testing & Verification

### Running Backend Tests (18/18 tests)
```bash
python -m pytest -v tests/test_backend.py
```

### Building Frontend for Production
```bash
cd frontend
npm run build
```

Compiled assets will be placed cleanly inside `frontend/dist/`.
