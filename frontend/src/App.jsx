import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BackendProvider } from './context/BackendContext';
import Layout from './components/layout/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import Opportunities from './pages/Opportunities';
import ProfitGuard from './pages/ProfitGuard';
import NetworkIntelligence from './pages/NetworkIntelligence';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Offers from './pages/Offers';
import GrowthCopilot from './pages/GrowthCopilot';
import Settings from './pages/Settings';
import Help from './pages/Help';

export default function App() {
  return (
    <BackendProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="opportunities" element={<Opportunities />} />
            <Route path="profitguard" element={<ProfitGuard />} />
            <Route path="network" element={<NetworkIntelligence />} />
            <Route path="products" element={<Products />} />
            <Route path="customers" element={<Customers />} />
            <Route path="offers" element={<Offers />} />
            <Route path="copilot" element={<GrowthCopilot />} />
            <Route path="settings" element={<Settings />} />
            <Route path="help" element={<Help />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BackendProvider>
  );
}
