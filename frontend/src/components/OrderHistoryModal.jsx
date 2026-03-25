function OrderHistoryModal({ ordem, setores, funcionarios, solicitantes, onClose, onSave }) {
  if (!ordem) {
    return null;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    await onSave(ordem.id, {
      titulo: formData.get("titulo"),
      descricao: formData.get("descricao"),
      prioridade: formData.get("prioridade"),
      status: formData.get("status"),
      setorResponsavelId: formData.get("setorResponsavelId"),
      funcionarioResponsavelId: formData.get("funcionarioResponsavelId") || "",
      solicitanteId: formData.get("solicitanteId"),
      observacoes: formData.get("observacoes"),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-3 sm:p-4">
      <div className="app-card max-h-[92vh] w-full max-w-5xl overflow-y-auto p-4 sm:p-6">
        <div className="flex flex-col gap-3 border-b border-[var(--border-color)] pb-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
              Ordem #{ordem.numero}
            </p>
            <h3 className="mt-1 text-xl font-semibold text-[var(--text-strong)] sm:text-2xl">
              Editar ordem
            </h3>
          </div>
          <button type="button" className="btn-secondary" onClick={onClose}>
            Fechar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <label className="text-sm font-medium text-[var(--text-base)]">Titulo</label>
            <input name="titulo" defaultValue={ordem.titulo} className="field" required />
          </div>

          <div className="lg:col-span-2">
            <label className="text-sm font-medium text-[var(--text-base)]">Descricao</label>
            <textarea
              name="descricao"
              defaultValue={ordem.descricao}
              className="field min-h-28"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[var(--text-base)]">Prioridade</label>
            <select name="prioridade" defaultValue={ordem.prioridade} className="field">
              {["BAIXA", "MEDIA", "ALTA"].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-[var(--text-base)]">Status</label>
            <select name="status" defaultValue={ordem.status} className="field">
              {[
                "ABERTA",
                "EM_ANALISE",
                "EM_EXECUCAO",
                "AGUARDANDO",
                "CONCLUIDA",
                "CANCELADA",
              ].map((item) => (
                <option key={item} value={item}>
                  {item.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-[var(--text-base)]">
              Setor responsavel
            </label>
            <select
              name="setorResponsavelId"
              defaultValue={ordem.setorResponsavelId}
              className="field"
              required
            >
              {setores.map((setor) => (
                <option key={setor.id} value={setor.id}>
                  {setor.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-[var(--text-base)]">
              Funcionario responsavel
            </label>
            <select
              name="funcionarioResponsavelId"
              defaultValue={ordem.funcionarioResponsavelId || ""}
              className="field"
            >
              <option value="">Selecione</option>
              {funcionarios.map((funcionario) => (
                <option key={funcionario.id} value={funcionario.id}>
                  {funcionario.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-[var(--text-base)]">Solicitante</label>
            <select
              name="solicitanteId"
              defaultValue={ordem.solicitanteId}
              className="field"
              required
            >
              {solicitantes.map((solicitante) => (
                <option key={solicitante.id} value={solicitante.id}>
                  {solicitante.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-[var(--text-base)]">
              Data de abertura
            </label>
            <input
              value={new Date(ordem.dataAbertura).toLocaleString("pt-BR")}
              className="field"
              disabled
              readOnly
            />
          </div>

          <div className="lg:col-span-2">
            <label className="text-sm font-medium text-[var(--text-base)]">Observacoes</label>
            <textarea
              name="observacoes"
              defaultValue={ordem.observacoes || ""}
              className="field min-h-24"
            />
          </div>

          <div className="lg:col-span-2 flex justify-end">
            <button type="submit" className="btn-primary w-full sm:w-auto">
              Salvar alteracoes
            </button>
          </div>
        </form>

        <div className="mt-6 border-t border-[var(--border-color)] pt-6">
          <h4 className="text-lg font-semibold text-[var(--text-strong)]">Historico</h4>
          <div className="mt-4 space-y-3">
            {ordem.historico?.length ? (
              ordem.historico.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface-muted)] p-4"
                >
                  <p className="font-semibold text-[var(--text-strong)]">{item.acao}</p>
                  <p className="mt-1 text-sm text-[var(--text-base)]">{item.descricao}</p>
                  <p className="mt-2 text-sm text-[var(--text-soft)]">
                    {new Date(item.criadoEm).toLocaleString("pt-BR")}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-[var(--text-soft)]">Nenhum historico registrado.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderHistoryModal;
