import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  ShieldCheck,
  Globe2,
  Package,
  Users,
  Tag,
  Compass,
  Settings,
  HelpCircle,
  Store,
  CheckCircle2
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const mainNav = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Growth Opportunities', path: '/opportunities', icon: TrendingUp },
    { name: 'ProfitGuard', path: '/profitguard', icon: ShieldCheck },
    { name: 'Merchant Network', path: '/network', icon: Globe2 },
    { name: 'Products', path: '/products', icon: Package },
    { name: 'Customers', path: '/customers', icon: Users },
    { name: 'Offers', path: '/offers', icon: Tag },
    { name: 'Growth Copilot', path: '/copilot', icon: Compass, badge: 'Proactive' },
  ];

  const secondaryNav = [
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Help & Docs', path: '/help', icon: HelpCircle },
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
              <h1 className="text-sm font-bold text-[#002970] leading-tight">Paytm Merchant</h1>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Growth Copilot</p>
            </div>
          </div>
        </div>

        {/* Tagline Banner */}
        <div className="mx-4 mt-3 mb-2 px-3 py-1.5 bg-[#e6f7fc] border border-[#bfe8f6] rounded-lg">
          <p className="text-[11px] font-semibold text-[#0083ca] text-center tracking-wide">
            "No Prompts. Just Profits."
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
          <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Main Menu</p>
          {mainNav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#002970] text-white shadow-sm'
                      : 'text-slate-600 hover:text-[#002970] hover:bg-slate-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#00b9f1]' : 'text-slate-400'}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          isActive
                            ? 'bg-[#00b9f1] text-[#002970]'
                            : 'bg-sky-100 text-[#0083ca]'
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
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Support</p>
            {secondaryNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#002970] text-white'
                        : 'text-slate-600 hover:text-[#002970] hover:bg-slate-50'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#00b9f1]' : 'text-slate-400'}`} />
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
          <div className="flex items-center gap-3 p-2 rounded-lg bg-white border border-slate-200">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
              <Store className="w-4 h-4 text-[#002970]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <p className="text-xs font-bold text-slate-800 truncate">Store M001</p>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              </div>
              <p className="text-[11px] text-slate-400 truncate">Demo Merchant</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
