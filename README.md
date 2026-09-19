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
  - 1. **WHAT IS HAPPENING?**
  - 2. **WHY DOES IT MATTER?**
  - 3. **WHAT SHOULD I DO?**
  - 4. **EXPECTED EXTRA PROFIT: ₹___/day**
- **Multi-Language Support**:
  - Full native language switching: **English**, **हिंदी (Hindi)**, and **ಕನ್ನಡ (Kannada)**.
- **Real Voice Playback (🔊 Listen)**:
  - Working browser text-to-speech reading advice aloud in the chosen language.
- **Smart Bundling & Basket Inference**:
  - Pairs slow-moving inventory with high-footfall best sellers to recover trapped shelf cash.
  - *"Likely Items in This Payment"* based on past frequent customer purchases.
- **1-Click Offer Activation**:
  - Pre-calculated combo offers with best timing (e.g. 3 PM – 5 PM) that can be activated instantly into the backend.
- **Classy Paytm-Inspired UI**:
  - Crisp, white, Paytm Blue (`#002970`) and Cyan (`#00b9f1`) accents, large readable numbers, simple cards, and mobile-friendly responsive layout.
  - No technical jargon, no dark futuristic UI, and no developer/ML terminology.

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
│   │   ├── database.py         # SQLAlchemy SQLite connection
│   │   ├── main.py             # FastAPI backend with multi-lingual assistant endpoints
│   │   └── models.py           # Transaction ORM definitions
│   ├── data/
│   │   └── merchant.db         # SQLite database (400,916 records)
│   └── scripts/                # Data pipeline and seed scripts
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
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── tests/
│   └── test_backend.py         # 14 Pytest tests for all backend assistant routes
├── README.md
└── requirements.txt
```

### Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Backend** | Python 3.14, FastAPI, SQLAlchemy 2.0, SQLite, Pytest, Uvicorn |
| **Frontend** | React 18, Vite 6, Tailwind CSS, React Router 6, Recharts, Lucide React, Axios |
| **Voice & Speech** | Web Speech API (`window.speechSynthesis`, `SpeechSynthesisUtterance`) |
| **Translations** | English, Hindi (हिंदी), Kannada (ಕನ್ನಡ) |

---

## API Endpoints Reference

All endpoints run on `http://127.0.0.1:8000`:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Server health and transaction count |
| `GET` | `/analytics/overview` | Gross revenue, estimated profit, transactions, average bill |
| `GET` | `/analytics/hourly` | Sales and transactions aggregated by operating hour |
| `GET` | `/analytics/products` | Top products ranked by total sales |
| `GET` | `/analytics/products-attention` | Slow-moving products that need promotional bundles |
| `GET` | `/analytics/basket-suggestions` | Likely companion items based on past frequent purchases |
| `GET` | `/assistant/insights?lang=en` | Proactive 4-part recommendations in English, Hindi, or Kannada |
| `GET` | `/offers/suggested?lang=en` | Suggested bundles with expected extra profit per day |
| `GET` | `/offers` | Active store promotional offers |
| `POST` | `/offers` | Create or activate an offer confirmed by backend |
| `GET` | `/network/intelligence` | Aggregated regional network clusters and business done |
| `POST` | `/profitguard/simulate` | Internal profit check for margin preservation |

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

## Testing & Build

### Running Backend Tests (14/14 tests)
```bash
pytest -v tests/test_backend.py
```

### Building Frontend for Production
```bash
cd frontend
npm run build
```

Compiled assets will be placed cleanly inside `frontend/dist/`.
