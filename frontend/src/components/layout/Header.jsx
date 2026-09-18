import React from 'react';
import { useBackend } from '../../context/BackendContext';
import {
  Bell,
  Search,
  Menu,
  Wifi,
  WifiOff,
  RefreshCw,
  User,
  ShieldCheck,
} from 'lucide-react';

export default function Header({ onToggleSidebar, title, subtitle }) {
  const { isConnected, healthData, isLoading, checkHealth } = useBackend();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-subtle">
      <div className="flex items-center justify-between px-4 lg:px-8 py-3.5">
        {/* Left: Mobile Menu toggle & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg lg:hidden"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-slate-900 leading-tight">
              {title || 'Dashboard'}
            </h2>
            {subtitle && (
              <p className="text-xs text-slate-500 hidden sm:block">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Center: Search */}
        <div className="hidden md:flex items-center flex-1 max-w-xs mx-8">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search products, hours, insights..."
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#002970] focus:border-[#002970]"
            />
          </div>
        </div>

        {/* Right: Actions, Backend status, Profile */}
        <div className="flex items-center gap-3">
          {/* Backend Status Indicator */}
          <div className="flex items-center gap-2">
            {isConnected ? (
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold"
                title={`FastAPI Connected (${healthData?.transactions?.toLocaleString?.() || 0} records)`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Backend Connected</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-full text-xs font-semibold">
                  <WifiOff className="w-3.5 h-3.5" />
                  <span>Backend Offline</span>
                </span>
                <button
                  onClick={checkHealth}
                  disabled={isLoading}
                  className="p-1.5 text-slate-600 hover:text-[#002970] hover:bg-slate-100 rounded-md transition-colors"
                  title="Retry backend connection"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#002970]' : ''}`} />
                </button>
              </div>
            )}
          </div>

          <div className="h-5 w-px bg-slate-200 hidden sm:block" />

          {/* Notifications button */}
          <button
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#00b9f1] rounded-full ring-2 ring-white"></span>
          </button>

          {/* Profile Area */}
          <div className="flex items-center gap-2 pl-1">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-[#002970] flex items-center justify-center font-bold text-xs border border-blue-200">
              M1
            </div>
            <div className="hidden xl:block text-left">
              <div className="flex items-center gap-1">
                <p className="text-xs font-semibold text-slate-800">Merchant M001</p>
                <ShieldCheck className="w-3 h-3 text-[#00b9f1]" />
              </div>
              <p className="text-[10px] text-slate-400">Retail Merchant</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
