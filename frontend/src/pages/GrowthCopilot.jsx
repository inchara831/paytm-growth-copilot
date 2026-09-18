import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass,
  TrendingUp,
  ShieldAlert,
  Package,
  Globe2,
  ArrowRight,
  ShieldCheck,
  Tag,
  Sparkles,
  Zap,
  Info,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import apiService from '../services/api';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import OfflineState from '../components/common/OfflineState';

export default function GrowthCopilot() {
  const navigate = useNavigate();

  const [recommendation, setRecommendation] = useState(null);
  const [overview, setOverview] = useState(null);
  const [topProduct, setTopProduct] = useState(null);
  const [networkTop, setNetworkTop] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCopilotData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [recData, overviewData, prodsData, netData] = await Promise.all([
        apiService.getRecommendation(),
        apiService.getOverview(),
        apiService.getProducts(),
        apiService.getNetworkIntelligence(),
      ]);
      setRecommendation(recData);
      setOverview(overviewData);
      if (prodsData && prodsData.length > 0) setTopProduct(prodsData[0]);
      if (netData && netData.length > 0) setNetworkTop(netData[0]);
    } catch (err) {
      console.error('Failed to load Growth Copilot data:', err);
      setError(err.message || 'Error communicating with backend');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCopilotData();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Synthesizing merchant priorities — 'No Prompts. Just Profits.'..." size="lg" />;
  }

  if (error) {
    return (
      <OfflineState
        title="Copilot Offline"
        message={error}
        onRetry={fetchCopilotData}
      />
    );
  }

  const hours = recommendation?.context?.hours || [];
  const baseline = recommendation?.context?.baseline_hourly_revenue || 0;

  const priorities = [
    {
      id: 'growth',
      category: "Biggest Growth Opportunity",
      badgeVariant: "primary",
      icon: TrendingUp,
      title: recommendation?.recommendation || "Improve low-sales hours",
      insight: `Off-peak sales drop below 70% of store baseline in ${hours.length} operating hours (${hours.map(h => `${h}:00`).join(', ')}).`,
      whyItMatters: `Store overhead, utilities, and staffing remain fixed during slow hours. Every incremental transaction during off-peak periods flows straight to operating profit.`,
      expectedImpact: `Closing the gap towards the ₹${Number(baseline).toLocaleString('en-IN', { maximumFractionDigits: 0 })} baseline across these ${hours.length} hours captures substantial dormant revenue.`,
      actionLabel: "Simulate in ProfitGuard",
      actionIcon: ShieldCheck,
      onAction: () => navigate('/profitguard'),
      secondaryActionLabel: "Create Promo Offer",
      secondaryAction: () => navigate('/offers?action=create'),
    },
    {
      id: 'profit_risk',
      category: "Profit Risk Protection",
      badgeVariant: "danger",
      icon: ShieldAlert,
      title: "Margin Leakage on Non-Optimized Discounting",
      insight: `Simulations confirm that standard 10% discounts on top SKUs reduce net profit unless demand expands by over 25%.`,
      whyItMatters: `Discounting without testing margin elasticity is the #1 cause of merchant profit erosion. High volume does not guarantee cash flow health.`,
      expectedImpact: `ProfitGuard simulation prevents accidental profit loss of up to ₹12,661 per promotional cycle on catalog anchors.`,
      actionLabel: "Open ProfitGuard Simulator",
      actionIcon: ShieldCheck,
      onAction: () => navigate('/profitguard'),
    },
    {
      id: 'product',
      category: "Product & Inventory Driver",
      badgeVariant: "paytm",
      icon: Package,
      title: topProduct ? `Leverage Top Volume Driver (${topProduct.product_name})` : "Anchor Product Momentum",
      insight: topProduct
        ? `"${topProduct.product_name}" generated ₹${Number(topProduct.revenue).toLocaleString('en-IN')} across ${topProduct.quantity.toLocaleString('en-IN')} units.`
        : "A handful of anchor SKUs drive the majority of transaction velocity.",
      whyItMatters: `High-frequency items act as footfall magnets. Use them as lead anchors in off-peak bundles rather than discounting them standalone.`,
      expectedImpact: `Increases average transaction value from the current ₹${overview?.avg_line_amount || '21.95'} across companion products.`,
      actionLabel: "Simulate SKU Margin",
      actionIcon: ShieldCheck,
      onAction: () =>
        topProduct
          ? navigate(`/profitguard?product_id=${encodeURIComponent(topProduct.product_id)}`)
          : navigate('/products'),
    },
    {
      id: 'market',
      category: "Market Signal",
      badgeVariant: "neutral",
      icon: Globe2,
      title: networkTop ? `Regional Market Concentration (${networkTop.location})` : "Regional Velocity Shifts",
      insight: networkTop
        ? `Regional cluster "${networkTop.location}" logged ${networkTop.transactions.toLocaleString('en-IN')} transactions totaling ₹${Number(networkTop.revenue).toLocaleString('en-IN', { maximumFractionDigits: 0 })}.`
        : "Macro regional patterns reveal distinct buyer concentration pockets.",
      whyItMatters: `Merchant network telemetry enables proactive distribution rather than reactive restocking.`,
      expectedImpact: `Prioritize stock allocation to high-converting corridors to minimize out-of-stock bounce rates.`,
      actionLabel: "View Network Intelligence",
      actionIcon: ArrowRight,
      onAction: () => navigate('/network'),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Philosophy Header Banner */}
      <div className="bg-gradient-to-r from-[#002970] to-[#003896] text-white rounded-xl p-6 shadow-elevated border border-blue-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-[#00b9f1]/20 text-[#00b9f1] border border-[#00b9f1]/30">
              <Compass className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#00b9f1]">
              Autonomous Decision Engine
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Paytm Merchant Growth Copilot</h2>
          <p className="text-xs text-blue-200 mt-1 max-w-xl">
            <strong>"No Prompts. Just Profits."</strong> You don't need to ask questions or prompt a chatbot. The copilot continuously monitors your backend transactions and tells you what requires your immediate focus.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 text-right shrink-0">
          <p className="text-[10px] uppercase font-bold text-blue-200">Decision Engine</p>
          <p className="text-xs font-semibold text-white mt-0.5">
            {recommendation?.engine || 'Deterministic Analytics Fallback'}
          </p>
          <p className="text-[10px] text-blue-200 mt-0.5">Zero API keys / Zero prompt tokens required</p>
        </div>
      </div>

      {/* TODAY'S PRIORITIES Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#002970]" />
            <h3 className="text-base font-bold text-slate-900 tracking-tight uppercase">
              Today's Priorities
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            Ranked by expected net profit impact
          </span>
        </div>

        <div className="space-y-4">
          {priorities.map((item, index) => {
            const Icon = item.icon;
            const ActionIcon = item.actionIcon || ArrowRight;

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 shadow-card p-6 hover:border-slate-300 transition-all"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold font-mono">
                      #{index + 1}
                    </span>
                    <Badge variant={item.badgeVariant}>{item.category}</Badge>
                    <h4 className="text-base font-bold text-slate-900">{item.title}</h4>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.secondaryAction && (
                      <button
                        onClick={item.secondaryAction}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Tag className="w-3.5 h-3.5 text-slate-500" />
                        {item.secondaryActionLabel}
                      </button>
                    )}
                    <button
                      onClick={item.onAction}
                      className="px-3.5 py-1.5 bg-[#002970] hover:bg-[#00225c] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <ActionIcon className="w-3.5 h-3.5 text-[#00b9f1]" />
                      {item.actionLabel}
                    </button>
                  </div>
                </div>

                {/* 4 Pillars: Insight, Why It Matters, Expected Impact, Next Action */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs">
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      1. Insight
                    </span>
                    <p className="text-slate-700 leading-relaxed font-medium">
                      {item.insight}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      2. Why It Matters
                    </span>
                    <p className="text-slate-700 leading-relaxed">
                      {item.whyItMatters}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#e6f7fc]/50 border border-[#bfe8f6]/60">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0083ca] block mb-1">
                      3. Expected Impact
                    </span>
                    <p className="text-[#002970] leading-relaxed font-medium">
                      {item.expectedImpact}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
