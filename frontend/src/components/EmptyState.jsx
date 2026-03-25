function EmptyState({ message }) {
  return (
    <div className="rounded-2xl border border-dashed border-[var(--border-color)] bg-[var(--surface-muted)] p-6 text-center text-sm text-[var(--text-soft)] sm:p-8 sm:text-base">
      {message}
    </div>
  );
}

export default EmptyState;
