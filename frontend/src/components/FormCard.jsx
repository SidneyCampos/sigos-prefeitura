function FormCard({ title, children }) {
  return (
    <div className="card">
      <h3 className="text-2xl font-black text-slate-800">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default FormCard;
