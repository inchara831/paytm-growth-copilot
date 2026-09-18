import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  ShieldCheck,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Sliders,
  Sparkles,
  ArrowRight,
  Info,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import apiService from '../services/api';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Alert from '../components/common/Alert';
import LoadingSpinner from '../components/common/LoadingSpinner';
import OfflineState from '../components/common/OfflineState';

export default function ProfitGuard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialProductId = searchParams.get('product_id') || '';

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(initialProductId);
  const [discountPct, setDiscountPct] = useState(10);
  const [simulation, setSimulation] = useState(null);

  const [loadingProducts, setLoadingProducts] = useState(true);
  const [simulating, setSimulating] = useState(false);
  const [error, setError] = useState(null);

  // Load products list for dropdown
  useEffect(() => {
    async function loadProducts() {
      try {
        const prodList = await apiService.getProducts();
        setProducts(prodList);
        if (!selectedProduct && prodList.length > 0) {
          const defaultPid = prodList[0].product_id;
          setSelectedProduct(defaultPid);
          runSimulation(defaultPid, discountPct);
        } else if (selectedProduct) {
          runSimulation(selectedProduct, discountPct);
        }
      } catch (err) {
        console.error('Failed to load products for ProfitGuard:', err);
        setError(err.message || 'Failed to fetch products catalog');
      } finally {
        setLoadingProducts(false);
      }
    }
    loadProducts();
  }, []);

  const runSimulation = async (productId, discount) => {
    if (!productId) return;
    setSimulating(true);
    setError(null);
    try {
      const result = await apiService.simulateProfitGuard(productId, discount);
      setSimulation(result);
    } catch (err) {
      console.error('ProfitGuard simulation error:', err);
      setError(err.response?.data?.detail || err.message || 'Simulation failed');
    } finally {
      setSimulating(false);
    }
  };

  const handleProductChange = (e) => {
    const newPid = e.target.value;
    setSelectedProduct(newPid);
    setSearchParams({ product_id: newPid });
    runSimulation(newPid, discountPct);
  };

  const handleDiscountChange = (newDiscount) => {
    setDiscountPct(newDiscount);
    if (selectedProduct) {
      runSimulation(selectedProduct, newDiscount);
    }
  };

  if (loadingProducts) {
    return <LoadingSpinner message="Loading catalog for ProfitGuard simulation..." size="lg" />;
  }

  if (error && !simulation) {
    return (
      <OfflineState
        title="ProfitGuard Simulation Error"
        message={error}
        onRetry={() => {
          if (selectedProduct) runSimulation(selectedProduct, discountPct);
        }}
      />
    );
  }

  // Sizing and differences from actual backend data
  const revDiff = simulation
    ? simulation.projected_revenue - simulation.baseline_revenue
    : 0;
  const profitDiff = simulation
    ? simulation.projected_profit - simulation.baseline_profit
    : 0;
  const isProfitPositive = profitDiff >= 0;

  const baselineMargin = simulation && simulation.baseline_revenue
    ? ((simulation.baseline_profit / simulation.baseline_revenue) * 100).toFixed(1)
    : 0;
  const projectedMargin = simulation && simulation.projected_revenue
    ? ((simulation.projected_profit / simulation.projected_revenue) * 100).toFixed(1)
    : 0;

  const chartData = simulation
    ? [
        {
          metric: 'Revenue',
          Baseline: simulation.baseline_revenue,
          Projected: simulation.projected_revenue,
        },
        {
          metric: 'Profit',
          Baseline: simulation.baseline_profit,
          Projected: simulation.projected_profit,
        },
      ]
    : [];

  return (
    <div className="space-y-6">
      {/* Top Banner explaining ProfitGuard purpose */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#e6f7fc] text-[#0083ca]">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#002970]">
              Paytm ProfitGuard™ Engine
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Margin Preservation & Promotion Simulator
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Never sacrifice net profit for gross GMV. ProfitGuard calculates the exact trade-off between discount-driven demand lift and unit margin degradation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant={isProfitPositive ? 'success' : 'danger'} size="lg">
            {isProfitPositive ? 'Profit Accretive' : 'Profit Dilution Risk'}
          </Badge>
        </div>
      </div>

      {/* Simulator Controls & Product Select */}
      <Card title="Simulation Parameters" subtitle="Configure product and discount depth to evaluate unit economics">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Select */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Product from Catalog:
            </label>
            <select
              value={selectedProduct}
              onChange={handleProductChange}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-1 focus:ring-[#002970] focus:border-[#002970] focus:bg-white"
            >
              {products.map((p) => (
                <option key={p.product_id} value={p.product_id}>
                  {p.product_name} (ID: {p.product_id} • Revenue: ₹{Number(p.revenue).toLocaleString('en-IN')})
                </option>
              ))}
            </select>
          </div>

          {/* Discount Percentage Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Discount Depth:
              </label>
              <span className="text-sm font-bold text-[#002970] px-2 py-0.5 bg-blue-50 border border-blue-200 rounded">
                {discountPct}% OFF
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={discountPct}
              onChange={(e) => handleDiscountChange(Number(e.target.value))}
              className="w-full accent-[#002970] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>1% (Light promo)</span>
              <span>10% (Standard)</span>
              <span>25% (Aggressive)</span>
              <span>40% (Clearance)</span>
            </div>
          </div>
        </div>

        {/* Quick Discount Presets */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Quick Presets:</span>
          {[5, 10, 15, 20, 25].map((pct) => (
            <button
              key={pct}
              onClick={() => handleDiscountChange(pct)}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                discountPct === pct
                  ? 'bg-[#002970] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {pct}%
            </button>
          ))}
        </div>
      </Card>

      {/* Simulation Results (Side-by-Side Comparison) */}
      {simulation && (
        <div className="space-y-6">
          {/* Verdict Banner */}
          {!isProfitPositive ? (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-rose-900">
                  ProfitGuard Warning: Discount Causes Net Profit Erosion
                </h4>
                <p className="text-xs text-rose-700 mt-1 leading-relaxed">
                  Even with a 10% simulated demand lift, giving a {discountPct}% discount reduces net profit by{' '}
                  <strong className="underline">
                    ₹{Math.abs(profitDiff).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </strong>{' '}
                  (from ₹{simulation.baseline_profit.toLocaleString('en-IN')} to ₹{simulation.projected_profit.toLocaleString('en-IN')}).
                  ProfitGuard advises reducing discount depth or bundling instead of direct price slashing.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-emerald-900">
                  ProfitGuard Verified: Profit Accretive Strategy
                </h4>
                <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
                  This promo structure increases gross profit by{' '}
                  <strong>₹{profitDiff.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</strong>{' '}
                  under the 10% demand elasticity assumption. Safe to execute.
                </p>
              </div>
            </div>
          )}

          {/* Comparison Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Baseline Scenario Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Scenario 1</span>
                  <h3 className="text-base font-bold text-slate-800">Current Baseline</h3>
                </div>
                <Badge variant="neutral">No Discount (0%)</Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-500">Historical Gross Revenue</p>
                  <p className="text-2xl font-bold text-slate-900 mt-0.5">
                    ₹{simulation.baseline_revenue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <p className="text-xs text-slate-500">Historical Gross Profit</p>
                  <p className="text-2xl font-bold text-slate-900 mt-0.5">
                    ₹{simulation.baseline_profit.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                  <span className="text-slate-500">Gross Profit Margin:</span>
                  <span className="font-bold text-slate-800">{baselineMargin}%</span>
                </div>
              </div>
            </div>

            {/* Projected Scenario Card */}
            <div className={`rounded-xl border p-6 shadow-card ${
              isProfitPositive ? 'bg-white border-emerald-300' : 'bg-white border-rose-300'
            }`}>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#002970]">Scenario 2</span>
                  <h3 className="text-base font-bold text-slate-800">Projected with {discountPct}% OFF</h3>
                </div>
                <Badge variant={isProfitPositive ? 'success' : 'danger'}>
                  10% Demand Lift
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500">Projected Revenue</p>
                    <span className={`text-xs font-bold ${revDiff >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {revDiff >= 0 ? '+' : ''}₹{revDiff.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 mt-0.5">
                    ₹{simulation.projected_revenue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500">Projected Net Profit</p>
                    <span className={`text-xs font-bold ${isProfitPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {isProfitPositive ? '+' : ''}₹{profitDiff.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <p className={`text-2xl font-bold mt-0.5 ${isProfitPositive ? 'text-emerald-700' : 'text-rose-600'}`}>
                    ₹{simulation.projected_profit.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                  <span className="text-slate-500">Projected Profit Margin:</span>
                  <span className={`font-bold ${projectedMargin >= baselineMargin ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {projectedMargin}% ({((projectedMargin - baselineMargin) > 0 ? '+' : '')}{(projectedMargin - baselineMargin).toFixed(1)} pp)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Bar Comparison Chart */}
          <Card
            title="Visual Scenario Breakdown"
            subtitle={`Comparing Baseline vs Projected outcomes for ${simulation.product}`}
          >
            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 15, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="metric" tick={{ fontSize: 12, fill: '#475569' }} />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    formatter={(val) => [`₹${Number(val).toLocaleString('en-IN')}`, '']}
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderColor: '#e2e8f0',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="Baseline" fill="#002970" radius={[4, 4, 0, 0]} />
                  <Bar
                    dataKey="Projected"
                    fill={isProfitPositive ? '#10b981' : '#f43f5e'}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Backend Assumption Footnote */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <Info className="w-4 h-4 text-slate-400 shrink-0" />
              <span>
                <strong className="text-slate-700">Backend Model Assumption:</strong> {simulation.assumption}
              </span>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
