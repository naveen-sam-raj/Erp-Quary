import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Package,
  Building,
  Truck,
  Tag,
  HardHat,
  UserCheck,
  BookOpen,
  MapPin,
  Building2,
  Boxes,
  PieChart,
  Wallet,
  Search,
  Filter,
  Plus,
  Edit3,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useErp } from '../../context/ErpContext';
import MasterModal from '../../components/MasterModal';

export default function MastersPage({ defaultTab = 'products' }) {
  const { masterType: urlMasterType } = useParams();
  const navigate = useNavigate();
  const activeTab = urlMasterType || defaultTab;

  const {
    products,
    deleteProduct,
    customers,
    suppliers,
    categories,
    employees,
    vehicles,
    drivers,
    areas,
    ledgers,
    accountGroups,
    costCentres,
    counters,
    placesOfSupply,
    manufacturers,
    showToast
  } = useErp();

  const [searchQuery, setSearchQuery] = useState('');
  const [modalState, setModalState] = useState({ open: false, type: '', item: null });
  const [viewState, setViewState] = useState({ open: false, item: null });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Master definitions mapping
  const masterTabs = [
    { id: 'products', label: 'Product Master', icon: Package, type: 'Product' },
    { id: 'customers', label: 'Customer Master', icon: Building, type: 'Customer' },
    { id: 'suppliers', label: 'Supplier Master', icon: Truck, type: 'Supplier' },
    { id: 'categories', label: 'Category Master', icon: Tag, type: 'Category' },
    { id: 'employees', label: 'Employee Master', icon: HardHat, type: 'Employee' },
    { id: 'vehicles', label: 'Vehicle Master', icon: Truck, type: 'Vehicle' },
    { id: 'drivers', label: 'Driver Master', icon: UserCheck, type: 'Driver' },
    { id: 'ledger', label: 'Ledger Master', icon: BookOpen, type: 'Ledger' },
    { id: 'area', label: 'Area Master', icon: MapPin, type: 'Area' },
    { id: 'manufacturer', label: 'Manufacturer', icon: Building2, type: 'Manufacturer' },
    { id: 'account-group', label: 'Account Group', icon: Boxes, type: 'Account Group' },
    { id: 'cost-centre', label: 'Cost Centre', icon: PieChart, type: 'Cost Centre' },
    { id: 'counter', label: 'Counter Master', icon: Wallet, type: 'Counter' },
    { id: 'place-of-supply', label: 'Place of Supply', icon: MapPin, type: 'Place of Supply' },
  ];

  const currentTabObj = masterTabs.find(t => t.id === activeTab) || masterTabs[0];

  // Raw data mapping
  const getRawData = () => {
    switch (activeTab) {
      case 'products': return products;
      case 'customers': return customers;
      case 'suppliers': return suppliers;
      case 'categories': return categories;
      case 'employees': return employees;
      case 'vehicles': return vehicles;
      case 'drivers': return drivers;
      case 'area': return areas;
      case 'ledger': return ledgers;
      case 'account-group': return accountGroups;
      case 'cost-centre': return costCentres;
      case 'counter': return counters;
      case 'place-of-supply': return placesOfSupply;
      case 'manufacturer': return manufacturers;
      default: return products;
    }
  };

  const rawData = getRawData();

  // Search Filtering
  const filteredData = rawData.filter(item => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (item.name && item.name.toLowerCase().includes(q)) ||
      (item.code && item.code.toLowerCase().includes(q)) ||
      (item.phone && item.phone.includes(q)) ||
      (item.category && item.category.toLowerCase().includes(q)) ||
      (item.regNo && item.regNo.toLowerCase().includes(q))
    );
  });

  // Pagination calculation
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleOpenAdd = () => {
    setModalState({ open: true, type: currentTabObj.type, item: null });
  };

  const handleEdit = (item) => {
    setModalState({ open: true, type: currentTabObj.type, item });
  };

  const handleDelete = (item) => {
    if (activeTab === 'products') {
      deleteProduct(item.id);
    } else {
      showToast(`Item "${item.name || item.code}" deleted (Frontend Demo)`);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in">
      {/* Top Header & Master Tabs Switcher */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wider">Master Data Register</span>
              <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 text-[10px] font-bold rounded-full">
                {rawData.length} Records
              </span>
            </div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white mt-1">{currentTabObj.label}</h1>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" /> Add New {currentTabObj.type}
          </button>
        </div>

        {/* Master Tabs Pills horizontal scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {masterTabs.map(tab => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setCurrentPage(1);
                  navigate(`/masters/${tab.id}`);
                }}
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

      {/* Filter & Search Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={`Search in ${currentTabObj.label}...`}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 text-slate-500">
          <span>Showing <strong>{paginatedData.length}</strong> of {filteredData.length} entries</span>
        </div>
      </div>

      {/* Main Data Table Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-700">
                <th className="p-3.5">Code / ID</th>
                <th className="p-3.5">Name / Details</th>
                {activeTab === 'products' && (
                  <>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Unit</th>
                    <th className="p-3.5 text-right">Purchase Rate</th>
                    <th className="p-3.5 text-right">Sale Rate</th>
                    <th className="p-3.5 text-right">GST %</th>
                    <th className="p-3.5 text-right">Stock</th>
                  </>
                )}
                {(activeTab === 'customers' || activeTab === 'suppliers') && (
                  <>
                    <th className="p-3.5">Phone</th>
                    <th className="p-3.5">GSTIN</th>
                    <th className="p-3.5">City</th>
                    <th className="p-3.5 text-right">Outstanding (₹)</th>
                  </>
                )}
                {activeTab === 'vehicles' && (
                  <>
                    <th className="p-3.5">Model</th>
                    <th className="p-3.5">Capacity</th>
                    <th className="p-3.5">Assigned Driver</th>
                  </>
                )}
                {activeTab === 'employees' && (
                  <>
                    <th className="p-3.5">Role</th>
                    <th className="p-3.5">Phone</th>
                    <th className="p-3.5 text-right">Salary (₹)</th>
                  </>
                )}
                {activeTab === 'ledger' && (
                  <>
                    <th className="p-3.5">Account Group</th>
                    <th className="p-3.5 text-right">Balance (₹)</th>
                    <th className="p-3.5">Type</th>
                  </>
                )}
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
              {paginatedData.map(item => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 font-bold text-blue-600 dark:text-blue-400">
                    {item.code || item.regNo || item.id}
                  </td>
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                    {item.name || item.regNo || item.state || 'N/A'}
                  </td>

                  {/* Product Columns */}
                  {activeTab === 'products' && (
                    <>
                      <td className="p-3.5 font-medium text-slate-500">{item.category}</td>
                      <td className="p-3.5 font-medium">{item.unit}</td>
                      <td className="p-3.5 text-right">₹{item.purchaseRate}</td>
                      <td className="p-3.5 text-right font-bold text-emerald-600 dark:text-emerald-400">₹{item.saleRate}</td>
                      <td className="p-3.5 text-right">{item.gst}%</td>
                      <td className="p-3.5 text-right font-black text-slate-900 dark:text-white">{item.stock} Ton</td>
                    </>
                  )}

                  {/* Customer / Supplier Columns */}
                  {(activeTab === 'customers' || activeTab === 'suppliers') && (
                    <>
                      <td className="p-3.5">{item.phone}</td>
                      <td className="p-3.5 font-medium text-slate-500">{item.gst}</td>
                      <td className="p-3.5">{item.city}</td>
                      <td className="p-3.5 text-right font-bold text-rose-600 dark:text-rose-400">
                        ₹{item.outstanding?.toLocaleString('en-IN')}
                      </td>
                    </>
                  )}

                  {/* Vehicle Columns */}
                  {activeTab === 'vehicles' && (
                    <>
                      <td className="p-3.5">{item.model}</td>
                      <td className="p-3.5 font-bold">{item.capacity}</td>
                      <td className="p-3.5 text-blue-600 font-medium">{item.driver}</td>
                    </>
                  )}

                  {/* Employee Columns */}
                  {activeTab === 'employees' && (
                    <>
                      <td className="p-3.5 font-semibold text-slate-700 dark:text-slate-300">{item.role}</td>
                      <td className="p-3.5">{item.phone}</td>
                      <td className="p-3.5 text-right font-bold">₹{item.salary?.toLocaleString('en-IN')}</td>
                    </>
                  )}

                  {/* Ledger Columns */}
                  {activeTab === 'ledger' && (
                    <>
                      <td className="p-3.5 text-slate-500 font-medium">{item.group}</td>
                      <td className="p-3.5 text-right font-bold text-slate-900 dark:text-white">₹{item.balance?.toLocaleString('en-IN')}</td>
                      <td className="p-3.5 font-bold">{item.type}</td>
                    </>
                  )}

                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.status === 'Active' || item.status === 'In Stock'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                    }`}>
                      {item.status || 'Active'}
                    </span>
                  </td>

                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setViewState({ open: true, item })}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-1.5 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950 rounded-lg transition-colors"
                        title="Edit Master Record"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-lg transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan="10" className="p-12 text-center text-slate-400">
                    No matching records found in {currentTabObj.label}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs">
          <span className="text-slate-500">Page <strong>{currentPage}</strong> of {totalPages}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Edit / Add Modal */}
      {modalState.open && (
        <MasterModal
          type={modalState.type}
          item={modalState.item}
          onClose={() => setModalState({ open: false, type: '', item: null })}
        />
      )}

      {/* View Record Details Modal */}
      {viewState.open && viewState.item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b pb-3 border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Record Details</h3>
              <button onClick={() => setViewState({ open: false, item: null })} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="space-y-2 text-xs">
              {Object.entries(viewState.item).map(([k, v]) => (
                <div key={k} className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-slate-500 capitalize">{k}:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{String(v)}</span>
                </div>
              ))}
            </div>
            <div className="text-right pt-2">
              <button
                onClick={() => setViewState({ open: false, item: null })}
                className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
