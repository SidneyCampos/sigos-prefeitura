function ChartCard({ title, children }) {
  return (
    <div className="card">
      <h3 className="text-xl font-black text-slate-800">{title}</h3>
      <div className="mt-4 h-80">{children}</div>
    </div>
  );
}

export default ChartCard;
