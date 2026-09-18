import React, { useState, useEffect } from 'react';
import {
  Globe2,
  Building2,
  TrendingUp,
  Receipt,
  IndianRupee,
  ShieldCheck,
  RefreshCw,
  Info,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import apiService from '../services/api';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import OfflineState from '../components/common/OfflineState';

export default function NetworkIntelligence() {
  const [networkData, setNetworkData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNetworkData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getNetworkIntelligence();
      setNetworkData(data);
    } catch (err) {
      console.error('Failed to load network intelligence:', err);
      setError(err.message || 'Failed to fetch network data from backend');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNetworkData();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Aggregating network market intelligence..." size="lg" />;
  }

  if (error) {
    return (
      <OfflineState
        title="Failed to Load Network Intelligence"
        message={error}
        onRetry={fetchNetworkData}
      />
    );
  }

  const totalNetworkRevenue = networkData.reduce((acc, row) => acc + (row.revenue || 0), 0);
  const totalNetworkTransactions = networkData.reduce((acc, row) => acc + (row.transactions || 0), 0);
  const topLocation = networkData[0] || null;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-blue-50 text-[#002970]">
              <Globe2 className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Aggregated Network Insights
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Merchant Network Intelligence
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Privacy-preserving, aggregated macro-signals across regional merchant clusters returned by the network intelligence endpoint. Individual store identities remain confidential.
          </p>
        </div>

        <button
          onClick={fetchNetworkData}
          className="inline-flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors self-start md:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>

      {/* Summary KPI Cards from API */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Network Clusters Tracked
          </p>
          <p className="text-2xl font-bold text-slate-900 mt-2">
            {networkData.length} Regions
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Top market locations in dataset
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Aggregated Network Volume
          </p>
          <p className="text-2xl font-bold text-slate-900 mt-2">
            {totalNetworkTransactions.toLocaleString('en-IN')}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Total transactions reported across locations
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Primary Volume Hub
          </p>
          <p className="text-2xl font-bold text-[#002970] mt-2">
            {topLocation ? topLocation.location : 'N/A'}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {topLocation ? `${topLocation.transactions.toLocaleString('en-IN')} transactions` : ''}
          </p>
        </div>
      </div>

      {/* Dual Column Strategic Takeaways */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 1: What's happening around your market? */}
        <Card
          title="What's happening around your market?"
          subtitle="Direct observations from network transaction distribution"
        >
          <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <p>
              Across the <strong className="text-slate-800">{networkData.length} monitored regional clusters</strong>, total recorded volume stands at <strong className="text-slate-800">{totalNetworkTransactions.toLocaleString('en-IN')} transactions</strong> totaling <strong className="text-slate-800">₹{totalNetworkRevenue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</strong> in processed payments.
            </p>
            {topLocation && (
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                <span className="font-semibold text-slate-800">Dominant Hub: </span>
                <span className="text-slate-700">
                  {topLocation.location} represents the highest concentration of retail activity with {topLocation.transactions.toLocaleString('en-IN')} transactions and ₹{Number(topLocation.revenue).toLocaleString('en-IN', { maximumFractionDigits: 2 })} in sales.
                </span>
              </div>
            )}
            <p>
              Secondary and regional markets demonstrate steady transaction flow with distinct average ticket sizes, highlighting opportunities to calibrate inventory and delivery timelines according to regional velocity.
            </p>
          </div>
        </Card>

        {/* Section 2: What does it mean for your store? */}
        <Card
          title="What does it mean for your store?"
          subtitle="Strategic takeaways for store M001 operations"
        >
          <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <div className="p-3 bg-[#e6f7fc] border border-[#bfe8f6] rounded-lg">
              <span className="font-bold text-[#002970]">Target Regional Demand Drivers: </span>
              <p className="text-[#0083ca] mt-0.5">
                Align high-margin SKUs with high-transaction clusters where consumer purchasing velocity is most concentrated.
              </p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold text-slate-800">Protect Unit Margins Locally: </span>
              <p className="text-slate-700 mt-0.5">
                Competitors often initiate price wars in saturated zones. Store M001 should use <strong>ProfitGuard</strong> to verify margin thresholds before matching discounts.
              </p>
            </div>
            <p className="text-slate-500">
              Aggregated network data is anonymized per privacy compliance regulations and reflects public proxy activity.
            </p>
          </div>
        </Card>
      </div>

      {/* Network Data Visual Chart */}
      <Card
        title="Regional Revenue Distribution"
        subtitle="Gross revenue processed by location (Top 10 regions from backend)"
      >
        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={networkData} margin={{ top: 10, right: 20, left: 20, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="location"
                tick={{ fontSize: 11, fill: '#64748b' }}
                angle={-20}
                textAnchor="end"
                interval={0}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(val) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Revenue']}
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="revenue" fill="#002970" radius={[4, 4, 0, 0]} name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Data Table */}
      <Card
        title="Regional Performance Breakdown"
        subtitle="Raw aggregate figures directly from backend"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider bg-slate-50">
                <th className="py-3 px-4">Location / Region</th>
                <th className="py-3 px-4 text-right">Transactions</th>
                <th className="py-3 px-4 text-right">Total Revenue</th>
                <th className="py-3 px-4 text-right">Avg Line Ticket</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {networkData.map((row, idx) => {
                const avgTicket = row.transactions > 0 ? (row.revenue / row.transactions).toFixed(2) : '0';
                return (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900 flex items-center gap-2">
                      <span className="text-slate-400 font-mono text-[11px]">#{idx + 1}</span>
                      <span>{row.location}</span>
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      {row.transactions.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-slate-900">
                      ₹{Number(row.revenue).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4 text-right text-slate-600">
                      ₹{avgTicket}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
