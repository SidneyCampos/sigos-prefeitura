function EmptyState({ message }) {
  return (
    <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-white p-8 text-center text-slate-500">
      {message}
    </div>
  );
}

export default EmptyState;
