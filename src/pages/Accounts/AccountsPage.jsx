import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CreditCard,
  FileText,
  BookOpen,
  PieChart,
  FileBarChart,
  TrendingUp,
  Wallet,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Printer,
  Calendar
} from 'lucide-react';
import { useErp } from '../../context/ErpContext';

export default function AccountsPage({ defaultSubTab = 'receipt' }) {
  const { subTab: urlSubTab } = useParams();
  const navigate = useNavigate();
  const activeTab = urlSubTab || defaultSubTab;

  const {
    customers,
    suppliers,
    ledgers,
    receipts,
    setReceipts,
    payments,
    setPayments,
    journalEntries,
    setJournalEntries,
    cheques,
    setCheques,
    cashCounter,
    showToast
  } = useErp();

  // Receipt Form State
  const [receiptForm, setReceiptForm] = useState({
    rctNo: `RCT-${503}`,
    date: '2026-10-05',
    customer: customers[0]?.name || '',
    paymentMode: 'Cash',
    amount: '',
    reference: '',
    narration: ''
  });

  // Payment Form State
  const [paymentForm, setPaymentForm] = useState({
    payNo: `PAY-${603}`,
    date: '2026-10-05',
    supplier: suppliers[0]?.name || '',
    paymentMode: 'Bank Transfer',
    amount: '',
    reference: '',
    narration: ''
  });

  // Journal Entry State (with row addition & Debit/Credit Balancing validation!)
  const [journalRows, setJournalRows] = useState([
    { id: 1, account: 'Crusher Electricity Expense', debit: 45000, credit: 0 },
    { id: 2, account: 'TNEB Electricity Payable', debit: 0, credit: 45000 }
  ]);
  const [journalNarration, setJournalNarration] = useState('Monthly electricity bill provision');

  // Submit Receipt
  const handleReceiptSubmit = (e) => {
    e.preventDefault();
    if (!receiptForm.amount || Number(receiptForm.amount) <= 0) {
      showToast("Please enter a valid receipt amount", "error");
      return;
    }
    const newRct = {
      id: Date.now(),
      ...receiptForm,
      amount: Number(receiptForm.amount)
    };
    setReceipts(prev => [newRct, ...prev]);
    showToast(`Receipt ${receiptForm.rctNo} submitted successfully (Demo)`);
    setReceiptForm({
      rctNo: `RCT-${Math.floor(504 + Math.random() * 900)}`,
      date: '2026-10-05',
      customer: customers[0]?.name || '',
      paymentMode: 'Cash',
      amount: '',
      reference: '',
      narration: ''
    });
  };

  // Submit Payment
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!paymentForm.amount || Number(paymentForm.amount) <= 0) {
      showToast("Please enter a valid payment amount", "error");
      return;
    }
    const newPay = {
      id: Date.now(),
      ...paymentForm,
      amount: Number(paymentForm.amount)
    };
    setPayments(prev => [newPay, ...prev]);
    showToast(`Payment Voucher ${paymentForm.payNo} logged (Demo)`);
    setPaymentForm({
      payNo: `PAY-${Math.floor(604 + Math.random() * 900)}`,
      date: '2026-10-05',
      supplier: suppliers[0]?.name || '',
      paymentMode: 'Bank Transfer',
      amount: '',
      reference: '',
      narration: ''
    });
  };

  // Journal Row handlers
  const handleAddJournalRow = () => {
    setJournalRows(prev => [...prev, { id: Date.now(), account: 'Sales Account', debit: 0, credit: 0 }]);
  };

  const handleJournalRowChange = (id, field, val) => {
    setJournalRows(prev =>
      prev.map(row => (row.id === id ? { ...row, [field]: field === 'account' ? val : Number(val) || 0 } : row))
    );
  };

  const handleRemoveJournalRow = (id) => {
    if (journalRows.length <= 2) {
      showToast("Journal entry must have at least 2 lines", "error");
      return;
    }
    setJournalRows(prev => prev.filter(r => r.id !== id));
  };

  // Journal totals
  const totalDebit = journalRows.reduce((sum, r) => sum + (r.debit || 0), 0);
  const totalCredit = journalRows.reduce((sum, r) => sum + (r.credit || 0), 0);
  const isJournalBalanced = totalDebit > 0 && totalDebit === totalCredit;

  const handleJournalSubmit = () => {
    if (!isJournalBalanced) {
      showToast("Total Debit must equal Total Credit before posting!", "error");
      return;
    }
    const newJrn = {
      id: `JRN-${700 + journalEntries.length + 1}`,
      date: '2026-10-05',
      narration: journalNarration,
      entries: journalRows
    };
    setJournalEntries(prev => [newJrn, ...prev]);
    showToast(`Journal Voucher ${newJrn.id} posted successfully (Demo)`);
  };

  // Cheque status toggle
  const handleChequeStatusChange = (id, status) => {
    setCheques(prev => prev.map(c => (c.id === id ? { ...c, status } : c)));
    showToast(`Cheque status updated to ${status}`);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in">
      {/* Top Header & Sub-Navigation Pills */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-extrabold text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wider">Accounting Module</span>
            <h1 className="text-xl font-black text-slate-900 dark:text-white capitalize">Financial Ledger & Vouchers</h1>
          </div>
        </div>

        {/* Subtab Navigation */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {[
            { id: 'receipt', label: 'Receipt Voucher', icon: CreditCard },
            { id: 'payment', label: 'Payment Voucher', icon: CreditCard },
            { id: 'journal', label: 'Journal Entry', icon: FileText },
            { id: 'day-book', label: 'Day Book', icon: BookOpen },
            { id: 'trial-balance', label: 'Trial Balance', icon: PieChart },
            { id: 'balance-sheet', label: 'Balance Sheet', icon: FileBarChart },
            { id: 'profit-loss', label: 'Profit & Loss', icon: TrendingUp },
            { id: 'cheque-register', label: 'Cheque Register', icon: CreditCard },
            { id: 'cash-counter', label: 'Cash Counter', icon: Wallet },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => navigate(`/accounts/${tab.id}`)}
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

      {/* 1. RECEIPT VOUCHER SCREEN */}
      {activeTab === 'receipt' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <form onSubmit={handleReceiptSubmit} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white border-b pb-3 border-slate-100 dark:border-slate-800">
              Create Cash / Bank Receipt Voucher
            </h3>

            <div>
              <label className="block font-semibold text-slate-500 mb-1">Receipt No</label>
              <input type="text" readOnly value={receiptForm.rctNo} className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 font-bold rounded-xl" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-500 mb-1">Date</label>
                <input type="date" value={receiptForm.date} onChange={(e) => setReceiptForm({ ...receiptForm, date: e.target.value })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700" />
              </div>
              <div>
                <label className="block font-semibold text-slate-500 mb-1">Payment Mode</label>
                <select value={receiptForm.paymentMode} onChange={(e) => setReceiptForm({ ...receiptForm, paymentMode: e.target.value })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700">
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="NEFT">Bank NEFT/RTGS</option>
                  <option value="Cheque">Cheque</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-500 mb-1">Customer / Ledger *</label>
              <select value={receiptForm.customer} onChange={(e) => setReceiptForm({ ...receiptForm, customer: e.target.value })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 font-bold rounded-xl border border-slate-300 dark:border-slate-700">
                {customers.map(c => (
                  <option key={c.id} value={c.name}>{c.name} (Bal: ₹{c.outstanding})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-500 mb-1">Receipt Amount (₹) *</label>
              <input type="number" required placeholder="e.g. 24500" value={receiptForm.amount} onChange={(e) => setReceiptForm({ ...receiptForm, amount: e.target.value })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 font-extrabold text-emerald-600 rounded-xl border border-slate-300 dark:border-slate-700 text-sm" />
            </div>

            <div>
              <label className="block font-semibold text-slate-500 mb-1">Reference No / Invoice ID</label>
              <input type="text" placeholder="INV-1024" value={receiptForm.reference} onChange={(e) => setReceiptForm({ ...receiptForm, reference: e.target.value })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700" />
            </div>

            <div>
              <label className="block font-semibold text-slate-500 mb-1">Narration / Notes</label>
              <textarea rows="2" placeholder="Received payment against invoice..." value={receiptForm.narration} onChange={(e) => setReceiptForm({ ...receiptForm, narration: e.target.value })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"></textarea>
            </div>

            <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/30 transition-all text-xs">
              Post Receipt Voucher
            </button>
          </form>

          {/* Receipt Register List */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white border-b pb-3 border-slate-100 dark:border-slate-800">
              Receipt History Register
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold border-b">
                    <th className="p-3">Receipt No</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Mode</th>
                    <th className="p-3 text-right">Amount (₹)</th>
                    <th className="p-3">Reference</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {receipts.map(r => (
                    <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-emerald-600">{r.rctNo}</td>
                      <td className="p-3 text-slate-500">{r.date}</td>
                      <td className="p-3 font-bold">{r.customer}</td>
                      <td className="p-3">{r.paymentMode}</td>
                      <td className="p-3 text-right font-black text-emerald-600">₹{r.amount?.toLocaleString('en-IN')}</td>
                      <td className="p-3 text-slate-500">{r.reference || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. PAYMENT VOUCHER SCREEN */}
      {activeTab === 'payment' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <form onSubmit={handlePaymentSubmit} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white border-b pb-3 border-slate-100 dark:border-slate-800">
              Create Supplier Payment Voucher
            </h3>

            <div>
              <label className="block font-semibold text-slate-500 mb-1">Payment Voucher No</label>
              <input type="text" readOnly value={paymentForm.payNo} className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 font-bold rounded-xl" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-500 mb-1">Date</label>
                <input type="date" value={paymentForm.date} onChange={(e) => setPaymentForm({ ...paymentForm, date: e.target.value })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700" />
              </div>
              <div>
                <label className="block font-semibold text-slate-500 mb-1">Payment Mode</label>
                <select value={paymentForm.paymentMode} onChange={(e) => setPaymentForm({ ...paymentForm, paymentMode: e.target.value })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700">
                  <option value="Bank Transfer">Bank NEFT/RTGS</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-500 mb-1">Supplier / Party Name *</label>
              <select value={paymentForm.supplier} onChange={(e) => setPaymentForm({ ...paymentForm, supplier: e.target.value })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 font-bold rounded-xl border border-slate-300 dark:border-slate-700">
                {suppliers.map(s => (
                  <option key={s.id} value={s.name}>{s.name} (Bal: ₹{s.outstanding})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-500 mb-1">Payment Amount (₹) *</label>
              <input type="number" required placeholder="e.g. 35000" value={paymentForm.amount} onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 font-extrabold text-rose-600 rounded-xl border border-slate-300 dark:border-slate-700 text-sm" />
            </div>

            <div>
              <label className="block font-semibold text-slate-500 mb-1">Reference / Chq / Txn No</label>
              <input type="text" placeholder="TXN-984210" value={paymentForm.reference} onChange={(e) => setPaymentForm({ ...paymentForm, reference: e.target.value })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700" />
            </div>

            <div>
              <label className="block font-semibold text-slate-500 mb-1">Narration</label>
              <textarea rows="2" placeholder="Payment for diesel fuel supply..." value={paymentForm.narration} onChange={(e) => setPaymentForm({ ...paymentForm, narration: e.target.value })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"></textarea>
            </div>

            <button type="submit" className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-2xl shadow-lg shadow-rose-600/30 transition-all text-xs">
              Post Payment Voucher
            </button>
          </form>

          {/* Payment Register */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white border-b pb-3 border-slate-100 dark:border-slate-800">
              Payment Outward Register
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold border-b">
                    <th className="p-3">Payment No</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Supplier</th>
                    <th className="p-3">Mode</th>
                    <th className="p-3 text-right">Amount (₹)</th>
                    <th className="p-3">Reference</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {payments.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-rose-600">{p.payNo}</td>
                      <td className="p-3 text-slate-500">{p.date}</td>
                      <td className="p-3 font-bold">{p.supplier}</td>
                      <td className="p-3">{p.paymentMode}</td>
                      <td className="p-3 text-right font-black text-rose-600">₹{p.amount?.toLocaleString('en-IN')}</td>
                      <td className="p-3 text-slate-500">{p.reference || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. JOURNAL ENTRY SCREEN (WITH BALANCING VALIDATION!) */}
      {activeTab === 'journal' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b pb-4 border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Double-Entry Journal Voucher Creator</h2>
              <p className="text-xs text-slate-500">Add debit and credit entry lines. Total Debit MUST equal Total Credit to post.</p>
            </div>

            <button
              onClick={handleAddJournalRow}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" /> Add Debit/Credit Line
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold border-b">
                  <th className="p-3 w-12 text-center">#</th>
                  <th className="p-3">Account Ledger Name</th>
                  <th className="p-3 text-right">Debit (₹)</th>
                  <th className="p-3 text-right">Credit (₹)</th>
                  <th className="p-3 text-center w-12">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {journalRows.map((row, idx) => (
                  <tr key={row.id}>
                    <td className="p-3 text-center font-bold text-slate-400">{idx + 1}</td>
                    <td className="p-3">
                      <select
                        value={row.account}
                        onChange={(e) => handleJournalRowChange(row.id, 'account', e.target.value)}
                        className="w-full p-2 bg-slate-50 dark:bg-slate-800 font-semibold rounded-xl border border-slate-300 dark:border-slate-700"
                      >
                        {ledgers.map(l => (
                          <option key={l.id} value={l.name}>{l.name} ({l.group})</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3 text-right">
                      <input
                        type="number"
                        value={row.debit}
                        onChange={(e) => handleJournalRowChange(row.id, 'debit', e.target.value)}
                        className="w-32 p-2 text-right font-bold text-emerald-600 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                      />
                    </td>
                    <td className="p-3 text-right">
                      <input
                        type="number"
                        value={row.credit}
                        onChange={(e) => handleJournalRowChange(row.id, 'credit', e.target.value)}
                        className="w-32 p-2 text-right font-bold text-rose-600 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                      />
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleRemoveJournalRow(row.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <label className="block font-semibold text-xs text-slate-500 mb-1">Journal Narration / Reason</label>
            <input
              type="text"
              value={journalNarration}
              onChange={(e) => setJournalNarration(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
            />
          </div>

          {/* Validation & Total Calculation Banner */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              {isJournalBalanced ? (
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Journal Entry Balanced! Total Debit = Total Credit</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold">
                  <AlertCircle className="w-5 h-5" />
                  <span>Unbalanced Entry! Difference: ₹{Math.abs(totalDebit - totalCredit).toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-6 font-extrabold text-sm">
              <span>Debit Total: <strong className="text-emerald-600">₹{totalDebit.toLocaleString('en-IN')}</strong></span>
              <span>Credit Total: <strong className="text-rose-600">₹{totalCredit.toLocaleString('en-IN')}</strong></span>
              <button
                onClick={handleJournalSubmit}
                disabled={!isJournalBalanced}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold rounded-xl shadow-lg transition-all"
              >
                Post Journal Entry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. DAY BOOK SCREEN */}
      {activeTab === 'day-book' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Daily Financial Day Book Log</h2>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-slate-500">Filter Date:</span>
              <input type="date" defaultValue="2026-10-05" className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl border" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 font-bold text-slate-600 border-b">
                  <th className="p-3">Date</th>
                  <th className="p-3">Voucher No</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Account Ledger</th>
                  <th className="p-3 text-right">Debit (₹)</th>
                  <th className="p-3 text-right">Credit (₹)</th>
                  <th className="p-3 text-right">Running Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 text-slate-500">05 Oct 2026</td>
                  <td className="p-3 font-bold text-blue-600">INV-1024</td>
                  <td className="p-3 font-semibold text-emerald-600">Sales Invoice</td>
                  <td className="p-3 font-bold">Sri Lakshmi Traders</td>
                  <td className="p-3 text-right font-bold text-emerald-600">₹24,500</td>
                  <td className="p-3 text-right text-slate-400">₹0</td>
                  <td className="p-3 text-right font-black">₹24,500 Dr</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 text-slate-500">05 Oct 2026</td>
                  <td className="p-3 font-bold text-rose-600">PUR-801</td>
                  <td className="p-3 font-semibold text-rose-600">Purchase Voucher</td>
                  <td className="p-3 font-bold">Tamilnad Cements Ltd</td>
                  <td className="p-3 text-right text-slate-400">₹0</td>
                  <td className="p-3 text-right font-bold text-rose-600">₹65,000</td>
                  <td className="p-3 text-right font-black">₹40,500 Cr</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 text-slate-500">05 Oct 2026</td>
                  <td className="p-3 font-bold text-indigo-600">JRN-701</td>
                  <td className="p-3 font-semibold text-indigo-600">Journal Provision</td>
                  <td className="p-3 font-bold">Crusher Electricity Expense</td>
                  <td className="p-3 text-right font-bold text-emerald-600">₹45,000</td>
                  <td className="p-3 text-right text-slate-400">₹0</td>
                  <td className="p-3 text-right font-black">₹4,500 Dr</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. BALANCE SHEET SCREEN (TWO-COLUMN CARDS LAYOUT) */}
      {activeTab === 'balance-sheet' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Balance Sheet as of 05 Oct 2026</h2>
              <p className="text-xs text-slate-500">Financial Position of ANNAI BLUE METAL</p>
            </div>
            <button onClick={() => window.print()} className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5">
              <Printer className="w-4 h-4" /> Print Statement
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ASSETS COLUMN */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b-2 border-emerald-500">
                <h3 className="font-black text-sm text-emerald-600 uppercase tracking-wider">ASSETS</h3>
                <span className="font-extrabold text-sm text-emerald-600">₹24,55,900</span>
              </div>

              <div className="space-y-2 text-xs divide-y divide-slate-100 dark:divide-slate-800">
                <div className="flex justify-between py-2">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Quarry Petty Cash-in-Hand</span>
                  <strong className="font-bold">₹84,300</strong>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-slate-700 dark:text-slate-300">HDFC Bank Current Account</span>
                  <strong className="font-bold">₹6,45,200</strong>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Stock Valuation (Aggregates & Sand)</span>
                  <strong className="font-bold">₹12,45,800</strong>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Trade Sundry Debtors (Receivables)</span>
                  <strong className="font-bold text-purple-600">₹4,80,600</strong>
                </div>
              </div>
            </div>

            {/* LIABILITIES COLUMN */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b-2 border-rose-500">
                <h3 className="font-black text-sm text-rose-600 uppercase tracking-wider">LIABILITIES & CAPITAL</h3>
                <span className="font-extrabold text-sm text-rose-600">₹24,55,900</span>
              </div>

              <div className="space-y-2 text-xs divide-y divide-slate-100 dark:divide-slate-800">
                <div className="flex justify-between py-2">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Proprietor Capital Account</span>
                  <strong className="font-bold">₹18,00,000</strong>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Sundry Creditors (Suppliers Payables)</span>
                  <strong className="font-bold text-rose-600">₹2,76,400</strong>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Output GST Payable (CGST+SGST)</span>
                  <strong className="font-bold">₹29,250</strong>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Current Retained Earnings</span>
                  <strong className="font-bold text-emerald-600">₹3,50,250</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. CASH COUNTER DASHBOARD SCREEN */}
      {activeTab === 'cash-counter' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Quarry Cash Counter Drawer Register</h2>
              <p className="text-xs text-slate-500">Real-time daily cash inflow & outflow reconciliation</p>
            </div>
            <div className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-xl">
              Weighbridge Gate Counter 1
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border">
              <span className="text-slate-500">Opening Cash</span>
              <p className="text-lg font-black text-slate-900 dark:text-white mt-1">₹{cashCounter.openingCash.toLocaleString('en-IN')}</p>
            </div>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200">
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">+ Cash Sales</span>
              <p className="text-lg font-black text-emerald-600 mt-1">₹{cashCounter.cashSales.toLocaleString('en-IN')}</p>
            </div>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200">
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">+ Cash Receipts</span>
              <p className="text-lg font-black text-emerald-600 mt-1">₹{cashCounter.cashReceipts.toLocaleString('en-IN')}</p>
            </div>
            <div className="p-4 bg-rose-50 dark:bg-rose-950/40 rounded-2xl border border-rose-200">
              <span className="text-rose-700 dark:text-rose-400 font-semibold">- Cash Payments</span>
              <p className="text-lg font-black text-rose-600 mt-1">₹{cashCounter.cashPayments.toLocaleString('en-IN')}</p>
            </div>
            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200">
              <span className="text-amber-700 dark:text-amber-400 font-semibold">- Petty Expenses</span>
              <p className="text-lg font-black text-amber-600 mt-1">₹{cashCounter.expenses.toLocaleString('en-IN')}</p>
            </div>
            <div className="p-4 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-600/30">
              <span className="text-blue-200 font-bold uppercase text-[10px]">Closing Drawer Cash</span>
              <p className="text-xl font-black mt-1">₹{cashCounter.closingCash.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>
      )}

      {/* 7. CHEQUE REGISTER SCREEN */}
      {activeTab === 'cheque-register' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Cheque Clearance & Status Register</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-600 font-bold border-b">
                  <th className="p-3">Cheque No</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Bank</th>
                  <th className="p-3">Customer / Supplier</th>
                  <th className="p-3 text-right">Amount (₹)</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {cheques.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-blue-600">{c.chqNo}</td>
                    <td className="p-3 text-slate-500">{c.date}</td>
                    <td className="p-3 font-medium">{c.bank}</td>
                    <td className="p-3 font-bold">{c.party}</td>
                    <td className="p-3 text-right font-black">₹{c.amount.toLocaleString('en-IN')}</td>
                    <td className="p-3 font-semibold">{c.type}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        c.status === 'Cleared' ? 'bg-emerald-100 text-emerald-700' :
                        c.status === 'Bounced' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <select
                        value={c.status}
                        onChange={(e) => handleChequeStatusChange(c.id, e.target.value)}
                        className="px-2 py-1 bg-slate-50 dark:bg-slate-800 text-[11px] font-bold rounded-lg border"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Cleared">Cleared</option>
                        <option value="Bounced">Bounced</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
