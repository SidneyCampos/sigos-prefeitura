function Pagination({ meta, onChange }) {
  if (!meta || meta.totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-500">Pagina {meta.page} de {meta.totalPages}</p>
      <div className="flex gap-2">
        <button
          type="button"
          className="btn-secondary"
          onClick={() => onChange(meta.page - 1)}
          disabled={meta.page === 1}
        >
          Anterior
        </button>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => onChange(meta.page + 1)}
          disabled={meta.page === meta.totalPages}
        >
          Proxima
        </button>
      </div>
    </div>
  );
}

export default Pagination;
