function StatCard({ title, value, tone = "blue" }) {
  const tones = {
    blue: "border-blue-200 bg-blue-50 text-blue-950",
    slate: "border-slate-200 bg-slate-50 text-slate-900",
    green: "border-emerald-200 bg-emerald-50 text-emerald-900",
  };

  return (
    <div className={`rounded-2xl border p-4 shadow-sm ${tones[tone] || tones.blue}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
        {title}
      </p>
      <p className="mt-3 text-3xl font-bold sm:text-4xl">{value}</p>
    </div>
  );
}

export default StatCard;
