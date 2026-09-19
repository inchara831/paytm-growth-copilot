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
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Sidebar({ isOpen, onClose }) {
  const { t } = useLanguage();

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
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#002970] flex items-center justify-center text-white shadow-sm font-bold text-lg tracking-wider">
              <span className="text-[#00b9f1]">P</span>M
            </div>
            <div>
              <h1 className="text-sm font-bold text-[#002970] leading-tight">
                {t('appName')}
              </h1>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                {t('appSubname')}
              </p>
            </div>
          </div>
        </div>

        {/* Tagline Banner */}
        <div className="mx-4 mt-3 mb-2 px-3 py-1.5 bg-[#e6f7fc] border border-[#bfe8f6] rounded-xl">
          <p className="text-[11px] font-bold text-[#0083ca] text-center tracking-wide">
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
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#002970] text-white shadow-sm'
                      : item.highlight
                      ? 'bg-blue-50/70 text-[#002970] hover:bg-blue-100/70 border border-blue-100'
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
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
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

          <div className="pt-4 mt-4 border-t border-slate-100">
            {secondaryNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-[#002970] text-white'
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
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#002970]">
              <Store className="w-4 h-4 text-[#002970]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <p className="text-xs font-bold text-slate-800 truncate">
                  {t('shopName')}
                </p>
                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
              </div>
              <p className="text-[10px] text-slate-400 truncate">{t('shopId')}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
