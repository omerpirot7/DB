import { Link, Outlet } from 'react-router-dom';
import { useStore } from '../context/StoreProvider';
import { useLanguage } from '../context/LanguageProvider';
import { ShoppingCart } from 'lucide-react';

export default function Layout() {
  const { cart } = useStore();
  const { language, setLanguage, t } = useLanguage();
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <header className="sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center text-xl font-bold tracking-tight text-indigo-700">
                {t('marketplace')}
              </Link>
              <nav className="ml-6 flex items-center space-x-4">
                <Link to="/" className="text-gray-900 hover:text-indigo-700 hover:bg-indigo-50 px-3 py-2 rounded-md text-sm font-medium transition-colors">{t('products')}</Link>
                <Link to="/returns" className="text-gray-900 hover:text-indigo-700 hover:bg-indigo-50 px-3 py-2 rounded-md text-sm font-medium transition-colors">{t('returns')}</Link>
                <Link to="/admin" className="text-gray-900 hover:text-indigo-700 hover:bg-indigo-50 px-3 py-2 rounded-md text-sm font-medium transition-colors">{t('adminPanel')}</Link>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-xs text-gray-600 hidden sm:block" htmlFor="language-switcher">{t('language')}</label>
              <select
                id="language-switcher"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="h-9 rounded-md border border-gray-300 bg-white px-2 text-sm text-gray-800 focus:border-indigo-600 focus:outline-none"
              >
                <option value="en">{t('english')}</option>
                <option value="ku">{t('kurdish')}</option>
              </select>
              <Link to="/checkout" className="relative text-gray-700 hover:text-indigo-700 p-2 transition-colors">
                <ShoppingCart className="w-6 h-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-indigo-700 rounded-full">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-gray-200/70 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; 2026 {t('marketplace')} MVP. {t('allRightsReserved')}
          </p>
        </div>
      </footer>
    </div>
  );
}
