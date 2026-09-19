import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IndianRupee,
  TrendingUp,
  Receipt,
  ShoppingBag,
  Volume2,
  VolumeX,
  Plus,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import apiService from '../services/api';
import { useBackend } from '../context/BackendContext';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedInsights } from '../services/translations';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import OfflineState from '../components/common/OfflineState';

export default function Dashboard() {
  const navigate = useNavigate();
  const { isConnected, checkHealth, merchantName, merchant } = useBackend();
  const { t, language, speak, isSpeaking, stopSpeaking } = useLanguage();

  const [overview, setOverview] = useState(null);
  const [hourly, setHourly] = useState([]);
  const [products, setProducts] = useState([]);
  const [slowProducts, setSlowProducts] = useState([]);
  const [basketData, setBasketData] = useState(null);
  const [topInsight, setTopInsight] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [overviewData, hourlyData, productsData, slowData, basket, insights] =
        await Promise.all([
          apiService.getOverview(),
          apiService.getHourly(),
          apiService.getProducts(),
          apiService.getProductsAttention(),
          apiService.getBasketSuggestions(),
          apiService.getAssistantInsights(language),
        ]);

      setOverview(overviewData);
      setHourly(hourlyData);
      setProducts(productsData.slice(0, 5));
      setSlowProducts(slowData.slice(0, 5));
      setBasketData(basket);
      const localized = getLocalizedInsights(insights, language);
      if (localized && localized.length > 0) {
        setTopInsight(localized[0]);
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      setError(err.message || 'Error communicating with store data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [language]);

  if (loading) {
    return <LoadingSpinner message={t('loading')} size="lg" />;
  }

  if (error || !isConnected) {
    return (
      <OfflineState
        title={t('backendOffline')}
        message={error || 'Unable to connect to the store backend.'}
        onRetry={() => {
          checkHealth();
          fetchDashboardData();
        }}
      />
    );
  }

  // Identify slow hours (below 70% of average)
  const avgHourlyRevenue = hourly.length > 0
    ? hourly.reduce((sum, h) => sum + h.revenue, 0) / hourly.length
    : 0;

  const handleListenInsight = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else if (topInsight) {
      const speech =
        topInsight.speech_text ||
        `${topInsight.what_is_happening}. ${topInsight.what_to_do}. ${topInsight.expected_extra_profit_display}`;
      speak(speech, language);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. HERO: "What You Can Do Today" Action Card */}
      {topInsight && (
        <div className="bg-gradient-to-r from-[#002970] via-[#003896] to-[#002970] text-white rounded-2xl p-6 sm:p-7 shadow-elevated border border-blue-900 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-2.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#00b9f1]/25 text-[#00b9f1] border border-[#00b9f1]/40 text-xs sm:text-sm font-extrabold tracking-wide">
                  <Sparkles className="w-4 h-4" />
                  {t('whatYouCanDoToday')}
                </span>
                <span className="text-xs sm:text-sm font-black text-emerald-300 bg-emerald-950/70 px-3 py-1 rounded-full border border-emerald-400/40">
                  +{topInsight.expected_extra_profit_display || '₹180/day'}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-snug">
                {topInsight.title}
              </h3>

              <p className="text-sm sm:text-base text-blue-100 leading-relaxed font-medium">
                {topInsight.what_is_happening}{' '}
                <strong className="text-white font-bold">{topInsight.what_to_do}</strong>
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
              <button
                onClick={handleListenInsight}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-extrabold transition-all shadow-sm ${
                  isSpeaking
                    ? 'bg-rose-500 text-white animate-pulse hover:bg-rose-600'
                    : 'bg-white/15 hover:bg-white/25 text-white border border-white/25'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#00b9f1]" />}
                <span>{isSpeaking ? t('stopSpeaking') : t('listen')}</span>
              </button>

              <button
                onClick={() => navigate('/offers?action=create')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00b9f1] hover:bg-[#33c7f4] text-[#002970] rounded-xl text-sm font-extrabold transition-all shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>{t('createOffer')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. FOUR SIMPLE MERCHANT METRIC CARDS */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="text-base font-extrabold uppercase tracking-wider text-slate-600">
            {t('todaysBusiness')}
          </h3>
          <span className="text-sm text-slate-500 font-semibold">
            {merchantName} ({merchant?.merchant_id || 'Shop M001'})
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Sales Today */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card hover:border-slate-300 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm font-extrabold text-slate-600 uppercase tracking-wider">
                  {t('salesToday')}
                </p>
                <p className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 tracking-tight">
                  ₹{overview?.revenue ? Number(overview.revenue).toLocaleString('en-IN', { maximumFractionDigits: 0 }) : '0'}
                </p>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 font-semibold">{t('salesDesc')}</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-50 text-[#002970]">
                <IndianRupee className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Today's Profit */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card hover:border-slate-300 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm font-extrabold text-slate-600 uppercase tracking-wider">
                  {t('profitToday')}
                </p>
                <p className="text-3xl sm:text-4xl font-black text-emerald-700 mt-2 tracking-tight">
                  ₹{overview?.estimated_profit ? Number(overview.estimated_profit).toLocaleString('en-IN', { maximumFractionDigits: 0 }) : '0'}
                </p>
                <p className="text-xs sm:text-sm text-emerald-700 mt-1 font-bold">
                  {overview?.revenue && overview?.estimated_profit
                    ? `${((overview.estimated_profit / overview.revenue) * 100).toFixed(0)}% profit margin`
                    : t('profitDesc')}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Number of Payments */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card hover:border-slate-300 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm font-extrabold text-slate-600 uppercase tracking-wider">
                  {t('paymentsCount')}
                </p>
                <p className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 tracking-tight">
                  {overview?.transactions ? Number(overview.transactions).toLocaleString('en-IN') : '0'}
                </p>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 font-semibold">{t('paymentsDesc')}</p>
              </div>
              <div className="p-3 rounded-xl bg-purple-50 text-purple-700">
                <Receipt className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Average Bill */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card hover:border-slate-300 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm font-extrabold text-slate-600 uppercase tracking-wider">
                  {t('averageBill')}
                </p>
                <p className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 tracking-tight">
                  ₹{overview?.avg_line_amount ? Number(overview.avg_line_amount).toFixed(2) : '0'}
                </p>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 font-semibold">{t('averageBillDesc')}</p>
              </div>
              <div className="p-3 rounded-xl bg-sky-50 text-[#0083ca]">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SALES BY HOUR (Easy-to-Read Chart Highlighting Busy vs Slow Hours) */}
      <Card
        title={t('salesByHour')}
        subtitle={t('salesByHourSub')}
        action={
          <div className="flex items-center gap-3 text-xs sm:text-sm font-bold">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-md bg-[#002970]"></span>
              <span className="text-slate-800">{t('busyHours')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-md bg-[#f59e0b]"></span>
              <span className="text-amber-800 font-extrabold">{t('slowHours')}</span>
            </div>
          </div>
        }
      >
        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourly} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="hour"
                tickFormatter={(val) => `${Number(val)}:00`}
                tick={{ fontSize: 12, fill: '#475569', fontWeight: 600 }}
                axisLine={{ stroke: '#cbd5e1' }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#475569', fontWeight: 600 }}
                tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
                axisLine={{ stroke: '#cbd5e1' }}
              />
              <Tooltip
                formatter={(val) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Sales']}
                labelFormatter={(label) => `${label}:00`}
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#cbd5e1',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  fontSize: '13px',
                  fontWeight: 600,
                }}
              />
              <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                {hourly.map((entry, index) => {
                  const isSlow = entry.revenue < avgHourlyRevenue * 0.7;
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={isSlow ? '#f59e0b' : '#002970'}
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 p-3.5 bg-amber-50 rounded-xl border border-amber-200/80 flex items-start gap-2.5 text-xs sm:text-sm text-amber-950 font-medium">
          <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-extrabold">{t('slowHours')}: </span>
            <span>{t('slowHoursDetected')}</span>
          </div>
          <button
            onClick={() => navigate('/offers?action=create')}
            className="text-xs sm:text-sm font-black text-[#002970] underline hover:text-[#0083ca]"
          >
            {t('createOffer')} →
          </button>
        </div>
      </Card>

      {/* 4. DUAL COLUMN: Best-Selling Products vs Products That Need Attention */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Best-Selling Products */}
        <Card
          title={t('bestSellingProducts')}
          subtitle={t('bestSellingSub')}
          action={
            <button
              onClick={() => navigate('/products')}
              className="text-xs sm:text-sm font-extrabold text-[#002970] hover:text-[#0083ca] flex items-center gap-1"
            >
              See All <ArrowRight className="w-4 h-4" />
            </button>
          }
        >
          <div className="space-y-3">
            {products.map((p, idx) => (
              <div
                key={p.product_id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:border-slate-300 transition-colors"
              >
                <div className="min-w-0 flex-1 pr-3">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-[#002970] flex items-center justify-center text-xs font-black shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-sm font-extrabold text-slate-900 truncate" title={p.product_name}>
                      {p.product_name}
                    </p>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 pl-7 font-semibold">
                    {p.quantity?.toLocaleString('en-IN')} {t('units')} {t('sold')}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-sm font-black text-slate-900">
                    ₹{Number(p.revenue).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </p>
                  <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                    Top Seller
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right: Products That Need Attention (Slow Moving) */}
        <Card
          title={t('productsNeedingAttention')}
          subtitle={t('productsNeedingAttentionSub')}
          action={
            <button
              onClick={() => navigate('/copilot')}
              className="text-xs sm:text-sm font-extrabold text-[#002970] hover:text-[#0083ca] flex items-center gap-1"
            >
              Combo Ideas <ArrowRight className="w-4 h-4" />
            </button>
          }
        >
          <div className="space-y-3">
            {slowProducts.map((p, idx) => (
              <div
                key={p.product_id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80 hover:border-amber-300 transition-colors"
              >
                <div className="min-w-0 flex-1 pr-3">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center text-xs font-black shrink-0">
                      !
                    </span>
                    <p className="text-sm font-extrabold text-slate-900 truncate" title={p.product_name}>
                      {p.product_name}
                    </p>
                  </div>
                  <p className="text-xs text-amber-800 mt-1 pl-7 font-semibold">
                    Only {p.quantity} {t('units')} sold (₹{p.revenue} total)
                  </p>
                </div>

                <button
                  onClick={() =>
                    navigate(
                      `/offers?action=create&bundle=${encodeURIComponent(p.product_name)}`
                    )
                  }
                  className="px-3 py-1.5 bg-[#002970] hover:bg-[#00225c] text-white text-xs font-bold rounded-lg shrink-0 transition-colors shadow-sm"
                >
                  Bundle This
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 5. BASKET INFERENCE: "Likely Items in This Payment" */}
      {basketData && (
        <Card
          title={t('likelyItemsTitle')}
          subtitle={t('likelyItemsSub')}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {basketData.suggestions?.map((pair, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold text-[#002970] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                      {t('frequentlyBoughtTogether')}
                    </span>
                    <span className="text-xs font-black text-emerald-800">
                      {pair.confidence}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-black text-slate-900 my-2.5">
                    <span className="truncate">{pair.item_a}</span>
                    <span className="text-[#00b9f1] font-black">+</span>
                    <span className="truncate">{pair.item_b}</span>
                  </div>

                  <p className="text-xs text-slate-600 font-medium">
                    Customers bought this pair together {pair.pair_count} times in past sales.
                  </p>
                </div>

                <div className="mt-3.5 pt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-semibold italic">Estimated prediction</span>
                  <button
                    onClick={() =>
                      navigate(
                        `/offers?action=create&bundle=${encodeURIComponent(
                          `${pair.item_a} + ${pair.item_b}`
                        )}`
                      )
                    }
                    className="text-xs sm:text-sm font-extrabold text-[#002970] hover:underline"
                  >
                    Make a Combo →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-400 mt-4 text-center">
            {t('basketDisclaimer')}
          </p>
        </Card>
      )}
    </div>
  );
}
