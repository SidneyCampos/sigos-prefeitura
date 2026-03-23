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
      observacoes: formData.get("observacoes")
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">Ordem #{ordem.numero}</p>
            <h3 className="mt-1 text-2xl font-black text-slate-800">Editar ordem</h3>
          </div>
          <button type="button" className="btn-secondary" onClick={onClose}>Fechar</button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="text-sm font-bold text-slate-600">Titulo</label>
            <input name="titulo" defaultValue={ordem.titulo} className="field" required />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-bold text-slate-600">Descricao</label>
            <textarea name="descricao" defaultValue={ordem.descricao} className="field min-h-28" required />
          </div>

          <div>
            <label className="text-sm font-bold text-slate-600">Prioridade</label>
            <select name="prioridade" defaultValue={ordem.prioridade} className="field">
              {['BAIXA', 'MEDIA', 'ALTA'].map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm font-bold text-slate-600">Status</label>
            <select name="status" defaultValue={ordem.status} className="field">
              {['ABERTA', 'EM_ANALISE', 'EM_EXECUCAO', 'AGUARDANDO', 'CONCLUIDA', 'CANCELADA'].map((item) => (
                <option key={item} value={item}>{item.replaceAll('_', ' ')}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-bold text-slate-600">Setor responsavel</label>
            <select name="setorResponsavelId" defaultValue={ordem.setorResponsavelId} className="field" required>
              {setores.map((setor) => <option key={setor.id} value={setor.id}>{setor.nome}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm font-bold text-slate-600">Funcionario responsavel</label>
            <select name="funcionarioResponsavelId" defaultValue={ordem.funcionarioResponsavelId || ""} className="field">
              <option value="">Selecione</option>
              {funcionarios.map((funcionario) => <option key={funcionario.id} value={funcionario.id}>{funcionario.nome}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm font-bold text-slate-600">Solicitante</label>
            <select name="solicitanteId" defaultValue={ordem.solicitanteId} className="field" required>
              {solicitantes.map((solicitante) => <option key={solicitante.id} value={solicitante.id}>{solicitante.nome}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm font-bold text-slate-600">Data de abertura</label>
            <input value={new Date(ordem.dataAbertura).toLocaleString("pt-BR")} className="field" disabled />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-bold text-slate-600">Observacoes</label>
            <textarea name="observacoes" defaultValue={ordem.observacoes || ""} className="field min-h-24" />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button type="submit" className="btn-primary w-full md:w-auto">Salvar alteracoes</button>
          </div>
        </form>

        <div className="mt-6">
          <h4 className="text-xl font-black text-slate-800">Historico</h4>
          <div className="mt-4 space-y-3">
            {ordem.historico?.length ? (
              ordem.historico.map((item) => (
                <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
                  <p className="font-bold text-slate-700">{item.acao}</p>
                  <p className="mt-1 text-slate-600">{item.descricao}</p>
                  <p className="mt-2 text-sm text-slate-400">{new Date(item.criadoEm).toLocaleString("pt-BR")}</p>
                </div>
              ))
            ) : (
              <p className="text-slate-500">Nenhum historico registrado.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderHistoryModal;
