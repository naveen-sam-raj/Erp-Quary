import React from 'react';
import { X, Printer, Download, CheckCircle, ShieldCheck } from 'lucide-react';
import { useErp } from '../context/ErpContext';

export default function InvoicePreviewModal({ invoice, onClose }) {
  const { companyInfo, showToast } = useErp();

  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
    showToast("Print dialog triggered (Demo)");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 animate-slide-up">
        {/* Modal Controls Header */}
        <div className="no-print flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="font-semibold text-sm">Tax Invoice Preview #{invoice.id || invoice.invoiceNo}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md"
            >
              <Printer className="w-4 h-4" /> Print Tax Invoice
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Tax Invoice Body */}
        <div className="printable-area p-8 bg-white text-slate-900 text-xs font-sans space-y-6">
          {/* Company Branding & Tax Info Header */}
          <div className="flex justify-between items-start border-b-2 border-blue-900 pb-6">
            <div>
              <h1 className="text-2xl font-black text-blue-950 tracking-tight">{companyInfo.name}</h1>
              <p className="text-[11px] font-bold text-blue-700 uppercase tracking-wide mt-0.5">{companyInfo.tagline}</p>
              <p className="text-slate-600 mt-1 max-w-sm leading-relaxed">{companyInfo.address}</p>
              <div className="mt-2 text-slate-700 font-medium">
                <span>Phone: {companyInfo.phone}</span> | <span>GSTIN: <strong className="font-bold text-slate-900">{companyInfo.gstin}</strong></span>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-900 font-extrabold text-sm rounded-md uppercase tracking-wider mb-2">
                TAX INVOICE
              </div>
              <p className="text-sm font-bold text-slate-900">No: {invoice.id || invoice.invoiceNo || 'INV-1024'}</p>
              <p className="text-slate-600 mt-0.5">Date: {invoice.date || '05 Oct 2026'}</p>
              <p className="text-slate-600 mt-0.5">Payment Mode: <strong className="text-slate-900">{invoice.paymentMode || 'Cash'}</strong></p>
            </div>
          </div>

          {/* Customer & Delivery Info Grid */}
          <div className="grid grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Billed To (Customer):</p>
              <h3 className="text-sm font-bold text-slate-900 mt-1">{invoice.customer || 'Sri Lakshmi Traders'}</h3>
              <p className="text-slate-600 mt-0.5">Contact: {invoice.phone || '9876543210'}</p>
              {invoice.gst && <p className="text-slate-600 mt-0.5">GSTIN: <strong className="text-slate-800">{invoice.gst}</strong></p>}
              <p className="text-slate-600 mt-0.5">Place of Supply: 33 - Tamil Nadu</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dispatch / Transport Details:</p>
              <p className="text-slate-700 mt-1">Vehicle No: <strong className="font-bold">TN 37 CR 8899 (Tipper)</strong></p>
              <p className="text-slate-600">Weighbridge Slip: WB-89421</p>
              <p className="text-slate-600">Salesman: V. Prakash</p>
            </div>
          </div>

          {/* Product Items Table */}
          <table className="w-full text-left border-collapse border border-slate-300">
            <thead>
              <tr className="bg-blue-900 text-white font-bold text-[11px]">
                <th className="p-2 border border-slate-300 w-10 text-center">#</th>
                <th className="p-2 border border-slate-300">Item Description</th>
                <th className="p-2 border border-slate-300 text-right">Qty</th>
                <th className="p-2 border border-slate-300 text-right">Rate (₹)</th>
                <th className="p-2 border border-slate-300 text-right">GST %</th>
                <th className="p-2 border border-slate-300 text-right">Tax (₹)</th>
                <th className="p-2 border border-slate-300 text-right">Total Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {(invoice.items || []).map((item, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                  <td className="p-2 border border-slate-300 text-center">{idx + 1}</td>
                  <td className="p-2 border border-slate-300 font-semibold">
                    {item.name} <span className="text-[10px] text-slate-500 font-normal">({item.code})</span>
                  </td>
                  <td className="p-2 border border-slate-300 text-right font-medium">{item.qty} {item.unit || 'Ton'}</td>
                  <td className="p-2 border border-slate-300 text-right">₹{item.rate?.toLocaleString('en-IN')}</td>
                  <td className="p-2 border border-slate-300 text-right">{item.gst || 18}%</td>
                  <td className="p-2 border border-slate-300 text-right">
                    ₹{(((item.qty * item.rate) * 0.18)).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                  <td className="p-2 border border-slate-300 text-right font-bold text-slate-900">
                    ₹{(item.total || item.qty * item.rate * 1.18).toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Calculation Breakdown & Bank Details */}
          <div className="grid grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900 mb-1">Bank Payment Details:</p>
                <p className="text-[11px] text-slate-600">Bank: {companyInfo.bankName}</p>
                <p className="text-[11px] text-slate-600">A/C No: <strong className="font-bold text-slate-900">{companyInfo.accountNo}</strong></p>
                <p className="text-[11px] text-slate-600">IFSC Code: {companyInfo.ifsc}</p>
              </div>

              <div>
                <p className="font-bold text-slate-900 mb-1 text-[11px]">Terms & Conditions:</p>
                <ol className="list-decimal list-inside text-[10px] text-slate-500 space-y-0.5">
                  <li>Goods once sold will not be taken back or exchanged.</li>
                  <li>Weight registered at quarry weighbridge is final.</li>
                  <li>Interest @ 18% per annum will be charged on overdue payments.</li>
                  <li>Subject to Coimbatore Jurisdiction only.</li>
                </ol>
              </div>
            </div>

            {/* Totals Table */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-right">
              <div className="flex justify-between text-slate-600">
                <span>Taxable Subtotal:</span>
                <span className="font-medium text-slate-900">₹{(invoice.subtotal || invoice.grandTotal * 0.8475).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>CGST (9%):</span>
                <span className="font-medium text-slate-900">₹{(invoice.cgst || (invoice.grandTotal * 0.1525 / 2)).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>SGST (9%):</span>
                <span className="font-medium text-slate-900">₹{(invoice.sgst || (invoice.grandTotal * 0.1525 / 2)).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              {invoice.roundOff !== 0 && (
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>Round Off:</span>
                  <span>₹{invoice.roundOff || 0}</span>
                </div>
              )}
              <div className="pt-2 border-t-2 border-blue-900 flex justify-between items-center text-sm">
                <span className="font-extrabold text-blue-950 uppercase">Grand Total:</span>
                <span className="text-lg font-black text-blue-700">₹{(invoice.grandTotal || 0).toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Signature & Seal Footer */}
          <div className="pt-8 border-t border-slate-200 flex justify-between items-end">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Customer Signature</p>
              <div className="h-10"></div>
              <p className="text-slate-600 font-medium">Receiver Name & Date</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-bold uppercase">For ANNAI BLUE METAL</p>
              <div className="h-10 flex items-center justify-end">
                <span className="text-slate-300 font-serif italic text-sm pr-4">[ Authorised Signatory ]</span>
              </div>
              <p className="text-slate-900 font-bold">Proprietor / Authorized Partner</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="no-print px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium rounded-xl text-xs hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
          >
            Close Preview
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
          >
            <Printer className="w-4 h-4" /> Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
