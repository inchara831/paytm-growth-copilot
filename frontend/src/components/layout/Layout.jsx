import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import ProactiveBusinessAlert from '../ProactiveBusinessAlert';
import { useLanguage } from '../../context/LanguageContext';
import apiService from '../../services/api';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [topAlertInsight, setTopAlertInsight] = useState(null);
  const location = useLocation();
  const { t, language } = useLanguage();

  useEffect(() => {
    async function loadAlertInsight() {
      try {
        const insights = await apiService.getAssistantInsights(language);
        if (insights && insights.length > 0) {
          setTopAlertInsight(insights[0]);
        }
      } catch (err) {
        // Silent fallback
      }
    }
    loadAlertInsight();
  }, [language]);

  const getPageMeta = () => {
    switch (location.pathname) {
      case '/':
        return {
          title: t('navYourShop'),
          subtitle: t('todaysBusinessSub'),
        };
      case '/copilot':
        return {
          title: t('navWhatYouCanDo'),
          subtitle: t('copilotSub'),
        };
      case '/products':
        return {
          title: t('navProducts'),
          subtitle: t('productsNeedingAttentionSub'),
        };
      case '/offers':
        return {
          title: t('navOffers'),
          subtitle: t('offersSub'),
        };
      case '/trends':
      case '/network':
        return {
          title: t('navLocalTrends'),
          subtitle: t('localTrendsSub'),
        };
      case '/settings':
        return {
          title: t('navSettings'),
          subtitle: 'Settings, language, and voice options',
        };
      case '/help':
        return {
          title: t('navHelp'),
          subtitle: 'Guide and explanations for your shop',
        };
      default:
        return {
          title: t('appName'),
          subtitle: t('tagline'),
        };
    }
  };

  const meta = getPageMeta();

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
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
            {t('appName')} {t('appSubname')} • {t('shopName')} • "{t('tagline')}"
          </p>
        </footer>
      </div>

      {/* Proactive Business Alert Pop-up */}
      {topAlertInsight && (
        <ProactiveBusinessAlert
          insight={topAlertInsight}
          onDismiss={() => setTopAlertInsight(null)}
        />
      )}
    </div>
  );
}
