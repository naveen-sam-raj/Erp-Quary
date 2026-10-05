import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Menu,
  Moon,
  Sun,
  Bell,
  Search,
  ChevronRight,
  User,
  ShieldCheck,
  LogOut,
  Wallet,
  Building2,
  Package,
  FileText
} from 'lucide-react';
import { useErp } from '../context/ErpContext';

export default function Header() {
  const {
    darkMode,
    setDarkMode,
    sidebarOpen,
    setSidebarOpen,
    notifications,
    setNotifications,
    cashCounter,
    products,
    customers,
    invoices
  } = useErp();

  const location = useLocation();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const searchRef = useRef(null);

  // Unread notifications count
  const unreadCount = notifications.filter(n => n.unread).length;

  // Breadcrumb generator
  const getBreadcrumbs = () => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    if (pathParts.length === 0) return ['Dashboard'];
    
    return pathParts.map(part => {
      return part
        .replace(/-/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
    });
  };

  const breadcrumbs = getBreadcrumbs();

  // Search logic
  const filteredProducts = searchQuery.trim()
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.code.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3)
    : [];

  const filteredCustomers = searchQuery.trim()
    ? customers.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.phone.includes(searchQuery)).slice(0, 3)
    : [];

  const filteredInvoices = searchQuery.trim()
    ? invoices.filter(i => i.id.toLowerCase().includes(searchQuery.toLowerCase()) || i.customer.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3)
    : [];

  const hasResults = filteredProducts.length > 0 || filteredCustomers.length > 0 || filteredInvoices.length > 0;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-[#fdfbf7]/90 dark:bg-[#231913]/90 backdrop-blur-md border-b border-[#ede0cb] dark:border-[#3a281d] transition-colors">
      {/* Left section: Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-[#68442b] dark:text-[#d7c4b7] hover:bg-[#ede0cb]/60 dark:hover:bg-[#342318] rounded-lg transition-colors focus:outline-none"
          title="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb */}
        <nav className="hidden sm:flex items-center gap-2 text-sm text-[#785438] dark:text-[#c4b1a3]">
          <Link to="/" className="hover:text-[#92400e] dark:hover:text-[#fbbf24] transition-colors font-medium">
            ANNAI BLUE METAL
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3.5 h-3.5 text-[#b48c4d]" />
              <span className={idx === breadcrumbs.length - 1 ? 'font-bold text-[#2b1b10] dark:text-white' : ''}>
                {crumb}
              </span>
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Quick Search */}
        <div className="relative hidden md:block" ref={searchRef}>
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-[#b48c4d]" />
            <input
              type="text"
              placeholder="Search products, invoices, clients..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              className="w-60 lg:w-72 pl-9 pr-4 py-1.5 text-xs md:text-sm bg-[#f7f0e3] dark:bg-[#2d1e15] text-[#2b1b10] dark:text-white rounded-xl border border-[#ede0cb] dark:border-[#3d2b20] focus:outline-none focus:ring-2 focus:ring-[#92400e]/50 transition-all"
            />
          </div>

          {/* Search Dropdown */}
          {showSearchResults && searchQuery.trim() && (
            <div className="absolute right-0 mt-2 w-80 bg-[#fdfbf7] dark:bg-[#231913] rounded-2xl shadow-2xl border border-[#ede0cb] dark:border-[#3d2b20] overflow-hidden z-50 p-2 text-xs">
              {!hasResults && (
                <div className="p-4 text-center text-[#785438] dark:text-[#c4b1a3]">
                  No matching record found for "{searchQuery}"
                </div>
              )}

              {filteredProducts.length > 0 && (
                <div className="mb-2">
                  <div className="px-3 py-1 font-semibold text-[#85542e] uppercase tracking-wider flex items-center gap-1">
                    <Package className="w-3.5 h-3.5 text-[#92400e]" /> Products
                  </div>
                  {filteredProducts.map(p => (
                    <div
                      key={p.id}
                      onClick={() => {
                        navigate('/masters/products');
                        setShowSearchResults(false);
                      }}
                      className="flex items-center justify-between px-3 py-2 hover:bg-[#ede0cb]/50 dark:hover:bg-[#342318] rounded-lg cursor-pointer"
                    >
                      <span className="font-medium text-[#2b1b10] dark:text-white">{p.name} ({p.code})</span>
                      <span className="text-[#92400e] dark:text-[#fbbf24] font-bold">₹{p.saleRate}/ton</span>
                    </div>
                  ))}
                </div>
              )}

              {filteredCustomers.length > 0 && (
                <div className="mb-2">
                  <div className="px-3 py-1 font-semibold text-[#85542e] uppercase tracking-wider flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-[#15803d]" /> Customers
                  </div>
                  {filteredCustomers.map(c => (
                    <div
                      key={c.id}
                      onClick={() => {
                        navigate('/masters/customers');
                        setShowSearchResults(false);
                      }}
                      className="flex items-center justify-between px-3 py-2 hover:bg-[#ede0cb]/50 dark:hover:bg-[#342318] rounded-lg cursor-pointer"
                    >
                      <span className="font-medium text-[#2b1b10] dark:text-white">{c.name}</span>
                      <span className="text-[#785438]">{c.phone}</span>
                    </div>
                  ))}
                </div>
              )}

              {filteredInvoices.length > 0 && (
                <div>
                  <div className="px-3 py-1 font-semibold text-[#85542e] uppercase tracking-wider flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-[#b45309]" /> Invoices
                  </div>
                  {filteredInvoices.map(i => (
                    <div
                      key={i.id}
                      onClick={() => {
                        navigate('/inventory/sales-billing');
                        setShowSearchResults(false);
                      }}
                      className="flex items-center justify-between px-3 py-2 hover:bg-[#ede0cb]/50 dark:hover:bg-[#342318] rounded-lg cursor-pointer"
                    >
                      <span className="font-medium text-[#2b1b10] dark:text-white">{i.id} - {i.customer}</span>
                      <span className="text-[#15803d] dark:text-[#86efac] font-bold">₹{i.grandTotal.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-1 pt-2 border-t border-[#ede0cb] dark:border-[#3d2b20] text-center">
                <Link
                  to={`/search?q=${encodeURIComponent(searchQuery)}`}
                  onClick={() => setShowSearchResults(false)}
                  className="text-[#92400e] dark:text-[#fbbf24] font-bold hover:underline block py-1"
                >
                  View full search results →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Cash Counter Quick Badge */}
        <Link
          to="/accounts/cash-counter"
          className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-[#fef3c7] dark:bg-[#382614] text-[#92400e] dark:text-[#fde68a] rounded-xl border border-[#fde68a] dark:border-[#543722] hover:bg-[#fde68a] transition-colors text-xs font-medium"
          title="Cash Counter Drawer"
        >
          <Wallet className="w-4 h-4 text-[#92400e] dark:text-[#fbbf24]" />
          <span>Cash: <strong className="font-bold">₹{cashCounter.closingCash.toLocaleString('en-IN')}</strong></span>
        </Link>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 text-[#68442b] dark:text-[#d7c4b7] hover:bg-[#ede0cb]/60 dark:hover:bg-[#342318] rounded-xl transition-colors"
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-[#68442b]" />}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-[#68442b] dark:text-[#d7c4b7] hover:bg-[#ede0cb]/60 dark:hover:bg-[#342318] rounded-xl transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white ring-2 ring-white animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#fdfbf7] dark:bg-[#231913] rounded-2xl shadow-2xl border border-[#ede0cb] dark:border-[#3d2b20] overflow-hidden z-50">
              <div className="flex items-center justify-between px-4 py-3 bg-[#f7f0e3] dark:bg-[#2d1e15] border-b border-[#ede0cb] dark:border-[#3d2b20]">
                <span className="font-bold text-sm text-[#2b1b10] dark:text-white">Notifications</span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs text-[#92400e] dark:text-[#fbbf24] hover:underline font-bold"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-[#ede0cb]/60 dark:divide-[#3d2b20]">
                {notifications.map(n => (
                  <div
                    key={n.id}
                    className={`p-3 hover:bg-[#ede0cb]/40 dark:hover:bg-[#342318] transition-colors ${n.unread ? 'bg-[#fef3c7]/60 dark:bg-[#382614]/50' : ''}`}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-[#2b1b10] dark:text-white">{n.title}</h4>
                      <span className="text-[10px] text-[#85542e]">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-[#68442b] dark:text-[#d7c4b7] mt-1">{n.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 hover:bg-[#ede0cb]/60 dark:hover:bg-[#342318] rounded-xl transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#92400e] to-[#b45309] text-white font-bold flex items-center justify-center text-xs shadow-md">
              AB
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold text-[#2b1b10] dark:text-white leading-none">Naveen Kumar</div>
              <div className="text-[10px] text-[#85542e] dark:text-[#c4b1a3] mt-0.5">Proprietor / Admin</div>
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-[#fdfbf7] dark:bg-[#231913] rounded-2xl shadow-2xl border border-[#ede0cb] dark:border-[#3d2b20] overflow-hidden z-50 p-2">
              <div className="px-3 py-2 border-b border-[#ede0cb] dark:border-[#3d2b20] mb-1">
                <p className="text-xs font-bold text-[#2b1b10] dark:text-white">ANNAI BLUE METAL</p>
                <p className="text-[10px] text-[#85542e]">Unit 1 - Madukkarai Quarry</p>
              </div>

              <Link
                to="/users"
                onClick={() => setShowUserMenu(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-[#451a03] dark:text-[#f7f0e3] hover:bg-[#ede0cb]/60 dark:hover:bg-[#342318] rounded-xl font-medium"
              >
                <User className="w-4 h-4 text-[#92400e]" /> User Profile & Activity
              </Link>
              <Link
                to="/users/permissions"
                onClick={() => setShowUserMenu(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-[#451a03] dark:text-[#f7f0e3] hover:bg-[#ede0cb]/60 dark:hover:bg-[#342318] rounded-xl font-medium"
              >
                <ShieldCheck className="w-4 h-4 text-[#15803d]" /> Security Roles
              </Link>
              <Link
                to="/settings"
                onClick={() => setShowUserMenu(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-[#451a03] dark:text-[#f7f0e3] hover:bg-[#ede0cb]/60 dark:hover:bg-[#342318] rounded-xl font-medium"
              >
                <Building2 className="w-4 h-4 text-[#b45309]" /> System Settings
              </Link>

              <div className="mt-1 pt-1 border-t border-[#ede0cb] dark:border-[#3d2b20]">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    alert("Demo Mode: Logging out resets temporary session.");
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl font-medium"
                >
                  <LogOut className="w-4 h-4" /> Demo Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
