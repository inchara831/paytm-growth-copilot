import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Tag,
  Plus,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Percent,
  Calendar,
  X,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import apiService from '../services/api';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Alert from '../components/common/Alert';
import LoadingSpinner from '../components/common/LoadingSpinner';
import OfflineState from '../components/common/OfflineState';

export default function Offers() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [offers, setOffers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal / Form state
  const [showCreateModal, setShowCreateModal] = useState(
    searchParams.get('action') === 'create'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  // Form inputs
  const [formData, setFormData] = useState({
    offer_title: 'Off-Peak Happy Hour Discount',
    offer_type: 'discount',
    discount_pct: 10,
    target_product_id: '',
    target_hours: ['07', '08', '17', '18', '19', '20'],
    description: 'Boost low-sales hours identified by Paytm Growth Copilot',
  });

  const fetchOffersAndProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const [offersData, prodsData] = await Promise.all([
        apiService.getOffers(),
        apiService.getProducts(),
      ]);
      setOffers(offersData);
      setProducts(prodsData);
      if (prodsData.length > 0 && !formData.target_product_id) {
        setFormData((prev) => ({ ...prev, target_product_id: prodsData[0].product_id }));
      }
    } catch (err) {
      console.error('Failed to load offers:', err);
      setError(err.message || 'Error communicating with backend');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffersAndProducts();
  }, []);

  const handleCreateOffer = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(null);
    setSubmitError(null);

    const payload = {
      offer_title: formData.offer_title,
      offer_type: formData.offer_type,
      discount_pct: Number(formData.discount_pct),
      target_product_id: formData.target_product_id,
      target_hours: formData.target_hours,
      description: formData.description,
      created_at: new Date().toISOString(),
      data_source: 'merchant created offer; confirmed by backend',
    };

    try {
      const res = await apiService.createOffer(payload);
      // ONLY show success if the backend actually confirms it
      if (res && (res.status === 'accepted' || res.status === 'success' || res.offer)) {
        setSubmitSuccess(res.message || 'Offer confirmed and saved by backend!');
        // Refresh offers list from backend
        const updated = await apiService.getOffers();
        setOffers(updated);
        setTimeout(() => {
          setShowCreateModal(false);
          setSubmitSuccess(null);
        }, 1500);
      } else {
        setSubmitError('Backend did not confirm offer creation');
      }
    } catch (err) {
      console.error('Failed to create offer:', err);
      setSubmitError(
        err.response?.data?.detail || err.message || 'Failed to submit offer to backend'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleHour = (h) => {
    setFormData((prev) => {
      const exists = prev.target_hours.includes(h);
      return {
        ...prev,
        target_hours: exists
          ? prev.target_hours.filter((x) => x !== h)
          : [...prev.target_hours, h].sort(),
      };
    });
  };

  if (loading) {
    return <LoadingSpinner message="Fetching merchant offers from backend..." size="lg" />;
  }

  if (error) {
    return (
      <OfflineState
        title="Failed to Load Offers"
        message={error}
        onRetry={fetchOffersAndProducts}
      />
    );
  }

  const allDayHours = ['07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-blue-50 text-[#002970]">
              <Tag className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Promotions Engine
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Configured Offers</h2>
          <p className="text-xs text-slate-500 mt-1">
            Create targeted price and time promotions confirmed by the backend API.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchOffersAndProducts}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            title="Refresh offers"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#002970] hover:bg-[#00225c] text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Create New Offer
          </button>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offers.map((off, idx) => {
          const title = off.offer_title || `Offer #${idx + 1} (${off.offer_type || 'Discount'})`;
          const discount = off.discount_pct || 10;
          const targetHours = off.target_hours || [];
          const source = off.data_source || 'historical product price/quantity; simulated only';

          return (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-card hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="paytm" size="md">
                    {off.offer_type ? off.offer_type.toUpperCase() : 'DISCOUNT'}
                  </Badge>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Active
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-800 mb-1">{title}</h3>
                {off.description && (
                  <p className="text-xs text-slate-500 mb-3">{off.description}</p>
                )}

                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/80 space-y-2 text-xs mb-4">
                  {off.discount_pct && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Discount Rate:</span>
                      <span className="font-bold text-[#002970]">{discount}% OFF</span>
                    </div>
                  )}

                  {off.target_product_id && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Target Product ID:</span>
                      <span className="font-mono font-medium text-slate-800">{off.target_product_id}</span>
                    </div>
                  )}

                  {targetHours.length > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Target Hours:</span>
                      <span className="font-medium text-slate-800">
                        {targetHours.map((h) => `${h}:00`).join(', ')}
                      </span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-200 flex justify-between items-start text-[11px] text-slate-400">
                    <span>Source:</span>
                    <span className="text-right max-w-[200px] truncate">{source}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => navigate('/profitguard')}
                  className="text-xs text-[#002970] hover:underline font-semibold flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Simulate with ProfitGuard
                </button>
                <span className="text-[11px] text-slate-400">Backend Verified</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Offer Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-50 text-[#002970]">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">Create New Offer</h3>
                  <p className="text-xs text-slate-500">Sends POST /offers to FastAPI backend</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitSuccess && (
              <Alert type="success" title="Success" className="my-4">
                {submitSuccess}
              </Alert>
            )}

            {submitError && (
              <Alert type="error" title="Creation Failed" className="my-4">
                {submitError}
              </Alert>
            )}

            <form onSubmit={handleCreateOffer} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Offer Title:
                </label>
                <input
                  type="text"
                  required
                  value={formData.offer_title}
                  onChange={(e) => setFormData({ ...formData, offer_title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-1 focus:ring-[#002970] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Offer Type:
                  </label>
                  <select
                    value={formData.offer_type}
                    onChange={(e) => setFormData({ ...formData, offer_type: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-1 focus:ring-[#002970] focus:bg-white"
                  >
                    <option value="discount">Percentage Discount</option>
                    <option value="flash_sale">Flash Sale</option>
                    <option value="happy_hour">Happy Hour</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Discount Depth (%):
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    required
                    value={formData.discount_pct}
                    onChange={(e) => setFormData({ ...formData, discount_pct: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-1 focus:ring-[#002970] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Target Product:
                </label>
                <select
                  value={formData.target_product_id}
                  onChange={(e) => setFormData({ ...formData, target_product_id: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-1 focus:ring-[#002970] focus:bg-white"
                >
                  <option value="">Storewide / All Products</option>
                  {products.map((p) => (
                    <option key={p.product_id} value={p.product_id}>
                      {p.product_name} ({p.product_id})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Target Hours (Select active windows):
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {allDayHours.map((h) => {
                    const isSelected = formData.target_hours.includes(h);
                    return (
                      <button
                        type="button"
                        key={h}
                        onClick={() => toggleHour(h)}
                        className={`px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
                          isSelected
                            ? 'bg-[#002970] text-white border-[#002970]'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {h}:00
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Description / Merchant Notes:
                </label>
                <textarea
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 focus:ring-1 focus:ring-[#002970] focus:bg-white"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-[#002970] hover:bg-[#00225c] text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isSubmitting && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  {isSubmitting ? 'Verifying with Backend...' : 'Confirm & Create Offer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
