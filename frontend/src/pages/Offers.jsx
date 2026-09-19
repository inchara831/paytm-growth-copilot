import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Tag,
  Plus,
  Clock,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  X,
  RefreshCw,
} from 'lucide-react';
import apiService from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedOffers } from '../services/translations';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Alert from '../components/common/Alert';
import LoadingSpinner from '../components/common/LoadingSpinner';
import OfflineState from '../components/common/OfflineState';

export default function Offers() {
  const [searchParams] = useSearchParams();
  const { t, language } = useLanguage();

  const [activeOffers, setActiveOffers] = useState([]);
  const [suggestedOffers, setSuggestedOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal / Create form
  const [showCreateModal, setShowCreateModal] = useState(
    searchParams.get('action') === 'create'
  );
  const [formData, setFormData] = useState({
    offer_title: searchParams.get('bundle') || 'Afternoon Chai & Snacks Combo',
    offer_type: 'combo',
    discount_pct: 15,
    best_time: '3:00 PM – 5:00 PM',
    expected_extra_profit_display: '₹180/day',
    reason: 'Sales are low during afternoon hours; combo attracts walk-ins.',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const fetchOffersData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [active, suggested] = await Promise.all([
        apiService.getOffers(),
        apiService.getSuggestedOffers(language),
      ]);
      setActiveOffers(active);
      const localized = getLocalizedOffers(suggested, language);
      setSuggestedOffers(localized);
    } catch (err) {
      console.error('Failed to load offers:', err);
      // Client-side localized fallback
      const fallback = getLocalizedOffers([], language);
      setSuggestedOffers(fallback);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffersData();
  }, [language]);

  const handleActivateSuggested = async (sug) => {
    try {
      const res = await apiService.createOffer({
        offer_title: sug.product_bundle,
        offer_type: 'combo',
        discount_pct: sug.discount_pct || 15,
        best_time: sug.best_time,
        expected_extra_profit_display: sug.expected_extra_profit_display,
        description: sug.reason,
        status: 'active',
      });
      if (res) {
        setSubmitSuccess(`"${sug.product_bundle}" is now active in your shop!`);
        fetchOffersData();
        setTimeout(() => setSubmitSuccess(null), 3000);
      }
    } catch (err) {
      console.error('Failed to activate suggested offer:', err);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(null);
    setSubmitError(null);

    try {
      const res = await apiService.createOffer({
        offer_title: formData.offer_title,
        offer_type: formData.offer_type,
        discount_pct: Number(formData.discount_pct),
        best_time: formData.best_time,
        expected_extra_profit_display: formData.expected_extra_profit_display,
        description: formData.reason,
        status: 'active',
      });

      if (res && res.status === 'accepted') {
        setSubmitSuccess(`"${formData.offer_title}" activated successfully!`);
        fetchOffersData();
        setTimeout(() => {
          setShowCreateModal(false);
          setSubmitSuccess(null);
        }, 1500);
      } else {
        setSubmitError('Backend did not confirm offer creation');
      }
    } catch (err) {
      console.error('Failed to create offer:', err);
      setSubmitError(err.message || 'Failed to create offer');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message={t('loading')} size="lg" />;
  }

  if (error) {
    return (
      <OfflineState
        title="Could Not Load Offers"
        message={error}
        onRetry={fetchOffersData}
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
              <Tag className="w-4 h-4 text-[#0083ca]" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t('navOffers')}
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">{t('offersTitle')}</h2>
          <p className="text-xs text-slate-500 mt-1">{t('offersSub')}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#002970] hover:bg-[#00225c] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 text-[#00b9f1]" />
            {t('createSimpleOffer')}
          </button>
        </div>
      </div>

      {submitSuccess && (
        <Alert type="success" title="Success">
          {submitSuccess}
        </Alert>
      )}

      {/* 1. ATTENTION-GRABBING SUGGESTED OFFERS FOR YOU */}
      <Card
        title={
          <div className="flex items-center gap-2">
            <span>🎁</span>
            <span>{t('suggestedOffers')}</span>
          </div>
        }
        subtitle={t('suggestedOffersSub')}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {suggestedOffers.map((sug, idx) => {
            const isFirst = idx === 0;
            const isSecond = idx === 1;

            const badgeTag = isFirst
              ? '🔥 Try This Today'
              : isSecond
              ? '🎁 Special Bundle'
              : '⭐ Morning Special';

            const tagColor = isFirst
              ? 'bg-rose-50 text-rose-700 border-rose-200'
              : isSecond
              ? 'bg-purple-50 text-purple-700 border-purple-200'
              : 'bg-amber-50 text-amber-700 border-amber-200';

            const cardBorder = isFirst
              ? 'border-2 border-[#00b9f1] ring-4 ring-[#00b9f1]/15 shadow-md'
              : isSecond
              ? 'border-2 border-emerald-400 ring-4 ring-emerald-400/15 shadow-md'
              : 'border-2 border-amber-400 ring-4 ring-amber-400/15 shadow-md';

            const itemEmoji = isFirst ? '☕' : isSecond ? '⚡' : '🥐';

            return (
              <div
                key={sug.id}
                className={`p-5 rounded-3xl bg-white transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between relative overflow-hidden ${cardBorder}`}
              >
                {/* Top gradient highlight stripe */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 ${
                    isFirst
                      ? 'bg-gradient-to-r from-[#00b9f1] to-[#002970]'
                      : isSecond
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-600'
                      : 'bg-gradient-to-r from-amber-400 to-orange-500'
                  }`}
                />

                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span
                      className={`text-xs font-black px-2.5 py-1 rounded-xl border flex items-center gap-1 shadow-xs ${tagColor}`}
                    >
                      <span>{badgeTag}</span>
                    </span>
                    <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200 shadow-xs">
                      💰 +{sug.expected_extra_profit_display}
                    </span>
                  </div>

                  {/* Bundle Title with Emoji */}
                  <h4 className="text-base font-extrabold text-slate-900 mb-2 flex items-start gap-1.5 leading-snug">
                    <span className="text-lg shrink-0">{itemEmoji}</span>
                    <span>{sug.product_bundle}</span>
                  </h4>

                  {/* Price & Best Time Pills */}
                  <div className="space-y-1.5 text-xs text-slate-700 my-3 bg-slate-50 p-3 rounded-2xl border border-slate-100 font-semibold">
                    <p className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1">
                        <span>🏷️</span> Offer Price:
                      </span>
                      <span className="font-extrabold text-slate-900 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                        {sug.offer_price}
                      </span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1">
                        <span>⏰</span> Best Time:
                      </span>
                      <span className="font-bold text-[#002970]">
                        {sug.best_time}
                      </span>
                    </p>
                  </div>

                  {/* Why it works note */}
                  <div className="p-3 bg-blue-50/50 rounded-2xl text-[11px] text-slate-700 mb-4 leading-relaxed border border-blue-100 flex items-start gap-2">
                    <span className="text-xs shrink-0">💡</span>
                    <span>
                      <strong className="text-slate-900">Why this works: </strong>
                      {sug.reason}
                    </span>
                  </div>
                </div>

                {/* Activate Button */}
                <button
                  onClick={() => handleActivateSuggested(sug)}
                  className={`w-full py-2.5 px-4 text-white text-xs font-extrabold rounded-xl transition-all text-center flex items-center justify-center gap-2 shadow-md hover:shadow-lg ${
                    isFirst
                      ? 'bg-[#002970] hover:bg-[#00225c]'
                      : isSecond
                      ? 'bg-emerald-700 hover:bg-emerald-800'
                      : 'bg-amber-600 hover:bg-amber-700'
                  }`}
                >
                  <span>⚡</span>
                  <span>{t('activateOffer')}</span>
                </button>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 2. ACTIVE OFFERS */}
      <Card
        title={t('activeOffers')}
        subtitle="Offers currently running in your store"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeOffers.map((off, idx) => {
            const title = off.offer_title || `Offer #${idx + 1}`;
            return (
              <div
                key={off.id || idx}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-start justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Active
                    </span>
                    {off.expected_extra_profit_display && (
                      <span className="text-xs font-semibold text-slate-500">
                        {off.expected_extra_profit_display} extra profit
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{title}</h4>
                  {off.description && (
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {off.description}
                    </p>
                  )}
                  {off.best_time && (
                    <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Runs: {off.best_time}
                    </p>
                  )}
                </div>

                <span className="text-[11px] font-mono font-bold text-[#002970] bg-white px-2 py-1 rounded border border-slate-200 shrink-0">
                  {off.discount_pct || 15}% OFF
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* CREATE OFFER MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-50 text-[#002970]">
                  <Tag className="w-5 h-5 text-[#0083ca]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">{t('createSimpleOffer')}</h3>
                  <p className="text-xs text-slate-500">Simple promotion for your shop</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitError && (
              <Alert type="error" title="Error" className="my-4">
                {submitError}
              </Alert>
            )}

            <form onSubmit={handleCreateSubmit} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t('offerTitleLabel')}
                </label>
                <input
                  type="text"
                  required
                  value={formData.offer_title}
                  onChange={(e) => setFormData({ ...formData, offer_title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 focus:ring-1 focus:ring-[#002970] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t('discountLabel')} (% OFF)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    required
                    value={formData.discount_pct}
                    onChange={(e) => setFormData({ ...formData, discount_pct: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 focus:ring-1 focus:ring-[#002970] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t('bestTimeLabel')}
                  </label>
                  <select
                    value={formData.best_time}
                    onChange={(e) => setFormData({ ...formData, best_time: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 focus:ring-1 focus:ring-[#002970] focus:bg-white"
                  >
                    <option value="3:00 PM – 5:00 PM">3:00 PM – 5:00 PM (Slow Hours)</option>
                    <option value="8:00 AM – 10:00 AM">8:00 AM – 10:00 AM (Morning)</option>
                    <option value="All Day">All Day</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t('reasonLabel')}
                </label>
                <textarea
                  rows="2"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:ring-1 focus:ring-[#002970] focus:bg-white"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-[#002970] hover:bg-[#00225c] text-white text-xs font-bold rounded-xl transition-colors shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? 'Activating...' : t('saveAndActivate')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
