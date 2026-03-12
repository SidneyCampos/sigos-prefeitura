import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";
import ChartCard from "../components/ChartCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import PageHeader from "../components/PageHeader.jsx";
import StatCard from "../components/StatCard.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { getDashboard } from "../services/dashboardService.js";

const pieColors = ["#0f766e", "#14b8a6", "#f59e0b", "#6366f1", "#10b981", "#ef4444"];

function DashboardPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDashboard().then(setData);
  }, []);

  return (
    <div>
      <PageHeader title="Dashboard" description="Resumo rapido das ordens de servico da prefeitura." />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Ordens abertas" value={data?.totais.abertas || 0} tone="teal" />
        <StatCard title="Em execucao" value={data?.totais.emExecucao || 0} tone="amber" />
        <StatCard title="Concluidas hoje" value={data?.totais.concluidasHoje || 0} tone="blue" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <ChartCard title="Ordens por setor">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data?.ordensPorSetor || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="nome" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="total" fill="#0f766e" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Ordens por status">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data?.ordensPorStatus || []} dataKey="total" nameKey="status" cx="50%" cy="50%" outerRadius={110} label>
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
        <h3 className="text-2xl font-black text-slate-800">Ordens recentes</h3>
        <div className="mt-4 space-y-3">
          {data?.recentes?.length ? (
            data.recentes.map((ordem) => (
              <div key={ordem.id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-black text-slate-800">#{ordem.numero} - {ordem.titulo}</p>
                  <p className="text-slate-500">{ordem.setorResponsavel?.nome}</p>
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
