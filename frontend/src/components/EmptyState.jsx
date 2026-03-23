function EmptyState({ message }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500 sm:p-8 sm:text-base">
      {message}
    </div>
  );
}

export default EmptyState;
