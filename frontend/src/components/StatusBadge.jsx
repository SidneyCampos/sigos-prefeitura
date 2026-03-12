const colors = {
  ABERTA: "bg-sky-100 text-sky-700",
  EM_ANALISE: "bg-violet-100 text-violet-700",
  EM_EXECUCAO: "bg-amber-100 text-amber-700",
  AGUARDANDO: "bg-slate-200 text-slate-700",
  CONCLUIDA: "bg-emerald-100 text-emerald-700",
  CANCELADA: "bg-rose-100 text-rose-700",
  BAIXA: "bg-emerald-100 text-emerald-700",
  MEDIA: "bg-amber-100 text-amber-700",
  ALTA: "bg-rose-100 text-rose-700"
};

function StatusBadge({ value }) {
  return (
    <span className={`badge ${colors[value] || "bg-slate-100 text-slate-700"}`}>
      {String(value).replaceAll("_", " ")}
    </span>
  );
}

export default StatusBadge;
