const colors = {
  ABERTA: "bg-blue-100 text-blue-800",
  EM_ANALISE: "bg-indigo-100 text-indigo-800",
  EM_EXECUCAO: "bg-amber-100 text-amber-800",
  AGUARDANDO: "bg-slate-200 text-slate-700",
  CONCLUIDA: "bg-emerald-100 text-emerald-800",
  CANCELADA: "bg-rose-100 text-rose-800",
  BAIXA: "bg-slate-100 text-slate-700",
  MEDIA: "bg-amber-100 text-amber-800",
  ALTA: "bg-rose-100 text-rose-800",
};

function StatusBadge({ value }) {
  return (
    <span className={`badge ${colors[value] || "bg-slate-100 text-slate-700"}`}>
      {String(value).replaceAll("_", " ")}
    </span>
  );
}

export default StatusBadge;
