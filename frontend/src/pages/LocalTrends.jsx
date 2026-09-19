import React, { useState, useEffect } from 'react';
import { Globe, RefreshCw, Info, Store, ShoppingBag } from 'lucide-react';
import apiService from '../services/api';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import OfflineState from '../components/common/OfflineState';
import { useLanguage } from '../context/LanguageContext';

export default function LocalTrends() {
  const { t } = useLanguage();
  const [networkData, setNetworkData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrends = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getNetworkIntelligence();
      setNetworkData(data);
    } catch (err) {
      console.error('Failed to load local trends:', err);
      setError(err.message || 'Error fetching local trends from backend');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrends();
  }, []);

  if (loading) {
    return <LoadingSpinner message={t('loading')} size="lg" />;
  }

  if (error) {
    return (
      <OfflineState
        title="Could Not Load Local Trends"
        message={error}
        onRetry={fetchTrends}
      />
    );
  }

  const totalSales = networkData.reduce((acc, row) => acc + (row.revenue || 0), 0);
  const totalOrders = networkData.reduce((acc, row) => acc + (row.transactions || 0), 0);

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-blue-50 text-[#002970]">
              <Globe className="w-4 h-4 text-[#0083ca]" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t('navLocalTrends')}
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            What's happening around shops like yours
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real aggregated activity patterns from transaction records. No individual shop data is exposed.
          </p>
        </div>

        <button
          onClick={fetchTrends}
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors self-start md:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>

      {/* 2 Simple Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Connected Customer Orders
          </p>
          <p className="text-2xl font-bold text-slate-900 mt-2">
            {totalOrders.toLocaleString('en-IN')}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Across {networkData.length} recorded market regions
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Money Spent Across Clusters
          </p>
          <p className="text-2xl font-bold text-[#002970] mt-2">
            ₹{Number(totalSales).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Processed payment volume
          </p>
        </div>
      </div>

      {/* Clean Merchant Table */}
      <Card
        title="Activity by Region"
        subtitle="Real aggregate figures from backend transaction database"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider bg-slate-50">
                <th className="py-3 px-4">Area / Region</th>
                <th className="py-3 px-4 text-right">Number of Payments</th>
                <th className="py-3 px-4 text-right">Total Business Done</th>
                <th className="py-3 px-4 text-right">Average Bill</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {networkData.map((row, idx) => {
                const avgBill = row.transactions > 0 ? (row.revenue / row.transactions).toFixed(2) : '0';
                return (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 flex items-center gap-2">
                      <span className="text-slate-400 font-mono text-[11px]">#{idx + 1}</span>
                      <span>{row.location}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-medium">
                      {row.transactions.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-slate-900">
                      ₹{Number(row.revenue).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-600 font-medium">
                      ₹{avgBill}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-2 text-xs text-slate-500">
          <Info className="w-4 h-4 text-slate-400 shrink-0" />
          <span>
            {t('realNetworkDataNote')} We do not invent fake competitor profit numbers.
          </span>
        </div>
      </Card>
    </div>
  );
}
