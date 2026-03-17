import { Search, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageProvider';

export default function TopBar({ title, subtitle, searchValue, onSearchChange }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        <label className="relative block flex-1 sm:w-80">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="search"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, code, or phone..."
            className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 pl-4 pr-10 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-300"
          />
        </label>
        <div className="flex items-center gap-2 bg-slate-50 rounded-xl border border-slate-200 px-3 py-2">
          <Globe className="h-4 w-4 text-slate-600" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent text-sm font-semibold text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="en">English</option>
            <option value="ku">کوردی</option>
          </select>
        </div>
      </div>
    </div>
  );
}
