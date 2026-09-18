import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import Badge from './common/Badge';

export default function NextBestAction({
  recommendationData,
  className = '',
}) {
  const navigate = useNavigate();

  if (!recommendationData) {
    return null;
  }

  const { recommendation, context, engine } = recommendationData;
  const hours = context?.hours || [];
  const baseline = context?.baseline_hourly_revenue;
  const hourlyRevenue = context?.hourly_revenue || [];

  // Calculate potential gap based on actual backend data
  const totalCurrentLowRevenue = hourlyRevenue.reduce((acc, v) => acc + v, 0);
  const totalBaselineTarget = baseline && hours.length > 0 ? baseline * hours.length : 0;
  const potentialRevenueLift = totalBaselineTarget > totalCurrentLowRevenue ? totalBaselineTarget - totalCurrentLowRevenue : 0;

  return (
    <div className={`bg-gradient-to-r from-[#002970] to-[#003896] text-white rounded-xl p-6 shadow-elevated border border-blue-900 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#00b9f1]/20 text-[#00b9f1] border border-[#00b9f1]/30">
              <Zap className="w-3 h-3 text-[#00b9f1]" /> Next Best Action
            </span>
            {engine && (
              <span className="text-[10px] text-blue-200/80">
                • {engine}
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            {recommendation || 'Proactive Store Recommendation'}
          </h3>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => navigate('/profitguard')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white text-[#002970] text-xs font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 text-[#002970]" />
            Simulate Impact
          </button>
          <button
            onClick={() => navigate('/offers?action=create')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#00b9f1] text-[#002970] text-xs font-semibold rounded-lg hover:bg-[#33c7f4] transition-colors shadow-sm"
          >
            <Tag className="w-4 h-4 text-[#002970]" />
            Create Offer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-blue-800/80 text-xs">
        <div>
          <p className="font-semibold text-blue-200 uppercase tracking-wider text-[10px] mb-1">
            Why It Matters:
          </p>
          <p className="text-blue-100 leading-relaxed">
            {hours.length > 0 ? (
              <>
                Detected <span className="font-bold text-white">{hours.length} off-peak hours</span> ({hours.map(h => `${h}:00`).join(', ')}) generating under 70% of the baseline average.
              </>
            ) : (
              'Algorithm identified underperforming time windows with high potential upside.'
            )}
          </p>
        </div>

        <div>
          <p className="font-semibold text-blue-200 uppercase tracking-wider text-[10px] mb-1">
            Baseline Reference:
          </p>
          <p className="text-blue-100 leading-relaxed">
            Average baseline hourly revenue is{' '}
            <span className="font-bold text-white">
              ₹{baseline ? baseline.toLocaleString('en-IN', { maximumFractionDigits: 2 }) : 'N/A'}
            </span>
            . Targeted promotions during low traffic hours can smooth demand.
          </p>
        </div>

        <div>
          <p className="font-semibold text-blue-200 uppercase tracking-wider text-[10px] mb-1">
            Simulated Opportunity Gap:
          </p>
          <p className="text-blue-100 leading-relaxed">
            {potentialRevenueLift > 0 ? (
              <>
                Estimated recovery gap of{' '}
                <span className="font-bold text-[#00b9f1]">
                  ₹{potentialRevenueLift.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </span>{' '}
                across flagged slots.
              </>
            ) : (
              'Simulate in ProfitGuard to evaluate profit impact before discounting.'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
