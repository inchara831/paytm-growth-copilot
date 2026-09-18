import React from 'react';
import { HelpCircle, ShieldCheck, Compass, Database, Terminal, FileText } from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';

export default function Help() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-blue-50 text-[#002970]">
              <HelpCircle className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Documentation & Architecture
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Help & User Guide</h2>
          <p className="text-xs text-slate-500 mt-1">
            Overview of the Paytm Merchant Growth Copilot engine and analytical models.
          </p>
        </div>

        <Badge variant="paytm">Version 1.0.0</Badge>
      </div>

      {/* Philosophy */}
      <Card title="Philosophy: 'No Prompts. Just Profits.'" subtitle="Why autonomous proactive decisioning beats conversational chatbots">
        <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
          <p>
            Busy merchants don't have time to converse with AI chatbots, engineer prompts, or formulate queries. Traditional chat interfaces shift the cognitive burden onto the merchant.
          </p>
          <p>
            <strong>Paytm Merchant Growth Copilot</strong> flips this model: the system autonomously ingests store transactions, analyzes traffic curves and unit economics, and directly presents high-conviction priorities with single-click actions.
          </p>
        </div>
      </Card>

      {/* ProfitGuard Explanation */}
      <Card title="How ProfitGuard™ Works" subtitle="Guarding margins against naive discounting">
        <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
          <p>
            A 10% discount requires a disproportionately large volume increase just to break even on profit:
          </p>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px] text-slate-800 space-y-1">
            <p>Baseline Revenue = Price × Quantity</p>
            <p>Baseline Profit = (Price - Cost) × Quantity</p>
            <p>Projected Revenue = Price × (1 - Discount) × Quantity × (1 + Demand Lift)</p>
            <p>Projected Profit = [Price × (1 - Discount) - Cost] × Quantity × (1 + Demand Lift)</p>
          </div>
          <p>
            If the reduction in unit profit margin outweighs the demand lift, total profit contracts. ProfitGuard automatically computes this threshold and warns the merchant before launch.
          </p>
        </div>
      </Card>

      {/* Dataset Provenance Disclaimer */}
      <Card title="Dataset Provenance & Disclosure" subtitle="Kaggle Retail Transactions Proxy">
        <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900">
            <strong>Important Notice:</strong> This prototype uses a public retail dataset from Kaggle (Shashank S., MIT License) as an analytical proxy. It does <strong>not</strong> use or claim to use live Paytm proprietary merchant records.
          </div>
          <p>
            Synthetic fields generated deterministically include demo merchant identifier (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono">M001</code>), estimated unit costs (72% baseline adjusted by product code hash), and anonymized regional locations.
          </p>
        </div>
      </Card>

      {/* API Reference */}
      <Card title="Available FastAPI Endpoints" subtitle="Backed by backend/app/main.py">
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50">
                <th className="py-2.5 px-3">Method</th>
                <th className="py-2.5 px-3">Endpoint</th>
                <th className="py-2.5 px-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px] text-slate-700">
              <tr>
                <td className="py-2 px-3 text-emerald-600 font-bold">GET</td>
                <td className="py-2 px-3">/health</td>
                <td className="font-sans text-slate-600">Health check and transaction count</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-emerald-600 font-bold">GET</td>
                <td className="py-2 px-3">/analytics/overview</td>
                <td className="font-sans text-slate-600">Total revenue, profit, transactions, avg line amount</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-emerald-600 font-bold">GET</td>
                <td className="py-2 px-3">/analytics/hourly</td>
                <td className="font-sans text-slate-600">Hourly sales and transaction volume</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-emerald-600 font-bold">GET</td>
                <td className="py-2 px-3">/analytics/products</td>
                <td className="font-sans text-slate-600">Top 20 products by revenue and quantity</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-emerald-600 font-bold">GET</td>
                <td className="py-2 px-3">/opportunities</td>
                <td className="font-sans text-slate-600">Low-sales hours vs baseline revenue</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-blue-600 font-bold">POST</td>
                <td className="py-2 px-3">/profitguard/simulate</td>
                <td className="font-sans text-slate-600">Simulate discount impact on net profit vs revenue</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-emerald-600 font-bold">GET</td>
                <td className="py-2 px-3">/ai/recommendation</td>
                <td className="font-sans text-slate-600">Deterministic actionable recommendation</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-emerald-600 font-bold">GET</td>
                <td className="py-2 px-3">/offers</td>
                <td className="font-sans text-slate-600">List active promotional offers</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-blue-600 font-bold">POST</td>
                <td className="py-2 px-3">/offers</td>
                <td className="font-sans text-slate-600">Create new offer confirmed by backend</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-emerald-600 font-bold">GET</td>
                <td className="py-2 px-3">/network/intelligence</td>
                <td className="font-sans text-slate-600">Aggregated regional transactions and revenue</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
