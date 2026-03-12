function Pagination({ meta, onChange }) {
  if (!meta || meta.totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-4 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
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
