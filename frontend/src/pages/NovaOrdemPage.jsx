import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormCard from "../components/FormCard.jsx";
import PageHeader from "../components/PageHeader.jsx";
import {
  getFuncionarios,
  getSetores,
  getSolicitantes,
} from "../services/lookupService.js";
import { createOrdem } from "../services/orderService.js";

const prioridades = ["BAIXA", "MEDIA", "ALTA"];
const statusList = [
  "ABERTA",
  "EM_ANALISE",
  "EM_EXECUCAO",
  "AGUARDANDO",
  "CONCLUIDA",
  "CANCELADA",
];

function NovaOrdemPage() {
  const navigate = useNavigate();
  const [setores, setSetores] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [solicitantes, setSolicitantes] = useState([]);
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    prioridade: "MEDIA",
    status: "ABERTA",
    setorResponsavelId: "",
    funcionarioResponsavelId: "",
    solicitanteId: "",
    observacoes: "",
  });

  useEffect(() => {
    Promise.all([
      getSetores(),
      getFuncionarios({ pageSize: 100 }),
      getSolicitantes({ pageSize: 100 }),
    ]).then(([setoresData, funcionariosData, solicitantesData]) => {
      setSetores(setoresData.filter((item) => item.ativo));
      setFuncionarios(funcionariosData.items.filter((item) => item.ativo));
      setSolicitantes(solicitantesData.items);
    });
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    await createOrdem(form);
    navigate("/ordens");
  }

  return (
    <div>
      <PageHeader
        title="Nova ordem de servico"
        description="Registre uma nova solicitacao de forma objetiva e com os dados essenciais."
      />

      <FormCard title="Cadastro da ordem">
        <form onSubmit={handleSubmit} className="grid gap-4 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <label className="text-sm font-medium text-[var(--text-base)]">Titulo</label>
            <input
              className="field"
              value={form.titulo}
              onChange={(event) => setForm((state) => ({ ...state, titulo: event.target.value }))}
              required
            />
          </div>

          <div className="lg:col-span-2">
            <label className="text-sm font-medium text-[var(--text-base)]">Descricao</label>
            <textarea
              className="field min-h-32"
              value={form.descricao}
              onChange={(event) =>
                setForm((state) => ({ ...state, descricao: event.target.value }))
              }
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[var(--text-base)]">Prioridade</label>
            <select
              className="field"
              value={form.prioridade}
              onChange={(event) =>
                setForm((state) => ({ ...state, prioridade: event.target.value }))
              }
            >
              {prioridades.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-[var(--text-base)]">Status inicial</label>
            <select
              className="field"
              value={form.status}
              onChange={(event) => setForm((state) => ({ ...state, status: event.target.value }))}
            >
              {statusList.map((item) => (
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
              className="field"
              value={form.setorResponsavelId}
              onChange={(event) =>
                setForm((state) => ({ ...state, setorResponsavelId: event.target.value }))
              }
              required
            >
              <option value="">Selecione</option>
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
              className="field"
              value={form.funcionarioResponsavelId}
              onChange={(event) =>
                setForm((state) => ({
                  ...state,
                  funcionarioResponsavelId: event.target.value,
                }))
              }
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
              className="field"
              value={form.solicitanteId}
              onChange={(event) =>
                setForm((state) => ({ ...state, solicitanteId: event.target.value }))
              }
              required
            >
              <option value="">Selecione</option>
              {solicitantes.map((solicitante) => (
                <option key={solicitante.id} value={solicitante.id}>
                  {solicitante.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <label className="text-sm font-medium text-[var(--text-base)]">Observacoes</label>
            <textarea
              className="field min-h-28"
              value={form.observacoes}
              onChange={(event) =>
                setForm((state) => ({ ...state, observacoes: event.target.value }))
              }
            />
          </div>

          <div className="lg:col-span-2 flex justify-end">
            <button className="btn-primary w-full sm:w-auto" type="submit">
              Registrar ordem
            </button>
          </div>
        </form>
      </FormCard>
    </div>
  );
}

export default NovaOrdemPage;
