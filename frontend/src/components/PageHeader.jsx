function PageHeader({ title, description, action }) {
  return (
    <div className="card mb-4 sm:mb-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-strong)] sm:text-3xl">
            {title}
          </h2>
          <p className="mt-1 max-w-3xl text-sm text-[var(--text-soft)] sm:text-base">
            {description}
          </p>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </div>
  );
}

export default PageHeader;
