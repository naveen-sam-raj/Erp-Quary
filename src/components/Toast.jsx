import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useErp } from '../context/ErpContext';

export default function Toast() {
  const { toast } = useErp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 rounded-xl shadow-2xl border border-slate-700/50 dark:border-slate-200 animate-slide-up transition-all">
      {icons[toast.type] || icons.success}
      <span className="text-sm font-medium pr-2">{toast.message}</span>
    </div>
  );
}
