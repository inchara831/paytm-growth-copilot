import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Clock,
  ShieldCheck,
  Tag,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  RefreshCw,
  BarChart2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import apiService from '../services/api';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import OfflineState from '../components/common/OfflineState';

export default function Opportunities() {
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOpportunities = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getOpportunities();
      setOpportunities(data);
    } catch (err) {
      console.error('Failed to load opportunities:', err);
      setError(err.message || 'Error fetching opportunities from backend');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Scanning store analytics for growth opportunities..." size="lg" />;
  }

  if (error) {
    return (
      <OfflineState
        title="Failed to Load Opportunities"
        message={error}
        onRetry={fetchOpportunities}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Active Algorithm Scan
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Detected Growth Opportunities
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Deterministic anomaly and pattern analysis derived from transaction records.
          </p>
        </div>

        <button
          onClick={fetchOpportunities}
          className="inline-flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors self-start md:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh Scan
        </button>
      </div>

      {/* Opportunities List */}
      <div className="space-y-6">
        {opportunities.map((opp, idx) => {
          const evidence = opp.evidence || {};
          const hours = evidence.hours || [];
          const hourlyRevenue = evidence.hourly_revenue || [];
          const baseline = evidence.baseline_hourly_revenue || 0;

          // Chart data mapping
          const chartData = hours.map((h, i) => ({
            hour: `${h}:00`,
            revenue: hourlyRevenue[i] || 0,
            gap: Math.max(0, baseline - (hourlyRevenue[i] || 0)),
          }));

          const totalLowRevenue = hourlyRevenue.reduce((a, b) => a + b, 0);
          const potentialAtBaseline = baseline * hours.length;
          const totalGap = Math.max(0, potentialAtBaseline - totalLowRevenue);

          return (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 shadow-card overflow-hidden"
            >
              {/* Opportunity Title & Badges */}
              <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#002970] flex items-center justify-center shrink-0 border border-blue-100">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="primary">Traffic Optimization</Badge>
                      <span className="text-xs text-slate-400 font-medium">
                        Algorithm Confidence: High
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{opp.title}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate('/profitguard')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#002970]" />
                    Simulate
                  </button>
                  <button
                    onClick={() => navigate('/offers?action=create')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#002970] text-white text-xs font-semibold rounded-lg hover:bg-[#00225c] transition-colors shadow-sm"
                  >
                    <Tag className="w-4 h-4 text-[#00b9f1]" />
                    Create Offer
                  </button>
                </div>
              </div>

              {/* Detail Content */}
              <div className="p-6 space-y-6">
                {/* 3 Metrics Callouts */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Target Low Hours
                    </span>
                    <p className="text-xl font-bold text-slate-800 mt-1">
                      {hours.length} Time Slots
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {hours.map((h) => `${h}:00`).join(', ')}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Store Baseline Average
                    </span>
                    <p className="text-xl font-bold text-slate-800 mt-1">
                      ₹{Number(baseline).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">Per operating hour</p>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                      Simulated Recovery Gap
                    </span>
                    <p className="text-xl font-bold text-emerald-800 mt-1">
                      ₹{Number(totalGap).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-emerald-600 mt-0.5">
                      Potential upside if brought to baseline
                    </p>
                  </div>
                </div>

                {/* Chart: Flagged Hours vs Baseline */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Identified Low-Sales Hours vs Store Baseline
                    </h4>
                    <span className="text-xs text-slate-500">
                      Threshold: Revenue &lt; 70% of baseline average
                    </span>
                  </div>

                  <div className="h-64 w-full bg-slate-50/50 rounded-xl p-4 border border-slate-200">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 15, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                        <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#64748b' }} />
                        <YAxis
                          tick={{ fontSize: 11, fill: '#64748b' }}
                          tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                          formatter={(val) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Hourly Revenue']}
                          contentStyle={{
                            backgroundColor: '#ffffff',
                            borderColor: '#cbd5e1',
                            borderRadius: '8px',
                            fontSize: '12px',
                          }}
                        />
                        <ReferenceLine
                          y={baseline}
                          stroke="#ef4444"
                          strokeDasharray="4 4"
                          label={{
                            value: `Baseline ₹${(baseline / 1000).toFixed(0)}k`,
                            fill: '#ef4444',
                            fontSize: 10,
                            position: 'top',
                          }}
                        />
                        <Bar dataKey="revenue" fill="#002970" radius={[4, 4, 0, 0]} name="Actual Revenue" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Actionable Explanation Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
                  <div className="p-4 rounded-xl border border-slate-200 bg-white">
                    <h5 className="font-bold text-slate-800 mb-1">What Was Detected</h5>
                    <p className="text-slate-600 leading-relaxed">
                      The analytics engine processed all transaction timestamps and found that sales during {hours.map(h => `${h}:00`).join(', ')} fall below 70% of the overall hourly average (₹{Number(baseline).toLocaleString('en-IN')}).
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-white">
                    <h5 className="font-bold text-slate-800 mb-1">Recommended Next Action</h5>
                    <p className="text-slate-600 leading-relaxed">
                      Deploy targeted discounts during off-peak hours to lift footfall and basket sizes without eroding peak margins. Always test discounts with <strong>ProfitGuard</strong> first to confirm positive net profit lift.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {opportunities.length === 0 && (
          <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
            <p className="text-slate-500 text-sm">No active opportunities detected currently.</p>
          </div>
        )}
      </div>
    </div>
  );
}
