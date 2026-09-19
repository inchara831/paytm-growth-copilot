import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Search,
  ArrowUpDown,
  Tag,
  RefreshCw,
  AlertCircle,
  Plus,
} from 'lucide-react';
import apiService from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import OfflineState from '../components/common/OfflineState';

export default function Products() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [products, setProducts] = useState([]);
  const [slowProducts, setSlowProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'best' | 'attention'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('revenue');
  const [sortAsc, setSortAsc] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const [allProds, slow] = await Promise.all([
        apiService.getProducts(),
        apiService.getProductsAttention(),
      ]);
      setProducts(allProds);
      setSlowProducts(slow);
    } catch (err) {
      console.error('Failed to load products:', err);
      setError(err.message || 'Failed to fetch product data from store');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const displayList = useMemo(() => {
    let source = products;
    if (activeTab === 'attention') {
      source = slowProducts;
    } else if (activeTab === 'best') {
      source = products.slice(0, 10);
    }

    let result = [...source];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.product_name?.toLowerCase().includes(q) ||
          p.product_id?.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      const aVal = a[sortField] || 0;
      const bVal = b[sortField] || 0;
      if (aVal < bVal) return sortAsc ? -1 : 1;
      if (aVal > bVal) return sortAsc ? 1 : -1;
      return 0;
    });

    return result;
  }, [products, slowProducts, activeTab, searchQuery, sortField, sortAsc]);

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message={t('loading')} size="lg" />;
  }

  if (error) {
    return (
      <OfflineState
        title="Could Not Load Products"
        message={error}
        onRetry={fetchProducts}
      />
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-blue-50 text-[#002970]">
              <ShoppingBag className="w-4 h-4 text-[#0083ca]" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t('navProducts')}
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Products in Your Shop</h2>
          <p className="text-xs text-slate-500 mt-1">
            Track best sellers and find slow-moving items that can be bundled to grow sales.
          </p>
        </div>

        <button
          onClick={fetchProducts}
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors self-start md:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200/80">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-white text-[#002970] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('best')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'best'
                ? 'bg-white text-[#002970] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('bestSellingProducts')}
          </button>
          <button
            onClick={() => setActiveTab('attention')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'attention'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-amber-800 hover:text-amber-900'
            }`}
          >
            ⚠️ {t('productsNeedingAttention')}
          </button>
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-[#002970]"
          />
        </div>
      </div>

      {/* Products Table */}
      <Card
        title={
          activeTab === 'attention'
            ? t('productsNeedingAttention')
            : activeTab === 'best'
            ? t('bestSellingProducts')
            : 'All Store Items'
        }
        subtitle={`Showing ${displayList.length} items`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider bg-slate-50">
                <th
                  className="py-3 px-4 cursor-pointer hover:text-slate-800"
                  onClick={() => toggleSort('product_name')}
                >
                  <div className="flex items-center gap-1">
                    <span>Product Name</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  className="py-3 px-4 text-right cursor-pointer hover:text-slate-800"
                  onClick={() => toggleSort('quantity')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Quantity Sold</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  className="py-3 px-4 text-right cursor-pointer hover:text-slate-800"
                  onClick={() => toggleSort('revenue')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Total Sales</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 text-right">Average Price</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {displayList.map((p) => {
                const avgPrice =
                  p.quantity > 0 ? (p.revenue / p.quantity).toFixed(2) : p.price || '0';
                const isSlow = p.quantity <= 10;

                return (
                  <tr key={p.product_id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 max-w-xs truncate">
                      <div className="flex items-center gap-2">
                        {isSlow && (
                          <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" title="Needs attention" />
                        )}
                        <span title={p.product_name}>{p.product_name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-medium">
                      {p.quantity?.toLocaleString('en-IN') || 0}
                    </td>
                    <td className="py-3.5 px-4 text-right font-extrabold text-slate-900">
                      ₹{Number(p.revenue).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-600 font-medium">
                      ₹{avgPrice}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() =>
                          navigate(
                            `/offers?action=create&bundle=${encodeURIComponent(p.product_name)}`
                          )
                        }
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-[#002970] text-[11px] font-bold rounded-lg transition-colors"
                      >
                        <Tag className="w-3 h-3" />
                        Make Combo
                      </button>
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
