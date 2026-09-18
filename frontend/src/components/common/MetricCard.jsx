import React from 'react';
import Card from './Card';

export default function MetricCard({
  title,
  value,
  subvalue,
  icon: Icon,
  trend,
  trendPositive = true,
  badgeText,
  color = 'blue',
}) {
  const iconColors = {
    blue: 'bg-blue-50 text-[#002970]',
    sky: 'bg-[#e6f7fc] text-[#0083ca]',
    emerald: 'bg-emerald-50 text-emerald-600',
    purple: 'bg-indigo-50 text-indigo-600',
    amber: 'bg-amber-50 text-amber-600',
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card hover:border-slate-300 transition-all">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 tracking-wider uppercase">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">{value}</span>
            {badgeText && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                {badgeText}
              </span>
            )}
          </div>
          {subvalue && (
            <p className="mt-1.5 text-xs text-slate-500 font-medium">{subvalue}</p>
          )}
          {trend && (
            <div className="mt-2 flex items-center gap-1.5">
              <span
                className={`text-xs font-semibold ${
                  trendPositive ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {trend}
              </span>
              <span className="text-xs text-slate-400">vs historical</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-lg ${iconColors[color] || iconColors.blue}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
}
