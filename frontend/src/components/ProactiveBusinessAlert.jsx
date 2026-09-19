import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Lightbulb,
  Volume2,
  VolumeX,
  ArrowRight,
  X,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedInsights } from '../services/translations';

export default function ProactiveBusinessAlert({ insight, onDismiss }) {
  const navigate = useNavigate();
  const { t, language, speak, isSpeaking, stopSpeaking, speakingText } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Localize the insight to the currently selected language
  const activeInsight = React.useMemo(() => {
    if (!insight) return null;
    const localized = getLocalizedInsights([insight], language);
    return localized && localized.length > 0 ? localized[0] : insight;
  }, [insight, language]);

  useEffect(() => {
    // Show centered alert modal after a short delay on mount
    const timer = setTimeout(() => {
      if (!dismissed && activeInsight) {
        setIsVisible(true);

        // Attempt Web Notification if supported and granted
        if (typeof window !== 'undefined' && 'Notification' in window) {
          if (Notification.permission === 'granted') {
            try {
              new Notification(t('alertTitle'), {
                body: `${activeInsight.what_is_happening} ${activeInsight.expected_extra_profit_display}`,
                icon: '/paytm_upi_logo.png',
              });
            } catch (err) {
              // Notification blocked or not supported
            }
          } else if (Notification.permission !== 'denied') {
            Notification.requestPermission();
          }
        }
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [dismissed, activeInsight, t]);

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isVisible) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  if (!isVisible || dismissed || !activeInsight) {
    return null;
  }

  const speechText =
    activeInsight.speech_text ||
    `${activeInsight.what_is_happening}. ${activeInsight.what_to_do}. ${activeInsight.expected_extra_profit_display}`;

  const isCurrentSpeaking = isSpeaking && speakingText === speechText;

  const handleListen = () => {
    if (isCurrentSpeaking) {
      stopSpeaking();
    } else {
      speak(speechText, language);
    }
  };

  const handleAction = () => {
    stopSpeaking();
    setIsVisible(false);
    navigate('/copilot');
  };

  const handleClose = () => {
    stopSpeaking();
    setIsVisible(false);
    setDismissed(true);
    if (onDismiss) onDismiss();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="alert-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
    >
      {/* Centered Large Modal Dialog */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl border-2 border-[#002970] shadow-2xl overflow-hidden p-6 sm:p-8 animate-scale-up text-left">
        {/* Top Paytm Brand Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#00b9f1] to-[#002970]" />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#002970] flex items-center justify-center shrink-0 border border-blue-200 shadow-sm">
              <Sparkles className="w-6 h-6 text-[#0083ca]" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                {activeInsight.category || 'High-Profit Opportunity'}
              </span>
              <h3
                id="alert-modal-title"
                className="text-lg sm:text-xl font-extrabold text-[#002970] leading-tight"
              >
                {activeInsight.title || t('alertTitle')}
              </h3>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Expected Extra Profit Highlight Banner */}
        <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 my-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-700 shrink-0" />
            <div>
              <p className="text-xs font-bold text-emerald-900">{t('expectedProfit')}</p>
              <p className="text-[11px] text-emerald-700">Calculated for your shop</p>
            </div>
          </div>
          <span className="text-xl sm:text-2xl font-black text-emerald-800 bg-white px-3.5 py-1 rounded-xl border border-emerald-200 shadow-sm">
            +{activeInsight.expected_extra_profit_display || '₹180/day'}
          </span>
        </div>

        {/* Simple Explanation Body */}
        <div className="space-y-3 my-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
              {t('whatIsHappening')}
            </span>
            <p className="text-sm font-semibold text-slate-800 leading-relaxed mt-0.5">
              {activeInsight.what_is_happening}
            </p>
          </div>

          {activeInsight.what_to_do && (
            <div className="pt-2 border-t border-slate-200/60">
              <span className="text-[11px] font-bold text-[#002970] uppercase tracking-wide">
                {t('whatShouldIDo')}
              </span>
              <p className="text-sm font-bold text-slate-900 leading-relaxed mt-0.5">
                {activeInsight.what_to_do}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons Footer */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <button
            onClick={handleListen}
            className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              isCurrentSpeaking
                ? 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse'
                : 'bg-slate-100 hover:bg-slate-200 text-[#002970]'
            }`}
          >
            {isCurrentSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#0083ca]" />}
            <span>{isCurrentSpeaking ? t('stopSpeaking') : `${t('listen')} (${language.toUpperCase()})`}</span>
          </button>

          <div className="flex items-center gap-2 flex-1 sm:justify-end">
            <button
              onClick={handleClose}
              className="px-4 py-3 text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              {t('alertDismiss')}
            </button>

            <button
              onClick={handleAction}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#002970] hover:bg-[#00225c] text-white rounded-xl text-xs font-bold shadow-md transition-all"
            >
              <span>{t('alertAction')}</span>
              <ArrowRight className="w-4 h-4 text-[#00b9f1]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
