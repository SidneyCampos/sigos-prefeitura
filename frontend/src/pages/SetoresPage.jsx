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
      <PageHeader title="Setores" description="Cadastre setores e mantenha os orgaos organizados." />

      <div className="grid gap-6 lg:grid-cols-[380px,1fr]">
        <FormCard title="Novo setor">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-bold text-slate-600">Nome do setor</label>
              <input className="field" value={nome} onChange={(event) => setNome(event.target.value)} placeholder="Ex.: Obras" required />
            </div>
            <button className="btn-primary w-full" type="submit">Salvar setor</button>
          </form>
        </FormCard>

        <div className="card">
          <h3 className="text-2xl font-black text-slate-800">Setores cadastrados</h3>
          <div className="mt-4 space-y-3">
            {setores.length ? (
              setores.map((setor) => (
                <div key={setor.id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-lg font-bold text-slate-800">{setor.nome}</p>
                    <p className="text-sm text-slate-400">Criado em {new Date(setor.dataCriacao).toLocaleDateString("pt-BR")}</p>
                  </div>
                  <button type="button" className={setor.ativo ? "btn-warning" : "btn-primary"} onClick={() => handleToggle(setor.id)}>
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
