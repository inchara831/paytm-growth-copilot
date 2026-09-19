import React from 'react';
import { useBackend } from '../../context/BackendContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  Menu,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Store,
  Languages,
} from 'lucide-react';

export default function Header({ onToggleSidebar, title, subtitle }) {
  const { isConnected, healthData, checkHealth, merchantName, merchant } = useBackend();
  const { language, setLanguage, t, isSpeaking, stopSpeaking } = useLanguage();

  const displayTitle =
    !title || title === t('navYourShop') || title === 'Your Shop'
      ? merchantName
      : title;

  // Extract initials from merchantName
  const initials = merchantName
    ? merchantName
        .split(' ')
        .map((w) => w[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'ST';

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
      <div className="flex items-center justify-between px-4 lg:px-8 py-3.5">
        {/* Left: Mobile Menu toggle, EXACT Logo & Title */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl lg:hidden shrink-0"
            aria-label="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* EXACT Paytm ♥ UPI Logo in top-left header */}
          <div className="flex items-center gap-3 sm:gap-4">
            <img
              src="/paytm_upi_logo.png"
              alt="Paytm ♥ UPI"
              className="h-8 sm:h-9 md:h-10 w-auto object-contain shrink-0"
            />
            <div className="h-7 w-px bg-slate-200 hidden sm:block shrink-0" />
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight tracking-tight">
                {displayTitle}
              </h2>
              {subtitle && (
                <p className="text-sm font-semibold text-slate-500 hidden sm:block">{subtitle}</p>
              )}
            </div>
          </div>
        </div>

        {/* Right: Language selector, Voice indicator, Shop info, Backend status */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Speaking Audio Indicator */}
          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-full text-xs font-semibold animate-pulse hover:bg-rose-100 transition-colors"
              title="Click to stop speaking"
            >
              <Volume2 className="w-3.5 h-3.5 animate-spin text-rose-600" />
              <span className="hidden sm:inline">{t('listeningNow')}</span>
              <span className="text-[10px] underline ml-0.5">{t('stopSpeaking')}</span>
            </button>
          )}

          {/* Language Selector Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
            <Languages className="w-4 h-4 text-[#002970]" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-none cursor-pointer pr-1"
              aria-label="Select Language"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="kn">ಕನ್ನಡ (Kannada)</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="ml">മലയാളം (Malayalam)</option>
              <option value="mr">मराठी (Marathi)</option>
              <option value="bn">বাংলা (Bengali)</option>
            </select>
          </div>

          {/* Backend Status Pill */}
          <div className="hidden md:flex items-center">
            {isConnected ? (
              <span
                className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold"
                title="Connected to store data"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>{t('backendConnected')}</span>
              </span>
            ) : (
              <button
                onClick={checkHealth}
                className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-800 border border-rose-200 rounded-full text-xs font-bold hover:bg-rose-100 transition-colors"
                title="Click to reconnect"
              >
                <WifiOff className="w-3.5 h-3.5" />
                <span>{t('backendOffline')}</span>
              </button>
            )}
          </div>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          {/* Merchant Profile Area */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-[#002970] flex items-center justify-center font-extrabold text-xs border border-blue-200 shrink-0">
              {initials}
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-sm font-extrabold text-slate-900 truncate max-w-[170px]" title={merchantName}>
                {merchantName}
              </p>
              <p className="text-xs text-slate-500 font-semibold font-mono">
                {merchant?.merchant_id || t('shopId')} • {t('verified')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
