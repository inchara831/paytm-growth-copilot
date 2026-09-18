import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IndianRupee,
  TrendingUp,
  Receipt,
  ShoppingBag,
  Percent,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from 'recharts';
import apiService from '../services/api';
import { useBackend } from '../context/BackendContext';
import MetricCard from '../components/common/MetricCard';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import OfflineState from '../components/common/OfflineState';
import NextBestAction from '../components/NextBestAction';

export default function Dashboard() {
  const navigate = useNavigate();
  const { isConnected, checkHealth } = useBackend();

  const [overview, setOverview] = useState(null);
  const [hourly, setHourly] = useState([]);
  const [products, setProducts] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [recommendation, setRecommendation] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [overviewData, hourlyData, productsData, oppsData, recData] = await Promise.all([
        apiService.getOverview(),
        apiService.getHourly(),
        apiService.getProducts(),
        apiService.getOpportunities(),
        apiService.getRecommendation(),
      ]);
      setOverview(overviewData);
      setHourly(hourlyData);
      setProducts(productsData.slice(0, 5));
      setOpportunities(oppsData);
      setRecommendation(recData);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      setError(err.message || 'Error communicating with backend');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Fetching live merchant metrics..." size="lg" />;
  }

  if (error || !isConnected) {
    return (
      <OfflineState
        title="Backend Offline or Unavailable"
        message={error || 'The dashboard requires a connection to the FastAPI backend.'}
        onRetry={() => {
          checkHealth();
          fetchDashboardData();
        }}
      />
    );
  }

  const profitMargin = overview?.revenue && overview?.estimated_profit
    ? ((overview.estimated_profit / overview.revenue) * 100).toFixed(1)
    : 0;

  return (
    <div className="space-y-6">
      {/* Next Best Action Proactive Banner */}
      {recommendation && <NextBestAction recommendationData={recommendation} />}

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Revenue"
          value={`₹${overview?.revenue ? Number(overview.revenue).toLocaleString('en-IN', { maximumFractionDigits: 2 }) : '0'}`}
          subvalue="Gross processed sales"
          icon={IndianRupee}
          color="blue"
          badgeText="Verified"
        />
        <MetricCard
          title="Estimated Profit"
          value={`₹${overview?.estimated_profit ? Number(overview.estimated_profit).toLocaleString('en-IN', { maximumFractionDigits: 2 }) : '0'}`}
          subvalue={`${profitMargin}% margin on sales`}
          icon={TrendingUp}
          color="emerald"
          badgeText={`${profitMargin}% margin`}
        />
        <MetricCard
          title="Transactions"
          value={overview?.transactions ? Number(overview.transactions).toLocaleString('en-IN') : '0'}
          subvalue="Total verified line items"
          icon={Receipt}
          color="purple"
        />
        <MetricCard
          title="Avg Line Amount"
          value={`₹${overview?.avg_line_amount ? Number(overview.avg_line_amount).toFixed(2) : '0'}`}
          subvalue="Per transaction item"
          icon={ShoppingBag}
          color="sky"
        />
      </div>

      {/* Main Charts Row: Hourly Performance & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hourly Performance Chart (2 cols) */}
        <div className="lg:col-span-2">
          <Card
            title="Hourly Sales Distribution"
            subtitle="Hourly transaction revenue and volume across operating hours"
            action={
              <button
                onClick={() => navigate('/opportunities')}
                className="text-xs font-semibold text-[#002970] hover:text-[#00b9f1] flex items-center gap-1 transition-colors"
              >
                Inspect Low Hours <ArrowRight className="w-3.5 h-3.5" />
              </button>
            }
          >
            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourly} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#002970" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#002970" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="hour"
                    tickFormatter={(val) => `${val}:00`}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <Tooltip
                    formatter={(value, name) => [
                      name === 'revenue' ? `₹${Number(value).toLocaleString('en-IN')}` : value,
                      name === 'revenue' ? 'Revenue' : 'Transactions',
                    ]}
                    labelFormatter={(label) => `Hour ${label}:00`}
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderColor: '#e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#002970"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRev)"
                    name="revenue"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#002970]"></span>
                <span>Revenue (Hourly aggregation)</span>
              </div>
              <span>Total {hourly.length} active time intervals</span>
            </div>
          </Card>
        </div>

        {/* Top Products Quick View (1 col) */}
        <div>
          <Card
            title="Top Products by Revenue"
            subtitle="Top revenue contributors"
            action={
              <button
                onClick={() => navigate('/products')}
                className="text-xs font-semibold text-[#002970] hover:text-[#00b9f1] flex items-center gap-1 transition-colors"
              >
                View Catalog <ArrowRight className="w-3.5 h-3.5" />
              </button>
            }
          >
            <div className="space-y-3">
              {products.map((p, idx) => (
                <div
                  key={p.product_id}
                  className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors"
                >
                  <div className="min-w-0 flex-1 pr-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-400">#{idx + 1}</span>
                      <p className="text-xs font-semibold text-slate-800 truncate" title={p.product_name}>
                        {p.product_name}
                      </p>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      ID: {p.product_id} • {p.quantity?.toLocaleString?.() || 0} units
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold text-slate-900">
                      ₹{Number(p.revenue).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </p>
                    <button
                      onClick={() => navigate(`/profitguard?product_id=${encodeURIComponent(p.product_id)}`)}
                      className="text-[10px] text-[#0083ca] hover:underline font-medium"
                    >
                      Simulate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Today's Growth Opportunities Section */}
      <Card
        title="Today's Growth Opportunities"
        subtitle="Detected from operational transaction logs"
        action={
          <button
            onClick={() => navigate('/opportunities')}
            className="text-xs font-semibold text-[#002970] hover:text-[#00b9f1] flex items-center gap-1"
          >
            All Opportunities <ArrowRight className="w-3.5 h-3.5" />
          </button>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {opportunities.map((opp, i) => {
            const hours = opp.evidence?.hours || [];
            const baseline = opp.evidence?.baseline_hourly_revenue || 0;
            return (
              <div
                key={i}
                className="p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="primary" size="md">
                      Off-Peak Optimization
                    </Badge>
                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {hours.length} flagged hours
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-800 mb-1.5">{opp.title}</h4>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    <strong className="text-slate-700">Detected:</strong> Hourly sales dip below 70% of store baseline in hours:{' '}
                    <span className="font-semibold text-slate-800">
                      {hours.map((h) => `${h}:00`).join(', ')}
                    </span>.
                  </p>

                  <div className="bg-slate-50 rounded-lg p-3 text-xs border border-slate-200/80 mb-4 space-y-1">
                    <div className="flex justify-between text-slate-600">
                      <span>Baseline hourly revenue:</span>
                      <span className="font-bold text-slate-800">
                        ₹{Number(baseline).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Why it matters:</span>
                      <span className="text-slate-700">Fixed overheads continue during low-revenue hours</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => navigate('/profitguard')}
                    className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-[#002970] text-xs font-semibold rounded-lg text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#002970]" />
                    Simulate ProfitGuard
                  </button>
                  <button
                    onClick={() => navigate('/offers?action=create')}
                    className="flex-1 py-2 px-3 bg-[#002970] hover:bg-[#00225c] text-white text-xs font-semibold rounded-lg text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    Create Offer
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
