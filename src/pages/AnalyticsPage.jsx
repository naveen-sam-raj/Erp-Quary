import React from 'react';
import { TrendingUp, DollarSign, Boxes, ShoppingCart, BarChart2 } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function AnalyticsPage() {
  const trendData = [
    { month: 'May', sales: 420000, purchase: 280000, profit: 140000 },
    { month: 'Jun', sales: 510000, purchase: 320000, profit: 190000 },
    { month: 'Jul', sales: 480000, purchase: 300000, profit: 180000 },
    { month: 'Aug', sales: 620000, purchase: 390000, profit: 230000 },
    { month: 'Sep', sales: 590000, purchase: 370000, profit: 220000 },
    { month: 'Oct', sales: 680000, purchase: 410000, profit: 270000 },
  ];

  const topProductsData = [
    { name: 'Blue Metal 20mm', revenue: 245000 },
    { name: 'M-Sand', revenue: 195000 },
    { name: 'Blue Metal 40mm', revenue: 160000 },
    { name: 'P-Sand', revenue: 140000 },
    { name: 'GSB Sub-Base', revenue: 98000 },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in">
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
        <span className="font-extrabold text-xs text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Executive Intelligence</span>
        <h1 className="text-xl font-black text-slate-900 dark:text-white mt-1">ANNAI BLUE METAL Performance Analytics</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales vs Purchase Trend */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">6-Month Revenue & Margin Growth (₹)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${v/1000}k`} />
                <Tooltip formatter={(v) => `₹${v.toLocaleString('en-IN')}`} />
                <Bar dataKey="sales" name="Sales" fill="#2563eb" radius={[6, 6, 0, 0]} />
                <Bar dataKey="profit" name="Profit" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Performing Materials */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Top Revenue Generating Products (₹)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProductsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tickFormatter={(v) => `₹${v/1000}k`} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v) => `₹${v.toLocaleString('en-IN')}`} />
                <Bar dataKey="revenue" fill="#6366f1" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
