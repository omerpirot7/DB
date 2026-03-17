export default function StatCard({ title, value, icon: Icon, tone }) {
  return (
    <article className="rounded-2xl bg-white border border-slate-100 shadow-sm px-6 py-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-4xl font-bold text-slate-900 mt-2">{value}</p>
      </div>
      <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${tone} grid place-items-center`}>
        <Icon className="h-7 w-7" />
      </div>
    </article>
  );
}
