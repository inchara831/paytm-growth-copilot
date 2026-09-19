import React, { useState } from 'react';
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
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';

export default function Settings() {
  const { isConnected, healthData, isLoading, lastChecked, checkHealth } = useBackend();
  const { language, setLanguage, t, speak, isSpeaking, stopSpeaking } = useLanguage();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

  const handleTestVoice = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      let sample = "Welcome to Paytm Merchant Assistant. No prompts, just profits.";
      if (language === 'hi') {
        sample = "पेटीएम मर्चेंट बिज़नेस साथी में आपका स्वागत है। कोई झंझट नहीं, सिर्फ़ मुनाफ़ा।";
      } else if (language === 'kn') {
        sample = "ಪೇಟಿಎಂ ಮರ್ಚೆಂಟ್ ವ್ಯಾಪಾರ ಸಹಾಯಕಕ್ಕೆ ಸುಸ್ವಾಗತ. ಯಾವುದೇ ಗೊಂದಲವಿಲ್ಲ, ಕೇವಲ ಲಾಭ.";
      }
      speak(sample, language);
    }
  };

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
          <h2 className="text-xl font-bold text-slate-900">Shop Settings</h2>
          <p className="text-xs text-slate-500 mt-1">
            Configure your preferred language, speech assistant, and shop connection.
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
      <Card title="Language & Voice Assistant" subtitle="Select the language your assistant speaks">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { code: 'en', label: 'English', desc: 'Default shop language' },
              { code: 'hi', label: 'हिंदी (Hindi)', desc: 'हिंदी में सलाह और बोलकर सुनें' },
              { code: 'kn', label: 'ಕನ್ನಡ (Kannada)', desc: 'ಕನ್ನಡದಲ್ಲಿ ಸಲಹೆ ಮತ್ತು ಧ್ವನಿ' },
            ].map((item) => (
              <button
                key={item.code}
                onClick={() => setLanguage(item.code)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  language === item.code
                    ? 'border-[#002970] bg-blue-50/50 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-slate-900">{item.label}</span>
                  {language === item.code && (
                    <CheckCircle2 className="w-4 h-4 text-[#002970]" />
                  )}
                </div>
                <p className="text-[11px] text-slate-500">{item.desc}</p>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-600 font-medium">
              Test your browser's speech capability in {language === 'hi' ? 'Hindi' : language === 'kn' ? 'Kannada' : 'English'}:
            </span>
            <button
              onClick={handleTestVoice}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                isSpeaking
                  ? 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse'
                  : 'bg-slate-100 hover:bg-slate-200 text-[#002970]'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#0083ca]" />}
              <span>{isSpeaking ? t('stopSpeaking') : '🔊 Test Voice Playback'}</span>
            </button>
          </div>
        </div>
      </Card>

      {/* Shop Profile */}
      <Card title="Shop Information" subtitle="Current registered merchant profile">
        <div className="space-y-3 text-xs">
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-500">Shop Name:</span>
            <span className="font-bold text-slate-800">{t('shopName')}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-500">Merchant ID:</span>
            <span className="font-mono font-bold text-slate-800">{t('shopId')}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-500">Connected Records:</span>
            <span className="font-semibold text-slate-800">
              {healthData?.transactions ? Number(healthData.transactions).toLocaleString('en-IN') : 'Loading...'} transactions
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-500">API Endpoint:</span>
            <code className="text-[#002970] font-mono">{apiBaseUrl}</code>
          </div>
        </div>
      </Card>

      {/* Honest Proxy Notice */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs text-slate-500">
        <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p>
          <strong>Notice:</strong> This system uses a public retail dataset proxy (MIT License) for hackathon demonstration. It does not access private live banking accounts without explicit merchant API authentication.
        </p>
      </div>
    </div>
  );
}
