import { useEffect, useState } from "react";
import EmptyState from "../components/EmptyState.jsx";
import OrderHistoryModal from "../components/OrderHistoryModal.jsx";
import PageHeader from "../components/PageHeader.jsx";
import Pagination from "../components/Pagination.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { getFuncionarios, getSetores, getSolicitantes } from "../services/lookupService.js";
import { getOrdem, getOrdens, updateOrdem, updateStatusOrdem } from "../services/orderService.js";

const statuses = ["", "ABERTA", "EM_ANALISE", "EM_EXECUCAO", "AGUARDANDO", "CONCLUIDA", "CANCELADA"];
const prioridades = ["", "BAIXA", "MEDIA", "ALTA"];

function OrdensPage() {
  const [setores, setSetores] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [solicitantes, setSolicitantes] = useState([]);
  const [ordens, setOrdens] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filters, setFilters] = useState({
    setorId: "",
    prioridade: "",
    status: "",
    data: ""
  });

  async function loadData(nextPage = page, nextFilters = filters) {
    const [setoresData, funcionariosData, solicitantesData, ordensData] = await Promise.all([
      getSetores(),
      getFuncionarios({ pageSize: 100 }),
      getSolicitantes({ pageSize: 100 }),
      getOrdens({ page: nextPage, ...nextFilters })
    ]);

    setSetores(setoresData);
    setFuncionarios(funcionariosData.items.filter((item) => item.ativo));
    setSolicitantes(solicitantesData.items);
    setOrdens(ordensData.items);
    setMeta(ordensData.meta);
  }

  useEffect(() => {
    loadData(page, filters);
  }, [page]);

  async function handleFilterSubmit(event) {
    event.preventDefault();
    setPage(1);
    loadData(1, filters);
  }

  async function handleHistory(id) {
    const ordem = await getOrdem(id);
    setSelectedOrder(ordem);
  }

  async function handleStatusChange(id, status) {
    await updateStatusOrdem(id, { status });
    loadData(page, filters);
  }

  async function handleSaveOrder(id, payload) {
    await updateOrdem(id, payload);
    const ordemAtualizada = await getOrdem(id);
    setSelectedOrder(ordemAtualizada);
    loadData(page, filters);
  }

  return (
    <div>
      <PageHeader title="Ordens de servico" description="Acompanhe, filtre e atualize os atendimentos." />

      <form onSubmit={handleFilterSubmit} className="card mb-6 grid gap-4 md:grid-cols-4">
        <div>
          <label className="text-sm font-bold text-slate-600">Setor</label>
          <select className="field" value={filters.setorId} onChange={(event) => setFilters((state) => ({ ...state, setorId: event.target.value }))}>
            <option value="">Todos</option>
            {setores.map((setor) => (
              <option key={setor.id} value={setor.id}>{setor.nome}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-bold text-slate-600">Prioridade</label>
          <select className="field" value={filters.prioridade} onChange={(event) => setFilters((state) => ({ ...state, prioridade: event.target.value }))}>
            {prioridades.map((item) => (
              <option key={item || "todos"} value={item}>{item || "Todas"}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-bold text-slate-600">Status</label>
          <select className="field" value={filters.status} onChange={(event) => setFilters((state) => ({ ...state, status: event.target.value }))}>
            {statuses.map((item) => (
              <option key={item || "todos"} value={item}>{item ? item.replaceAll("_", " ") : "Todos"}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-bold text-slate-600">Data</label>
          <input type="date" className="field" value={filters.data} onChange={(event) => setFilters((state) => ({ ...state, data: event.target.value }))} />
        </div>

        <div className="md:col-span-4 flex justify-end">
          <button type="submit" className="btn-primary w-full md:w-auto">Aplicar filtros</button>
        </div>
      </form>

      <div className="card">
        <div className="space-y-4">
          {ordens.length ? (
            ordens.map((ordem) => (
              <div key={ordem.id} className="rounded-3xl border border-slate-200 p-4">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.15em] text-teal-700">Ordem #{ordem.numero}</p>
                    <h3 className="text-xl font-black text-slate-800">{ordem.titulo}</h3>
                    <p className="mt-1 text-slate-500">{ordem.descricao}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <StatusBadge value={ordem.status} />
                      <StatusBadge value={ordem.prioridade} />
                    </div>
                    <p className="mt-3 text-sm text-slate-500">Setor: {ordem.setorResponsavel?.nome} | Solicitante: {ordem.solicitante?.nome}</p>
                    <p className="text-sm text-slate-400">Abertura: {new Date(ordem.dataAbertura).toLocaleDateString("pt-BR")} as {ordem.horaAbertura}</p>
                  </div>

                  <div className="flex flex-col gap-3 xl:w-72">
                    <select className="field" value={ordem.status} onChange={(event) => handleStatusChange(ordem.id, event.target.value)}>
                      {statuses.filter(Boolean).map((item) => (
                        <option key={item} value={item}>{item.replaceAll("_", " ")}</option>
                      ))}
                    </select>
                    <button type="button" className="btn-secondary" onClick={() => handleHistory(ordem.id)}>Visualizar historico</button>
                    <button type="button" className="btn-primary" onClick={() => handleHistory(ordem.id)}>Editar ordem</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <EmptyState message="Nenhuma ordem encontrada para os filtros informados." />
          )}
        </div>
        <Pagination meta={meta} onChange={(nextPage) => {
          setPage(nextPage);
          loadData(nextPage, filters);
        }} />
      </div>

      <OrderHistoryModal
        ordem={selectedOrder}
        setores={setores.filter((item) => item.ativo)}
        funcionarios={funcionarios}
        solicitantes={solicitantes}
        onClose={() => setSelectedOrder(null)}
        onSave={handleSaveOrder}
      />
    </div>
  );
}

export default OrdensPage;
