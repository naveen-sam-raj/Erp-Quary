import React from 'react';
import { Building2, Moon, Sun, Save, Shield, Check } from 'lucide-react';
import { useErp } from '../context/ErpContext';

export default function SettingsPage() {
  const { companyInfo, darkMode, setDarkMode, showToast } = useErp();

  const handleSaveSettings = (e) => {
    e.preventDefault();
    showToast("Settings updated successfully (Frontend Demo Mode)");
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in">
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
        <span className="font-extrabold text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wider">System Preferences</span>
        <h1 className="text-xl font-black text-slate-900 dark:text-white mt-1">ANNAI BLUE METAL Profile & Preferences</h1>
      </div>

      <form onSubmit={handleSaveSettings} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-6 text-xs">
        <div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white border-b pb-2 border-slate-100 dark:border-slate-800">
            Company Tax & Header Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block font-semibold text-slate-500 mb-1">Company Name</label>
              <input type="text" defaultValue={companyInfo.name} className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 font-bold rounded-xl border" />
            </div>
            <div>
              <label className="block font-semibold text-slate-500 mb-1">GSTIN Number</label>
              <input type="text" defaultValue={companyInfo.gstin} className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 font-bold rounded-xl border" />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-500 mb-1">Registered Address</label>
              <input type="text" defaultValue={companyInfo.address} className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border" />
            </div>
            <div>
              <label className="block font-semibold text-slate-500 mb-1">Phone</label>
              <input type="text" defaultValue={companyInfo.phone} className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border" />
            </div>
            <div>
              <label className="block font-semibold text-slate-500 mb-1">Email</label>
              <input type="text" defaultValue={companyInfo.email} className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white border-b pb-2 border-slate-100 dark:border-slate-800">
            Appearance & Theme
          </h3>
          <div className="mt-4 flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Interface Dark Mode</p>
              <p className="text-slate-500 text-[11px]">Toggle high-contrast dark theme for night weighbridge shifts</p>
            </div>
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl flex items-center gap-2"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
              <span>{darkMode ? 'Dark Theme Active' : 'Light Theme Active'}</span>
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-blue-600/30">
            <Save className="w-4 h-4" /> Save System Settings
          </button>
        </div>
      </form>
    </div>
  );
}
