import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function EmptyState({
  icon: Icon = HelpCircle,
  title,
  description,
  action,
  className = '',
}) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 p-12 text-center max-w-lg mx-auto my-6 shadow-card ${className}`}>
      <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-slate-800 mb-1.5">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
