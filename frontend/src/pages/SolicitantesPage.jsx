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
      <PageHeader
        title="Solicitantes"
        description="Cadastre os solicitantes que abrem ou acompanham os pedidos."
      />

      <div className="grid gap-6 xl:grid-cols-[340px,minmax(0,1fr)]">
        <FormCard title="Novo solicitante">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[var(--text-base)]">Nome</label>
              <input
                className="field"
                value={form.nome}
                onChange={(event) =>
                  setForm((state) => ({ ...state, nome: event.target.value }))
                }
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--text-base)]">Telefone</label>
              <input
                className="field"
                value={form.telefone}
                onChange={(event) =>
                  setForm((state) => ({ ...state, telefone: event.target.value }))
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--text-base)]">Setor</label>
              <input
                className="field"
                value={form.setor}
                onChange={(event) =>
                  setForm((state) => ({ ...state, setor: event.target.value }))
                }
              />
            </div>
            <button className="btn-primary w-full" type="submit">
              Salvar solicitante
            </button>
          </form>
        </FormCard>

        <div className="card min-w-0">
          <h3 className="text-xl font-semibold text-[var(--text-strong)] sm:text-2xl">
            Solicitantes cadastrados
          </h3>
          <div className="mt-4 space-y-3">
            {solicitantes.length ? (
              solicitantes.map((solicitante) => (
                <div
                  key={solicitante.id}
                  className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface-muted)] p-4"
                >
                  <p className="text-base font-semibold text-[var(--text-strong)] sm:text-lg">
                    {solicitante.nome}
                  </p>
                  <p className="text-sm text-[var(--text-base)]">
                    {solicitante.telefone || "Sem telefone"}
                  </p>
                  <p className="text-sm text-[var(--text-soft)]">
                    {solicitante.setor || "Sem setor informado"}
                  </p>
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
