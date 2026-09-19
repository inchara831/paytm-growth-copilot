import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import ProactiveBusinessAlert from '../ProactiveBusinessAlert';
import { useLanguage } from '../../context/LanguageContext';
import apiService from '../../services/api';
import { getLocalizedInsights } from '../../services/translations';
import { AlertCircle, X } from 'lucide-react';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [topAlertInsight, setTopAlertInsight] = useState(null);
  const location = useLocation();
  const { t, language, voiceNotice, dismissVoiceNotice } = useLanguage();

  useEffect(() => {
    async function loadAlertInsight() {
      try {
        const insights = await apiService.getAssistantInsights(language);
        const localized = getLocalizedInsights(insights, language);
        if (localized && localized.length > 0) {
          setTopAlertInsight(localized[0]);
        }
      } catch (err) {
        // Fallback to client-side localized default
        const localized = getLocalizedInsights([], language);
        if (localized && localized.length > 0) {
          setTopAlertInsight(localized[0]);
        }
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
          subtitle: 'Settings, 8 Indian languages, and voice options',
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

        {/* Global Voice Unavailable Alert Notification */}
        {voiceNotice && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 flex items-center justify-between text-xs text-amber-900 shadow-sm animate-fade-in">
            <div className="flex items-center gap-2 max-w-4xl">
              <span className="p-1 rounded-full bg-amber-100 text-amber-800 shrink-0 text-sm">
                📢
              </span>
              <p className="leading-snug font-medium">{voiceNotice.message}</p>
            </div>
            <button
              onClick={dismissVoiceNotice}
              className="p-1 text-amber-700 hover:text-amber-900 rounded-lg shrink-0 ml-2"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        <footer className="py-4 px-6 border-t border-slate-200 bg-white text-center text-xs text-slate-400">
          <p>
            {t('appName')} {t('appSubname')} • {t('shopName')} • "{t('tagline')}"
          </p>
        </footer>
      </div>

      {/* Proactive Business Alert Pop-up Modal */}
      {topAlertInsight && (
        <ProactiveBusinessAlert
          insight={topAlertInsight}
          onDismiss={() => setTopAlertInsight(null)}
        />
      )}
    </div>
  );
}
