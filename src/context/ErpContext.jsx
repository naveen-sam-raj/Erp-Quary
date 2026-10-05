import React, { createContext, useContext, useState, useMemo } from 'react';

const ErpContext = createContext();

export const ErpProvider = ({ children }) => {
  // Theme state
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Toast notification system
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Company Profile
  const [companyInfo] = useState({
    name: 'ANNAI BLUE METAL',
    tagline: 'Quarrying, Aggregates & Ready Construction Materials',
    address: '45/2, Crusher Zone Highway, Madukkarai, Coimbatore - 641105, Tamil Nadu',
    phone: '+91 98422 12345 / 0422 2654321',
    email: 'billing@annaibluemetal.com',
    gstin: '33AAAAA0000A1Z5',
    bankName: 'HDFC Bank - Madukkarai Branch',
    accountNo: '50200049281744',
    ifsc: 'HDFC0001824',
  });

  // Masters initial data
  const [categories, setCategories] = useState([
    { id: 1, code: 'CAT-01', name: 'Aggregate', description: 'Crushed stone aggregate for concrete', status: 'Active' },
    { id: 2, code: 'CAT-02', name: 'Sand', description: 'Manufactured and plastering sand', status: 'Active' },
    { id: 3, code: 'CAT-03', name: 'Sub-Base', description: 'GSB and WMM road construction materials', status: 'Active' },
    { id: 4, code: 'CAT-04', name: 'Raw Stone', description: 'Quarry boulders and uncrushed rock', status: 'Active' },
    { id: 5, code: 'CAT-05', name: 'By-Product', description: 'Crusher dust and quarry fines', status: 'Active' },
  ]);

  const [manufacturers, setManufacturers] = useState([
    { id: 1, name: 'Annai Crusher Unit 1', country: 'India', contact: '0422-2654321', status: 'Active' },
    { id: 2, name: 'Annai Crusher Unit 2', country: 'India', contact: '0422-2654322', status: 'Active' },
    { id: 3, name: 'Vulcan Mining Equipment', country: 'India', contact: '98422 99000', status: 'Active' },
  ]);

  const [products, setProducts] = useState([
    { id: 1, code: 'BM-001', name: 'Blue Metal 20mm', category: 'Aggregate', unit: 'Ton', purchaseRate: 850, saleRate: 1050, gst: 18, stock: 18, minStock: 50, status: 'Low Stock' },
    { id: 2, code: 'BM-040', name: 'Blue Metal 40mm', category: 'Aggregate', unit: 'Ton', purchaseRate: 820, saleRate: 1020, gst: 18, stock: 180, minStock: 50, status: 'In Stock' },
    { id: 3, code: 'BM-010', name: 'Blue Metal 10mm', category: 'Aggregate', unit: 'Ton', purchaseRate: 900, saleRate: 1100, gst: 18, stock: 95, minStock: 30, status: 'In Stock' },
    { id: 4, code: 'BM-006', name: 'Blue Metal 6mm (Jelly)', category: 'Aggregate', unit: 'Ton', purchaseRate: 800, saleRate: 1000, gst: 18, stock: 40, minStock: 30, status: 'In Stock' },
    { id: 5, code: 'MS-001', name: 'M-Sand (Manufactured)', category: 'Sand', unit: 'Ton', purchaseRate: 900, saleRate: 1150, gst: 18, stock: 12, minStock: 40, status: 'Low Stock' },
    { id: 6, code: 'PS-001', name: 'P-Sand (Plastering)', category: 'Sand', unit: 'Ton', purchaseRate: 950, saleRate: 1200, gst: 18, stock: 65, minStock: 30, status: 'In Stock' },
    { id: 7, code: 'GSB-001', name: 'GSB (Granular Sub-Base)', category: 'Sub-Base', unit: 'Ton', purchaseRate: 500, saleRate: 650, gst: 18, stock: 310, minStock: 100, status: 'In Stock' },
    { id: 8, code: 'WMM-001', name: 'WMM (Wet Mix Macadam)', category: 'Sub-Base', unit: 'Ton', purchaseRate: 600, saleRate: 750, gst: 18, stock: 240, minStock: 80, status: 'In Stock' },
    { id: 9, code: 'DUST-001', name: 'Crusher Dust', category: 'By-Product', unit: 'Ton', purchaseRate: 320, saleRate: 450, gst: 18, stock: 450, minStock: 100, status: 'In Stock' },
    { id: 10, code: 'BLD-001', name: 'Quarry Boulder Stone', category: 'Raw Stone', unit: 'Ton', purchaseRate: 400, saleRate: 550, gst: 18, stock: 520, minStock: 150, status: 'In Stock' },
  ]);

  const [customers, setCustomers] = useState([
    { id: 1, code: 'CUST-101', name: 'Sri Lakshmi Traders', phone: '9876543210', email: 'contact@srilakshmi.com', gst: '33ABCDE1234F1Z1', city: 'Coimbatore', address: '124, Mettupalayam Road, Coimbatore', outstanding: 45200, creditLimit: 200000, status: 'Active' },
    { id: 2, code: 'CUST-102', name: 'Raj Construction', phone: '9843156789', email: 'info@rajconstructions.in', gst: '33BCDEF2345G1Z2', city: 'Tirupur', address: '56, Avinashi Road, Tirupur', outstanding: 88500, creditLimit: 300000, status: 'Active' },
    { id: 3, code: 'CUST-103', name: 'Apex Infrastructure Ltd', phone: '9789012345', email: 'procurement@apexinfra.com', gst: '33CDEFG3456H1Z3', city: 'Pollachi', address: '89, Palakkad Road, Pollachi', outstanding: 124000, creditLimit: 500000, status: 'Active' },
    { id: 4, code: 'CUST-104', name: 'Kovai Builders & Developers', phone: '9443098765', email: 'projects@kovaibuilders.com', gst: '33DEFGH4567I1Z4', city: 'Coimbatore', address: '12, Trichy Road, Coimbatore', outstanding: 22400, creditLimit: 150000, status: 'Active' },
    { id: 5, code: 'CUST-105', name: 'Green Earth Contractors', phone: '9942211334', email: 'billing@greenearth.org', gst: '33EFGHI5678J1Z5', city: 'Palakkad', address: '78, Main Bazaar, Palakkad', outstanding: 56900, creditLimit: 250000, status: 'Active' },
  ]);

  const [suppliers, setSuppliers] = useState([
    { id: 1, code: 'SUPP-201', name: 'Tamilnad Cements Ltd', phone: '9812345678', gst: '33FGHIJ6789K1Z6', city: 'Ariyalur', outstanding: 110000, status: 'Active' },
    { id: 2, code: 'SUPP-202', name: 'Vulcan Heavy Machinery', phone: '9723456789', gst: '33GHIJK7890L1Z7', city: 'Salem', outstanding: 65000, status: 'Active' },
    { id: 3, code: 'SUPP-203', name: 'Southern Explosives Corp', phone: '9634567890', gst: '33HIJKL8901M1Z8', city: 'Erode', outstanding: 82400, status: 'Active' },
    { id: 4, code: 'SUPP-204', name: 'Bharath Fuel & Oils', phone: '9545678901', gst: '33IJKLM9012N1Z9', city: 'Coimbatore', outstanding: 19000, status: 'Active' },
  ]);

  const [employees, setEmployees] = useState([
    { id: 1, code: 'EMP-01', name: 'R. Sundaram', role: 'General Manager', phone: '9842210001', salary: 45000, status: 'Active' },
    { id: 2, code: 'EMP-02', name: 'M. Karthik', role: 'Accountant', phone: '9842210002', salary: 32000, status: 'Active' },
    { id: 3, code: 'EMP-03', name: 'V. Prakash', role: 'Sales Executive', phone: '9842210003', salary: 28000, status: 'Active' },
    { id: 4, code: 'EMP-04', name: 'K. Ramasamy', role: 'Tipper Driver', phone: '9842210004', salary: 22000, status: 'Active' },
    { id: 5, code: 'EMP-05', name: 'S. Loganathan', role: 'Crusher Operator', phone: '9842210005', salary: 25000, status: 'Active' },
  ]);

  const [vehicles, setVehicles] = useState([
    { id: 1, regNo: 'TN 37 CR 8899', model: 'Ashok Leyland 10-Wheeler Tipper', capacity: '20 Ton', driver: 'K. Ramasamy', status: 'Active' },
    { id: 2, regNo: 'TN 38 B 4422', model: 'JCB 3DX Heavy Excavator', capacity: 'N/A', driver: 'S. Selvam', status: 'Active' },
    { id: 3, regNo: 'TN 37 CZ 1102', model: 'Tata Signa 12-Wheeler Tipper', capacity: '25 Ton', driver: 'M. Murugan', status: 'Active' },
    { id: 4, regNo: 'TN 66 A 9055', model: 'Mahindra Blazo X Load Carrier', capacity: '16 Ton', driver: 'P. Velu', status: 'Maintenance' },
  ]);

  const [drivers, setDrivers] = useState([
    { id: 1, name: 'K. Ramasamy', licenseNo: 'TN37 2018000452', phone: '9842210004', vehicleAssigned: 'TN 37 CR 8899', status: 'Active' },
    { id: 2, name: 'M. Murugan', licenseNo: 'TN38 2016000891', phone: '9842298712', vehicleAssigned: 'TN 37 CZ 1102', status: 'Active' },
    { id: 3, name: 'S. Selvam', licenseNo: 'TN37 2015000123', phone: '9443312099', vehicleAssigned: 'TN 38 B 4422', status: 'Active' },
    { id: 4, name: 'P. Velu', licenseNo: 'TN66 2020000781', phone: '9944112233', vehicleAssigned: 'TN 66 A 9055', status: 'On Leave' },
  ]);

  const [areas, setAreas] = useState([
    { id: 1, name: 'Coimbatore South', code: 'CBE-S', distance: '12 km', status: 'Active' },
    { id: 2, name: 'Pollachi Highway', code: 'POL-HW', distance: '28 km', status: 'Active' },
    { id: 3, name: 'Tirupur Rural', code: 'TPR-R', distance: '45 km', status: 'Active' },
    { id: 4, name: 'Palakkad Border Zone', code: 'PLK-B', distance: '35 km', status: 'Active' },
  ]);

  const [ledgers, setLedgers] = useState([
    { id: 1, name: 'Sales Account', group: 'Sales Accounts', balance: 193350, type: 'Credit' },
    { id: 2, name: 'Purchase Account', group: 'Purchase Accounts', balance: 124500, type: 'Debit' },
    { id: 3, name: 'HDFC Current Bank A/c', group: 'Bank Accounts', balance: 645200, type: 'Debit' },
    { id: 4, name: 'Quarry Petty Cash Counter', group: 'Cash-in-Hand', balance: 84300, type: 'Debit' },
    { id: 5, name: 'Crusher Electricity Expense', group: 'Direct Expenses', balance: 45000, type: 'Debit' },
    { id: 6, name: 'Diesel & Fuel Expenses', group: 'Direct Expenses', balance: 68000, type: 'Debit' },
    { id: 7, name: 'Output CGST 9%', group: 'Duties & Taxes', balance: 14625, type: 'Credit' },
    { id: 8, name: 'Output SGST 9%', group: 'Duties & Taxes', balance: 14625, type: 'Credit' },
  ]);

  const [accountGroups, setAccountGroups] = useState([
    { id: 1, name: 'Sales Accounts', nature: 'Revenue', parent: 'Primary' },
    { id: 2, name: 'Purchase Accounts', nature: 'Expense', parent: 'Primary' },
    { id: 3, name: 'Sundry Debtors', nature: 'Asset', parent: 'Current Assets' },
    { id: 4, name: 'Sundry Creditors', nature: 'Liability', parent: 'Current Liabilities' },
    { id: 5, name: 'Cash-in-Hand', nature: 'Asset', parent: 'Current Assets' },
    { id: 6, name: 'Bank Accounts', nature: 'Asset', parent: 'Current Assets' },
    { id: 7, name: 'Duties & Taxes', nature: 'Liability', parent: 'Current Liabilities' },
  ]);

  const [costCentres, setCostCentres] = useState([
    { id: 1, name: 'Madukkarai Quarry Unit 1', code: 'CC-01', manager: 'R. Sundaram' },
    { id: 2, name: 'Crusher Plant 2 (VSI Unit)', code: 'CC-02', manager: 'S. Loganathan' },
    { id: 3, name: 'Logistics & Fleet Transport', code: 'CC-03', manager: 'K. Ramasamy' },
  ]);

  const [counters, setCounters] = useState([
    { id: 1, name: 'Counter 1 - Main Weighbridge Gate', code: 'CNT-01', operator: 'M. Karthik' },
    { id: 2, name: 'Counter 2 - Dispatch Office', code: 'CNT-02', operator: 'V. Prakash' },
  ]);

  const [placesOfSupply, setPlacesOfSupply] = useState([
    { id: 1, state: 'Tamil Nadu', stateCode: '33', type: 'Intra-State (CGST + SGST)' },
    { id: 2, state: 'Kerala', stateCode: '32', type: 'Inter-State (IGST)' },
    { id: 3, state: 'Karnataka', stateCode: '29', type: 'Inter-State (IGST)' },
  ]);

  // Invoices & Billing
  const [invoices, setInvoices] = useState([
    {
      id: 'INV-1024',
      customer: 'Sri Lakshmi Traders',
      phone: '9876543210',
      date: '05 Oct 2026',
      paymentMode: 'Cash',
      status: 'Paid',
      subtotal: 20762.71,
      cgst: 1868.65,
      sgst: 1868.65,
      igst: 0,
      roundOff: -0.01,
      grandTotal: 24500,
      items: [
        { code: 'BM-001', name: 'Blue Metal 20mm', qty: 15, rate: 1050, discount: 0, gst: 18, total: 15750 },
        { code: 'MS-001', name: 'M-Sand (Manufactured)', qty: 7.6, rate: 1150, discount: 0, gst: 18, total: 8750 }
      ]
    },
    {
      id: 'INV-1025',
      customer: 'Raj Construction',
      phone: '9843156789',
      date: '05 Oct 2026',
      paymentMode: 'UPI',
      status: 'Paid',
      subtotal: 15423.73,
      cgst: 1388.14,
      sgst: 1388.14,
      igst: 0,
      roundOff: -0.01,
      grandTotal: 18200,
      items: [
        { code: 'BM-040', name: 'Blue Metal 40mm', qty: 12, rate: 1020, discount: 0, gst: 18, total: 12240 },
        { code: 'BM-006', name: 'Blue Metal 6mm (Jelly)', qty: 5.96, rate: 1000, discount: 0, gst: 18, total: 5960 }
      ]
    },
    {
      id: 'INV-1026',
      customer: 'Apex Infrastructure Ltd',
      phone: '9789012345',
      date: '04 Oct 2026',
      paymentMode: 'Bank Transfer',
      status: 'Paid',
      subtotal: 52711.86,
      cgst: 4744.07,
      sgst: 4744.07,
      igst: 0,
      roundOff: 0,
      grandTotal: 62200,
      items: [
        { code: 'GSB-001', name: 'GSB (Granular Sub-Base)', qty: 50, rate: 650, discount: 0, gst: 18, total: 32500 },
        { code: 'WMM-001', name: 'WMM (Wet Mix Macadam)', qty: 39.6, rate: 750, discount: 0, gst: 18, total: 29700 }
      ]
    },
    {
      id: 'INV-1027',
      customer: 'Kovai Builders & Developers',
      phone: '9443098765',
      date: '03 Oct 2026',
      paymentMode: 'Credit',
      status: 'Pending',
      subtotal: 18983.05,
      cgst: 1708.47,
      sgst: 1708.47,
      igst: 0,
      roundOff: 0.01,
      grandTotal: 22400,
      items: [
        { code: 'PS-001', name: 'P-Sand (Plastering)', qty: 15, rate: 1200, discount: 0, gst: 18, total: 18000 },
        { code: 'DUST-001', name: 'Crusher Dust', qty: 9.78, rate: 450, discount: 0, gst: 18, total: 4400 }
      ]
    },
    {
      id: 'INV-1028',
      customer: 'Green Earth Contractors',
      phone: '9942211334',
      date: '02 Oct 2026',
      paymentMode: 'Cheque',
      status: 'Paid',
      subtotal: 48220.34,
      cgst: 0,
      sgst: 0,
      igst: 8679.66,
      roundOff: 0,
      grandTotal: 56900,
      items: [
        { code: 'BLD-001', name: 'Quarry Boulder Stone', qty: 80, rate: 550, discount: 0, gst: 18, total: 44000 },
        { code: 'BM-001', name: 'Blue Metal 20mm', qty: 12.28, rate: 1050, discount: 0, gst: 18, total: 12900 }
      ]
    }
  ]);

  // Hold Invoices
  const [holdInvoices, setHoldInvoices] = useState([]);

  // Purchases
  const [purchases, setPurchases] = useState([
    { id: 'PUR-801', purchaseNo: 'PUR-801', supplier: 'Tamilnad Cements Ltd', date: '05 Oct 2026', invoiceNo: 'TCL-9921', paymentMode: 'Credit', amount: 65000, tax: 9915, status: 'Completed' },
    { id: 'PUR-802', purchaseNo: 'PUR-802', supplier: 'Bharath Fuel & Oils', date: '04 Oct 2026', invoiceNo: 'BFO-4410', paymentMode: 'Bank Transfer', amount: 40500, tax: 6177, status: 'Completed' },
    { id: 'PUR-803', purchaseNo: 'PUR-803', supplier: 'Vulcan Heavy Machinery', date: '02 Oct 2026', invoiceNo: 'VHM-102', paymentMode: 'Bank Transfer', amount: 19000, tax: 2898, status: 'Completed' },
  ]);

  // Sales Orders
  const [salesOrders, setSalesOrders] = useState([
    { id: 'SO-1056', orderNo: 'SO-1056', customer: 'Raj Construction', date: '05 Oct 2026', deliveryDate: '08 Oct 2026', amount: 85000, status: 'Confirmed', salesman: 'V. Prakash' },
    { id: 'SO-1057', orderNo: 'SO-1057', customer: 'Apex Infrastructure Ltd', date: '04 Oct 2026', deliveryDate: '10 Oct 2026', amount: 145000, status: 'Processing', salesman: 'V. Prakash' },
    { id: 'SO-1058', orderNo: 'SO-1058', customer: 'Kovai Builders', date: '03 Oct 2026', deliveryDate: '06 Oct 2026', amount: 32000, status: 'Pending', salesman: 'V. Prakash' },
  ]);

  // Purchase Orders
  const [purchaseOrders, setPurchaseOrders] = useState([
    { id: 'PO-301', poNo: 'PO-301', supplier: 'Southern Explosives Corp', date: '04 Oct 2026', expectedDelivery: '07 Oct 2026', amount: 95000, status: 'Approved' },
    { id: 'PO-302', poNo: 'PO-302', supplier: 'Bharath Fuel & Oils', date: '05 Oct 2026', expectedDelivery: '06 Oct 2026', amount: 50000, status: 'Pending' },
  ]);

  // Sales & Purchase Returns
  const [salesReturns, setSalesReturns] = useState([
    { id: 'SR-401', returnNo: 'SR-401', invoiceNo: 'INV-1020', customer: 'Sri Lakshmi Traders', date: '03 Oct 2026', amount: 4200, reason: 'Weight discrepancy at site weighbridge' }
  ]);

  const [purchaseReturns, setPurchaseReturns] = useState([
    { id: 'PR-501', returnNo: 'PR-501', purchaseNo: 'PUR-795', supplier: 'Bharath Fuel & Oils', date: '01 Oct 2026', amount: 3500, reason: 'Defective lubricant oil barrel' }
  ]);

  // Receipts & Payments
  const [receipts, setReceipts] = useState([
    { id: 'RCT-501', rctNo: 'RCT-501', date: '05 Oct 2026', customer: 'Sri Lakshmi Traders', paymentMode: 'Cash', amount: 24500, reference: 'INV-1024', narration: 'Full payment for billing INV-1024' },
    { id: 'RCT-502', rctNo: 'RCT-502', date: '04 Oct 2026', customer: 'Apex Infrastructure Ltd', paymentMode: 'NEFT', amount: 50000, reference: 'PART-PAY', narration: 'Part payment against outstanding balance' },
  ]);

  const [payments, setPayments] = useState([
    { id: 'PAY-601', payNo: 'PAY-601', date: '05 Oct 2026', supplier: 'Bharath Fuel & Oils', paymentMode: 'Bank Transfer', amount: 35000, reference: 'TXN-984210', narration: 'Diesel delivery payment' },
    { id: 'PAY-602', payNo: 'PAY-602', date: '03 Oct 2026', supplier: 'Tamilnad Cements Ltd', paymentMode: 'Cheque', amount: 40000, reference: 'CHQ-88201', narration: 'Cement bulk bag supply' },
  ]);

  // Journal entries
  const [journalEntries, setJournalEntries] = useState([
    {
      id: 'JRN-701',
      date: '05 Oct 2026',
      narration: 'Provision for Monthly Crusher Plant Electricity Bill',
      entries: [
        { account: 'Crusher Electricity Expense', debit: 45000, credit: 0 },
        { account: 'TNEB Electricity Payable', debit: 0, credit: 45000 }
      ]
    },
    {
      id: 'JRN-702',
      date: '04 Oct 2026',
      narration: 'Depreciation provision for JCB Excavator',
      entries: [
        { account: 'Depreciation Expense', debit: 12500, credit: 0 },
        { account: 'Accumulated Depreciation - Machinery', debit: 0, credit: 12500 }
      ]
    }
  ]);

  // Stock Adjustments & Transfers
  const [stockAdjustments, setStockAdjustments] = useState([
    { id: 1, date: '04 Oct 2026', product: 'Blue Metal 20mm', type: 'Addition', qty: '10 Ton', reason: 'Stock physical audit re-measurement' },
    { id: 2, date: '02 Oct 2026', product: 'Crusher Dust', type: 'Deduction', qty: '5 Ton', reason: 'Spillages during rain handling' },
  ]);

  const [stockTransfers, setStockTransfers] = useState([
    { id: 1, transferNo: 'ST-901', date: '05 Oct 2026', fromLocation: 'Madukkarai Quarry Yard 1', toLocation: 'Dispatch Gate Stock Yard 2', items: 'M-Sand (20 Ton)', status: 'Completed' },
    { id: 2, transferNo: 'ST-902', date: '03 Oct 2026', fromLocation: 'Crusher Unit 2', toLocation: 'Main Sales Yard', items: 'Blue Metal 10mm (35 Ton)', status: 'In Transit' },
  ]);

  // Cheque Register
  const [cheques, setCheques] = useState([
    { id: 1, chqNo: 'CHQ-88201', date: '06 Oct 2026', bank: 'HDFC Bank', party: 'Tamilnad Cements Ltd', amount: 40000, type: 'Issued', status: 'Pending' },
    { id: 2, chqNo: 'CHQ-10492', date: '04 Oct 2026', bank: 'SBI Madukkarai', party: 'Green Earth Contractors', amount: 56900, type: 'Received', status: 'Cleared' },
    { id: 3, chqNo: 'CHQ-99304', date: '02 Oct 2026', bank: 'Canara Bank', party: 'Raj Construction', amount: 25000, type: 'Received', status: 'Bounced' },
  ]);

  // Activity Log
  const [activityLogs, setActivityLogs] = useState([
    { id: 1, user: 'Admin', role: 'Administrator', action: 'Created Invoice', detail: 'INV-1024 (Sri Lakshmi Traders - ₹24,500)', time: 'Today 10:32 AM' },
    { id: 2, user: 'Manager', role: 'Manager', action: 'Updated Product Stock', detail: 'Blue Metal 20mm stock adjusted by +10 Ton', time: 'Today 10:15 AM' },
    { id: 3, user: 'Cashier', role: 'Cashier', action: 'Printed Invoice', detail: 'INV-1025 preview generated', time: 'Today 09:50 AM' },
    { id: 4, user: 'Accountant', role: 'Accountant', action: 'Logged Receipt', detail: 'RCT-501 recorded for Sri Lakshmi Traders', time: 'Yesterday 04:20 PM' },
    { id: 5, user: 'Admin', role: 'Administrator', action: 'Modified User Permissions', detail: 'Granted Export access to Cashier role', time: 'Yesterday 02:10 PM' },
  ]);

  // Users & Permissions
  const [usersList, setUsersList] = useState([
    { id: 1, username: 'admin', name: 'Naveen Kumar (Proprietor)', email: 'admin@annaibluemetal.com', role: 'Admin', status: 'Active' },
    { id: 2, username: 'sundaram', name: 'R. Sundaram', email: 'sundaram@annaibluemetal.com', role: 'Manager', status: 'Active' },
    { id: 3, username: 'karthik', name: 'M. Karthik', email: 'karthik@annaibluemetal.com', role: 'Accountant', status: 'Active' },
    { id: 4, username: 'prakash', name: 'V. Prakash', email: 'prakash@annaibluemetal.com', role: 'Sales Staff', status: 'Active' },
    { id: 5, username: 'counter1', name: 'Weighbridge Counter 1', email: 'counter1@annaibluemetal.com', role: 'Cashier', status: 'Active' },
  ]);

  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', usersCount: 1, description: 'Full Unrestricted System Control' },
    { id: 2, name: 'Manager', usersCount: 1, description: 'Quarry Operations & Inventory Access' },
    { id: 3, name: 'Accountant', usersCount: 1, description: 'Ledgers, Day Book & Financial Reports' },
    { id: 4, name: 'Sales Staff', usersCount: 1, description: 'Sales Invoicing & Customer Quotations' },
    { id: 5, name: 'Inventory Staff', usersCount: 0, description: 'Stock Adjustment & Material Dispatch' },
    { id: 6, name: 'Cashier', usersCount: 1, description: 'Counter POS Billing & Daily Cash Log' },
  ]);

  // Permissions Matrix State
  const [permissions, setPermissions] = useState({
    Admin: { View: true, Create: true, Edit: true, Delete: true, Print: true, Export: true },
    Manager: { View: true, Create: true, Edit: true, Delete: false, Print: true, Export: true },
    Accountant: { View: true, Create: true, Edit: true, Delete: false, Print: true, Export: true },
    SalesStaff: { View: true, Create: true, Edit: false, Delete: false, Print: true, Export: false },
    Cashier: { View: true, Create: true, Edit: false, Delete: false, Print: true, Export: false },
  });

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Low Stock Warning: Blue Metal 20mm', detail: 'Current stock (18 Ton) is below minimum threshold (50 Ton)', time: '10m ago', unread: true },
    { id: 2, title: 'Payment Pending: Raj Construction', detail: 'Invoice INV-1025 payment follow-up due today', time: '1h ago', unread: true },
    { id: 3, title: 'New Sales Order: SO-1056', detail: 'Order for ₹85,000 confirmed by V. Prakash', time: '2h ago', unread: false },
    { id: 4, title: 'Stock Transfer ST-901 Completed', detail: '20 Ton M-Sand transferred to Sales Yard 2', time: '4h ago', unread: false },
  ]);

  // Cash Counter Stats
  const cashCounter = useMemo(() => {
    return {
      openingCash: 50000,
      cashSales: 24500,
      cashReceipts: 24500,
      cashPayments: 15000,
      expenses: 4200,
      closingCash: 50000 + 24500 + 24500 - 15000 - 4200, // 79,800
    };
  }, []);

  // Handler functions
  const addProduct = (prodData) => {
    const newProd = {
      id: Date.now(),
      code: prodData.code || `BM-00${products.length + 1}`,
      name: prodData.name,
      category: prodData.category || 'Aggregate',
      unit: prodData.unit || 'Ton',
      purchaseRate: Number(prodData.purchaseRate) || 0,
      saleRate: Number(prodData.saleRate) || 0,
      gst: Number(prodData.gst) || 18,
      stock: Number(prodData.stock) || 0,
      minStock: Number(prodData.minStock) || 30,
      status: (Number(prodData.stock) < (Number(prodData.minStock) || 30)) ? 'Low Stock' : 'In Stock'
    };
    setProducts(prev => [newProd, ...prev]);
    addActivityLog('Admin', 'Added Product', `${newProd.name} (${newProd.code})`);
    showToast(`Product "${newProd.name}" added successfully (Frontend Demo)`);
  };

  const deleteProduct = (id) => {
    const prod = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    if (prod) {
      addActivityLog('Admin', 'Deleted Product', `${prod.name} (${prod.code})`);
      showToast(`Product "${prod.name}" deleted (Frontend Demo)`);
    }
  };

  const addCustomer = (custData) => {
    const newCust = {
      id: Date.now(),
      code: custData.code || `CUST-${100 + customers.length + 1}`,
      name: custData.name,
      phone: custData.phone || '',
      email: custData.email || '',
      gst: custData.gst || '',
      city: custData.city || 'Coimbatore',
      address: custData.address || '',
      outstanding: Number(custData.openingBalance) || 0,
      creditLimit: Number(custData.creditLimit) || 100000,
      status: 'Active'
    };
    setCustomers(prev => [newCust, ...prev]);
    addActivityLog('Admin', 'Added Customer', newCust.name);
    showToast(`Customer "${newCust.name}" added successfully (Frontend Demo)`);
  };

  const addSupplier = (suppData) => {
    const newSupp = {
      id: Date.now(),
      code: suppData.code || `SUPP-${200 + suppliers.length + 1}`,
      name: suppData.name,
      phone: suppData.phone || '',
      gst: suppData.gst || '',
      city: suppData.city || 'Coimbatore',
      outstanding: Number(suppData.openingBalance) || 0,
      status: 'Active'
    };
    setSuppliers(prev => [newSupp, ...prev]);
    showToast(`Supplier "${newSupp.name}" added (Frontend Demo)`);
  };

  const addInvoice = (inv) => {
    const newInv = {
      id: `INV-${1024 + invoices.length}`,
      ...inv,
      date: inv.date || '05 Oct 2026',
      status: 'Paid'
    };
    setInvoices(prev => [newInv, ...prev]);
    addActivityLog('Admin', 'Created Invoice', `${newInv.id} - ₹${newInv.grandTotal.toLocaleString('en-IN')}`);
    showToast(`Invoice ${newInv.id} created successfully (Demo)`);
    return newInv;
  };

  const addActivityLog = (user, action, detail) => {
    const now = new Date();
    const timeStr = `Today ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    setActivityLogs(prev => [
      { id: Date.now(), user, role: user === 'Admin' ? 'Administrator' : 'Staff', action, detail, time: timeStr },
      ...prev
    ]);
  };

  return (
    <ErpContext.Provider
      value={{
        darkMode,
        setDarkMode,
        sidebarOpen,
        setSidebarOpen,
        toast,
        showToast,
        companyInfo,
        categories,
        setCategories,
        manufacturers,
        setManufacturers,
        products,
        setProducts,
        customers,
        setCustomers,
        suppliers,
        setSuppliers,
        employees,
        setEmployees,
        vehicles,
        setVehicles,
        drivers,
        setDrivers,
        areas,
        setAreas,
        ledgers,
        setLedgers,
        accountGroups,
        setAccountGroups,
        costCentres,
        setCostCentres,
        counters,
        setCounters,
        placesOfSupply,
        setPlacesOfSupply,
        invoices,
        setInvoices,
        holdInvoices,
        setHoldInvoices,
        purchases,
        setPurchases,
        salesOrders,
        setSalesOrders,
        purchaseOrders,
        setPurchaseOrders,
        salesReturns,
        setSalesReturns,
        purchaseReturns,
        setPurchaseReturns,
        receipts,
        setReceipts,
        payments,
        setPayments,
        journalEntries,
        setJournalEntries,
        stockAdjustments,
        setStockAdjustments,
        stockTransfers,
        setStockTransfers,
        cheques,
        setCheques,
        activityLogs,
        setActivityLogs,
        usersList,
        setUsersList,
        roles,
        setRoles,
        permissions,
        setPermissions,
        notifications,
        setNotifications,
        cashCounter,
        addProduct,
        deleteProduct,
        addCustomer,
        addSupplier,
        addInvoice,
        addActivityLog,
      }}
    >
      {children}
    </ErpContext.Provider>
  );
};

export const useErp = () => useContext(ErpContext);
