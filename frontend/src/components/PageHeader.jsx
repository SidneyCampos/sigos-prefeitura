function PageHeader({ title, description, action }) {
  return (
    <div className="mb-4 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:mb-6 sm:px-6 sm:py-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {title}
          </h2>
          <p className="mt-1 max-w-3xl text-sm text-slate-500 sm:text-base">{description}</p>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </div>
  );
}

export default PageHeader;
