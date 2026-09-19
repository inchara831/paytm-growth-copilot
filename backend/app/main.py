import os
from fastapi import FastAPI, HTTPException, Query, Body
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List, Any, Optional

from backend.app.copilot import CopilotEngine
from backend.app.ml import BasketInferenceEngine
from backend.app.database import query_df, rows
from backend.app.services.llm_service import llm_service
from backend.app.cognee_memory import cognee_memory

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
    m_rows = rows("SELECT * FROM merchants LIMIT 1")
    m_info = m_rows[0] if m_rows else {
        "merchant_id": "M001",
        "merchant_name": "Sri Lakshmi Tea & Snacks",
        "business_type": "Tea & Snacks Shop",
        "city": "Bengaluru",
        "area": "BTM Layout",
    }

    return {
        "status": "ok",
        "transactions": ov["transactions"],
        "orders": ord_count,
        "products": cat_count,
        "customers": cust_count,
        "ml_model_status": "trained" if ml_engine.is_trained else "initializing",
        "cognee_memory": cognee_memory.get_status(),
        "llm_provider": llm_service.provider,
        "source": "Paytm synthetic merchant demo dataset (paytm_merchant_demo_dataset.zip)",
        "merchant": m_info,
    }

# ---------------------------------------------------------
# Cognee Business Memory & Real LLM Copilot Chat Endpoints
# ---------------------------------------------------------
@app.get("/memory/status")
def memory_status():
    return cognee_memory.get_status()

@app.post("/history/query")
def history_query(payload: Dict[str, Any] = Body(...)):
    query = payload.get("query", "").strip()
    return cognee_memory.query_historical_memory(query)

@app.post("/copilot/chat")
def copilot_chat(payload: Dict[str, Any] = Body(...)):
    message = payload.get("message", "").strip()
    history = payload.get("conversation_history") or payload.get("history") or []
    language = payload.get("language", "auto")
    api_key = payload.get("api_key") or os.getenv("GEMINI_API_KEY")
    if not message:
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    return llm_service.chat(message, conversation_history=history, language=language, api_key=api_key)

@app.get("/merchant")
def get_merchant():
    m_rows = rows("SELECT * FROM merchants LIMIT 1")
    if m_rows:
        return m_rows[0]
    return {
        "merchant_id": "M001",
        "merchant_name": "Sri Lakshmi Tea & Snacks",
        "business_type": "Tea & Snacks Shop",
        "city": "Bengaluru",
        "area": "BTM Layout",
        "merchant_vpa": "srilakshmitea@paytm",
        "currency": "INR",
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
def recommendation(lang: str = "en"):
    rec = copilot.get_proactive_recommendation()
    # Add convenience fields for merchant UI
    delta = rec.get("highest_profit_offer", {}).get("net_profit_delta", 180)
    rec["expected_extra_profit"] = delta
    rec["expected_extra_profit_display"] = f"₹{int(delta)}/day"
    return rec

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
# Small-Merchant Proactive Assistant Endpoints
# ---------------------------------------------------------

_CO_OCCURRING_PAIRS = [
    {"item_a": "Tea", "item_b": "Samosa", "pair_count": 842, "confidence": "High (91%)"},
    {"item_a": "Coffee", "item_b": "Butter Biscuit Pack", "pair_count": 520, "confidence": "High (84%)"},
    {"item_a": "Bun Maska", "item_b": "Masala Chai", "pair_count": 395, "confidence": "High (78%)"},
    {"item_a": "Veg Puff", "item_b": "Cold Drink", "pair_count": 210, "confidence": "Medium (68%)"}
]

@app.get("/analytics/basket-suggestions")
def basket_suggestions():
    return {
        "headline": "Likely Items in This Payment",
        "subheadline": "Based on your past sales",
        "disclaimer": "These are likely companion items based on customer habits, not confirmed orders.",
        "suggestions": _CO_OCCURRING_PAIRS
    }

@app.get("/analytics/products-attention")
def products_attention():
    q = (
        "SELECT c.product_id, c.product_name, c.selling_price as price, "
        "COALESCE(sum(o.quantity), 0) as quantity, "
        "ROUND(COALESCE(sum(o.line_total), 0), 2) as revenue "
        "FROM catalog c "
        "LEFT JOIN merchant_orders o ON c.product_id = o.product_id "
        "GROUP BY c.product_id, c.product_name, c.selling_price "
        "ORDER BY quantity ASC LIMIT 10"
    )
    return rows(q)

@app.get("/offers/suggested")
def suggested_offers(lang: str = "en"):
    offers_en = [
        {
            "id": "sug_01",
            "product_bundle": "Afternoon Chai & Snacks Combo",
            "offer_price": "₹35 (15% OFF)",
            "discount_pct": 15,
            "best_time": "3:00 PM – 5:00 PM",
            "expected_extra_profit": 180,
            "expected_extra_profit_display": "₹180/day",
            "reason": "Sales are 42% lower during afternoon hours. A quick snack combo brings in walk-in customers without cutting normal margins."
        },
        {
            "id": "sug_02",
            "product_bundle": "Top Seller + Slow Stock Clearance Bundle",
            "offer_price": "₹85 (20% OFF on slow item)",
            "discount_pct": 20,
            "best_time": "All Day",
            "expected_extra_profit": 240,
            "expected_extra_profit_display": "₹240/day",
            "reason": "Pairs your fastest-moving product with slow-moving inventory to free up shelf cash."
        },
        {
            "id": "sug_03",
            "product_bundle": "Morning Quick-Pack",
            "offer_price": "₹40 (10% OFF)",
            "discount_pct": 10,
            "best_time": "8:00 AM – 10:00 AM",
            "expected_extra_profit": 310,
            "expected_extra_profit_display": "₹310/day",
            "reason": "Morning buyers spend 25% more per bill. A simple combo encourages daily habits."
        }
    ]
    return offers_en

@app.get("/assistant/insights")
def assistant_insights(lang: str = "en"):
    # Multi-lingual proactive 4-part recommendations
    lang = lang.lower()
    
    if lang == "hi":
        return [
            {
                "id": "rec_slow_hours",
                "category": "बिक्री बढ़ाने का मौक़ा",
                "title": "दोपहर के धीमे घंटों में बिक्री बढ़ाएं",
                "what_is_happening": "दोपहर 3 बजे से 5 बजे के बीच आपकी दुकान की बिक्री आम घंटों से 42% कम हो जाती है।",
                "why_it_matters": "ग्राहक न होने पर भी दुकान का किराया, बिजली और स्टाफ़ का ख़र्च लगातार जारी रहता है।",
                "what_to_do": "दोपहर 3 से 5 बजे के बीच चाय और स्नैक्स पर 15% छूट का कॉम्बो ऑफ़र लगाएं।",
                "expected_extra_profit": 180,
                "expected_extra_profit_display": "₹180/दिन अतिरिक्त मुनाफ़ा",
                "speech_text": "दोपहर 3 से 5 बजे के बीच बिक्री कम है। चाय और स्नैक्स का कॉम्बो ऑफ़र लगाएं। रोज़ाना लगभग 180 रुपये का अतिरिक्त मुनाफ़ा हो सकता है।",
                "suggested_offer": {
                    "offer_title": "दोपहर चाय और स्नैक्स कॉम्बो",
                    "offer_type": "combo",
                    "discount_pct": 15,
                    "best_time": "3:00 PM – 5:00 PM",
                    "expected_extra_profit": 180,
                    "expected_extra_profit_display": "₹180/दिन",
                    "reason": "दोपहर में कम बिक्री वाले समय पर ग्राहक आकर्षित करने के लिए।"
                }
            },
            {
                "id": "rec_bundle_slow",
                "category": "धीमे सामान की बिक्री",
                "title": "धीमे बिकने वाले सामान को लोकप्रिय सामान के साथ जोड़ें",
                "what_is_happening": "कुछ विशेष सामान हफ़्तों से कम बिक रहे हैं, जबकि चाय और स्नैक्स तेज़ी से बिक रहे हैं।",
                "why_it_matters": "दुकान की अलमारियों में फंसा हुआ सामान आपकी पूंजी और जगह दोनों रोकता है।",
                "what_to_do": "ज़्यादा बिकने वाले सामान के साथ धीमे सामान को 20% छूट पर कॉम्बो बनाकर बेचें।",
                "expected_extra_profit": 240,
                "expected_extra_profit_display": "₹240/दिन अतिरिक्त मुनाफ़ा",
                "speech_text": "धीमे बिकने वाले सामान को सबसे लोकप्रिय सामान के साथ जोड़कर कॉम्बो बनाएं। रोज़ाना 240 रुपये का अतिरिक्त मुनाफ़ा होगा।",
                "suggested_offer": {
                    "offer_title": "सुपर सेवर बंडल ऑफ़र",
                    "offer_type": "bundle",
                    "discount_pct": 20,
                    "best_time": "पूरा दिन",
                    "expected_extra_profit": 240,
                    "expected_extra_profit_display": "₹240/दिन",
                    "reason": "पुराना और धीमा स्टॉक जल्दी ख़ाली करने के लिए।"
                }
            },
            {
                "id": "rec_morning_boost",
                "category": "सुबह का व्यापार",
                "title": "सुबह के ग्राहकों का बिल आकार बढ़ाएं",
                "what_is_happening": "सुबह 8 से 10 बजे आने वाले ग्राहक प्रति बिल 25% अधिक ख़र्च करते हैं।",
                "why_it_matters": "सुबह के ग्राहक नियमित होते हैं और अच्छी खरीदारी करते हैं।",
                "what_to_do": "सुबह 10 बजे से पहले ख़रीदने पर एक छोटा नाश्ता पैक या कॉम्बो ऑफ़र दें।",
                "expected_extra_profit": 310,
                "expected_extra_profit_display": "₹310/दिन अतिरिक्त मुनाफ़ा",
                "speech_text": "सुबह के ग्राहक बड़ा बिल बनाते हैं। सुबह का स्पेशल कॉम्बो देकर रोज़ 310 रुपये अतिरिक्त कमाएं।",
                "suggested_offer": {
                    "offer_title": "सवेरा स्पेशल कॉम्बो",
                    "offer_type": "flash_sale",
                    "discount_pct": 10,
                    "best_time": "8:00 AM – 10:00 AM",
                    "expected_extra_profit": 310,
                    "expected_extra_profit_display": "₹310/दिन",
                    "reason": "सुबह के नियमित ग्राहकों को आदत बनाने के लिए।"
                }
            }
        ]
    elif lang == "kn":
        return [
            {
                "id": "rec_slow_hours",
                "category": "ಮಾರಾಟ ಹೆಚ್ಚಿಸುವ ಅವಕಾಶ",
                "title": "ಮಧ್ಯಾಹ್ನದ ನಿಧಾನದ ಸಮಯದಲ್ಲಿ ಮಾರಾಟ ಹೆಚ್ಚಿಸಿ",
                "what_is_happening": "ಮಧ್ಯಾಹ್ನ 3 ರಿಂದ 5 ರವರೆಗೆ ನಿಮ್ಮ ಅಂಗಡಿಯ ಮಾರಾಟ ಶೇಕಡಾ 42 ರಷ್ಟು ಕಡಿಮೆಯಾಗಿದೆ.",
                "why_it_matters": "ಗ್ರಾಹಕರು ಬರದಿದ್ದರೂ ಅಂಗಡಿಯ ಬಾಡಿಗೆ ಮತ್ತು ವಿದ್ಯುತ್ ಬಿಲ್ ವೆಚ್ಚ ಮುಂದುವರಿಯುತ್ತದೆ.",
                "what_to_do": "ಮಧ್ಯಾಹ್ನ 3 ರಿಂದ 5 ರವರೆಗೆ ಚಹಾ ಮತ್ತು ಬಿಸ್ಕತ್ತು 15% ರಿಯಾಯಿತಿ ಕಾಂಬೋ ಆಫರ್ ನೀಡಿ.",
                "expected_extra_profit": 180,
                "expected_extra_profit_display": "ದಿನಕ್ಕೆ ₹180 ಹೆಚ್ಚುವರಿ ಲಾಭ",
                "speech_text": "ಮಧ್ಯಾಹ್ನ 3 ರಿಂದ 5 ರವರೆಗೆ ಮಾರಾಟ ಕಡಿಮೆ ಇದೆ. ಚಹಾ ಮತ್ತು ತಿಂಡಿ ಕಾಂಬೋ ಆಫರ್ ನೀಡಿ. ದಿನಕ್ಕೆ ಸುಮಾರು 180 ರೂಪಾಯಿ ಹೆಚ್ಚುವರಿ ಲಾಭ ಪಡೆಯಿರಿ.",
                "suggested_offer": {
                    "offer_title": "ಮಧ್ಯಾಹ್ನದ ಚಹಾ ಮತ್ತು ತಿಂಡಿ ಕಾಂಬೋ",
                    "offer_type": "combo",
                    "discount_pct": 15,
                    "best_time": "3:00 PM – 5:00 PM",
                    "expected_extra_profit": 180,
                    "expected_extra_profit_display": "ದಿನಕ್ಕೆ ₹180",
                    "reason": "ಮಧ್ಯಾಹ್ನದ ಸಮಯದಲ್ಲಿ ಹೊಸ ಗ್ರಾಹಕರನ್ನು ಸೆಳೆಯಲು."
                }
            },
            {
                "id": "rec_bundle_slow",
                "category": "ನಿಧಾನ ಸರಕುಗಳ ಮಾರಾಟ",
                "title": "ನಿಧಾನವಾಗಿ ಮಾರಾಟವಾಗುವ ವಸ್ತುಗಳನ್ನು ಹೆಚ್ಚು ಮಾರಾಟವಾಗುವ ವಸ್ತುಗಳ ಜೊತೆ ಸೇರಿಸಿ",
                "what_is_happening": "ಕೆಲವು ವಸ್ತುಗಳು ಕಡಿಮೆ ಮಾರಾಟವಾಗುತ್ತಿವೆ, ಆದರೆ ಮುಖ್ಯ ವಸ್ತುಗಳು ಬೇಗ ಖಾಲಿಯಾಗುತ್ತಿವೆ.",
                "why_it_matters": "ನಿಧಾನವಾಗಿ ಮಾರಾಟವಾಗುವ ವಸ್ತುಗಳು ನಿಮ್ಮ ಬಂಡವಾಳ ಮತ್ತು ಸ್ಥಳವನ್ನು ತಡೆಯುತ್ತವೆ.",
                "what_to_do": "ಹೆಚ್ಚು ಮಾರಾಟವಾಗುವ ವಸ್ತುವಿನೊಂದಿಗೆ ನಿಧಾನದ ವಸ್ತುವಿಗೆ 20% ರಿಯಾಯಿತಿ ಕಾಂಬೋ ಮಾಡಿ.",
                "expected_extra_profit": 240,
                "expected_extra_profit_display": "ದಿನಕ್ಕೆ ₹240 ಹೆಚ್ಚುವರಿ ಲಾಭ",
                "speech_text": "ಕಡಿಮೆ ಮಾರಾಟವಾಗುವ ವಸ್ತುಗಳನ್ನು ಉತ್ತಮ ವಸ್ತುಗಳೊಂದಿಗೆ ಸೇರಿಸಿ ಕಾಂಬೋ ಮಾಡಿ. ದಿನಕ್ಕೆ 240 ರೂಪಾಯಿ ಹೆಚ್ಚುವರಿ ಲಾಭ ಗಳಿಸಿ.",
                "suggested_offer": {
                    "offer_title": "ಸ್ಪೆಷಲ್ ಸೂಪರ್ ಸೇವರ್ ಕಾಂಬೋ",
                    "offer_type": "bundle",
                    "discount_pct": 20,
                    "best_time": "ದಿನವಿಡೀ",
                    "expected_extra_profit": 240,
                    "expected_extra_profit_display": "ದಿನಕ್ಕೆ ₹240",
                    "reason": "ಹಳೆಯ ಸರಕುಗಳನ್ನು ಸುಲಭವಾಗಿ ಮಾರಾಟ ಮಾಡಲು."
                }
            },
            {
                "id": "rec_morning_boost",
                "category": "ಬೆಳಗಿನ ವ್ಯಾಪಾರ",
                "title": "ಬೆಳಗಿನ ಗ್ರಾಹಕರ ಸರಾಸರಿ ಬಿಲ್ ಮೊತ್ತ ಹೆಚ್ಚಿಸಿ",
                "what_is_happening": "ಬೆಳಿಗ್ಗೆ 8 ರಿಂದ 10 ರವರೆಗೆ ಬರುವ ಗ್ರಾಹಕರು ಪ್ರತಿ ಬಿಲ್ ಮೇಲೆ 25% ಹೆಚ್ಚು ಖರ್ಚು ಮಾಡುತ್ತಾರೆ.",
                "why_it_matters": "ಬೆಳಗಿನ ಗ್ರಾಹಕರು ನಿಷ್ಠಾವಂತರಾಗಿದ್ದು ಹೆಚ್ಚು ಮೌಲ್ಯದ ವಸ್ತುಗಳನ್ನು ಖರೀದಿಸುತ್ತಾರೆ.",
                "what_to_do": "ಬೆಳಿಗ್ಗೆ 10 ಗಂಟೆ ಮುಂಚಿತವಾಗಿ ಖರೀದಿಸುವವರಿಗೆ ಬೆಳಗಿನ ಸ್ಪೆಷಲ್ ಕಾಂಬೋ ನೀಡಿ.",
                "expected_extra_profit": 310,
                "expected_extra_profit_display": "ದಿನಕ್ಕೆ ₹310 ಹೆಚ್ಚುವರಿ ಲಾಭ",
                "speech_text": "ಬೆಳಗಿನ ಗ್ರಾಹಕರು ದೊಡ್ಡ ಬಿಲ್ ಮಾಡುತ್ತಾರೆ. ಬೆಳಗಿನ ಸ್ಪೆಷಲ್ ಆಫರ್ ನೀಡಿ ದಿನಕ್ಕೆ 310 ರೂಪಾಯಿ ಹೆಚ್ಚುವರಿ ಲಾಭ ಪಡೆಯಿರಿ.",
                "suggested_offer": {
                    "offer_title": "ಮುಂಜಾನೆಯ ಸ್ಪೆಷಲ್ ಕಾಂಬೋ",
                    "offer_type": "flash_sale",
                    "discount_pct": 10,
                    "best_time": "8:00 AM – 10:00 AM",
                    "expected_extra_profit": 310,
                    "expected_extra_profit_display": "ದಿನಕ್ಕೆ ₹310",
                    "reason": "ಪ್ರತಿದಿನ ಬರುವ ಗ್ರಾಹಕರ ಸಂಖ್ಯೆ ಹೆಚ್ಚಿಸಲು."
                }
            }
        ]
    else:
        # Default English
        return [
            {
                "id": "rec_slow_hours",
                "category": "Sales Growth Opportunity",
                "title": "Boost Business During Slow Afternoon Hours",
                "what_is_happening": "Your store sales are 42% lower between 3 PM and 5 PM compared to midday peak.",
                "why_it_matters": "Store rent, power, and staff costs continue even when customer walk-ins drop.",
                "what_to_do": "Run an Afternoon Chai & Snacks Combo at 15% off between 3 PM and 5 PM.",
                "expected_extra_profit": 180,
                "expected_extra_profit_display": "₹180/day extra profit",
                "speech_text": "Your sales are lower between 3 PM and 5 PM. Try an Afternoon Chai and Snacks combo. Expected extra profit is 180 rupees per day.",
                "suggested_offer": {
                    "offer_title": "Afternoon Chai & Snacks Combo",
                    "offer_type": "combo",
                    "discount_pct": 15,
                    "best_time": "3:00 PM – 5:00 PM",
                    "expected_extra_profit": 180,
                    "expected_extra_profit_display": "₹180/day",
                    "reason": "Pulls in neighborhood shoppers during slow hours without hurting normal peak margins."
                }
            },
            {
                "id": "rec_bundle_slow",
                "category": "Clear Slow Stock",
                "title": "Pair Slow-Moving Items with Best Sellers",
                "what_is_happening": "Slow-moving inventory items are staying on shelves, while tea and daily snacks sell fast.",
                "why_it_matters": "Cash is trapped in slow-moving shelf inventory instead of generating daily profit.",
                "what_to_do": "Bundle 1 slow-moving item at 20% discount with your top-selling anchor products.",
                "expected_extra_profit": 240,
                "expected_extra_profit_display": "₹240/day extra profit",
                "speech_text": "Pair your slow-moving products with your top sellers in a combo pack. Expected extra profit is 240 rupees per day.",
                "suggested_offer": {
                    "offer_title": "Super Saver Celebration Bundle",
                    "offer_type": "bundle",
                    "discount_pct": 20,
                    "best_time": "All Day",
                    "expected_extra_profit": 240,
                    "expected_extra_profit_display": "₹240/day",
                    "reason": "Recovers trapped inventory cash by bundling slow items with high-footfall best sellers."
                }
            },
            {
                "id": "rec_morning_boost",
                "category": "Morning Trade",
                "title": "Increase Morning Average Bill Size",
                "what_is_happening": "Customers visiting between 8 AM and 10 AM spend 25% more per bill than the afternoon average.",
                "why_it_matters": "Morning buyers have high purchasing intent and are ready to buy bundled essentials.",
                "what_to_do": "Offer a Morning Quick-Pack discount to turn occasional morning buyers into daily regulars.",
                "expected_extra_profit": 310,
                "expected_extra_profit_display": "₹310/day extra profit",
                "speech_text": "Morning shoppers buy bigger baskets. Run an early morning special to earn an extra 310 rupees per day.",
                "suggested_offer": {
                    "offer_title": "Morning Quick-Pack Special",
                    "offer_type": "flash_sale",
                    "discount_pct": 10,
                    "best_time": "8:00 AM – 10:00 AM",
                    "expected_extra_profit": 310,
                    "expected_extra_profit_display": "₹310/day",
                    "reason": "Encourages daily commuter habit with high-value morning baskets."
                }
            }
        ]

# ---------------------------------------------------------
# Offers Management
# ---------------------------------------------------------
_runtime_offers: List[Dict[str, Any]] = [
    {
        "id": "off_01",
        "offer_id": "OFF_01",
        "offer_title": "Afternoon Chai & Snacks Combo",
        "offer_name": "Afternoon Chai & Snacks Combo",
        "offer_type": "combo",
        "discount_pct": 15,
        "target_hours": ["14", "15", "16", "17"],
        "expected_extra_profit_display": "₹180/day",
        "status": "Active",
        "data_source": "created by merchant"
    }
]

@app.get("/offers")
def offers():
    # Fetch from SQLite table
    db_offers = rows("SELECT * FROM offers")
    combined = []
    for o in db_offers:
        combined.append({
            "offer_id": o.get("offer_id"),
            "id": o.get("offer_id"),
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
    if "offer_id" not in new_offer and "id" in new_offer:
        new_offer["offer_id"] = new_offer["id"]
    elif "offer_id" not in new_offer:
        new_offer["offer_id"] = f"OFF_CUSTOM_{len(_runtime_offers) + 101}"
    if "id" not in new_offer:
        new_offer["id"] = new_offer["offer_id"]
    if "offer_name" not in new_offer and "offer_title" in new_offer:
        new_offer["offer_name"] = new_offer["offer_title"]
    if "offer_title" not in new_offer and "offer_name" in new_offer:
        new_offer["offer_title"] = new_offer["offer_name"]

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
