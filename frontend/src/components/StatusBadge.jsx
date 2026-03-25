const colors = {
  ABERTA: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200",
  EM_ANALISE: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200",
  EM_EXECUCAO: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200",
  AGUARDANDO: "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  CONCLUIDA: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
  CANCELADA: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200",
  BAIXA: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  MEDIA: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200",
  ALTA: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200",
};

function StatusBadge({ value }) {
  return (
    <span className={`badge ${colors[value] || "bg-slate-100 text-slate-700"}`}>
      {String(value).replaceAll("_", " ")}
    </span>
  );
}

export default StatusBadge;
