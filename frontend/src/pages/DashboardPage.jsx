import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartCard from "../components/ChartCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import PageHeader from "../components/PageHeader.jsx";
import StatCard from "../components/StatCard.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { getDashboard } from "../services/dashboardService.js";

const pieColors = ["#1f4e89", "#4c76aa", "#7d9bc4", "#a7bbd8", "#c9d7ea", "#dce6f3"];

function DashboardPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDashboard().then(setData);
  }, []);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Acompanhe rapidamente o volume de ordens e a distribuicao por setor e status."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard title="Ordens abertas" value={data?.totais.abertas || 0} tone="primary" />
        <StatCard title="Em execucao" value={data?.totais.emExecucao || 0} tone="neutral" />
        <StatCard
          title="Concluidas hoje"
          value={data?.totais.concluidasHoje || 0}
          tone="success"
        />
      </div>

      <div className="mt-6 grid gap-6 2xl:grid-cols-2">
        <ChartCard title="Ordens por setor">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data?.ordensPorSetor || []}
              margin={{ top: 10, right: 8, bottom: 8, left: -20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#d9e2ee" />
              <XAxis dataKey="nome" tick={{ fontSize: 12, fill: "#64748b" }} />
              <YAxis allowDecimals={false} tick={{ fill: "#64748b" }} />
              <Tooltip />
              <Bar dataKey="total" fill="#1f4e89" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Ordens por status">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data?.ordensPorStatus || []}
                dataKey="total"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={104}
                innerRadius={48}
                paddingAngle={3}
                label
              >
                {(data?.ordensPorStatus || []).map((entry, index) => (
                  <Cell key={entry.status} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="card mt-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-[var(--text-strong)] sm:text-xl">
            Ordens recentes
          </h3>
          <span className="text-sm text-[var(--text-soft)]">Ultimos registros</span>
        </div>

        <div className="mt-4 space-y-3">
          {data?.recentes?.length ? (
            data.recentes.map((ordem) => (
              <div
                key={ordem.id}
                className="flex flex-col gap-3 rounded-2xl border border-[var(--border-color)] bg-[var(--surface-muted)] p-4 md:flex-row md:items-center md:justify-between"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[var(--text-strong)]">
                    #{ordem.numero} - {ordem.titulo}
                  </p>
                  <p className="text-sm text-[var(--text-soft)]">{ordem.setorResponsavel?.nome}</p>
                </div>
                <StatusBadge value={ordem.status} />
              </div>
            ))
          ) : (
            <EmptyState message="Ainda nao ha ordens cadastradas." />
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
