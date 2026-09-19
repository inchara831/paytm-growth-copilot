import React from 'react';
import { WifiOff, RefreshCw, AlertCircle } from 'lucide-react';

const defaultApiUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export default function OfflineState({
  title = 'Backend Offline',
  message = `Unable to connect to the FastAPI backend server at ${defaultApiUrl}. Please ensure the backend is running.`,
  onRetry,
  isRetrying = false,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-8 text-center max-w-lg mx-auto my-8 shadow-sm">
      <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
        <WifiOff className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 mb-6 leading-relaxed">{message}</p>
      
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-left text-slate-600 font-mono mb-6">
        <p className="font-semibold text-slate-700 mb-1">To start backend:</p>
        <code>uvicorn backend.app.main:app --reload --port 8000</code>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          disabled={isRetrying}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#002970] hover:bg-[#00225c] text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
          {isRetrying ? 'Connecting...' : 'Retry Connection'}
        </button>
      )}
    </div>
  );
}
