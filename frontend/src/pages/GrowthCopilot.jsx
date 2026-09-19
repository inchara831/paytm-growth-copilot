import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Lightbulb,
  Volume2,
  VolumeX,
  TrendingUp,
  Tag,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Plus,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import apiService from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedInsights } from '../services/translations';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import OfflineState from '../components/common/OfflineState';

export default function GrowthCopilot() {
  const navigate = useNavigate();
  const { t, language, speak, isSpeaking, stopSpeaking, speakingText } = useLanguage();

  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activatingId, setActivatingId] = useState(null);
  const [activatedSuccess, setActivatedSuccess] = useState(null);

  const fetchInsights = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getAssistantInsights(language);
      const localized = getLocalizedInsights(data, language);
      setInsights(localized);
    } catch (err) {
      console.error('Failed to load copilot insights:', err);
      // Client-side localized fallback
      const fallback = getLocalizedInsights([], language);
      setInsights(fallback);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, [language]);

  const handleListen = (item) => {
    const textToSpeak =
      item.speech_text ||
      `${item.what_is_happening}. ${item.what_to_do}. ${item.expected_extra_profit_display}`;

    if (isSpeaking && speakingText === textToSpeak) {
      stopSpeaking();
    } else {
      speak(textToSpeak, language);
    }
  };

  const handleActivateOffer = async (item) => {
    if (!item.suggested_offer) return;
    setActivatingId(item.id);
    try {
      const res = await apiService.createOffer({
        offer_title: item.suggested_offer.offer_title,
        offer_type: item.suggested_offer.offer_type || 'combo',
        discount_pct: item.suggested_offer.discount_pct || 15,
        target_hours: item.suggested_offer.best_time?.includes('3:00') ? ['15', '16', '17'] : ['08', '09', '10'],
        expected_extra_profit_display: item.expected_extra_profit_display,
        description: item.suggested_offer.reason,
        status: 'active',
      });
      if (res) {
        setActivatedSuccess(item.id);
        setTimeout(() => {
          navigate('/offers');
        }, 1200);
      }
    } catch (err) {
      console.error('Failed to activate offer:', err);
    } finally {
      setActivatingId(null);
    }
  };

  if (loading) {
    return <LoadingSpinner message={t('loading')} size="lg" />;
  }

  if (error) {
    return (
      <OfflineState
        title="Could Not Load Assistant Suggestions"
        message={error}
        onRetry={fetchInsights}
      />
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-50 text-[#002970]">
              <Sparkles className="w-5 h-5 text-[#0083ca]" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#002970]">
              {t('appName')} {t('appSubname')}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {t('navWhatYouCanDo')}
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            {t('copilotSub')}
          </p>
        </div>

        <button
          onClick={fetchInsights}
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors self-start md:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>

      {/* List of Proactive Recommendations in 4 Simple Parts */}
      <div className="space-y-6">
        {insights.map((item, index) => {
          const isItemSpeaking =
            isSpeaking &&
            (speakingText === item.speech_text ||
              speakingText.includes(item.what_is_happening));
          const isActivated = activatedSuccess === item.id;

          return (
            <div
              key={item.id || index}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-card hover:border-slate-300 transition-all"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-blue-50 text-[#002970] flex items-center justify-center text-xs font-bold font-mono">
                    #{index + 1}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {item.category || 'Store Opportunity'}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleListen(item)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isItemSpeaking
                        ? 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse'
                        : 'bg-slate-100 text-[#002970] hover:bg-slate-200'
                    }`}
                  >
                    {isItemSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{isItemSpeaking ? t('stopSpeaking') : t('listen')}</span>
                  </button>

                  <button
                    onClick={() => handleActivateOffer(item)}
                    disabled={activatingId === item.id || isActivated}
                    className={`inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-xl transition-all shadow-sm ${
                      isActivated
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#002970] hover:bg-[#00225c] text-white'
                    }`}
                  >
                    {isActivated ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                        <span>Activated!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 text-[#00b9f1]" />
                        <span>{t('activateOffer')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* 4 Pillars: WHAT IS HAPPENING / WHY IT MATTERS / WHAT SHOULD I DO / EXPECTED EXTRA PROFIT */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
                {/* 1. What is happening? */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    {t('whatIsHappening')}
                  </span>
                  <p className="text-xs text-slate-800 leading-relaxed font-medium">
                    {item.what_is_happening}
                  </p>
                </div>

                {/* 2. Why does it matter? */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    {t('whyDoesItMatter')}
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {item.why_it_matters}
                  </p>
                </div>

                {/* 3. What should you do? */}
                <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#002970] block mb-1">
                    {t('whatShouldIDo')}
                  </span>
                  <p className="text-xs text-slate-800 leading-relaxed font-semibold">
                    {item.what_to_do}
                  </p>
                </div>

                {/* 4. Expected extra profit */}
                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                    {t('expectedExtraProfit')}
                  </span>
                  <p className="text-lg font-extrabold text-emerald-700">
                    +{item.expected_extra_profit_display || '₹180/day'}
                  </p>
                  <p className="text-[11px] text-emerald-800 mt-0.5 font-medium">
                    Extra cash earned while protecting your store profit margin
                  </p>
                </div>
              </div>

              {/* Suggested Offer Preview */}
              {item.suggested_offer && (
                <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#002970] shrink-0" />
                    <span className="text-slate-500">Suggested Action:</span>
                    <span className="font-bold text-slate-900">
                      {item.suggested_offer.offer_title}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600">
                      {item.suggested_offer.best_time}
                    </span>
                  </div>

                  <button
                    onClick={() => handleActivateOffer(item)}
                    className="text-xs font-bold text-[#002970] hover:underline shrink-0"
                  >
                    Launch this offer now →
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
