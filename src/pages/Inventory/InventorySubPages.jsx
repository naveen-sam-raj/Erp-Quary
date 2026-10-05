import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Package,
  Receipt,
  ShoppingCart,
  FileSpreadsheet,
  ArrowRightLeft,
  Boxes,
  Truck,
  Plus,
  Eye,
  Printer,
  Search,
  Filter
} from 'lucide-react';
import { useErp } from '../../context/ErpContext';
import InvoicePreviewModal from '../../components/InvoicePreviewModal';

export default function InventorySubPages({ defaultSection = 'sales' }) {
  const { section: urlSection } = useParams();
  const navigate = useNavigate();
  const section = urlSection || defaultSection;

  const {
    invoices,
    purchases,
    salesOrders,
    setSalesOrders,
    purchaseOrders,
    products,
    stockAdjustments,
    setStockAdjustments,
    stockTransfers,
    setStockTransfers,
    showToast
  } = useErp();

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);

  // New Adjustment Form
  const [adjForm, setAdjForm] = useState({ product: products[0]?.name || '', type: 'Addition', qty: '10 Ton', reason: 'Audit recount' });

  const handleAddAdjustment = (e) => {
    e.preventDefault();
    setStockAdjustments(prev => [{ id: Date.now(), date: '05 Oct 2026', ...adjForm }, ...prev]);
    showToast(`Stock adjustment recorded for ${adjForm.product} (Demo)`);
    setShowAdjustModal(false);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in">
      {/* Navigation Switcher Bar */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-extrabold text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wider">Inventory & Operations</span>
            <h1 className="text-xl font-black text-slate-900 dark:text-white capitalize">{section.replace('-', ' ')} Register</h1>
          </div>

          <div className="flex gap-2">
            <Link
              to="/inventory/sales-billing"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-2xl flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
            >
              <ShoppingCart className="w-4 h-4" /> Open POS Billing Terminal
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {[
            { id: 'sales', label: 'Sales Invoices', icon: Receipt },
            { id: 'purchase', label: 'Purchase Invoices', icon: ShoppingCart },
            { id: 'sales-order', label: 'Sales Orders', icon: FileSpreadsheet },
            { id: 'purchase-order', label: 'Purchase Orders', icon: FileSpreadsheet },
            { id: 'sales-return', label: 'Sales Return', icon: ArrowRightLeft },
            { id: 'purchase-return', label: 'Purchase Return', icon: ArrowRightLeft },
            { id: 'stock', label: 'Stock Management', icon: Boxes },
            { id: 'stock-transfer', label: 'Stock Transfer', icon: Truck },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = tab.id === section;
            return (
              <button
                key={tab.id}
                onClick={() => navigate(`/inventory/${tab.id}`)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SALES INVOICES LIST */}
      {section === 'sales' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold border-b">
                  <th className="p-3">Invoice No</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Date</th>
                  <th className="p-3 text-right">Taxable Subtotal</th>
                  <th className="p-3 text-right">CGST + SGST</th>
                  <th className="p-3 text-right">Grand Total (₹)</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {invoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-blue-600 dark:text-blue-400">{inv.id}</td>
                    <td className="p-3 font-bold">{inv.customer}</td>
                    <td className="p-3 text-slate-500">{inv.date}</td>
                    <td className="p-3 text-right">₹{inv.subtotal?.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-right text-slate-500">₹{((inv.cgst || 0) + (inv.sgst || 0)).toLocaleString('en-IN')}</td>
                    <td className="p-3 text-right font-black text-slate-900 dark:text-white">₹{inv.grandTotal.toLocaleString('en-IN')}</td>
                    <td className="p-3 font-semibold">{inv.paymentMode}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                        {inv.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* STOCK MANAGEMENT DASHBOARD */}
      {section === 'stock' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 text-xs">Total Products</span>
              <p className="text-xl font-black text-slate-900 dark:text-white mt-1">{products.length} Items</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 text-xs">Total Stock Volume</span>
              <p className="text-xl font-black text-blue-600 mt-1">2,130 Ton</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 text-xs">Stock Valuation</span>
              <p className="text-xl font-black text-emerald-600 mt-1">₹12,45,800</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-500 text-xs">Low Stock Alert</span>
                <p className="text-xl font-black text-rose-600 mt-1">2 Items</p>
              </div>
              <button
                onClick={() => setShowAdjustModal(true)}
                className="px-3 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs"
              >
                + Adjust Stock
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Recent Stock Audit Adjustments</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 font-bold border-b">
                    <th className="p-3">Date</th>
                    <th className="p-3">Product Name</th>
                    <th className="p-3">Adjustment Type</th>
                    <th className="p-3">Quantity</th>
                    <th className="p-3">Reason / Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {stockAdjustments.map(s => (
                    <tr key={s.id}>
                      <td className="p-3 text-slate-500">{s.date}</td>
                      <td className="p-3 font-bold">{s.product}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${s.type === 'Addition' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                          {s.type}
                        </span>
                      </td>
                      <td className="p-3 font-black">{s.qty}</td>
                      <td className="p-3 text-slate-500">{s.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Stock Adjustment Modal */}
      {showAdjustModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <form onSubmit={handleAddAdjustment} className="w-full max-w-md bg-white dark:bg-slate-900 p-6 rounded-3xl space-y-4 text-xs">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">New Stock Adjustment</h3>
            <div>
              <label className="block font-semibold mb-1">Select Material</label>
              <select value={adjForm.product} onChange={(e) => setAdjForm({ ...adjForm, product: e.target.value })} className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-xl border">
                {products.map(p => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1">Type</label>
                <select value={adjForm.type} onChange={(e) => setAdjForm({ ...adjForm, type: e.target.value })} className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-xl border">
                  <option value="Addition">Addition (+ Stock)</option>
                  <option value="Deduction">Deduction (- Stock)</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Quantity</label>
                <input type="text" placeholder="10 Ton" value={adjForm.qty} onChange={(e) => setAdjForm({ ...adjForm, qty: e.target.value })} className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-xl border" />
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-1">Audit Reason</label>
              <input type="text" placeholder="Spillages during rain" value={adjForm.reason} onChange={(e) => setAdjForm({ ...adjForm, reason: e.target.value })} className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-xl border" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowAdjustModal(false)} className="px-4 py-2 bg-slate-200 text-slate-800 rounded-xl font-bold">Cancel</button>
              <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-xl font-bold">Save Adjustment</button>
            </div>
          </form>
        </div>
      )}

      {selectedInvoice && (
        <InvoicePreviewModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
    </div>
  );
}
