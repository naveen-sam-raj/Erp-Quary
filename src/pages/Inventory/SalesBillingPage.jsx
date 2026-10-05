import React, { useState, useMemo } from 'react';
import {
  ShoppingCart,
  Plus,
  Trash2,
  Printer,
  Save,
  PauseCircle,
  RotateCcw,
  XCircle,
  Search,
  CheckCircle2,
  FileText,
  User,
  Building2,
  Percent,
  Calculator,
  ChevronDown
} from 'lucide-react';
import { useErp } from '../../context/ErpContext';
import InvoicePreviewModal from '../../components/InvoicePreviewModal';

export default function SalesBillingPage() {
  const {
    products,
    customers,
    costCentres,
    addInvoice,
    holdInvoices,
    setHoldInvoices,
    showToast
  } = useErp();

  // Header State
  const [invoiceNo, setInvoiceNo] = useState(`INV-${1029}`);
  const [billDate, setBillDate] = useState('2026-10-05');
  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0]?.id || 1);
  const [contactNumber, setContactNumber] = useState(customers[0]?.phone || '9876543210');
  const [salesman, setSalesman] = useState('V. Prakash');
  const [costCentre, setCostCentre] = useState('Madukkarai Quarry Unit 1');
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [taxType, setTaxType] = useState('Intra-State (CGST + SGST)');

  // Product Selector State
  const [selectedProdId, setSelectedProdId] = useState('');

  // Invoice Line Items State
  const [items, setItems] = useState([
    {
      id: 1,
      code: 'BM-001',
      name: 'Blue Metal 20mm',
      qty: 10,
      unit: 'Ton',
      purchaseRate: 850,
      saleRate: 1050,
      discount: 0,
      gst: 18,
    },
    {
      id: 2,
      code: 'MS-001',
      name: 'M-Sand (Manufactured)',
      qty: 5,
      unit: 'Ton',
      purchaseRate: 900,
      saleRate: 1150,
      discount: 0,
      gst: 18,
    }
  ]);

  // Modal Preview State
  const [previewInvoice, setPreviewInvoice] = useState(null);

  // Sync customer phone when customer changes
  const handleCustomerChange = (e) => {
    const cId = Number(e.target.value);
    setSelectedCustomerId(cId);
    const found = customers.find(c => c.id === cId);
    if (found) {
      setContactNumber(found.phone);
    }
  };

  // Add Item to Invoice line
  const handleAddItem = (productObj) => {
    const prod = productObj || products.find(p => p.id === Number(selectedProdId));
    if (!prod) return;

    const existingIndex = items.findIndex(i => i.code === prod.code);
    if (existingIndex > -1) {
      const updated = [...items];
      updated[existingIndex].qty += 1;
      setItems(updated);
    } else {
      setItems(prev => [
        ...prev,
        {
          id: Date.now(),
          code: prod.code,
          name: prod.name,
          qty: 1,
          unit: prod.unit || 'Ton',
          purchaseRate: prod.purchaseRate,
          saleRate: prod.saleRate,
          discount: 0,
          gst: prod.gst || 18,
        }
      ]);
    }
    setSelectedProdId('');
  };

  // Remove Item
  const handleRemoveItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // Line item change handlers
  const handleItemChange = (id, field, value) => {
    setItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          return { ...item, [field]: Number(value) < 0 ? 0 : Number(value) };
        }
        return item;
      })
    );
  };

  // Live Calculations
  const calculations = useMemo(() => {
    let subtotal = 0;
    let totalDiscount = 0;
    let totalTaxable = 0;
    let totalCgst = 0;
    let totalSgst = 0;
    let totalIgst = 0;

    const computedItems = items.map(item => {
      const lineSub = item.qty * item.saleRate;
      const lineDisc = (lineSub * (item.discount || 0)) / 100;
      const taxable = lineSub - lineDisc;
      
      const taxRate = (item.gst || 18) / 100;
      const taxAmount = taxable * taxRate;

      let cgst = 0;
      let sgst = 0;
      let igst = 0;

      if (taxType.includes('Intra-State')) {
        cgst = taxAmount / 2;
        sgst = taxAmount / 2;
      } else {
        igst = taxAmount;
      }

      const total = taxable + taxAmount;

      subtotal += lineSub;
      totalDiscount += lineDisc;
      totalTaxable += taxable;
      totalCgst += cgst;
      totalSgst += sgst;
      totalIgst += igst;

      return {
        ...item,
        cgst,
        sgst,
        igst,
        taxable,
        total
      };
    });

    const rawGrandTotal = totalTaxable + totalCgst + totalSgst + totalIgst;
    const roundedGrandTotal = Math.round(rawGrandTotal);
    const roundOff = Number((roundedGrandTotal - rawGrandTotal).toFixed(2));

    return {
      subtotal,
      totalDiscount,
      totalTaxable,
      totalCgst,
      totalSgst,
      totalIgst,
      roundOff,
      grandTotal: roundedGrandTotal,
      computedItems
    };
  }, [items, taxType]);

  const selectedCustomerObj = customers.find(c => c.id === selectedCustomerId);

  const handleSave = (shouldPrint = false) => {
    if (items.length === 0) {
      showToast("Please add at least one item to invoice!", "error");
      return;
    }

    const invoiceObj = {
      invoiceNo,
      customer: selectedCustomerObj?.name || 'Walk-in Customer',
      phone: contactNumber,
      gst: selectedCustomerObj?.gst || '',
      date: billDate,
      paymentMode,
      subtotal: calculations.totalTaxable,
      cgst: calculations.totalCgst,
      sgst: calculations.totalSgst,
      igst: calculations.totalIgst,
      roundOff: calculations.roundOff,
      grandTotal: calculations.grandTotal,
      items: calculations.computedItems
    };

    const created = addInvoice(invoiceObj);

    if (shouldPrint) {
      setPreviewInvoice(created);
    } else {
      showToast(`Invoice ${invoiceNo} created successfully (Demo)`);
      handleClear();
    }
  };

  const handleHold = () => {
    if (items.length === 0) return;
    const holdObj = {
      id: Date.now(),
      invoiceNo,
      customer: selectedCustomerObj?.name || 'Walk-in Customer',
      date: billDate,
      amount: calculations.grandTotal,
      items: [...items]
    };
    setHoldInvoices(prev => [holdObj, ...prev]);
    showToast(`Invoice ${invoiceNo} moved to Hold state`);
    handleClear();
  };

  const handleClear = () => {
    setItems([]);
    setInvoiceNo(`INV-${Math.floor(1030 + Math.random() * 9000)}`);
    showToast("Invoice cleared");
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in">
      {/* Top Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#fdfbf7] dark:bg-[#231913] p-5 rounded-3xl shadow-sm border border-[#ede0cb] dark:border-[#3a281d]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#92400e] to-[#b45309] text-white flex items-center justify-center font-bold shadow-lg shadow-[#92400e]/30">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-[#92400e] dark:text-[#fbbf24]">ANNAI BLUE METAL</span>
              <span className="px-2 py-0.5 bg-[#fef3c7] dark:bg-[#382614] text-[#92400e] dark:text-[#fde68a] text-[10px] font-bold rounded-full">
                POS Biscuit Billing Terminal
              </span>
            </div>
            <h1 className="text-xl font-black text-[#2b1b10] dark:text-white">Create Sales Invoice</h1>
          </div>
        </div>

        {/* Hold Bills Counter Drawer */}
        {holdInvoices.length > 0 && (
          <div className="flex items-center gap-2 bg-[#fef3c7] dark:bg-[#382614] p-2 px-3 rounded-2xl border border-[#fde68a] text-xs">
            <PauseCircle className="w-4 h-4 text-[#92400e]" />
            <span className="font-bold text-[#92400e] dark:text-[#fde68a]">
              Held Invoices: <strong>{holdInvoices.length}</strong>
            </span>
          </div>
        )}
      </div>

      {/* Bill Controls Grid (Invoice Metadata) */}
      <div className="bg-[#fdfbf7] dark:bg-[#231913] p-5 rounded-3xl shadow-sm border border-[#ede0cb] dark:border-[#3a281d] space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-xs">
          <div>
            <label className="block font-semibold text-[#785438] dark:text-[#c4b1a3] mb-1">Invoice No</label>
            <input
              type="text"
              readOnly
              value={invoiceNo}
              className="w-full px-3 py-2 bg-[#f7f0e3] dark:bg-[#2d1e15] font-bold text-[#2b1b10] dark:text-white rounded-xl border border-[#ede0cb] dark:border-[#3d2b20]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#785438] dark:text-[#c4b1a3] mb-1">Bill Date</label>
            <input
              type="date"
              value={billDate}
              onChange={(e) => setBillDate(e.target.value)}
              className="w-full px-3 py-2 bg-[#fdfbf7] dark:bg-[#2d1e15] font-bold text-[#2b1b10] dark:text-white rounded-xl border border-[#ede0cb] dark:border-[#3d2b20]"
            />
          </div>

          <div className="col-span-2">
            <label className="block font-semibold text-[#785438] dark:text-[#c4b1a3] mb-1">Customer Name</label>
            <select
              value={selectedCustomerId}
              onChange={handleCustomerChange}
              className="w-full px-3 py-2 bg-[#fdfbf7] dark:bg-[#2d1e15] font-bold text-[#2b1b10] dark:text-white rounded-xl border border-[#ede0cb] dark:border-[#3d2b20]"
            >
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.city})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-[#785438] dark:text-[#c4b1a3] mb-1">Contact Number</label>
            <input
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full px-3 py-2 bg-[#fdfbf7] dark:bg-[#2d1e15] text-[#2b1b10] dark:text-white rounded-xl border border-[#ede0cb] dark:border-[#3d2b20]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#785438] dark:text-[#c4b1a3] mb-1">Salesman</label>
            <input
              type="text"
              value={salesman}
              onChange={(e) => setSalesman(e.target.value)}
              className="w-full px-3 py-2 bg-[#fdfbf7] dark:bg-[#2d1e15] text-[#2b1b10] dark:text-white rounded-xl border border-[#ede0cb] dark:border-[#3d2b20]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#785438] dark:text-[#c4b1a3] mb-1">Payment Mode</label>
            <select
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              className="w-full px-3 py-2 bg-[#fdfbf7] dark:bg-[#2d1e15] font-bold text-[#15803d] dark:text-[#86efac] rounded-xl border border-[#ede0cb] dark:border-[#3d2b20]"
            >
              <option value="Cash">Cash</option>
              <option value="UPI">UPI / GPay</option>
              <option value="Bank Transfer">Bank NEFT/RTGS</option>
              <option value="Cheque">Cheque</option>
              <option value="Credit">Credit Ledger</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-[#785438] dark:text-[#c4b1a3] mb-1">Tax Type</label>
            <select
              value={taxType}
              onChange={(e) => setTaxType(e.target.value)}
              className="w-full px-3 py-2 bg-[#fdfbf7] dark:bg-[#2d1e15] font-bold text-[#2b1b10] dark:text-white rounded-xl border border-[#ede0cb] dark:border-[#3d2b20]"
            >
              <option value="Intra-State (CGST + SGST)">Intra-State (CGST + SGST)</option>
              <option value="Inter-State (IGST)">Inter-State (IGST)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Search & Quick Add Bar */}
      <div className="bg-[#fdfbf7] dark:bg-[#231913] p-5 rounded-3xl shadow-sm border border-[#ede0cb] dark:border-[#3a281d] space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <select
              value={selectedProdId}
              onChange={(e) => setSelectedProdId(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#f7f0e3] dark:bg-[#2d1e15] text-[#2b1b10] dark:text-white rounded-2xl border border-[#ede0cb] dark:border-[#3d2b20] font-bold text-xs"
            >
              <option value="">-- Select Material / Product from Catalogue --</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>
                  [{p.code}] {p.name} - ₹{p.saleRate}/Ton ({p.stock} Ton Stock Available)
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => handleAddItem()}
            disabled={!selectedProdId}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#92400e] hover:bg-[#78350f] disabled:opacity-50 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#92400e]/30 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Item to Bill
          </button>
        </div>

        {/* Quick Product Chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-[#85542e] text-[11px]">Popular Quick Add:</span>
          {products.slice(0, 5).map(p => (
            <button
              key={p.id}
              onClick={() => handleAddItem(p)}
              className="px-3 py-1 bg-[#f7f0e3] dark:bg-[#2d1e15] hover:bg-[#ede0cb] text-[#451a03] dark:text-[#f7f0e3] font-medium rounded-xl border border-[#ede0cb] dark:border-[#3d2b20] transition-colors flex items-center gap-1.5"
            >
              <span>{p.name}</span>
              <strong className="text-[#92400e] dark:text-[#fbbf24]">₹{p.saleRate}</strong>
            </button>
          ))}
        </div>
      </div>

      {/* Invoice Line Items Table */}
      <div className="bg-[#fdfbf7] dark:bg-[#231913] rounded-3xl shadow-sm border border-[#ede0cb] dark:border-[#3a281d] overflow-hidden">
        <div className="p-4 bg-[#f7f0e3]/80 dark:bg-[#2d1e15]/80 border-b border-[#ede0cb] dark:border-[#3a281d] flex justify-between items-center">
          <h3 className="font-bold text-sm text-[#2b1b10] dark:text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#92400e]" /> Invoice Line Items ({items.length})
          </h3>
          <span className="text-xs text-[#85542e]">Live automatic CGST/SGST tax computation</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#f7f0e3] dark:bg-[#2d1e15] text-[#68442b] dark:text-[#c4b1a3] font-bold border-b border-[#ede0cb] dark:border-[#3a281d]">
                <th className="p-3 w-12 text-center">S.No</th>
                <th className="p-3">Item Code</th>
                <th className="p-3">Item Name</th>
                <th className="p-3 text-right">Quantity (Ton)</th>
                <th className="p-3 text-right">Purchase Rate</th>
                <th className="p-3 text-right">Sale Rate (₹)</th>
                <th className="p-3 text-right">Disc %</th>
                <th className="p-3 text-right">GST %</th>
                <th className="p-3 text-right">CGST (9%)</th>
                <th className="p-3 text-right">SGST (9%)</th>
                <th className="p-3 text-right">Total Amount (₹)</th>
                <th className="p-3 text-center w-12">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ede0cb]/60 dark:divide-[#3a281d] text-[#451a03] dark:text-[#f7f0e3]">
              {calculations.computedItems.map((item, idx) => (
                <tr key={item.id} className="hover:bg-[#ede0cb]/40 dark:hover:bg-[#342318] transition-colors">
                  <td className="p-3 text-center font-bold text-[#b48c4d]">{idx + 1}</td>
                  <td className="p-3 font-bold text-[#92400e] dark:text-[#fbbf24]">{item.code}</td>
                  <td className="p-3 font-bold">{item.name}</td>

                  <td className="p-3 text-right">
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={item.qty}
                      onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)}
                      className="w-20 px-2 py-1 text-right font-bold bg-[#f7f0e3] dark:bg-[#2d1e15] border border-[#ede0cb] dark:border-[#3d2b20] rounded-lg"
                    />
                  </td>

                  <td className="p-3 text-right text-[#85542e]">₹{item.purchaseRate}</td>

                  <td className="p-3 text-right">
                    <input
                      type="number"
                      value={item.saleRate}
                      onChange={(e) => handleItemChange(item.id, 'saleRate', e.target.value)}
                      className="w-24 px-2 py-1 text-right font-bold text-[#2b1b10] dark:text-white bg-[#f7f0e3] dark:bg-[#2d1e15] border border-[#ede0cb] dark:border-[#3d2b20] rounded-lg"
                    />
                  </td>

                  <td className="p-3 text-right">
                    <input
                      type="number"
                      value={item.discount}
                      onChange={(e) => handleItemChange(item.id, 'discount', e.target.value)}
                      className="w-16 px-2 py-1 text-right bg-[#f7f0e3] dark:bg-[#2d1e15] border border-[#ede0cb] dark:border-[#3d2b20] rounded-lg"
                    />
                  </td>

                  <td className="p-3 text-right font-bold">{item.gst}%</td>
                  <td className="p-3 text-right text-[#785438]">₹{item.cgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                  <td className="p-3 text-right text-[#785438]">₹{item.sgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>

                  <td className="p-3 text-right font-black text-[#92400e] dark:text-[#fbbf24] text-sm">
                    ₹{item.total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>

                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-1 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bill Totals Summary Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-[#fdfbf7] dark:bg-[#231913] p-5 rounded-3xl shadow-sm border border-[#ede0cb] dark:border-[#3a281d] space-y-3">
          <h4 className="font-bold text-xs text-[#2b1b10] dark:text-white uppercase tracking-wider">Customer Ledger Overview</h4>
          {selectedCustomerObj && (
            <div className="p-4 bg-[#f7f0e3] dark:bg-[#2d1e15] rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#785438]">Outstanding Balance:</span>
                <strong className="text-rose-600 font-bold">₹{selectedCustomerObj.outstanding.toLocaleString('en-IN')}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#785438]">Credit Limit:</span>
                <strong className="text-[#2b1b10] dark:text-white">₹{selectedCustomerObj.creditLimit.toLocaleString('en-IN')}</strong>
              </div>
            </div>
          )}
        </div>

        {/* Right Roasted Coffee Calculation Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-[#451a03] via-[#543722] to-[#2b1b10] text-white p-6 rounded-3xl shadow-2xl border border-[#7b522c] space-y-4">
          <div className="flex items-center justify-between border-b border-[#7b522c] pb-3">
            <span className="font-bold text-sm tracking-wide text-[#fde68a]">Bill Calculation Summary</span>
            <span className="px-2.5 py-1 bg-[#92400e]/40 text-[#fde68a] rounded-lg text-xs font-bold border border-[#b45309]">
              Taxable Rate Applied
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <p className="text-[#f7f0e3]/70 font-medium">Subtotal (Gross):</p>
              <p className="text-base font-bold mt-0.5">₹{calculations.subtotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
            </div>
            <div>
              <p className="text-[#f7f0e3]/70 font-medium">Taxable Amount:</p>
              <p className="text-base font-bold text-[#fde68a] mt-0.5">₹{calculations.totalTaxable.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
            </div>
            <div>
              <p className="text-[#f7f0e3]/70 font-medium">CGST (9%):</p>
              <p className="text-base font-bold text-[#86efac] mt-0.5">₹{calculations.totalCgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
            </div>
            <div>
              <p className="text-[#f7f0e3]/70 font-medium">SGST (9%):</p>
              <p className="text-base font-bold text-[#86efac] mt-0.5">₹{calculations.totalSgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
            </div>
            <div className="col-span-2 bg-[#92400e]/40 p-3 rounded-2xl border border-[#b45309] flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-[#fde68a] uppercase tracking-wider">Grand Total Amount</p>
                <p className="text-2xl font-black text-white">₹{calculations.grandTotal.toLocaleString('en-IN')}</p>
              </div>
              <Calculator className="w-8 h-8 text-[#fde68a]" />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-[#7b522c] flex flex-wrap items-center justify-end gap-2.5">
            <button
              onClick={handleClear}
              className="px-4 py-2.5 bg-[#2b1b10] hover:bg-[#38261b] text-slate-300 font-semibold text-xs rounded-2xl transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" /> Clear
            </button>
            <button
              onClick={handleHold}
              className="px-4 py-2.5 bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs rounded-2xl transition-colors flex items-center gap-1.5"
            >
              <PauseCircle className="w-4 h-4" /> Hold Bill
            </button>
            <button
              onClick={() => handleSave(false)}
              className="px-5 py-2.5 bg-[#92400e] hover:bg-[#78350f] text-white font-bold text-xs rounded-2xl transition-colors flex items-center gap-1.5 shadow-lg shadow-[#92400e]/30"
            >
              <Save className="w-4 h-4" /> SAVE
            </button>
            <button
              onClick={() => handleSave(true)}
              className="px-6 py-2.5 bg-gradient-to-r from-[#15803d] to-[#166534] hover:from-[#166534] hover:to-[#14532d] text-white font-black text-xs rounded-2xl transition-all flex items-center gap-2 shadow-xl shadow-emerald-950/40 hover:scale-105"
            >
              <Printer className="w-4 h-4" /> SAVE & PRINT
            </button>
          </div>
        </div>
      </div>

      {previewInvoice && (
        <InvoicePreviewModal
          invoice={previewInvoice}
          onClose={() => {
            setPreviewInvoice(null);
            handleClear();
          }}
        />
      )}
    </div>
  );
}
