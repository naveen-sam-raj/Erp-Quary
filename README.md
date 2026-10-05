# ANNAI BLUE METAL – Business Management System (ERP)

A complete, modern, high-performance ERP, Billing, Inventory, and Accounting Management frontend application built for **ANNAI BLUE METAL** (Quarrying, Aggregates & Construction Material Solutions).

![Biscuit Theme ERP](https://img.shields.io/badge/Theme-Biscuit%20%26%20Caramel-amber?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-8.0-purple?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-teal?style=for-the-badge)

---

## 🌟 Key Features

### 🛒 POS Sales Billing Terminal (`/inventory/sales-billing`)
- Real-time tax computation (CGST 9% + SGST 9% or Inter-state IGST 18%).
- Automatic line item discount calculation, subtotal, round-off, and grand total.
- Fast item catalogue selection & instant add chips (*Blue Metal 20mm, M-Sand, P-Sand, Jelly, Crusher Dust*).
- Invoice hold drawer, clear, save, and **SAVE & PRINT** with full **Tax Invoice Preview Modal** (Company header, GSTIN, weighbridge slip info, signature box).

### 📊 Executive Dashboard (`/dashboard`)
- 6 Real-time KPI Cards: Today's Sales, Today's Purchase, Total Receivables, Total Payables, Stock Value, and Net Profit.
- Interactive Recharts for Sales & Purchase trends across time filters (*Today, 7 Days, 30 Days, This Month*).
- Stock volume breakdown pie chart & Low Stock Alert warning system.

### 📑 14 Masters Register (`/masters/:masterType`)
1. Product Master (rates, GST, stock alert limits)
2. Customer Master (phone, GSTIN, city, credit limit)
3. Supplier Master
4. Category Master
5. Manufacturer Master
6. Employee Master
7. Vehicle Master (*Tipper 10-Wheelers, JCB Excavators*)
8. Driver Master
9. Ledger Master
10. Account Group Master
11. Cost Centre Master
12. Counter Master
13. Place of Supply Master
14. Area Master

### 💰 Accounting & Financial Ledger (`/accounts/:subTab`)
- **Receipt Voucher**: Cash/Bank client receipt entry & history log.
- **Payment Voucher**: Supplier payment entry & history log.
- **Double-Entry Journal**: Voucher entry with Debit Total = Credit Total balancing validation.
- **Day Book**: Daily financial log with running balance.
- **Balance Sheet**: Two-column layout comparing ASSETS vs LIABILITIES.
- **Cheque Register**: Clearance status tracking (*Pending, Cleared, Bounced, Cancelled*).
- **Cash Counter**: Daily drawer reconciliation (*Opening Cash, Cash Sales, Receipts, Payments, Expenses, Closing Cash*).

### 🛠️ Tools, Reports, Users & Security
- **Reports**: Sales, Purchase, Stock, Tax, and Accounts reports with date filters, Excel Export, PDF Download, and Print.
- **Tools**: Modals for Export/Import, FY Closing, Weighbridge calibration, Translator, Tamil Regional Name Updater, and GST Mass Rate Updater.
- **Users**: Directory, Roles, Permissions Matrix toggle switches (*View, Create, Edit, Delete, Print, Export*), and Activity Audit Log.
- **Design System**: Premium Biscuit & Caramel theme with dark mode toggle.

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm v9+

### Installation

```bash
# Clone repository
git clone <your-repo-url>
cd Erp

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will run at `http://localhost:5173/` or `http://localhost:5174/`.

### Build for Production

```bash
npm run build
```

---

## 📄 License
Privately owned by **ANNAI BLUE METAL**, Coimbatore, Tamil Nadu.
