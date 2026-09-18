import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageMeta = () => {
    switch (location.pathname) {
      case '/':
        return {
          title: 'Merchant Dashboard',
          subtitle: 'Real-time performance and proactive profit intelligence',
        };
      case '/opportunities':
        return {
          title: 'Growth Opportunities',
          subtitle: 'Algorithmically detected revenue and traffic optimization windows',
        };
      case '/profitguard':
        return {
          title: 'ProfitGuard™ Margin Simulation',
          subtitle: 'Verify profit preservation before launching discounts',
        };
      case '/network':
        return {
          title: 'Merchant Network Intelligence',
          subtitle: 'Aggregated regional market signals and transaction distribution',
        };
      case '/products':
        return {
          title: 'Product Analytics',
          subtitle: 'Performance, volume, and unit margins across catalog',
        };
      case '/customers':
        return {
          title: 'Customer Intelligence',
          subtitle: 'Customer segment performance and repeat retention metrics',
        };
      case '/offers':
        return {
          title: 'Targeted Offers & Promotions',
          subtitle: 'Configured merchant promotions and backend verification',
        };
      case '/copilot':
        return {
          title: 'Paytm Growth Copilot',
          subtitle: 'Autonomous decision engine — "No Prompts. Just Profits."',
        };
      case '/settings':
        return {
          title: 'Settings & Configuration',
          subtitle: 'API endpoints, merchant profile, and system status',
        };
      case '/help':
        return {
          title: 'Help & Documentation',
          subtitle: 'System architecture, data provenance, and user guide',
        };
      default:
        return {
          title: 'Paytm Merchant Growth Copilot',
          subtitle: 'No Prompts. Just Profits.',
        };
    }
  };

  const meta = getPageMeta();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <Header
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          title={meta.title}
          subtitle={meta.subtitle}
        />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        <footer className="py-4 px-6 border-t border-slate-200 bg-white text-center text-xs text-slate-400">
          <p>
            Paytm Merchant Growth Copilot • Public Kaggle retail proxy dataset (demo M001) • No Prompts. Just Profits.
          </p>
        </footer>
      </div>
    </div>
  );
}
