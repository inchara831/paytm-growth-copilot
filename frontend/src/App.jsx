import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BackendProvider } from './context/BackendContext';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/layout/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import GrowthCopilot from './pages/GrowthCopilot';
import Products from './pages/Products';
import Offers from './pages/Offers';
import LocalTrends from './pages/LocalTrends';
import Settings from './pages/Settings';
import Help from './pages/Help';

export default function App() {
  return (
    <LanguageProvider>
      <BackendProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* 🏠 Your Shop */}
              <Route index element={<Dashboard />} />
              {/* 💡 What You Can Do */}
              <Route path="copilot" element={<GrowthCopilot />} />
              {/* 🛍️ Products */}
              <Route path="products" element={<Products />} />
              {/* 🎁 Offers */}
              <Route path="offers" element={<Offers />} />
              {/* 📍 Local Trends */}
              <Route path="trends" element={<LocalTrends />} />
              {/* Settings & Help */}
              <Route path="settings" element={<Settings />} />
              <Route path="help" element={<Help />} />

              {/* Backward compatibility redirects */}
              <Route path="network" element={<Navigate to="/trends" replace />} />
              <Route path="opportunities" element={<Navigate to="/copilot" replace />} />
              <Route path="profitguard" element={<Navigate to="/copilot" replace />} />
              <Route path="customers" element={<Navigate to="/" replace />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </BackendProvider>
    </LanguageProvider>
  );
}
