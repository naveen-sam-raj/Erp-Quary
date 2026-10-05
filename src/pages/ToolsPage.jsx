import React, { useState } from 'react';
import {
  Wrench,
  Download,
  Upload,
  Calendar,
  Scale,
  Languages,
  Globe,
  Percent,
  CheckCircle2,
  X
} from 'lucide-react';
import { useErp } from '../context/ErpContext';

export default function ToolsPage() {
  const { showToast } = useErp();
  const [activeModal, setActiveModal] = useState(null);

  const toolsList = [
    { id: 'export', title: 'Export Product Master', desc: 'Download CSV / Excel template of all 10 products', icon: Download, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/50' },
    { id: 'import', title: 'Import Product Master', desc: 'Batch upload products via Excel / CSV format', icon: Upload, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50' },
    { id: 'yearEnd', title: 'Financial Year Closing', desc: 'Carry forward ledger opening balances to FY 2026-27', icon: Calendar, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/50' },
    { id: 'weighbridge', title: 'Weighing Scale Item Updater', desc: 'Calibrate RS232 weighbridge sensor data mapping', icon: Scale, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/50' },
    { id: 'translator', title: 'Language Translator', desc: 'Switch interface language between English and Tamil', icon: Languages, color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/50' },
    { id: 'regional', title: 'Regional Name Updater', desc: 'Update Tamil product names for local weighbridge slips (e.g., 20mm ஜல்லி)', icon: Globe, color: 'text-teal-500 bg-teal-50 dark:bg-teal-950/50' },
    { id: 'gst', title: 'GST Rate Mass Updater', desc: 'Batch update HSN codes and GST slab percentages', icon: Percent, color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/50' },
  ];

  const handleToolRun = (toolTitle) => {
    showToast(`Action "${toolTitle}" executed successfully (Frontend Demo Mode)`);
    setActiveModal(null);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in">
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
        <span className="font-extrabold text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wider">System Administration</span>
        <h1 className="text-xl font-black text-slate-900 dark:text-white mt-1">Tools & Utility Operations</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {toolsList.map(t => {
          const Icon = t.icon;
          return (
            <div
              key={t.id}
              onClick={() => setActiveModal(t)}
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${t.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">{t.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{t.desc}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                  Launch Tool Modal →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Tool Modal Dialog */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-slide-up">
            <div className="flex justify-between items-center border-b pb-3 border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">{activeModal.title}</h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              {activeModal.desc}. This is a frontend demo interaction. No server files will be mutated.
            </p>

            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-xs space-y-2">
              <p className="font-bold text-slate-700 dark:text-slate-200">Configuration Options:</p>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                <span>Include inactive demo records</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                <span>Auto-backup temporary state</span>
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleToolRun(activeModal.title)}
                className="px-5 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs shadow-lg shadow-blue-600/30"
              >
                Execute Tool
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
