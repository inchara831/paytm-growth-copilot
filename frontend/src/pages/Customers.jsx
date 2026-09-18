import React from 'react';
import { Users, Shield, Database, ArrowRight, Lock } from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';

export default function Customers() {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-blue-50 text-[#002970]">
              <Users className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Customer Analytics & CRM
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Customer Intelligence</h2>
          <p className="text-xs text-slate-500 mt-1">
            Segment analysis, customer retention cohorts, and repeat purchase patterns.
          </p>
        </div>

        <Badge variant="neutral" size="lg">
          Module Unlinked
        </Badge>
      </div>

      {/* Required Empty State */}
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-xl mx-auto my-8 shadow-card">
        <div className="w-14 h-14 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200">
          <Users className="w-7 h-7 text-slate-400" />
        </div>

        <h3 className="text-base font-bold text-slate-800 mb-2">
          Customer intelligence is not currently available from the connected backend.
        </h3>

        <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto mb-6">
          The currently connected FastAPI backend provides macro analytics, hourly breakdowns, product volume, and regional network intelligence. Customer-level identifiers are anonymized and not exposed as an API endpoint to respect privacy constraints.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-2 mb-6">
          <div className="flex items-start gap-2 text-slate-700">
            <Database className="w-4 h-4 text-[#002970] shrink-0 mt-0.5" />
            <span>
              <strong>Dataset Proxy Status:</strong> The raw Kaggle proxy dataset contains synthetic customer codes (<code className="text-slate-600 bg-slate-100 px-1 rounded">customer_id</code>), but no customer intelligence endpoint is active on the backend.
            </span>
          </div>
          <div className="flex items-start gap-2 text-slate-700">
            <Lock className="w-4 h-4 text-[#00b9f1] shrink-0 mt-0.5" />
            <span>
              <strong>Privacy Architecture:</strong> When integrated with Paytm's production merchant APIs, customer insights will leverage tokenized privacy-preserving cohort analysis (e.g. repeat buyers, churn risk).
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <a
            href="/"
            className="px-4 py-2 bg-[#002970] hover:bg-[#00225c] text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Return to Dashboard
          </a>
          <a
            href="/help"
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
          >
            View Data Architecture
          </a>
        </div>
      </div>
    </div>
  );
}
