from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class HealthResponse(BaseModel):
    status: str = "ok"
    transactions: int
    orders: int
    products: int
    customers: int
    ml_model_status: str = "trained"
    source: str = "Paytm synthetic merchant demo dataset (paytm_merchant_demo_dataset.zip)"

class OverviewResponse(BaseModel):
    transactions: int
    revenue: float
    estimated_profit: float
    avg_line_amount: float
    margin_pct: Optional[float] = None

class HourlyItem(BaseModel):
    hour: str
    revenue: float
    transactions: int
    is_low: Optional[bool] = False

class ProductPerformance(BaseModel):
    product_id: str
    product_name: str
    category: Optional[str] = None
    selling_price: Optional[float] = None
    cost_price: Optional[float] = None
    stock: Optional[int] = None
    quantity: int
    revenue: float
    profit: Optional[float] = None
    margin_pct: Optional[float] = None

class CustomerSegmentSummary(BaseModel):
    segment: str
    customer_count: int
    total_spend: float
    avg_spend_per_customer: float
    avg_txns_per_customer: float

class SlowMovingProduct(BaseModel):
    product_id: str
    product_name: str
    category: str
    stock: int
    units_sold: int
    run_rate_per_day: float
    days_of_inventory: Optional[float] = None
    status: str
    merchant_advice: str

class OfferCandidate(BaseModel):
    offer_id: str
    offer_name: str
    offer_type: str
    target_product_id: Optional[str] = None
    target_product_name: Optional[str] = None
    discount_pct: float
    target_hours: List[str]
    expected_demand_lift_pct: float
    baseline_revenue: float
    projected_revenue: float
    baseline_profit: float
    projected_profit: float
    net_profit_delta: float
    is_profit_accretive: bool
    break_even_lift_pct: float
    description: str

class OpportunityEvidence(BaseModel):
    hours: List[str]
    hourly_revenue: List[float]
    baseline_hourly_revenue: float
    recovery_gap: Optional[float] = None
    candidate_offers: Optional[List[OfferCandidate]] = None

class OpportunityItem(BaseModel):
    title: str
    opportunity_type: str = "off_peak_traffic"
    evidence: OpportunityEvidence
    top_recommended_offer: Optional[OfferCandidate] = None

class ProfitGuardSimulation(BaseModel):
    product: str
    product_id: str
    discount_pct: float
    baseline_revenue: float
    baseline_profit: float
    projected_revenue: float
    projected_profit: float
    assumption: str
    net_profit_delta: Optional[float] = None
    is_profit_positive: Optional[bool] = None

class MultilingualVoice(BaseModel):
    en: str
    hi: str
    kn: str
    ta: str
    te: str
    soundbox_text: str

class ProactiveRecommendation(BaseModel):
    engine: str = "Paytm ProfitGuard™ Engine & scikit-learn Copilot"
    recommendation: str
    context: Dict[str, Any]
    why_it_matters: str
    expected_impact: str
    highest_profit_offer: Optional[OfferCandidate] = None
    multilingual: Optional[MultilingualVoice] = None
    voice: Optional[Dict[str, str]] = None

class AlertItem(BaseModel):
    id: str
    severity: str
    title: str
    message: str
    soundbox_text: str
    cta_label: str
    cta_action: str

class NetworkIntelligenceItem(BaseModel):
    location: str
    transactions: int
    revenue: float
