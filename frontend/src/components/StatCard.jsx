function StatCard({ title, value, tone = "primary" }) {
  const tones = {
    primary: {
      background: "linear-gradient(180deg, #eaf2fb 0%, #dfeaf7 100%)",
      borderColor: "#c7d6ea",
      color: "#17365f",
    },
    neutral: {
      background: "linear-gradient(180deg, #f7f9fc 0%, #eef2f7 100%)",
      borderColor: "#d7dee8",
      color: "#1f2937",
    },
    success: {
      background: "linear-gradient(180deg, #edf8f2 0%, #e2f2e9 100%)",
      borderColor: "#cfe5d8",
      color: "#1d4f35",
    },
  };

  const currentTone = tones[tone] || tones.primary;

  return (
    <div
      className="rounded-2xl border p-4 shadow-sm sm:p-5"
      style={{
        background: currentTone.background,
        borderColor: currentTone.borderColor,
        color: currentTone.color,
      }}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.22em] opacity-75">{title}</p>
      <p className="mt-3 text-3xl font-semibold sm:text-4xl">{value}</p>
    </div>
  );
}

export default StatCard;
