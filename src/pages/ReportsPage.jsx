import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FileBarChart,
  Download,
  Printer,
  FileSpreadsheet,
  Search,
  Filter,
  Calendar,
  PieChart,
  CheckCircle2
} from 'lucide-react';
import { useErp } from '../context/ErpContext';

export default function ReportsPage({ defaultReport = 'sales' }) {
  const { reportType } = useParams();
  const navigate = useNavigate();
  const activeReport = reportType || defaultReport;

  const { invoices, purchases, products, ledgers, showToast } = useErp();
  const [dateRange, setDateRange] = useState({ start: '2026-10-01', end: '2026-10-05' });

  const handleExportExcel = () => {
    showToast("Exporting report data to Excel (.xlsx) [Demo]");
  };

  const handleDownloadPDF = () => {
    showToast("Generating PDF report summary [Demo]");
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in">
      {/* Header & Report Selector */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="font-extrabold text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wider">Business Intelligence</span>
            <h1 className="text-xl font-black text-slate-900 dark:text-white capitalize">{activeReport} Analysis Report</h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportExcel}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
            >
              <FileSpreadsheet className="w-4 h-4" /> Export Excel
            </button>
            <button
              onClick={handleDownloadPDF}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
            >
              <Download className="w-4 h-4" /> Download PDF
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
            >
              <Printer className="w-4 h-4" /> Print Report
            </button>
          </div>
        </div>

        {/* Report Subtabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {[
            { id: 'sales', label: 'Sales Report' },
            { id: 'purchase', label: 'Purchase Report' },
            { id: 'stock', label: 'Stock Valuation Report' },
            { id: 'tax', label: 'GST Tax Report' },
            { id: 'accounts', label: 'Accounts Ledger Report' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => navigate(`/reports/${tab.id}`)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeReport === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Date Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-blue-600" />
          <span className="font-semibold text-slate-500">Date Range:</span>
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl border"
          />
          <span className="text-slate-400">to</span>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl border"
          />
        </div>

        <div className="font-bold text-slate-700 dark:text-slate-300">
          Showing 5 Period Records
        </div>
      </div>

      {/* Summary Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <span className="text-slate-500 font-medium">Total Billed Gross</span>
          <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">₹1,84,300</p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <span className="text-slate-500 font-medium">Total Tax Liability (CGST+SGST)</span>
          <p className="text-xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">₹29,250</p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <span className="text-slate-500 font-medium">Total Discount Granted</span>
          <p className="text-xl font-extrabold text-amber-500 mt-1">₹0.00</p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <span className="text-slate-500 font-medium">Net Sales Value</span>
          <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">₹1,93,350</p>
        </div>
      </div>

      {/* Report Data Table */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold border-b">
                <th className="p-3">Reference No</th>
                <th className="p-3">Date</th>
                <th className="p-3">Party / Customer</th>
                <th className="p-3 text-right">Taxable Subtotal (₹)</th>
                <th className="p-3 text-right">Tax Amount (₹)</th>
                <th className="p-3 text-right">Grand Total (₹)</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {invoices.map(inv => (
                <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-blue-600">{inv.id}</td>
                  <td className="p-3 text-slate-500">{inv.date}</td>
                  <td className="p-3 font-bold">{inv.customer}</td>
                  <td className="p-3 text-right font-medium">₹{inv.subtotal?.toLocaleString('en-IN')}</td>
                  <td className="p-3 text-right text-slate-500">₹{((inv.cgst || 0) + (inv.sgst || 0)).toLocaleString('en-IN')}</td>
                  <td className="p-3 text-right font-black text-slate-900 dark:text-white">₹{inv.grandTotal.toLocaleString('en-IN')}</td>
                  <td className="p-3 font-semibold text-emerald-600">{inv.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
