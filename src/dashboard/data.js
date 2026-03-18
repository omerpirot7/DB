import {
  BarChart3,
  Boxes,
  Building2,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingBasket,
  UserCog,
  Users,
  Wallet,
  BellRing,
  AlertTriangle
} from 'lucide-react';

export const sidebarItems = [
  { id: 'dashboard', labelKey: 'dashboard', icon: LayoutDashboard },
  { id: 'pos', labelKey: 'posLabel', icon: CreditCard },
  { id: 'loans', labelKey: 'loanSystemLabel', icon: Wallet },
  { id: 'products', labelKey: 'products', icon: Package },
  { id: 'categories', labelKey: 'categories', icon: Boxes },
  { id: 'companies', labelKey: 'companies', icon: Building2 },
  { id: 'users', labelKey: 'users', icon: Users },
  { id: 'settings', labelKey: 'settings', icon: Settings }
];

export const topStats = [
  { id: 1, titleKey: 'totalOrdersLabel', value: '4,128', icon: ClipboardList, tone: 'from-sky-50 to-sky-100 text-sky-700' },
  { id: 2, titleKey: 'totalSalesLabel', value: '$63,500', icon: Wallet, tone: 'from-emerald-50 to-emerald-100 text-emerald-700' },
  { id: 3, titleKey: 'totalProductsLabel', value: '112', icon: Package, tone: 'from-violet-50 to-violet-100 text-violet-700' },
  { id: 4, titleKey: 'alertsLabel', value: '2', icon: AlertTriangle, tone: 'from-amber-50 to-amber-100 text-amber-700' }
];

export const quickFeatures = [
  { id: 'reports', titleKey: 'reports', icon: BarChart3 },
  { id: 'pos', titleKey: 'posLabel', icon: CreditCard },
  { id: 'products', titleKey: 'products', icon: Package },
  { id: 'categories', titleKey: 'categories', icon: ShoppingBasket },
  { id: 'companies', titleKey: 'companies', icon: Building2 },
  { id: 'users', titleKey: 'users', icon: UserCog }
];

export const lowStockItems = [
  { id: 1, sku: '726363', name: 'Sugar 5kg', qty: 7 },
  { id: 2, sku: '12565', name: 'Rice 5kg', qty: 8 },
  { id: 3, sku: '87741', name: 'Coffee Beans', qty: 5 }
];

export const notifications = [
  { id: 1, titleKey: 'posSynced', timeKey: 'time2MinAgo', icon: BellRing },
  { id: 2, titleKey: 'lowStockWarning', timeKey: 'time8MinAgo', icon: AlertTriangle }
];

export const posProducts = [
  { id: 'p1', name: 'Pepsi', code: '1736372', price: 1250 },
  { id: 'p2', name: 'Sugar 5kg', code: '726363', price: 6000 },
  { id: 'p3', name: 'Rice 10kg', code: '245654736', price: 15000 },
  { id: 'p4', name: 'Coca-Cola', code: '12345', price: 500 },
  { id: 'p5', name: 'Pop Kek', code: '242424', price: 250 },
  { id: 'p6', name: 'Rice 5kg', code: '12565', price: 10000 }
];

export const loansData = [
  { id: 'l1', customer: 'Ibrahim Qadir', phone: '07501234567', loanTotal: 12000, paid: 5750, remaining: 6250, statusKey: 'pending' },
  { id: 'l2', customer: 'Sara Karim', phone: '07507894512', loanTotal: 8300, paid: 2000, remaining: 6300, statusKey: 'pending' }
];

export const productsData = [
  { id: 'pr1', name: 'Pepsi', stock: 23, price: 1250, category: 'Drinks' },
  { id: 'pr2', name: 'Sugar 5kg', stock: 7, price: 6000, category: 'Grocery' },
  { id: 'pr3', name: 'Rice 10kg', stock: 10, price: 15000, category: 'Grocery' },
  { id: 'pr4', name: 'Pop Kek', stock: 44, price: 250, category: 'Snacks' }
];

export const categoriesData = [
  { id: 'c1', name: 'Grocery', items: 35 },
  { id: 'c2', name: 'Drinks', items: 22 },
  { id: 'c3', name: 'Snacks', items: 18 }
];

export const companiesData = [
  { id: 'co1', name: 'Fresh Foods Ltd', country: 'Iraq', activeProducts: 29 },
  { id: 'co2', name: 'Baghdad Beverages', country: 'Iraq', activeProducts: 12 }
];

export const usersData = [
  { id: 'u1', name: 'Ibrahim Qadir', role: 'Admin', shift: 'Morning' },
  { id: 'u2', name: 'Aso Ahmed', role: 'Cashier', shift: 'Evening' }
];
