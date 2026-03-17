import { useMemo, useState } from 'react';
import { Bell, Clock3 } from 'lucide-react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import StatCard from './components/StatCard';
import FeatureCard from './components/FeatureCard';
import {
  categoriesData,
  companiesData,
  loansData,
  lowStockItems,
  notifications,
  posProducts,
  productsData,
  quickFeatures,
  sidebarItems,
  topStats,
  usersData
} from './data';

const sectionMeta = {
  dashboard: { title: 'Dashboard Overview', subtitle: 'Control center for POS and market operations' },
  pos: { title: 'POS System', subtitle: 'Create orders, manage cart, and checkout quickly' },
  loans: { title: 'Loan System', subtitle: 'Monitor customer loans and payment status' },
  products: { title: 'Products', subtitle: 'Track products, stock, and prices' },
  categories: { title: 'Categories', subtitle: 'Manage product category groups' },
  companies: { title: 'Companies', subtitle: 'Supplier and company directory' },
  users: { title: 'Users', subtitle: 'Team members and roles' },
  settings: { title: 'Settings', subtitle: 'Basic store settings and controls' }
};

export default function MarketDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return posProducts;
    return posProducts.filter((item) => item.name.toLowerCase().includes(q) || item.code.includes(q));
  }, [search]);

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (activeSection === 'loans') {
      return loansData.filter((item) => !q || item.customer.toLowerCase().includes(q) || item.phone.includes(q));
    }
    if (activeSection === 'products') {
      return productsData.filter((item) => !q || item.name.toLowerCase().includes(q));
    }
    if (activeSection === 'categories') {
      return categoriesData.filter((item) => !q || item.name.toLowerCase().includes(q));
    }
    if (activeSection === 'companies') {
      return companiesData.filter((item) => !q || item.name.toLowerCase().includes(q));
    }
    if (activeSection === 'users') {
      return usersData.filter((item) => !q || item.name.toLowerCase().includes(q));
    }
    return [];
  }, [activeSection, search]);

  const cartTotals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    return { subtotal, totalItems: cart.reduce((sum, item) => sum + item.qty, 0) };
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const checkout = () => {
    if (cart.length === 0) return;
    alert(`Order completed: ${cartTotals.totalItems} items, $${cartTotals.subtotal.toLocaleString()}`);
    setCart([]);
  };

  const jumpByFeature = (title) => {
    const map = {
      Reports: 'dashboard',
      POS: 'pos',
      Products: 'products',
      Categories: 'categories',
      Companies: 'companies',
      Users: 'users'
    };
    setActiveSection(map[title] || 'dashboard');
  };

  const renderTableSection = () => {
    if (activeSection === 'loans') {
      return (
        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="text-right px-5 py-3">Customer</th>
                <th className="text-right px-5 py-3">Phone</th>
                <th className="text-right px-5 py-3">Loan</th>
                <th className="text-right px-5 py-3">Paid</th>
                <th className="text-right px-5 py-3">Remaining</th>
                <th className="text-right px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.id} className="border-t border-slate-100">
                  <td className="px-5 py-4 font-semibold">{row.customer}</td>
                  <td className="px-5 py-4 text-slate-500">{row.phone}</td>
                  <td className="px-5 py-4">${row.loanTotal.toLocaleString()}</td>
                  <td className="px-5 py-4 text-emerald-600">${row.paid.toLocaleString()}</td>
                  <td className="px-5 py-4 text-rose-600">${row.remaining.toLocaleString()}</td>
                  <td className="px-5 py-4"><span className="rounded-full bg-amber-50 text-amber-700 px-3 py-1">{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (activeSection === 'products') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {filteredRows.map((row) => (
            <article key={row.id} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <h4 className="font-bold text-slate-900">{row.name}</h4>
              <p className="text-sm text-slate-500 mt-1">{row.category}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-semibold text-slate-800">${row.price.toLocaleString()}</span>
                <span className={`text-xs rounded-full px-2 py-1 ${row.stock < 10 ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-700'}`}>
                  Stock: {row.stock}
                </span>
              </div>
            </article>
          ))}
        </div>
      );
    }

    if (activeSection === 'categories' || activeSection === 'companies' || activeSection === 'users') {
      return (
        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-5 space-y-3">
          {filteredRows.map((row) => (
            <div key={row.id} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 flex items-center justify-between">
              <span className="font-semibold text-slate-800">{row.name}</span>
              <span className="text-sm text-slate-500">{row.items || row.activeProducts || row.role}</span>
            </div>
          ))}
        </div>
      );
    }

    if (activeSection === 'settings') {
      return (
        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-6 space-y-4">
          <label className="block">
            <span className="text-sm text-slate-600">Store Name</span>
            <input defaultValue="MarketFlow Store" className="mt-1 w-full h-11 rounded-xl border border-slate-200 px-3" />
          </label>
          <label className="block">
            <span className="text-sm text-slate-600">Currency</span>
            <select className="mt-1 w-full h-11 rounded-xl border border-slate-200 px-3 bg-white">
              <option>USD</option>
              <option>IQD</option>
            </select>
          </label>
          <button className="h-11 px-5 rounded-xl bg-violet-600 text-white font-semibold">Save Settings</button>
        </div>
      );
    }

    return null;
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-100/80">
      <div className="mx-auto max-w-[1720px] lg:flex lg:flex-row-reverse">
        <Sidebar
          items={sidebarItems}
          open={sidebarOpen}
          onToggle={() => setSidebarOpen((prev) => !prev)}
          activeId={activeSection}
          onSelect={setActiveSection}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
          <TopBar
            title={sectionMeta[activeSection].title}
            subtitle={sectionMeta[activeSection].subtitle}
            searchValue={search}
            onSearchChange={setSearch}
          />

          {activeSection === 'dashboard' && (
            <>
              <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {topStats.map((stat) => (
                  <StatCard key={stat.id} {...stat} />
                ))}
              </section>

              <section>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Feature Hub</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                  {quickFeatures.map((feature) => (
                    <FeatureCard key={feature.id} {...feature} onClick={() => jumpByFeature(feature.title)} />
                  ))}
                </div>
              </section>

              <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                <article className="xl:col-span-2 rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-slate-100">
                    <h4 className="text-xl font-bold text-slate-900">Low Stock Products</h4>
                    <p className="text-sm text-slate-500 mt-1">Items with quantity less than 10 units</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead className="bg-slate-50 text-slate-500">
                        <tr>
                          <th className="text-right px-5 py-3 font-medium">Barcode</th>
                          <th className="text-right px-5 py-3 font-medium">Product Name</th>
                          <th className="text-right px-5 py-3 font-medium">Current Qty</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lowStockItems.map((item) => (
                          <tr key={item.id} className="border-t border-slate-100">
                            <td className="px-5 py-4 text-slate-500">{item.sku}</td>
                            <td className="px-5 py-4 font-semibold text-slate-800">{item.name}</td>
                            <td className="px-5 py-4">
                              <span className="inline-flex rounded-full bg-rose-50 text-rose-600 px-3 py-1 font-semibold">{item.qty} units</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </article>

                <article className="rounded-2xl border border-slate-100 bg-white shadow-sm p-5">
                  <h4 className="text-xl font-bold text-slate-900">Live Activity</h4>
                  <p className="text-sm text-slate-500 mt-1">System and operation notifications</p>
                  <div className="mt-4 space-y-3">
                    {notifications.map((note) => {
                      const Icon = note.icon;
                      return (
                        <div key={note.id} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-slate-800">{note.title}</p>
                            <p className="text-xs text-slate-500 mt-1">{note.time}</p>
                          </div>
                          <Icon className="h-5 w-5 text-violet-600" />
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3 flex items-center justify-between">
                    <span className="text-emerald-700 font-semibold">System Online</span>
                    <Bell className="h-5 w-5 text-emerald-600" />
                  </div>

                  <div className="mt-3 rounded-xl bg-slate-50 border border-slate-100 px-4 py-3 flex items-center justify-between text-slate-500 text-sm">
                    <span>Last sync: 03:15 AM</span>
                    <Clock3 className="h-4 w-4" />
                  </div>
                </article>
              </section>
            </>
          )}

          {activeSection === 'pos' && (
            <section className="grid grid-cols-1 xl:grid-cols-[1.1fr_2fr] gap-4">
              <article className="rounded-2xl border border-slate-100 bg-white shadow-sm p-4">
                <h4 className="text-xl font-bold text-slate-900 mb-4">Cart</h4>
                <div className="space-y-3 max-h-[420px] overflow-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                      <p className="font-semibold text-slate-800">{item.name}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQty(item.id, -1)} className="h-8 w-8 rounded-lg border border-slate-200 bg-white">-</button>
                          <span>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="h-8 w-8 rounded-lg border border-slate-200 bg-white">+</button>
                        </div>
                        <span className="font-semibold text-violet-700">${(item.price * item.qty).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                  {cart.length === 0 && <p className="text-slate-500 text-sm">Cart is empty.</p>}
                </div>

                <div className="border-t border-slate-100 mt-4 pt-4">
                  <p className="flex items-center justify-between text-slate-600">
                    <span>Items</span>
                    <span>{cartTotals.totalItems}</span>
                  </p>
                  <p className="flex items-center justify-between text-xl font-bold text-slate-900 mt-2">
                    <span>Total</span>
                    <span>${cartTotals.subtotal.toLocaleString()}</span>
                  </p>
                  <button onClick={checkout} className="mt-4 w-full h-11 rounded-xl bg-violet-600 text-white font-semibold disabled:opacity-50" disabled={cart.length === 0}>
                    Checkout
                  </button>
                </div>
              </article>

              <article className="rounded-2xl border border-slate-100 bg-white shadow-sm p-4">
                <h4 className="text-xl font-bold text-slate-900 mb-4">Products</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {filteredProducts.map((item) => (
                    <button key={item.id} onClick={() => addToCart(item)} className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-right hover:border-violet-200 hover:bg-violet-50 transition">
                      <p className="font-bold text-slate-900">{item.name}</p>
                      <p className="text-xs text-slate-500 mt-1">Code: {item.code}</p>
                      <p className="text-lg font-bold text-emerald-700 mt-3">${item.price.toLocaleString()}</p>
                    </button>
                  ))}
                </div>
              </article>
            </section>
          )}

          {activeSection !== 'dashboard' && activeSection !== 'pos' && renderTableSection()}
        </main>
      </div>
    </div>
  );
}
