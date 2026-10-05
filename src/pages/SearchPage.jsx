import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Package, Building, FileText, BookOpen } from 'lucide-react';
import { useErp } from '../context/ErpContext';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const { products, customers, invoices, ledgers } = useErp();

  useEffect(() => {
    if (initialQuery) setQuery(initialQuery);
  }, [initialQuery]);

  const q = query.trim().toLowerCase();

  const matchingProducts = q ? products.filter(p => p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q)) : [];
  const matchingCustomers = q ? customers.filter(c => c.name.toLowerCase().includes(q) || c.phone.includes(q)) : [];
  const matchingInvoices = q ? invoices.filter(i => i.id.toLowerCase().includes(q) || i.customer.toLowerCase().includes(q)) : [];

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <h1 className="text-xl font-black text-slate-900 dark:text-white">Global ERP Search Engine</h1>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search across all invoices, customers, products, ledgers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 font-bold text-slate-900 dark:text-white rounded-2xl border border-slate-300 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {q && (
        <div className="space-y-6">
          {/* Products Results */}
          {matchingProducts.length > 0 && (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Package className="w-4 h-4 text-blue-500" /> Products Found ({matchingProducts.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {matchingProducts.map(p => (
                  <div key={p.id} onClick={() => navigate('/masters/products')} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border cursor-pointer hover:border-blue-500">
                    <p className="font-bold text-slate-900 dark:text-white">{p.name} ({p.code})</p>
                    <p className="text-blue-600 font-bold mt-1">₹{p.saleRate}/Ton | Stock: {p.stock} Ton</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customer Results */}
          {matchingCustomers.length > 0 && (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Building className="w-4 h-4 text-emerald-500" /> Customers Found ({matchingCustomers.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {matchingCustomers.map(c => (
                  <div key={c.id} onClick={() => navigate('/masters/customers')} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border cursor-pointer hover:border-emerald-500">
                    <p className="font-bold text-slate-900 dark:text-white">{c.name}</p>
                    <p className="text-slate-500 mt-1">{c.phone} | Bal: ₹{c.outstanding}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Invoice Results */}
          {matchingInvoices.length > 0 && (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-500" /> Invoices Found ({matchingInvoices.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {matchingInvoices.map(i => (
                  <div key={i.id} onClick={() => navigate('/inventory/sales-billing')} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border cursor-pointer hover:border-indigo-500">
                    <p className="font-bold text-slate-900 dark:text-white">{i.id} - {i.customer}</p>
                    <p className="text-emerald-600 font-bold mt-1">₹{i.grandTotal.toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
