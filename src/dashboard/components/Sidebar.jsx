import { LogOut, Menu } from 'lucide-react';
import { useLanguage } from '../../context/LanguageProvider';

export default function Sidebar({ items, open, onToggle, activeId, onSelect }) {
  const { t } = useLanguage();

  return (
    <>
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-4 right-4 z-40 h-11 w-11 rounded-xl bg-violet-600 text-white shadow-lg"
        aria-label="Toggle sidebar"
      >
        <Menu className="mx-auto h-5 w-5" />
      </button>

      <div
        className={`fixed inset-0 bg-slate-900/30 z-30 lg:hidden transition-opacity ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onToggle}
      />

      <aside
        className={`fixed lg:static top-0 right-0 h-screen w-80 bg-white border-l border-slate-200 z-40 transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'} flex flex-col`}
      >
        <div className="px-6 py-6 border-b border-slate-100">
          <h1 className="text-3xl font-bold text-slate-900">MarketFlow</h1>
          <p className="text-sm text-slate-500 mt-1">{t('marketManagement')}</p>
        </div>

        <nav className="px-4 py-4 space-y-1 flex-1 overflow-y-auto">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelect(item.id);
                  if (open) onToggle();
                }}
                className={`w-full flex items-center justify-between rounded-xl px-4 py-3 transition ${activeId === item.id ? 'bg-violet-50 text-violet-700 border border-violet-100' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <span className="font-medium">{t(item.labelKey)}</span>
                <Icon className="h-5 w-5" />
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="rounded-2xl bg-slate-50 px-4 py-3 flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-900">Ibrahim Qadir</p>
              <p className="text-xs text-slate-500">{t('adminRole')}</p>
            </div>
            <button className="h-10 w-10 rounded-lg bg-white border border-slate-200 text-rose-500 grid place-items-center">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
