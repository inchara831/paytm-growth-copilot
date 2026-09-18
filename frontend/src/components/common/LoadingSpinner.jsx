import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ message = 'Loading analytics data...', size = 'md' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <Loader2 className={`${sizeClasses[size] || sizeClasses.md} animate-spin text-[#002970] mb-3`} />
      <p className="text-sm font-medium text-slate-500">{message}</p>
    </div>
  );
}
