import { useEffect, useState } from "react";
import EmptyState from "../components/EmptyState.jsx";
import FormCard from "../components/FormCard.jsx";
import PageHeader from "../components/PageHeader.jsx";
import Pagination from "../components/Pagination.jsx";
import { createSolicitante, getSolicitantes } from "../services/lookupService.js";

function SolicitantesPage() {
  const [form, setForm] = useState({ nome: "", telefone: "", setor: "" });
  const [solicitantes, setSolicitantes] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);

  async function loadData(nextPage = page) {
    const response = await getSolicitantes({ page: nextPage });
    setSolicitantes(response.items);
    setMeta(response.meta);
  }

  useEffect(() => {
    loadData(page);
  }, [page]);

  async function handleSubmit(event) {
    event.preventDefault();
    await createSolicitante(form);
    setForm({ nome: "", telefone: "", setor: "" });
    loadData();
  }

  return (
    <div>
      <PageHeader title="Solicitantes" description="Cadastre quem abre ou solicita os servicos." />

      <div className="grid gap-6 lg:grid-cols-[380px,1fr]">
        <FormCard title="Novo solicitante">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-bold text-slate-600">Nome</label>
              <input className="field" value={form.nome} onChange={(event) => setForm((state) => ({ ...state, nome: event.target.value }))} required />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-600">Telefone</label>
              <input className="field" value={form.telefone} onChange={(event) => setForm((state) => ({ ...state, telefone: event.target.value }))} />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-600">Setor</label>
              <input className="field" value={form.setor} onChange={(event) => setForm((state) => ({ ...state, setor: event.target.value }))} />
            </div>
            <button className="btn-primary w-full" type="submit">Salvar solicitante</button>
          </form>
        </FormCard>

        <div className="card">
          <h3 className="text-2xl font-black text-slate-800">Solicitantes cadastrados</h3>
          <div className="mt-4 space-y-3">
            {solicitantes.length ? (
              solicitantes.map((solicitante) => (
                <div key={solicitante.id} className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-lg font-bold text-slate-800">{solicitante.nome}</p>
                  <p className="text-slate-500">{solicitante.telefone || "Sem telefone"}</p>
                  <p className="text-slate-400">{solicitante.setor || "Sem setor informado"}</p>
                </div>
              ))
            ) : (
              <EmptyState message="Nenhum solicitante cadastrado." />
            )}
          </div>
          <Pagination meta={meta} onChange={setPage} />
        </div>
      </div>
    </div>
  );
}

export default SolicitantesPage;
