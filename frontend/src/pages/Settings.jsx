import React from 'react';
import { useBackend } from '../context/BackendContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Settings as SettingsIcon,
  Store,
  Languages,
  Volume2,
  VolumeX,
  CheckCircle2,
  RefreshCw,
  Info,
  AlertTriangle,
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';

export default function Settings() {
  const {
    isConnected,
    healthData,
    isLoading,
    checkHealth,
    merchant,
    merchantName,
    setMerchantName,
  } = useBackend();
  const {
    language,
    setLanguage,
    t,
    speak,
    isSpeaking,
    stopSpeaking,
    isVoiceAvailable,
    languageConfig,
  } = useLanguage();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

  const languagesList = [
    { code: 'en', label: 'English', desc: 'Default shop language (en-IN)' },
    { code: 'hi', label: 'हिंदी (Hindi)', desc: 'हिंदी में व्यापार सलाह और बोलकर सुनें (hi-IN)' },
    { code: 'kn', label: 'ಕನ್ನಡ (Kannada)', desc: 'ಕನ್ನಡದಲ್ಲಿ ವ್ಯಾಪಾರ ಸಲಹೆ ಮತ್ತು ಧ್ವನಿ (kn-IN)' },
    { code: 'ta', label: 'தமிழ் (Tamil)', desc: 'தமிழில் வணிக ஆலோசனைகள் மற்றும் குரல் (ta-IN)' },
    { code: 'te', label: 'తెలుగు (Telugu)', desc: 'తెలుగులో వ్యాపార సలహాలు మరియు వాయిస్ (te-IN)' },
    { code: 'ml', label: 'മലയാളം (Malayalam)', desc: 'മലയാളത്തിൽ ബിസിനസ്സ് ഉപദേശങ്ങളും വോയ്‌സും (ml-IN)' },
    { code: 'mr', label: 'मराठी (Marathi)', desc: 'मराठीत व्यवसाय सल्ला आणि बोलून ऐका (mr-IN)' },
    { code: 'bn', label: 'বাংলা (Bengali)', desc: 'বাংলায় ব্যবসার পরামর্শ ও মুখে শোনা (bn-IN)' },
  ];

  const handleTestVoice = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const sample = t('voiceTestSample');
      speak(sample, language);
    }
  };

  const currentCfg = languageConfig[language] || languageConfig.en;
  const voiceInstalled = isVoiceAvailable(language);

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-blue-50 text-[#002970]">
              <SettingsIcon className="w-4 h-4 text-[#0083ca]" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t('navSettings')}
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Shop Settings & Languages</h2>
          <p className="text-xs text-slate-500 mt-1">
            Configure your preferred Indian language, speech assistant, and store backend connection.
          </p>
        </div>

        <button
          onClick={checkHealth}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#002970] hover:bg-[#00225c] text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Checking...' : 'Check Connection'}
        </button>
      </div>

      {/* Language & Voice Settings */}
      <Card
        title="Language & Voice Assistant"
        subtitle="Choose from 8 Indian languages for audio readout and UI"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {languagesList.map((item) => {
              const active = language === item.code;
              const hasVoice = isVoiceAvailable(item.code);

              return (
                <button
                  key={item.code}
                  onClick={() => setLanguage(item.code)}
                  className={`p-3.5 rounded-xl border text-left transition-all relative ${
                    active
                      ? 'border-[#002970] bg-blue-50/60 shadow-sm ring-1 ring-[#002970]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-extrabold text-slate-900">{item.label}</span>
                    {active && <CheckCircle2 className="w-4 h-4 text-[#002970]" />}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight mb-2">{item.desc}</p>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        hasVoice
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {hasVoice ? '🔊 Voice Ready' : 'Text Ready'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs text-slate-600">
              <span className="font-semibold">Selected:</span>{' '}
              <span className="text-[#002970] font-bold">
                {currentCfg.nativeName} ({currentCfg.name} - {currentCfg.bcp47})
              </span>
              {!voiceInstalled && language !== 'en' && (
                <div className="text-[11px] text-amber-700 mt-0.5 flex items-center gap-1 font-medium">
                  <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                  <span>
                    Speech voice not detected on this browser/OS. The assistant will display translated text without fallback to English.
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={handleTestVoice}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                isSpeaking
                  ? 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse'
                  : 'bg-[#002970] hover:bg-[#00225c] text-white shadow-sm'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#00b9f1]" />}
              <span>{isSpeaking ? t('stopSpeaking') : `🔊 Test Voice (${currentCfg.name})`}</span>
            </button>
          </div>
        </div>
      </Card>

      {/* Shop Profile & Name Switcher */}
      <Card title="Shop Profile & Business Details" subtitle="Current registered merchant profile from database">
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-slate-100">
            <div>
              <span className="text-slate-400 block text-[11px] font-semibold">Active Shop Name</span>
              <span className="font-bold text-sm text-[#002970]">{merchantName}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] font-semibold">Merchant ID</span>
              <span className="font-mono font-bold text-slate-800">{merchant?.merchant_id || 'M001'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] font-semibold">Business Type</span>
              <span className="font-semibold text-slate-700">{merchant?.business_type || 'Tea & Snacks Shop'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] font-semibold">Location</span>
              <span className="font-semibold text-slate-700">{merchant?.area || 'BTM Layout'}, {merchant?.city || 'Bengaluru'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] font-semibold">Connected Transactions</span>
              <span className="font-semibold text-emerald-700">
                {healthData?.transactions ? Number(healthData.transactions).toLocaleString('en-IN') : '6,191'} records
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] font-semibold">API Endpoint</span>
              <code className="text-[#002970] font-mono text-[11px]">{apiBaseUrl}</code>
            </div>
          </div>

          {/* Demo Merchant Name Switcher */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-slate-800 mb-2">
              🏪 Demo Merchant Switcher (Test Dynamic Shop Name)
            </label>
            <p className="text-[11px] text-slate-500 mb-3">
              Click a preset below or type a custom shop name to verify dynamic updates across the Header, Sidebar, Footer, Products, and Ask Copilot AI:
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              {[
                'Sri Lakshmi Tea & Snacks',
                "Sharma's Shop",
                "Ramesh's Shop",
                "Priya's Shop",
                'Chai Point Cafe',
              ].map((name) => {
                const isActive = merchantName === name;
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setMerchantName(name)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#002970] text-white shadow-sm ring-2 ring-[#002970]/30'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {name}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter custom shop name..."
                value={merchantName}
                onChange={(e) => setMerchantName(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002970]"
              />
              <button
                type="button"
                onClick={() => setMerchantName(merchant?.merchant_name || 'Sri Lakshmi Tea & Snacks')}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition-colors shrink-0"
              >
                Reset Default
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Notice */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs text-slate-500">
        <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p>
          <strong>Notice:</strong> This system uses a public retail dataset proxy (MIT License) for hackathon demonstration. It connects to the Paytm Growth Copilot analytical engine without accessing external banking credentials.
        </p>
      </div>
    </div>
  );
}
