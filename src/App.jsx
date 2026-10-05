import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ErpProvider, useErp } from './context/ErpContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Toast from './components/Toast';

import DashboardPage from './pages/DashboardPage';
import SalesBillingPage from './pages/Inventory/SalesBillingPage';
import MastersPage from './pages/Masters/MastersPage';
import InventorySubPages from './pages/Inventory/InventorySubPages';
import AccountsPage from './pages/Accounts/AccountsPage';
import ReportsPage from './pages/ReportsPage';
import ToolsPage from './pages/ToolsPage';
import UsersPage from './pages/UsersPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SearchPage from './pages/SearchPage';
import SettingsPage from './pages/SettingsPage';

function AppContent() {
  const { darkMode } = useErp();

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'dark bg-[#1a120c] text-[#f7f0e3]' : 'bg-[#f7f0e3] text-[#38261b]'}`}>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 pb-12">
            <Routes>
              {/* Default Redirect */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />

              {/* POS Sales Billing */}
              <Route path="/inventory/sales-billing" element={<SalesBillingPage />} />

              {/* Masters */}
              <Route path="/masters" element={<Navigate to="/masters/products" replace />} />
              <Route path="/masters/:masterType" element={<MastersPage />} />

              {/* Inventory */}
              <Route path="/inventory" element={<Navigate to="/inventory/sales" replace />} />
              <Route path="/inventory/:section" element={<InventorySubPages />} />

              {/* Accounts */}
              <Route path="/accounts" element={<Navigate to="/accounts/receipt" replace />} />
              <Route path="/accounts/:subTab" element={<AccountsPage />} />

              {/* Reports */}
              <Route path="/reports" element={<Navigate to="/reports/sales" replace />} />
              <Route path="/reports/:reportType" element={<ReportsPage />} />

              {/* Tools */}
              <Route path="/tools" element={<ToolsPage />} />

              {/* Users */}
              <Route path="/users" element={<UsersPage defaultSection="list" />} />
              <Route path="/users/:section" element={<UsersPage />} />

              {/* Analytics */}
              <Route path="/analytics" element={<AnalyticsPage />} />

              {/* Global Search */}
              <Route path="/search" element={<SearchPage />} />

              {/* Settings */}
              <Route path="/settings" element={<SettingsPage />} />

              {/* Catch all fallback */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ErpProvider>
        <AppContent />
      </ErpProvider>
    </BrowserRouter>
  );
}
