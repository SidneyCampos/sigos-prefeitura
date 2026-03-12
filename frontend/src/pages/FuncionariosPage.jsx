import { useEffect, useState } from "react";
import EmptyState from "../components/EmptyState.jsx";
import FormCard from "../components/FormCard.jsx";
import PageHeader from "../components/PageHeader.jsx";
import Pagination from "../components/Pagination.jsx";
import { createFuncionario, getFuncionarios, getSetores, toggleFuncionario } from "../services/lookupService.js";

function FuncionariosPage() {
  const [form, setForm] = useState({ nome: "", setorId: "" });
  const [setores, setSetores] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);

  async function loadData(nextPage = page) {
    const [setoresData, funcionariosData] = await Promise.all([
      getSetores(),
      getFuncionarios({ page: nextPage })
    ]);

    setSetores(setoresData.filter((setor) => setor.ativo));
    setFuncionarios(funcionariosData.items);
    setMeta(funcionariosData.meta);
  }

  useEffect(() => {
    loadData(page);
  }, [page]);

  async function handleSubmit(event) {
    event.preventDefault();
    await createFuncionario(form);
    setForm({ nome: "", setorId: "" });
    loadData();
  }

  async function handleToggle(id) {
    await toggleFuncionario(id);
    loadData();
  }

  return (
    <div>
      <PageHeader title="Funcionarios" description="Cadastre os responsaveis pelos atendimentos." />

      <div className="grid gap-6 lg:grid-cols-[380px,1fr]">
        <FormCard title="Novo funcionario">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-bold text-slate-600">Nome</label>
              <input className="field" value={form.nome} onChange={(event) => setForm((state) => ({ ...state, nome: event.target.value }))} required />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-600">Setor</label>
              <select className="field" value={form.setorId} onChange={(event) => setForm((state) => ({ ...state, setorId: event.target.value }))} required>
                <option value="">Selecione</option>
                {setores.map((setor) => (
                  <option key={setor.id} value={setor.id}>{setor.nome}</option>
                ))}
              </select>
            </div>
            <button className="btn-primary w-full" type="submit">Salvar funcionario</button>
          </form>
        </FormCard>

        <div className="card">
          <h3 className="text-2xl font-black text-slate-800">Funcionarios cadastrados</h3>
          <div className="mt-4 space-y-3">
            {funcionarios.length ? (
              funcionarios.map((funcionario) => (
                <div key={funcionario.id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-lg font-bold text-slate-800">{funcionario.nome}</p>
                    <p className="text-slate-500">{funcionario.setor?.nome}</p>
                  </div>
                  <button type="button" className={funcionario.ativo ? "btn-warning" : "btn-primary"} onClick={() => handleToggle(funcionario.id)}>
                    {funcionario.ativo ? "Desativar" : "Ativar"}
                  </button>
                </div>
              ))
            ) : (
              <EmptyState message="Nenhum funcionario cadastrado." />
            )}
          </div>
          <Pagination meta={meta} onChange={setPage} />
        </div>
      </div>
    </div>
  );
}

export default FuncionariosPage;
