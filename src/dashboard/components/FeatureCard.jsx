export default function FeatureCard({ title, icon: Icon, onClick }) {
  return (
    <button onClick={onClick} className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6 text-center hover:shadow-md transition">
      <Icon className="h-8 w-8 mx-auto text-slate-400 mb-3" />
      <p className="font-semibold text-slate-700">{title}</p>
    </button>
  );
}
