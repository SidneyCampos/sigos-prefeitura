function StatCard({ title, value, tone = "teal" }) {
  const tones = {
    teal: "from-teal-700 to-emerald-500",
    amber: "from-amber-500 to-orange-400",
    blue: "from-sky-600 to-cyan-500"
  };

  return (
    <div className={`rounded-3xl bg-gradient-to-br ${tones[tone]} p-5 text-white shadow-soft`}>
      <p className="text-sm uppercase tracking-[0.2em] text-white/80">{title}</p>
      <p className="mt-3 text-4xl font-black">{value}</p>
    </div>
  );
}

export default StatCard;
