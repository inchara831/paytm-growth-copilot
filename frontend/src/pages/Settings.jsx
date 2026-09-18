import React from 'react';
import { useBackend } from '../context/BackendContext';
import { Settings as SettingsIcon, Server, Store, Database, Shield, RefreshCw } from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';

export default function Settings() {
  const { isConnected, healthData, isLoading, lastChecked, checkHealth } = useBackend();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-blue-50 text-[#002970]">
              <SettingsIcon className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              System Configuration
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Settings & Environment</h2>
          <p className="text-xs text-slate-500 mt-1">
            API endpoints, merchant profile status, and backend connectivity parameters.
          </p>
        </div>

        <button
          onClick={checkHealth}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-3 py-2 bg-[#002970] hover:bg-[#00225c] text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Checking...' : 'Ping Backend'}
        </button>
      </div>

      {/* Backend API Settings */}
      <Card title="FastAPI Backend Connection" subtitle="Configured via environment variables">
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">
                Target API Host
              </span>
              <code className="text-sm font-mono text-[#002970] font-semibold mt-1 block">
                {apiBaseUrl}
              </code>
            </div>

            <div>
              <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">
                Connection Status
              </span>
              <div className="mt-1">
                {isConnected ? (
                  <Badge variant="success">Online & Healthy</Badge>
                ) : (
                  <Badge variant="danger">Disconnected / Offline</Badge>
                )}
              </div>
            </div>

            <div>
              <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">
                Last Health Check
              </span>
              <p className="text-xs text-slate-700 font-medium mt-1">
                {lastChecked ? lastChecked.toLocaleTimeString() : 'Never'}
              </p>
            </div>
          </div>

          <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-100 text-slate-600 space-y-1">
            <p className="font-semibold text-[#002970]">Environment Variable:</p>
            <p>
              To redirect to another server or staging host, set <code className="bg-white px-1.5 py-0.5 rounded border border-blue-200 text-[#002970] font-mono">VITE_API_BASE_URL</code> in <code className="bg-white px-1.5 py-0.5 rounded border border-blue-200 text-[#002970] font-mono">frontend/.env</code>.
            </p>
          </div>
        </div>
      </Card>

      {/* Merchant Profile */}
      <Card title="Merchant Profile" subtitle="Active store operating context">
        <div className="space-y-3 text-xs">
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-500">Merchant Identifier:</span>
            <span className="font-mono font-bold text-slate-800">M001</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-500">Business Name:</span>
            <span className="font-medium text-slate-800">Paytm Demo Retail Store</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-500">Database Record Volume:</span>
            <span className="font-medium text-slate-800">
              {healthData?.transactions ? Number(healthData.transactions).toLocaleString('en-IN') : 'Loading...'} transactions
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-500">Data Source Disclaimer:</span>
            <span className="text-slate-600">{healthData?.source || 'Kaggle retail proxy; not Paytm data'}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
