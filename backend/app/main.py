from fastapi import FastAPI, HTTPException, Query, Body
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List, Any, Optional

from backend.app.copilot import CopilotEngine
from backend.app.ml import BasketInferenceEngine
from backend.app.database import query_df, rows

app = FastAPI(
    title="Paytm Merchant Growth Copilot API",
    description=(
        "Autonomous merchant growth engine powered by SQLite, Pandas, and scikit-learn. "
        "Built exclusively using paytm_merchant_demo_dataset.zip."
    ),
    version="2.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5678",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

copilot = CopilotEngine.get_instance()
ml_engine = BasketInferenceEngine.get_instance()

# ---------------------------------------------------------
# Health & Status
# ---------------------------------------------------------
@app.get("/health")
def health():
    ov = copilot.get_overview()
    cat_count = len(query_df("SELECT product_id FROM catalog"))
    cust_count = len(query_df("SELECT customer_id_hash FROM customers"))
    ord_count = len(query_df("SELECT order_id FROM merchant_orders"))

    return {
        "status": "ok",
        "transactions": ov["transactions"],
        "orders": ord_count,
        "products": cat_count,
        "customers": cust_count,
        "ml_model_status": "trained" if ml_engine.is_trained else "initializing",
        "source": "Paytm synthetic merchant demo dataset (paytm_merchant_demo_dataset.zip)",
    }

# ---------------------------------------------------------
# Financial & Operational Analytics
# ---------------------------------------------------------
@app.get("/analytics/overview")
def overview():
    return copilot.get_overview()

@app.get("/analytics/hourly")
def hourly():
    return copilot.get_hourly()

@app.get("/analytics/products")
def products():
    return copilot.get_products()

@app.get("/analytics/customers")
def customers():
    return copilot.get_customers()

@app.get("/analytics/inventory/slow-moving")
def slow_moving():
    return copilot.get_slow_moving_products()

# ---------------------------------------------------------
# Opportunities & ProfitGuard
# ---------------------------------------------------------
@app.get("/opportunities")
def opportunities():
    return copilot.get_opportunities()

@app.post("/profitguard/simulate")
def profitguard(product_id: str = Query(...), discount_pct: float = Query(10.0)):
    res = copilot.simulate_profitguard(product_id=product_id, discount_pct=discount_pct)
    if "error" in res:
        raise HTTPException(status_code=404, detail=res["error"])
    return res

@app.get("/ai/recommendation")
def recommendation():
    return copilot.get_proactive_recommendation()

# ---------------------------------------------------------
# Notifications, Alerts & Popups
# ---------------------------------------------------------
@app.get("/alerts/active")
def alerts():
    return copilot.get_alerts()

@app.get("/popups/current")
def current_popup():
    return copilot.get_current_popup()

# ---------------------------------------------------------
# Machine Learning Basket Inference
# ---------------------------------------------------------
@app.post("/ml/infer-basket")
def infer_basket(payload: Dict[str, Any] = Body(...)):
    amt = float(payload.get("amount_inr", 30.0))
    hour = int(payload.get("hour", 12))
    dow = int(payload.get("day_of_week", 2))
    seg = str(payload.get("customer_segment", "occasional"))
    return ml_engine.infer_basket(amount_inr=amt, hour=hour, day_of_week=dow, customer_segment=seg)

@app.get("/transactions/{transaction_id}")
def transaction_detail(transaction_id: str):
    res = ml_engine.get_transaction_details(transaction_id)
    if "error" in res:
        raise HTTPException(status_code=404, detail=res["error"])
    return res

# ---------------------------------------------------------
# Offers Management
# ---------------------------------------------------------
_runtime_offers: List[Dict[str, Any]] = []

@app.get("/offers")
def offers():
    # Fetch from SQLite table
    db_offers = rows("SELECT * FROM offers")
    combined = []
    for o in db_offers:
        combined.append({
            "offer_id": o.get("offer_id"),
            "offer_title": o.get("offer_name"),
            "offer_name": o.get("offer_name"),
            "offer_type": o.get("offer_type"),
            "discount_pct": float(o.get("discount_or_price", 10.0)),
            "discount_or_price": o.get("discount_or_price"),
            "description": f"Historical active promo ({o.get('start_time')} to {o.get('end_time')})",
            "data_source": "historical dataset (offers.csv)",
            "status": "Active",
        })
    combined.extend(_runtime_offers)
    return combined

@app.post("/offers")
def create_offer(offer: Dict[str, Any] = Body(...)):
    if not offer:
        raise HTTPException(status_code=400, detail="Offer payload cannot be empty")
    new_offer = dict(offer)
    if "status" not in new_offer:
        new_offer["status"] = "Active"
    if "offer_id" not in new_offer:
        new_offer["offer_id"] = f"OFF_CUSTOM_{len(_runtime_offers) + 101}"
    if "offer_name" not in new_offer and "offer_title" in new_offer:
        new_offer["offer_name"] = new_offer["offer_title"]

    _runtime_offers.append(new_offer)
    return {
        "status": "accepted",
        "message": "Offer confirmed and saved by backend!",
        "offer": new_offer,
    }

# ---------------------------------------------------------
# Network Intelligence
# ---------------------------------------------------------
@app.get("/network/intelligence")
def network():
    return copilot.get_network_intelligence()

# ---------------------------------------------------------
# n8n Orchestration Endpoints
# ---------------------------------------------------------
@app.get("/n8n/health")
def n8n_health():
    return {
        "status": "ok",
        "orchestration": "n8n-ready",
        "mode": "active",
        "dataset": "paytm_merchant_demo_dataset.zip",
    }

@app.post("/mock-paytm/action")
def mock_paytm_action(action: Dict[str, Any] = Body(...)):
    return {
        "mode": "mock",
        "status": "accepted",
        "action": action,
        "message": "Action dispatched to Paytm Merchant Gateway successfully",
    }
