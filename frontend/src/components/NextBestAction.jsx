import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, Plus, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function NextBestAction({
  recommendationData,
  className = '',
}) {
  const navigate = useNavigate();
  const { t, language, speak, isSpeaking, stopSpeaking } = useLanguage();

  if (!recommendationData) {
    return null;
  }

  const { recommendation, context } = recommendationData;
  const hours = context?.hours || [];

  const handleListen = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(
        `${recommendation}. Your sales are lower during slow hours. Try a combo offer. Expected extra profit: 180 rupees per day.`,
        language
      );
    }
  };

  return (
    <div className={`bg-gradient-to-r from-[#002970] to-[#003896] text-white rounded-2xl p-6 shadow-elevated border border-blue-900 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#00b9f1]/20 text-[#00b9f1] border border-[#00b9f1]/30">
              <Lightbulb className="w-3 h-3 text-[#00b9f1]" /> {t('whatYouCanDoToday')}
            </span>
            <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
              +₹180/day
            </span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            {recommendation || 'Boost Business During Slow Afternoon Hours'}
          </h3>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleListen}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/15 hover:bg-white/25 text-white text-xs font-semibold rounded-xl transition-colors border border-white/20"
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#00b9f1]" />}
            {isSpeaking ? t('stopSpeaking') : t('listen')}
          </button>
          <button
            onClick={() => navigate('/offers?action=create')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#00b9f1] text-[#002970] text-xs font-bold rounded-xl hover:bg-[#33c7f4] transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4 text-[#002970]" />
            {t('createOffer')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-blue-800/80 text-xs">
        <div>
          <p className="font-semibold text-blue-200 uppercase tracking-wider text-[10px] mb-1">
            {t('whatIsHappening')}
          </p>
          <p className="text-blue-100 leading-relaxed">
            Sales drop during afternoon hours ({hours.map(h => `${h}:00`).join(', ')}).
          </p>
        </div>

        <div>
          <p className="font-semibold text-blue-200 uppercase tracking-wider text-[10px] mb-1">
            {t('whyDoesItMatter')}
          </p>
          <p className="text-blue-100 leading-relaxed">
            Shop rent and staffing costs continue even during slow hours.
          </p>
        </div>

        <div>
          <p className="font-semibold text-blue-200 uppercase tracking-wider text-[10px] mb-1">
            {t('whatShouldIDo')}
          </p>
          <p className="text-blue-100 leading-relaxed">
            Launch a quick snack and beverage combo to draw nearby walk-in footfall.
          </p>
        </div>
      </div>
    </div>
  );
}
