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
  const { isConnected, healthData, checkHealth } = useBackend();
  const { language, setLanguage, t, isSpeaking, stopSpeaking } = useLanguage();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
      <div className="flex items-center justify-between px-4 lg:px-8 py-3">
        {/* Left: Mobile Menu toggle & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl lg:hidden"
            aria-label="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              {title || t('navYourShop')}
            </h2>
            {subtitle && (
              <p className="text-xs text-slate-500 hidden sm:block">{subtitle}</p>
            )}
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
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-2 py-1">
            <Languages className="w-3.5 h-3.5 text-[#002970]" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer pr-1"
              aria-label="Select Language"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="kn">ಕನ್ನಡ (Kannada)</option>
            </select>
          </div>

          {/* Backend Status Pill */}
          <div className="hidden md:flex items-center">
            {isConnected ? (
              <span
                className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[11px] font-semibold"
                title="Connected to store data"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>{t('backendConnected')}</span>
              </span>
            ) : (
              <button
                onClick={checkHealth}
                className="flex items-center gap-1 px-2.5 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-full text-[11px] font-semibold hover:bg-rose-100 transition-colors"
                title="Click to reconnect"
              >
                <WifiOff className="w-3 h-3" />
                <span>{t('backendOffline')}</span>
              </button>
            )}
          </div>

          <div className="h-5 w-px bg-slate-200 hidden sm:block" />

          {/* Merchant Profile Area */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-[#002970] flex items-center justify-center font-bold text-xs border border-blue-200">
              ST
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-bold text-slate-800 truncate max-w-[150px]">
                {t('shopName')}
              </p>
              <p className="text-[10px] text-slate-400 font-mono">
                {t('shopId')} • {t('verified')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
