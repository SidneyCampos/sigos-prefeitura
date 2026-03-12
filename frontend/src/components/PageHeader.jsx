function PageHeader({ title, description, action }) {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-soft md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-3xl font-black text-slate-800">{title}</h2>
        <p className="mt-1 text-base text-slate-500">{description}</p>
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}

export default PageHeader;
