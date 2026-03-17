import { Search } from 'lucide-react';

export default function TopBar({ title, subtitle, searchValue, onSearchChange }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
      <label className="relative block w-full sm:w-80">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="search"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, code, or phone..."
          className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 pl-4 pr-10 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-300"
        />
      </label>
    </div>
  );
}
