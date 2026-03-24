function FormCard({ title, children }) {
  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default FormCard;
