import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Store,
  Lightbulb,
  ShoppingBag,
  Tag,
  Globe,
  Settings,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  Bot,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useBackend } from '../../context/BackendContext';

export default function Sidebar({ isOpen, onClose, onOpenChat }) {
  const { t } = useLanguage();
  const { merchantName, merchant } = useBackend();

  const mainNav = [
    { name: t('navYourShop'), path: '/', icon: Store, end: true },
    {
      name: t('navWhatYouCanDo'),
      path: '/copilot',
      icon: Lightbulb,
      highlight: true,
      badge: '3',
    },
    { name: t('navProducts'), path: '/products', icon: ShoppingBag },
    { name: t('navOffers'), path: '/offers', icon: Tag },
    { name: t('navLocalTrends'), path: '/trends', icon: Globe },
  ];

  const secondaryNav = [
    { name: t('navSettings'), path: '/settings', icon: Settings },
    { name: t('navHelp'), path: '/help', icon: HelpCircle },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <img
              src="/paytm_upi_logo.png"
              alt="Paytm ♥ UPI"
              className="h-8 sm:h-9 w-auto object-contain shrink-0"
            />
            <div className="flex items-center gap-1.5 pl-0.5">
              <span className="text-xs font-extrabold text-[#002970] tracking-wider uppercase">
                {t('appName')}
              </span>
              <span className="text-[10px] font-extrabold text-[#00b9f1] bg-sky-50 px-1.5 py-0.5 rounded border border-[#bfe8f6] uppercase">
                Copilot
              </span>
            </div>
          </div>
        </div>

        {/* Tagline Banner */}
        <div className="mx-4 mt-3 mb-2 px-3 py-1.5 bg-[#e6f7fc] border border-[#bfe8f6] rounded-xl">
          <p className="text-xs font-extrabold text-[#0083ca] text-center tracking-wide">
            "{t('tagline')}"
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 space-y-1.5 overflow-y-auto">
          {mainNav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-[#002970] text-white shadow-sm'
                      : item.highlight
                      ? 'bg-blue-50/80 text-[#002970] hover:bg-blue-100 border border-blue-100 font-extrabold'
                      : 'text-slate-600 hover:text-[#002970] hover:bg-slate-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 ${
                          isActive
                            ? 'text-[#00b9f1]'
                            : item.highlight
                            ? 'text-[#0083ca]'
                            : 'text-slate-400'
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-xs font-black px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-[#00b9f1] text-[#002970]'
                            : 'bg-[#002970] text-white'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}

          {/* Ask Copilot Chat Button in Sidebar */}
          <button
            onClick={() => {
              if (onOpenChat) onOpenChat();
              if (onClose) onClose();
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-extrabold bg-gradient-to-r from-blue-50 to-sky-50 text-[#002970] hover:bg-blue-100/80 border border-blue-200/80 transition-all shadow-xs group"
          >
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-lg bg-[#002970] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Bot className="w-3.5 h-3.5 text-[#00b9f1]" />
              </div>
              <span>Ask Copilot</span>
            </div>
            <span className="text-[10px] font-extrabold bg-[#002970] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
              AI Chat
            </span>
          </button>

          <div className="pt-4 mt-4 border-t border-slate-100">
            {secondaryNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#002970] text-white font-bold'
                        : 'text-slate-600 hover:text-[#002970] hover:bg-slate-50'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`w-4 h-4 ${isActive ? 'text-[#00b9f1]' : 'text-slate-400'}`}
                      />
                      <span>{item.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Merchant Info Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#002970] shrink-0 font-extrabold text-xs">
              🏪
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <p className="text-xs font-extrabold text-slate-800 truncate" title={merchantName}>
                  {merchantName}
                </p>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              </div>
              <p className="text-[11px] text-slate-500 font-semibold font-mono truncate">
                {merchant?.merchant_id || t('shopId')} • {merchant?.area || 'BTM Layout'}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
