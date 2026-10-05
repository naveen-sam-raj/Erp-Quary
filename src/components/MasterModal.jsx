import React, { useState } from 'react';
import { X, Check, Save } from 'lucide-react';
import { useErp } from '../context/ErpContext';

export default function MasterModal({ type, item, onClose }) {
  const {
    addProduct,
    addCustomer,
    addSupplier,
    setCategories,
    setEmployees,
    setVehicles,
    setDrivers,
    setAreas,
    setLedgers,
    setCostCentres,
    setCounters,
    showToast
  } = useErp();

  const isEdit = Boolean(item);

  // Form State based on type
  const [formData, setFormData] = useState(item || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === 'Product') {
      addProduct(formData);
    } else if (type === 'Customer') {
      addCustomer(formData);
    } else if (type === 'Supplier') {
      addSupplier(formData);
    } else if (type === 'Category') {
      setCategories(prev => [{ id: Date.now(), code: formData.code || `CAT-${prev.length + 1}`, name: formData.name, description: formData.description || '', status: 'Active' }, ...prev]);
      showToast(`Category "${formData.name}" added (Demo)`);
    } else if (type === 'Employee') {
      setEmployees(prev => [{ id: Date.now(), code: formData.code || `EMP-0${prev.length + 1}`, name: formData.name, role: formData.role || 'Operator', phone: formData.phone || '', salary: Number(formData.salary) || 20000, status: 'Active' }, ...prev]);
      showToast(`Employee "${formData.name}" saved (Demo)`);
    } else if (type === 'Vehicle') {
      setVehicles(prev => [{ id: Date.now(), regNo: formData.regNo || 'TN 37 XX 0000', model: formData.model || 'Tipper 10-Wheeler', capacity: formData.capacity || '20 Ton', driver: formData.driver || 'K. Ramasamy', status: 'Active' }, ...prev]);
      showToast(`Vehicle "${formData.regNo}" added (Demo)`);
    } else if (type === 'Driver') {
      setDrivers(prev => [{ id: Date.now(), name: formData.name, licenseNo: formData.licenseNo || 'TN37 20240001', phone: formData.phone || '', vehicleAssigned: formData.vehicleAssigned || 'TN 37 CR 8899', status: 'Active' }, ...prev]);
      showToast(`Driver "${formData.name}" registered (Demo)`);
    } else if (type === 'Area') {
      setAreas(prev => [{ id: Date.now(), name: formData.name, code: formData.code || 'ZONE-1', distance: formData.distance || '15 km', status: 'Active' }, ...prev]);
      showToast(`Area "${formData.name}" created (Demo)`);
    } else if (type === 'Ledger') {
      setLedgers(prev => [{ id: Date.now(), name: formData.name, group: formData.group || 'Sundry Debtors', balance: Number(formData.balance) || 0, type: formData.type || 'Debit' }, ...prev]);
      showToast(`Ledger "${formData.name}" created (Demo)`);
    } else if (type === 'Cost Centre') {
      setCostCentres(prev => [{ id: Date.now(), name: formData.name, code: formData.code || 'CC-09', manager: formData.manager || 'R. Sundaram' }, ...prev]);
      showToast(`Cost Centre "${formData.name}" saved (Demo)`);
    } else if (type === 'Counter') {
      setCounters(prev => [{ id: Date.now(), name: formData.name, code: formData.code || 'CNT-05', operator: formData.operator || 'M. Karthik' }, ...prev]);
      showToast(`Counter "${formData.name}" saved (Demo)`);
    } else {
      showToast(`${type} updated successfully (Demo Mode)`);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <h3 className="font-bold text-base">
            {isEdit ? `Edit ${type}` : `Add New ${type}`}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {type === 'Product' && (
            <>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Blue Metal 20mm"
                  value={formData.name || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Product Code</label>
                  <input
                    type="text"
                    name="code"
                    placeholder="BM-001"
                    value={formData.code || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category || 'Aggregate'}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Aggregate">Aggregate</option>
                    <option value="Sand">Sand</option>
                    <option value="Sub-Base">Sub-Base</option>
                    <option value="Raw Stone">Raw Stone</option>
                    <option value="By-Product">By-Product</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Unit</label>
                  <select
                    name="unit"
                    value={formData.unit || 'Ton'}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Ton">Ton</option>
                    <option value="Unit/Cft">Unit / Cft</option>
                    <option value="Trip">Trip</option>
                    <option value="Kg">Kg</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Purchase Rate (₹)</label>
                  <input
                    type="number"
                    name="purchaseRate"
                    placeholder="850"
                    value={formData.purchaseRate || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Sale Rate (₹)</label>
                  <input
                    type="number"
                    name="saleRate"
                    placeholder="1050"
                    value={formData.saleRate || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">GST Tax Rate (%)</label>
                  <select
                    name="gst"
                    value={formData.gst || '18'}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="5">5%</option>
                    <option value="12">12%</option>
                    <option value="18">18%</option>
                    <option value="28">28%</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Opening Stock</label>
                  <input
                    type="number"
                    name="stock"
                    placeholder="100"
                    value={formData.stock || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </>
          )}

          {(type === 'Customer' || type === 'Supplier') && (
            <>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">{type} Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={type === 'Customer' ? 'e.g. Sri Lakshmi Traders' : 'e.g. Tamilnad Cements Ltd'}
                  value={formData.name || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="9876543210"
                    value={formData.phone || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">GSTIN Number</label>
                  <input
                    type="text"
                    name="gst"
                    placeholder="33ABCDE1234F1Z1"
                    value={formData.gst || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">City / Region</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Coimbatore"
                    value={formData.city || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Opening Balance (₹)</label>
                  <input
                    type="number"
                    name="openingBalance"
                    placeholder="0"
                    value={formData.openingBalance || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Billing Address</label>
                <textarea
                  name="address"
                  rows="2"
                  placeholder="Address details..."
                  value={formData.address || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </>
          )}

          {/* Generic fallback fields for other Masters */}
          {['Category', 'Employee', 'Vehicle', 'Driver', 'Area', 'Ledger', 'Cost Centre', 'Counter'].includes(type) && (
            <>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">{type} Title / Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={`Enter ${type.toLowerCase()} name`}
                  value={formData.name || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {type === 'Vehicle' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Registration No</label>
                    <input
                      type="text"
                      name="regNo"
                      placeholder="TN 37 CR 8899"
                      value={formData.regNo || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Capacity</label>
                    <input
                      type="text"
                      name="capacity"
                      placeholder="20 Ton"
                      value={formData.capacity || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {type === 'Driver' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">License Number</label>
                    <input
                      type="text"
                      name="licenseNo"
                      placeholder="TN37 2018000452"
                      value={formData.licenseNo || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="9842210004"
                      value={formData.phone || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {/* Buttons */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl flex items-center gap-1.5 shadow-lg shadow-blue-600/30 transition-all"
            >
              <Save className="w-4 h-4" /> Save {type}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
