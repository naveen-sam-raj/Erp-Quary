import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Layers,
  Package,
  BookOpen,
  Search,
  FileBarChart,
  Wrench,
  Users,
  Settings,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  ShoppingCart,
  Receipt,
  Truck,
  ArrowRightLeft,
  Building,
  UserCheck,
  ShieldCheck,
  FileSpreadsheet,
  PieChart,
  CreditCard,
  Wallet,
  Building2,
  HardHat,
  MapPin,
  Tag,
  Boxes,
  X
} from 'lucide-react';
import { useErp } from '../context/ErpContext';

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useErp();
  const location = useLocation();

  // Submenu toggle states
  const [openMenus, setOpenMenus] = useState({
    masters: location.pathname.startsWith('/masters'),
    inventory: location.pathname.startsWith('/inventory'),
    accounts: location.pathname.startsWith('/accounts'),
    reports: location.pathname.startsWith('/reports'),
    users: location.pathname.startsWith('/users'),
  });

  const toggleSubmenu = (menu) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  // Close mobile drawer when clicking a nav link
  const handleNavClick = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const navItemClass = (isActive) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 ${
      isActive
        ? 'bg-[#92400e] text-white shadow-lg shadow-[#92400e]/30'
        : 'text-[#543722] dark:text-[#d7c4b7] hover:bg-[#ede0cb]/60 dark:hover:bg-[#342318] hover:text-[#2b1b10] dark:hover:text-white'
    }`;

  const subNavItemClass = (isActive) =>
    `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
      isActive
        ? 'text-[#92400e] dark:text-[#fbbf24] bg-[#f7f0e3] dark:bg-[#342318] font-bold'
        : 'text-[#68442b] dark:text-[#c4b1a3] hover:text-[#2b1b10] dark:hover:text-white hover:bg-[#ede0cb]/50 dark:hover:bg-[#2d1e15]'
    }`;

  return (
    <>
      {/* Mobile Drawer Overlay Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-[#2b1b10]/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
        />
      )}

      {/* Main Sidebar Drawer */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 lg:z-40 h-screen bg-[#fdfbf7] dark:bg-[#231913] border-r border-[#ede0cb] dark:border-[#3a281d] transition-all duration-300 flex flex-col ${
          sidebarOpen
            ? 'translate-x-0 w-64 shadow-2xl lg:shadow-none'
            : '-translate-x-full lg:translate-x-0 lg:w-20'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-[#ede0cb] dark:border-[#3a281d]">
          <NavLink to="/" onClick={handleNavClick} className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#78350f] via-[#92400e] to-[#b45309] flex items-center justify-center text-white font-extrabold text-lg shadow-md shrink-0">
              AB
            </div>
            {(sidebarOpen || window.innerWidth < 1024) && (
              <div className="flex flex-col text-left transition-opacity duration-300">
                <span className="font-bold text-sm tracking-tight text-[#2b1b10] dark:text-white leading-none">
                  ANNAI BLUE METAL
                </span>
                <span className="text-[10px] text-[#92400e] dark:text-[#fbbf24] font-bold mt-1 uppercase tracking-wider">
                  ERP Management
                </span>
              </div>
            )}
          </NavLink>

          {/* Close button inside mobile drawer header */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 text-[#68442b] dark:text-[#d7c4b7] hover:bg-[#ede0cb] rounded-lg lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin">
          {/* Dashboard */}
          <div className="relative group">
            <NavLink to="/dashboard" onClick={handleNavClick} className={({ isActive }) => navItemClass(isActive)}>
              <LayoutDashboard className="w-5 h-5 shrink-0" />
              <span>Dashboard</span>
            </NavLink>
          </div>

          {/* POS Sales Billing */}
          <div className="relative group">
            <NavLink
              to="/inventory/sales-billing"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                  isActive
                    ? 'bg-[#15803d] text-white shadow-lg shadow-[#15803d]/30'
                    : 'bg-[#ecfdf5] text-[#166534] dark:bg-[#143823] dark:text-[#86efac] hover:bg-[#d1fae5] dark:hover:bg-[#194c2f]'
                }`
              }
            >
              <ShoppingCart className="w-5 h-5 shrink-0 text-[#166534] dark:text-[#86efac] group-hover:scale-110 transition-transform" />
              <span className="flex-1">POS Sales Billing</span>
              <span className="bg-[#166534] text-white text-[9px] px-1.5 py-0.5 rounded font-bold">POS</span>
            </NavLink>
          </div>

          {/* Masters Accordion */}
          <div className="relative group">
            <button
              onClick={() => toggleSubmenu('masters')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-xs text-[#543722] dark:text-[#d7c4b7] hover:bg-[#ede0cb]/60 dark:hover:bg-[#342318] transition-all ${
                location.pathname.startsWith('/masters') ? 'text-[#92400e] dark:text-[#fbbf24] font-bold' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <Layers className="w-5 h-5 shrink-0" />
                <span>Masters</span>
              </div>
              {openMenus.masters ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>

            {openMenus.masters && (
              <div className="ml-7 mt-1 pl-2 border-l border-[#ede0cb] dark:border-[#3a281d] space-y-1">
                <NavLink to="/masters/products" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  <Package className="w-3.5 h-3.5" /> Product Master
                </NavLink>
                <NavLink to="/masters/customers" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  <Building className="w-3.5 h-3.5" /> Customer Master
                </NavLink>
                <NavLink to="/masters/suppliers" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  <Truck className="w-3.5 h-3.5" /> Supplier Master
                </NavLink>
                <NavLink to="/masters/categories" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  <Tag className="w-3.5 h-3.5" /> Category Master
                </NavLink>
                <NavLink to="/masters/employees" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  <HardHat className="w-3.5 h-3.5" /> Employee Master
                </NavLink>
                <NavLink to="/masters/vehicles" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  <Truck className="w-3.5 h-3.5" /> Vehicle Master
                </NavLink>
                <NavLink to="/masters/drivers" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  <UserCheck className="w-3.5 h-3.5" /> Driver Master
                </NavLink>
                <NavLink to="/masters/ledger" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  <BookOpen className="w-3.5 h-3.5" /> Ledger Master
                </NavLink>
                <NavLink to="/masters/area" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  <MapPin className="w-3.5 h-3.5" /> Area Master
                </NavLink>
                <NavLink to="/masters/manufacturer" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  <Building2 className="w-3.5 h-3.5" /> Manufacturer
                </NavLink>
                <NavLink to="/masters/account-group" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  <Boxes className="w-3.5 h-3.5" /> Account Group
                </NavLink>
                <NavLink to="/masters/cost-centre" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  <PieChart className="w-3.5 h-3.5" /> Cost Centre
                </NavLink>
                <NavLink to="/masters/counter" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  <Wallet className="w-3.5 h-3.5" /> Counter Master
                </NavLink>
                <NavLink to="/masters/place-of-supply" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  <MapPin className="w-3.5 h-3.5" /> Place of Supply
                </NavLink>
              </div>
            )}
          </div>

          {/* Inventory Accordion */}
          <div className="relative group">
            <button
              onClick={() => toggleSubmenu('inventory')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-xs text-[#543722] dark:text-[#d7c4b7] hover:bg-[#ede0cb]/60 dark:hover:bg-[#342318] transition-all ${
                location.pathname.startsWith('/inventory') ? 'text-[#92400e] dark:text-[#fbbf24] font-bold' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 shrink-0" />
                <span>Inventory & Sales</span>
              </div>
              {openMenus.inventory ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>

            {openMenus.inventory && (
              <div className="ml-7 mt-1 pl-2 border-l border-[#ede0cb] dark:border-[#3a281d] space-y-1">
                <NavLink to="/inventory/sales" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  <Receipt className="w-3.5 h-3.5" /> Sales Invoices
                </NavLink>
                <NavLink to="/inventory/purchase" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  <ShoppingCart className="w-3.5 h-3.5" /> Purchase Invoices
                </NavLink>
                <NavLink to="/inventory/sales-order" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  <FileSpreadsheet className="w-3.5 h-3.5" /> Sales Orders
                </NavLink>
                <NavLink to="/inventory/purchase-order" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  <FileSpreadsheet className="w-3.5 h-3.5" /> Purchase Orders
                </NavLink>
                <NavLink to="/inventory/sales-return" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  <ArrowRightLeft className="w-3.5 h-3.5 text-amber-600" /> Sales Return
                </NavLink>
                <NavLink to="/inventory/purchase-return" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  <ArrowRightLeft className="w-3.5 h-3.5 text-rose-600" /> Purchase Return
                </NavLink>
                <NavLink to="/inventory/stock" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  <Boxes className="w-3.5 h-3.5" /> Stock Management
                </NavLink>
                <NavLink to="/inventory/stock-transfer" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  <Truck className="w-3.5 h-3.5" /> Stock Transfer
                </NavLink>
              </div>
            )}
          </div>

          {/* Accounts Accordion */}
          <div className="relative group">
            <button
              onClick={() => toggleSubmenu('accounts')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-xs text-[#543722] dark:text-[#d7c4b7] hover:bg-[#ede0cb]/60 dark:hover:bg-[#342318] transition-all ${
                location.pathname.startsWith('/accounts') ? 'text-[#92400e] dark:text-[#fbbf24] font-bold' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 shrink-0" />
                <span>Accounts</span>
              </div>
              {openMenus.accounts ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>

            {openMenus.accounts && (
              <div className="ml-7 mt-1 pl-2 border-l border-[#ede0cb] dark:border-[#3a281d] space-y-1">
                <NavLink to="/accounts/receipt" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  <CreditCard className="w-3.5 h-3.5 text-emerald-600" /> Receipt Voucher
                </NavLink>
                <NavLink to="/accounts/payment" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  <CreditCard className="w-3.5 h-3.5 text-rose-600" /> Payment Voucher
                </NavLink>
                <NavLink to="/accounts/journal" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  <FileBarChart className="w-3.5 h-3.5 text-amber-700" /> Journal Voucher
                </NavLink>
                <NavLink to="/accounts/day-book" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  <BookOpen className="w-3.5 h-3.5" /> Day Book
                </NavLink>
                <NavLink to="/accounts/trial-balance" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  <PieChart className="w-3.5 h-3.5" /> Trial Balance
                </NavLink>
                <NavLink to="/accounts/balance-sheet" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  <FileBarChart className="w-3.5 h-3.5" /> Balance Sheet
                </NavLink>
                <NavLink to="/accounts/profit-loss" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> Profit & Loss
                </NavLink>
                <NavLink to="/accounts/cheque-register" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  <CreditCard className="w-3.5 h-3.5" /> Cheque Register
                </NavLink>
                <NavLink to="/accounts/cash-counter" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  <Wallet className="w-3.5 h-3.5 text-amber-600" /> Cash Counter
                </NavLink>
              </div>
            )}
          </div>

          {/* Global Search */}
          <div className="relative group">
            <NavLink to="/search" onClick={handleNavClick} className={({ isActive }) => navItemClass(isActive)}>
              <Search className="w-5 h-5 shrink-0" />
              <span>Global Search</span>
            </NavLink>
          </div>

          {/* Reports */}
          <div className="relative group">
            <button
              onClick={() => toggleSubmenu('reports')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-xs text-[#543722] dark:text-[#d7c4b7] hover:bg-[#ede0cb]/60 dark:hover:bg-[#342318] transition-all ${
                location.pathname.startsWith('/reports') ? 'text-[#92400e] dark:text-[#fbbf24] font-bold' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <FileBarChart className="w-5 h-5 shrink-0" />
                <span>Reports</span>
              </div>
              {openMenus.reports ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>

            {openMenus.reports && (
              <div className="ml-7 mt-1 pl-2 border-l border-[#ede0cb] dark:border-[#3a281d] space-y-1">
                <NavLink to="/reports/sales" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  Sales Report
                </NavLink>
                <NavLink to="/reports/purchase" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  Purchase Report
                </NavLink>
                <NavLink to="/reports/stock" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  Stock Report
                </NavLink>
                <NavLink to="/reports/tax" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  GST Tax Report
                </NavLink>
                <NavLink to="/reports/accounts" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  Accounts Ledger Report
                </NavLink>
              </div>
            )}
          </div>

          {/* Analytics */}
          <div className="relative group">
            <NavLink to="/analytics" onClick={handleNavClick} className={({ isActive }) => navItemClass(isActive)}>
              <TrendingUp className="w-5 h-5 shrink-0 text-[#b45309]" />
              <span>Executive Analytics</span>
            </NavLink>
          </div>

          {/* Tools */}
          <div className="relative group">
            <NavLink to="/tools" onClick={handleNavClick} className={({ isActive }) => navItemClass(isActive)}>
              <Wrench className="w-5 h-5 shrink-0" />
              <span>Tools & Utilities</span>
            </NavLink>
          </div>

          {/* Users & Security */}
          <div className="relative group">
            <button
              onClick={() => toggleSubmenu('users')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-xs text-[#543722] dark:text-[#d7c4b7] hover:bg-[#ede0cb]/60 dark:hover:bg-[#342318] transition-all ${
                location.pathname.startsWith('/users') ? 'text-[#92400e] dark:text-[#fbbf24] font-bold' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 shrink-0" />
                <span>Users & Roles</span>
              </div>
              {openMenus.users ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>

            {openMenus.users && (
              <div className="ml-7 mt-1 pl-2 border-l border-[#ede0cb] dark:border-[#3a281d] space-y-1">
                <NavLink to="/users" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  Users List
                </NavLink>
                <NavLink to="/users/roles" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  Role Management
                </NavLink>
                <NavLink to="/users/permissions" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  Permissions Matrix
                </NavLink>
                <NavLink to="/users/activity" onClick={handleNavClick} className={({ isActive }) => subNavItemClass(isActive)}>
                  Activity Audit Log
                </NavLink>
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="relative group">
            <NavLink to="/settings" onClick={handleNavClick} className={({ isActive }) => navItemClass(isActive)}>
              <Settings className="w-5 h-5 shrink-0" />
              <span>Settings</span>
            </NavLink>
          </div>
        </div>

        {/* Footer Profile Banner */}
        <div className="p-3 border-t border-[#ede0cb] dark:border-[#3a281d] bg-[#f7f0e3]/60 dark:bg-[#1a120c]/60">
          <div className="p-2.5 bg-[#ede0cb] dark:bg-[#342318] rounded-xl border border-[#dec7a5] dark:border-[#4a3426] flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#92400e] text-white font-bold flex items-center justify-center text-xs">
              ✓
            </div>
            <div className="overflow-hidden">
              <p className="text-[11px] font-bold text-[#543722] dark:text-[#f7f0e3] truncate">Biscuit Theme Active</p>
              <p className="text-[10px] text-[#92400e] dark:text-[#fbbf24] truncate">ANNAI BLUE METAL</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
