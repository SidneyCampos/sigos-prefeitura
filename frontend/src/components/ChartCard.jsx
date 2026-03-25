function ChartCard({ title, children }) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-[var(--text-strong)] sm:text-xl">{title}</h3>
      <div className="mt-4 h-72 sm:h-80">{children}</div>
    </div>
  );
}

export default ChartCard;
