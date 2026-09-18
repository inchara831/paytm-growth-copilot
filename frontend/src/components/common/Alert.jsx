import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export default function Alert({
  type = 'info',
  title,
  children,
  className = '',
}) {
  const styles = {
    info: {
      container: 'bg-sky-50 border-sky-200 text-sky-900',
      icon: <Info className="w-5 h-5 text-[#00b9f1] shrink-0 mt-0.5" />,
      title: 'text-sky-900 font-semibold',
    },
    success: {
      container: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />,
      title: 'text-emerald-900 font-semibold',
    },
    warning: {
      container: 'bg-amber-50 border-amber-200 text-amber-900',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />,
      title: 'text-amber-900 font-semibold',
    },
    error: {
      container: 'bg-rose-50 border-rose-200 text-rose-900',
      icon: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />,
      title: 'text-rose-900 font-semibold',
    },
  };

  const current = styles[type] || styles.info;

  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border ${current.container} ${className}`}>
      {current.icon}
      <div className="text-sm">
        {title && <h4 className={`mb-1 ${current.title}`}>{title}</h4>}
        <div className="leading-relaxed text-slate-700">{children}</div>
      </div>
    </div>
  );
}
