import { useEffect, useState } from "react";
import EmptyState from "../components/EmptyState.jsx";
import FormCard from "../components/FormCard.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { createSetor, getSetores, toggleSetor } from "../services/lookupService.js";

function SetoresPage() {
  const [setores, setSetores] = useState([]);
  const [nome, setNome] = useState("");

  async function loadData() {
    const response = await getSetores();
    setSetores(response);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    await createSetor({ nome });
    setNome("");
    loadData();
  }

  async function handleToggle(id) {
    await toggleSetor(id);
    loadData();
  }

  return (
    <div>
      <PageHeader
        title="Setores"
        description="Cadastre e mantenha atualizados os setores responsaveis pelas ordens."
      />

      <div className="grid gap-6 xl:grid-cols-[340px,minmax(0,1fr)]">
        <FormCard title="Novo setor">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[var(--text-base)]">Nome do setor</label>
              <input
                className="field"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                placeholder="Ex.: Obras"
                required
              />
            </div>
            <button className="btn-primary w-full" type="submit">
              Salvar setor
            </button>
          </form>
        </FormCard>

        <div className="card">
          <h3 className="text-xl font-semibold text-[var(--text-strong)] sm:text-2xl">
            Setores cadastrados
          </h3>
          <div className="mt-4 space-y-3">
            {setores.length ? (
              setores.map((setor) => (
                <div
                  key={setor.id}
                  className="flex flex-col gap-3 rounded-2xl border border-[var(--border-color)] bg-[var(--surface-muted)] p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="text-base font-semibold text-[var(--text-strong)] sm:text-lg">
                      {setor.nome}
                    </p>
                    <p className="text-sm text-[var(--text-soft)]">
                      Criado em {new Date(setor.dataCriacao).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <button
                    type="button"
                    className={setor.ativo ? "btn-warning" : "btn-primary"}
                    onClick={() => handleToggle(setor.id)}
                  >
                    {setor.ativo ? "Desativar" : "Ativar"}
                  </button>
                </div>
              ))
            ) : (
              <EmptyState message="Nenhum setor encontrado." />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetoresPage;
