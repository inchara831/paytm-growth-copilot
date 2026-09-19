import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import pytest
from backend.app import main

def test_health():
    res = main.health()
    assert res["status"] == "ok"
    assert "transactions" in res
    assert res["transactions"] == 6191
    assert res["orders"] == 8170
    assert res["products"] == 10
    assert res["customers"] == 1250
    assert res["ml_model_status"] == "trained"
    assert "source" in res

def test_overview():
    res = main.overview()
    assert "transactions" in res
    assert "revenue" in res
    assert "estimated_profit" in res
    assert "avg_line_amount" in res
    assert res["transactions"] == 6191
    assert res["revenue"] == 191475.0
    assert res["estimated_profit"] > 100000
    assert res["avg_line_amount"] == 23.36
    assert "margin_pct" in res
    assert res["margin_pct"] > 50.0

def test_hourly():
    res = main.hourly()
    assert isinstance(res, list)
    assert len(res) == 15  # Operating hours 7 through 21
    item = res[0]
    assert "hour" in item
    assert "revenue" in item
    assert "transactions" in item
    assert "is_low" in item
    
    # Verify low hours detection (hours 14, 15, 16, 17)
    low_hours = [x["hour"] for x in res if x["is_low"]]
    assert set(low_hours) == {"14", "15", "16", "17"}

def test_products():
    res = main.products()
    assert isinstance(res, list)
    assert len(res) == 10  # 10 catalog products
    item = res[0]
    assert "product_id" in item
    assert "product_name" in item
    assert "quantity" in item
    assert "revenue" in item
    assert "profit" in item
    assert "margin_pct" in item
    # Top 2 products by volume/revenue in Sri Lakshmi catalog
    assert res[0]["product_id"] in ["P005", "P001"]

def test_customers():
    res = main.customers()
    assert isinstance(res, list)
    assert len(res) == 3
    segments = {x["segment"] for x in res}
    assert segments == {"occasional", "regular", "new"}
    total_cust = sum(x["customer_count"] for x in res)
    assert total_cust == 1250

def test_slow_moving_inventory():
    res = main.slow_moving()
    assert isinstance(res, list)
    assert len(res) >= 1
    # Product P004 (Lemon Tea) must be detected as dormant with 0 sales and 250 stock
    dormant = [p for p in res if p["product_id"] == "P004"]
    assert len(dormant) == 1
    assert dormant[0]["units_sold"] == 0
    assert dormant[0]["stock"] == 250
    assert dormant[0]["status"] == "DORMANT_ZERO_SALES"

def test_opportunities_and_candidate_offers():
    res = main.opportunities()
    assert isinstance(res, list)
    assert len(res) > 0
    opp = res[0]
    assert "title" in opp
    assert "evidence" in opp
    ev = opp["evidence"]
    assert "hours" in ev
    assert set(ev["hours"]) == {"14", "15", "16", "17"}
    assert ev["baseline_hourly_revenue"] > 0
    assert ev["recovery_gap"] > 0
    
    # Verify candidate offers generated for the opportunity (3-4 offers)
    candidates = ev["candidate_offers"]
    assert len(candidates) >= 3
    assert len(candidates) <= 4
    
    # Check ProfitGuard evaluation fields on each offer
    for cand in candidates:
        assert "offer_name" in cand
        assert "discount_pct" in cand
        assert "baseline_profit" in cand
        assert "projected_profit" in cand
        assert "net_profit_delta" in cand
        assert "is_profit_accretive" in cand
        assert "break_even_lift_pct" in cand

def test_profitguard_simulation():
    sim = main.profitguard("P001", 10.0)
    assert sim["product"] == "Tea"
    assert "baseline_revenue" in sim
    assert "baseline_profit" in sim
    assert "projected_revenue" in sim
    assert "projected_profit" in sim
    assert "net_profit_delta" in sim
    assert "assumption" in sim

def test_ai_recommendation_and_multilingual():
    rec = main.recommendation()
    assert "engine" in rec
    assert "recommendation" in rec
    assert "context" in rec
    assert "highest_profit_offer" in rec
    assert rec["highest_profit_offer"]["net_profit_delta"] > 0
    assert "expected_extra_profit" in rec
    
    # Multilingual & Voice support
    assert "multilingual" in rec
    multi = rec["multilingual"]
    assert "en" in multi
    assert "hi" in multi
    assert "kn" in multi  # Kannada
    assert "ta" in multi  # Tamil
    assert "te" in multi  # Telugu
    assert "soundbox_script" in multi
    
    # Voice audio prompt
    assert "voice" in rec
    assert "soundbox_text" in rec["voice"]

def test_alerts_and_popups():
    al = main.alerts()
    assert isinstance(al, list)
    assert len(al) >= 1
    assert "title" in al[0]
    assert "message" in al[0]
    assert "soundbox_text" in al[0]
    assert "cta_label" in al[0]
    
    popup = main.current_popup()
    assert popup["show_popup"] is True
    assert "title" in popup
    assert "primary_action" in popup

def test_offers_get_and_post():
    initial_offers = main.offers()
    assert isinstance(initial_offers, list)
    assert len(initial_offers) >= 2  # Seeded offers from offers.csv
    
    new_offer = {
        "offer_title": "Afternoon Chai & Samosa Combo",
        "offer_type": "bundle",
        "discount_pct": 15,
        "target_hours": ["14", "15", "16", "17"]
    }
    create_res = main.create_offer(new_offer)
    assert create_res["status"] == "accepted"
    assert create_res["offer"]["offer_title"] == "Afternoon Chai & Samosa Combo"
    
    updated_offers = main.offers()
    assert any(o.get("offer_title") == "Afternoon Chai & Samosa Combo" for o in updated_offers)

def test_network_intelligence():
    net = main.network()
    assert isinstance(net, list)
    assert len(net) == 10
    item = net[0]
    assert "location" in item
    assert "transactions" in item
    assert "revenue" in item

def test_n8n_health_and_mock_action():
    res = main.n8n_health()
    assert res["status"] == "ok"
    assert res["orchestration"] == "n8n-ready"
    
    action_payload = {
        "recommendation": "Activate Afternoon Chai Combo",
        "profitguard": {"projected_profit": 1500},
        "target_hours": ["14", "15", "16"]
    }
    action_res = main.mock_paytm_action(action_payload)
    assert action_res["status"] == "accepted"
    assert action_res["mode"] == "mock"
    assert action_res["action"] == action_payload

def test_ml_basket_inference_and_transaction_detail():
    # Direct inference test
    inf = main.infer_basket({"amount_inr": 30.0, "hour": 15, "day_of_week": 2})
    assert "predicted_basket" in inf
    assert "confidence" in inf
    assert inf["confidence"] > 0
    assert len(inf["items"]) > 0
    
    # Exact transaction check (TXN0000025 exists in merchant_orders)
    exact = main.transaction_detail("TXN0000025")
    assert exact["source"] == "exact_merchant_orders"
    assert exact["inferred"] is False
    assert exact["confidence"] == 1.0
    assert len(exact["items"]) == 2  # P003 + P005
    
    # Unreceipted UPI transaction check (TXN0001146 does NOT exist in merchant_orders)
    unmatched = main.transaction_detail("TXN0001146")
    assert unmatched["source"] == "random_forest_inference"
    assert unmatched["inferred"] is True
    assert unmatched["confidence"] > 0
    assert "predicted_basket" in unmatched
    assert len(unmatched["items"]) > 0

def test_basket_suggestions():
    res = main.basket_suggestions()
    assert "headline" in res
    assert "suggestions" in res
    assert len(res["suggestions"]) > 0
    assert "item_a" in res["suggestions"][0]
    assert "confidence" in res["suggestions"][0]

def test_products_attention():
    res = main.products_attention()
    assert isinstance(res, list)
    assert len(res) > 0
    assert "product_name" in res[0]
    assert "quantity" in res[0]

def test_suggested_offers():
    res = main.suggested_offers()
    assert isinstance(res, list)
    assert len(res) > 0
    assert "product_bundle" in res[0]
    assert "expected_extra_profit" in res[0]

def test_assistant_insights_multilingual():
    en = main.assistant_insights("en")
    assert len(en) >= 3
    assert "what_is_happening" in en[0]
    assert "why_it_matters" in en[0]
    assert "what_to_do" in en[0]
    assert "expected_extra_profit" in en[0]
    
    hi = main.assistant_insights("hi")
    assert len(hi) >= 3
    assert "बिक्री" in hi[0]["what_is_happening"]
    
    kn = main.assistant_insights("kn")
    assert len(kn) >= 3
    assert "ಮಾರಾಟ" in kn[0]["what_is_happening"]
