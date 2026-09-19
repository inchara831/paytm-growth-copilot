import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, Volume2, ArrowRight, X, Sparkles, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ProactiveBusinessAlert({
  insight,
  onDismiss,
}) {
  const navigate = useNavigate();
  const { t, language, speak, isSpeaking, stopSpeaking } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Show after a short delay on mount
    const timer = setTimeout(() => {
      if (!dismissed) {
        setIsVisible(true);

        // Attempt HTML5 Web Notification if supported
        if (typeof window !== 'undefined' && 'Notification' in window) {
          if (Notification.permission === 'granted') {
            try {
              new Notification(t('alertTitle'), {
                body: insight
                  ? `${insight.what_is_happening} ${insight.expected_extra_profit_display}`
                  : 'Your shop has a sales opportunity today.',
                icon: '/favicon.svg',
              });
            } catch (err) {
              // Notification failed or blocked, fallback cleanly
            }
          } else if (Notification.permission !== 'denied') {
            Notification.requestPermission();
          }
        }
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [dismissed, insight, t]);

  if (!isVisible || dismissed || !insight) {
    return null;
  }

  const handleListen = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const speechText =
        insight.speech_text ||
        `${insight.what_is_happening}. ${insight.what_to_do}. ${insight.expected_extra_profit_display}`;
      speak(speechText, language);
    }
  };

  const handleAction = () => {
    setIsVisible(false);
    navigate('/copilot');
  };

  const handleClose = () => {
    setIsVisible(false);
    setDismissed(true);
    stopSpeaking();
    if (onDismiss) onDismiss();
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md w-full px-4 animate-bounce-short">
      <div className="bg-white rounded-2xl border-2 border-[#002970] shadow-2xl p-5 relative overflow-hidden">
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#00b9f1]" />

        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-[#002970] flex items-center justify-center shrink-0 border border-blue-200">
              <Lightbulb className="w-4 h-4 text-[#0083ca]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#002970]">
                {t('alertTitle')}
              </h4>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                +{insight.expected_extra_profit_display || '₹180/day'}
              </span>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
            aria-label="Dismiss alert"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed mb-4 pl-1">
          {insight.what_is_happening}{' '}
          <strong className="text-slate-900 font-semibold">{insight.what_to_do}</strong>
        </p>

        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={handleListen}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              isSpeaking
                ? 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse'
                : 'bg-slate-100 text-[#002970] hover:bg-slate-200'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            {isSpeaking ? t('stopSpeaking') : t('listen')}
          </button>

          <button
            onClick={handleAction}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-[#002970] hover:bg-[#00225c] text-white rounded-lg text-xs font-semibold transition-colors shadow-sm"
          >
            <span>{t('alertAction')}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#00b9f1]" />
          </button>
        </div>
      </div>
    </div>
  );
}
