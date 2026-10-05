import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Package,
  AlertTriangle,
  ArrowUpRight,
  Eye,
  Printer,
  Plus,
  ArrowRight,
  Boxes,
  Truck,
  Building2,
  Calendar,
  Filter
} from 'lucide-react';
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
import { useErp } from '../context/ErpContext';
import InvoicePreviewModal from '../components/InvoicePreviewModal';

export default function DashboardPage() {
  const { invoices, products, showToast } = useErp();
  const navigate = useNavigate();

  const [timeFilter, setTimeFilter] = useState('7 Days'); // 'Today' | '7 Days' | '30 Days' | 'This Month'
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Recharts Chart Mock Data based on filter
  const salesChartData = {
    'Today': [
      { time: '08:00 AM', sales: 15200, purchase: 10000, profit: 5200 },
      { time: '10:00 AM', sales: 42500, purchase: 28000, profit: 14500 },
      { time: '12:00 PM', sales: 68000, purchase: 45000, profit: 23000 },
      { time: '02:00 PM', sales: 112000, purchase: 72000, profit: 40000 },
      { time: '04:00 PM', sales: 165000, purchase: 105000, profit: 60000 },
      { time: '06:00 PM', sales: 193350, purchase: 124500, profit: 68450 },
    ],
    '7 Days': [
      { name: 'Mon', sales: 145000, purchase: 95000, profit: 50000 },
      { name: 'Tue', sales: 168000, purchase: 110000, profit: 58000 },
      { name: 'Wed', sales: 152000, purchase: 98000, profit: 54000 },
      { name: 'Thu', sales: 210000, purchase: 140000, profit: 70000 },
      { name: 'Fri', sales: 185000, purchase: 120000, profit: 65000 },
      { name: 'Sat', sales: 220000, purchase: 145000, profit: 75000 },
      { name: 'Sun', sales: 193350, purchase: 124500, profit: 68450 },
    ],
    '30 Days': [
      { name: 'Week 1', sales: 980000, purchase: 640000, profit: 340000 },
      { name: 'Week 2', sales: 1120000, purchase: 750000, profit: 370000 },
      { name: 'Week 3', sales: 1050000, purchase: 690000, profit: 360000 },
      { name: 'Week 4', sales: 1275000, purchase: 820000, profit: 455000 },
    ],
    'This Month': [
      { name: '01 Oct', sales: 180000, purchase: 115000, profit: 65000 },
      { name: '02 Oct', sales: 210000, purchase: 130000, profit: 80000 },
      { name: '03 Oct', sales: 195000, purchase: 125000, profit: 70000 },
      { name: '04 Oct', sales: 230000, purchase: 150000, profit: 80000 },
      { name: '05 Oct', sales: 193350, purchase: 124500, profit: 68450 },
    ]
  }[timeFilter];

  // Stock Distribution Pie Chart Data (Warm Biscuit Palette)
  const stockDistribution = [
    { name: 'Aggregate 20mm/40mm', value: 375, color: '#92400e' },
    { name: 'Sand (M-Sand/P-Sand)', value: 77, color: '#d97706' },
    { name: 'Sub-Base (GSB/WMM)', value: 550, color: '#166534' },
    { name: 'Crusher Dust', value: 450, color: '#78350f' },
    { name: 'Raw Boulder', value: 520, color: '#b45309' },
  ];

  const lowStockItems = products.filter(p => p.stock < p.minStock);

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in">
      {/* Top Welcome Header (Warm Biscuit Roasted Coffee Banner) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#543722] via-[#7b522c] to-[#451a03] text-white p-6 rounded-3xl shadow-xl border border-[#986d37]/40 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-[#f7f0e3] border border-white/20 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#86efac] animate-ping"></span>
            Crusher Unit 1 Operating Live
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight">Good Morning!</h1>
          <p className="text-[#ede0cb] text-xs md:text-sm font-medium mt-1">
            ANNAI BLUE METAL – Business & Quarry Operations Overview
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <Link
            to="/inventory/sales-billing"
            className="px-5 py-2.5 bg-[#15803d] hover:bg-[#166534] text-white font-bold text-xs rounded-2xl flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition-all hover:scale-105"
          >
            <ShoppingCart className="w-4 h-4" /> Create Sales Bill (POS)
          </Link>
          <button
            onClick={() => navigate('/masters/products')}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-2xl border border-white/20 transition-all"
          >
            + Add Product
          </button>
        </div>

        {/* Ambient background glow */}
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-[#b48c4d]/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Top 6 KPI Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* 1. Today's Sales */}
        <div className="bg-[#fdfbf7] dark:bg-[#231913] p-4 rounded-2xl shadow-sm border border-[#ede0cb] dark:border-[#3a281d] hover:shadow-md transition-all">
          <div className="flex justify-between items-center text-[#85542e] dark:text-[#c4b1a3] text-xs font-medium">
            <span>Today's Sales</span>
            <div className="w-8 h-8 rounded-xl bg-[#fef3c7] dark:bg-[#382614] text-[#92400e] dark:text-[#fbbf24] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-[#2b1b10] dark:text-white mt-2">₹1,93,350</div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-[#15803d] dark:text-[#86efac] mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +14.2% vs yesterday
          </div>
        </div>

        {/* 2. Today's Purchase */}
        <div className="bg-[#fdfbf7] dark:bg-[#231913] p-4 rounded-2xl shadow-sm border border-[#ede0cb] dark:border-[#3a281d] hover:shadow-md transition-all">
          <div className="flex justify-between items-center text-[#85542e] dark:text-[#c4b1a3] text-xs font-medium">
            <span>Today's Purchase</span>
            <div className="w-8 h-8 rounded-xl bg-[#ffedf0] dark:bg-[#3a1d22] text-rose-700 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-[#2b1b10] dark:text-white mt-2">₹1,24,500</div>
          <div className="text-[11px] font-medium text-[#785438] mt-1">Raw boulder & fuel</div>
        </div>

        {/* 3. Total Receivables */}
        <div className="bg-[#fdfbf7] dark:bg-[#231913] p-4 rounded-2xl shadow-sm border border-[#ede0cb] dark:border-[#3a281d] hover:shadow-md transition-all">
          <div className="flex justify-between items-center text-[#85542e] dark:text-[#c4b1a3] text-xs font-medium">
            <span>Total Receivables</span>
            <div className="w-8 h-8 rounded-xl bg-[#fef3c7] dark:bg-[#382614] text-[#92400e] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-[#92400e] dark:text-[#fbbf24] mt-2">₹4,82,600</div>
          <div className="text-[11px] text-[#b45309] font-medium mt-1">5 clients outstanding</div>
        </div>

        {/* 4. Total Payables */}
        <div className="bg-[#fdfbf7] dark:bg-[#231913] p-4 rounded-2xl shadow-sm border border-[#ede0cb] dark:border-[#3a281d] hover:shadow-md transition-all">
          <div className="flex justify-between items-center text-[#85542e] dark:text-[#c4b1a3] text-xs font-medium">
            <span>Total Payables</span>
            <div className="w-8 h-8 rounded-xl bg-[#fee2e2] dark:bg-[#3f1919] text-rose-700 flex items-center justify-center">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-rose-700 dark:text-rose-400 mt-2">₹2,76,400</div>
          <div className="text-[11px] text-rose-600 font-medium mt-1">Suppliers & machinery</div>
        </div>

        {/* 5. Stock Value */}
        <div className="bg-[#fdfbf7] dark:bg-[#231913] p-4 rounded-2xl shadow-sm border border-[#ede0cb] dark:border-[#3a281d] hover:shadow-md transition-all">
          <div className="flex justify-between items-center text-[#85542e] dark:text-[#c4b1a3] text-xs font-medium">
            <span>Stock Value</span>
            <div className="w-8 h-8 rounded-xl bg-[#ede0cb] dark:bg-[#342318] text-[#543722] dark:text-[#f7f0e3] flex items-center justify-center">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-[#2b1b10] dark:text-white mt-2">₹12,45,800</div>
          <div className="text-[11px] text-[#15803d] dark:text-[#86efac] font-medium mt-1">1,972 Ton Total Stock</div>
        </div>

        {/* 6. Today's Profit */}
        <div className="bg-[#fdfbf7] dark:bg-[#231913] p-4 rounded-2xl shadow-sm border border-[#ede0cb] dark:border-[#3a281d] hover:shadow-md transition-all border-l-4 border-l-[#15803d]">
          <div className="flex justify-between items-center text-[#85542e] dark:text-[#c4b1a3] text-xs font-medium">
            <span>Today's Net Profit</span>
            <div className="w-8 h-8 rounded-xl bg-[#d1fae5] dark:bg-[#163e26] text-[#15803d] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-[#15803d] dark:text-[#86efac] mt-2">₹68,450</div>
          <div className="text-[11px] text-[#15803d] font-bold mt-1">Margin ~35.4%</div>
        </div>
      </div>

      {/* Main Charts & Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales vs Purchase Recharts Area */}
        <div className="lg:col-span-2 bg-[#fdfbf7] dark:bg-[#231913] p-5 rounded-3xl shadow-sm border border-[#ede0cb] dark:border-[#3a281d] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#ede0cb] dark:border-[#3a281d]">
            <div>
              <h2 className="text-base font-bold text-[#2b1b10] dark:text-white">Sales & Purchase Overview</h2>
              <p className="text-xs text-[#85542e] dark:text-[#c4b1a3]">Revenue trends, material purchase cost, and net margins</p>
            </div>

            {/* Time Filter Pills */}
            <div className="flex items-center gap-1 bg-[#f7f0e3] dark:bg-[#2d1e15] p-1 rounded-xl text-xs font-bold">
              {['Today', '7 Days', '30 Days', 'This Month'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setTimeFilter(tab)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    timeFilter === tab
                      ? 'bg-[#92400e] text-white shadow-md'
                      : 'text-[#68442b] dark:text-[#c4b1a3] hover:text-[#2b1b10] dark:hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#92400e" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#92400e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPurchase" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d97706" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ede0cb" opacity={0.6} />
                <XAxis dataKey={timeFilter === 'Today' ? 'time' : 'name'} tick={{ fontSize: 11, fill: '#785438' }} />
                <YAxis tick={{ fontSize: 11, fill: '#785438' }} tickFormatter={(val) => `₹${val/1000}k`} />
                <Tooltip
                  formatter={(val) => [`₹${val.toLocaleString('en-IN')}`, '']}
                  contentStyle={{ backgroundColor: '#2b1b10', borderRadius: '12px', border: 'none', color: '#fff' }}
                />
                <Area type="monotone" dataKey="sales" name="Sales (₹)" stroke="#92400e" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                <Area type="monotone" dataKey="purchase" name="Purchase (₹)" stroke="#d97706" strokeWidth={2} fillOpacity={1} fill="url(#colorPurchase)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stock Overview Pie Chart */}
        <div className="bg-[#fdfbf7] dark:bg-[#231913] p-5 rounded-3xl shadow-sm border border-[#ede0cb] dark:border-[#3a281d] space-y-4">
          <div className="pb-3 border-b border-[#ede0cb] dark:border-[#3a281d]">
            <h2 className="text-base font-bold text-[#2b1b10] dark:text-white">Stock Volume Breakdown</h2>
            <p className="text-xs text-[#85542e] dark:text-[#c4b1a3]">Material distribution in Quarry Yard (Tons)</p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stockDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {stockDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val) => [`${val} Ton`, 'Stock']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="space-y-1.5 text-xs">
            {stockDistribution.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-[#68442b] dark:text-[#c4b1a3]">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  {item.name}
                </span>
                <span className="font-bold text-[#2b1b10] dark:text-white">{item.value} Ton</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid: Recent Transactions & Low Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions Table */}
        <div className="lg:col-span-2 bg-[#fdfbf7] dark:bg-[#231913] p-5 rounded-3xl shadow-sm border border-[#ede0cb] dark:border-[#3a281d] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#ede0cb] dark:border-[#3a281d]">
            <div>
              <h2 className="text-base font-bold text-[#2b1b10] dark:text-white">Recent Sales Transactions</h2>
              <p className="text-xs text-[#85542e] dark:text-[#c4b1a3]">Latest weighbridge invoices issued today</p>
            </div>
            <Link
              to="/inventory/sales"
              className="text-xs font-bold text-[#92400e] dark:text-[#fbbf24] hover:underline flex items-center gap-1"
            >
              View All Invoices <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#f7f0e3] dark:bg-[#2d1e15] text-[#68442b] dark:text-[#c4b1a3] font-bold border-b border-[#ede0cb] dark:border-[#3a281d]">
                  <th className="py-3 px-3">Invoice No</th>
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Amount</th>
                  <th className="py-3 px-3">Payment</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ede0cb]/60 dark:divide-[#3a281d] text-[#451a03] dark:text-[#f7f0e3]">
                {invoices.slice(0, 5).map(inv => (
                  <tr key={inv.id} className="hover:bg-[#ede0cb]/50 dark:hover:bg-[#342318] transition-colors">
                    <td className="py-3 px-3 font-bold text-[#92400e] dark:text-[#fbbf24]">{inv.id}</td>
                    <td className="py-3 px-3 font-bold text-[#2b1b10] dark:text-white">{inv.customer}</td>
                    <td className="py-3 px-3 text-[#785438]">{inv.date}</td>
                    <td className="py-3 px-3 font-bold text-[#2b1b10] dark:text-white">₹{inv.grandTotal.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-3 font-medium">{inv.paymentMode}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        inv.status === 'Paid'
                          ? 'bg-[#d1fae5] text-[#15803d]'
                          : 'bg-[#fef3c7] text-[#92400e]'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedInvoice(inv)}
                          className="p-1.5 text-[#92400e] hover:bg-[#ede0cb] rounded-lg transition-colors"
                          title="View Invoice"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setSelectedInvoice(inv)}
                          className="p-1.5 text-[#68442b] hover:bg-[#ede0cb] rounded-lg transition-colors"
                          title="Print Invoice"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alert Component */}
        <div className="bg-[#fdfbf7] dark:bg-[#231913] p-5 rounded-3xl shadow-sm border border-[#ede0cb] dark:border-[#3a281d] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#ede0cb] dark:border-[#3a281d]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#2b1b10] dark:text-white">LOW STOCK ALERT</h2>
                <p className="text-[11px] text-[#85542e]">Materials below reorder threshold</p>
              </div>
            </div>
            <span className="px-2 py-0.5 bg-rose-100 text-rose-700 font-extrabold text-[10px] rounded-full">
              {lowStockItems.length} Items
            </span>
          </div>

          <div className="space-y-3">
            {lowStockItems.map(item => (
              <div
                key={item.id}
                className="p-3 bg-rose-50/60 dark:bg-rose-950/20 rounded-2xl border border-rose-200 dark:border-rose-900/40 flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold text-xs text-[#2b1b10] dark:text-white">{item.name}</h4>
                  <div className="flex items-center gap-3 text-[11px] text-[#785438] mt-0.5">
                    <span>Code: <strong>{item.code}</strong></span>
                    <span>Min Threshold: <strong>{item.minStock} {item.unit}</strong></span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-black text-rose-700 dark:text-rose-400">
                    {item.stock} {item.unit}
                  </span>
                  <div className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">Low Stock</div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/inventory/stock')}
            className="w-full py-2.5 bg-[#f7f0e3] dark:bg-[#2d1e15] hover:bg-[#ede0cb] text-[#543722] dark:text-[#f7f0e3] text-xs font-bold rounded-2xl transition-colors text-center block"
          >
            Manage Stock Adjustments →
          </button>
        </div>
      </div>

      {/* Invoice Modal Preview */}
      {selectedInvoice && (
        <InvoicePreviewModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
    </div>
  );
}
