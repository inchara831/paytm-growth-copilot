import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import pytest
from backend.app import main

def test_health():
    res = main.health()
    assert res['status'] == 'ok'
    assert 'transactions' in res
    assert 'source' in res

def test_overview():
    res = main.overview()
    assert 'transactions' in res
    assert 'revenue' in res
    assert 'estimated_profit' in res
    assert 'avg_line_amount' in res
    assert res['transactions'] > 0
    assert res['revenue'] > 0

def test_hourly():
    res = main.hourly()
    assert isinstance(res, list)
    assert len(res) > 0
    item = res[0]
    assert 'hour' in item
    assert 'revenue' in item
    assert 'transactions' in item

def test_products():
    res = main.products()
    assert isinstance(res, list)
    assert len(res) > 0
    item = res[0]
    assert 'product_id' in item
    assert 'product_name' in item
    assert 'quantity' in item
    assert 'revenue' in item

def test_opportunities():
    res = main.opportunities()
    assert isinstance(res, list)
    assert len(res) > 0
    assert 'title' in res[0]
    assert 'evidence' in res[0]

def test_profitguard_simulation():
    prods = main.products()
    pid = prods[0]['product_id']
    sim = main.profitguard(pid, 10.0)
    assert 'product' in sim
    assert 'baseline_revenue' in sim
    assert 'baseline_profit' in sim
    assert 'projected_revenue' in sim
    assert 'projected_profit' in sim
    assert 'assumption' in sim

def test_ai_recommendation():
    rec = main.recommendation()
    assert 'engine' in rec
    assert 'recommendation' in rec
    assert 'context' in rec

def test_offers_get_and_post():
    initial_offers = main.offers()
    assert isinstance(initial_offers, list)
    assert len(initial_offers) >= 1
    
    # Test POST
    new_offer = {
        'offer_title': 'Weekend Happy Hour',
        'offer_type': 'discount',
        'discount_pct': 15,
        'target_hours': ['18', '19', '20']
    }
    create_res = main.create_offer(new_offer)
    assert create_res['status'] == 'accepted'
    assert create_res['offer']['offer_title'] == 'Weekend Happy Hour'
    
    updated_offers = main.offers()
    assert any(o.get('offer_title') == 'Weekend Happy Hour' for o in updated_offers)

def test_network_intelligence():
    net = main.network()
    assert isinstance(net, list)
    assert len(net) > 0
    assert 'location' in net[0]
    assert 'transactions' in net[0]
    assert 'revenue' in net[0]

def test_n8n_health():
    res = main.n8n_health()
    assert res['status'] == 'ok'
    assert res['orchestration'] == 'n8n-ready'
