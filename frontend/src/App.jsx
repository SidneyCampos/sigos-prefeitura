import { NavLink, Route, Routes } from "react-router-dom";
import { ClipboardList, LayoutDashboard, Layers3, PlusSquare, Users, UserSquare2 } from "lucide-react";
import DashboardPage from "./pages/DashboardPage.jsx";
import SetoresPage from "./pages/SetoresPage.jsx";
import FuncionariosPage from "./pages/FuncionariosPage.jsx";
import SolicitantesPage from "./pages/SolicitantesPage.jsx";
import OrdensPage from "./pages/OrdensPage.jsx";
import NovaOrdemPage from "./pages/NovaOrdemPage.jsx";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/setores", label: "Setores", icon: Layers3 },
  { to: "/funcionarios", label: "Funcionarios", icon: Users },
  { to: "/solicitantes", label: "Solicitantes", icon: UserSquare2 },
  { to: "/ordens", label: "Ordens", icon: ClipboardList },
  { to: "/ordens/nova", label: "Nova Ordem", icon: PlusSquare }
];

function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-4 lg:flex-row lg:px-6">
        <aside className="w-full rounded-3xl bg-white p-4 shadow-soft lg:w-72">
          <div className="rounded-2xl bg-gradient-to-br from-teal-700 to-emerald-500 p-5 text-white">
            <p className="text-sm uppercase tracking-[0.2em] text-teal-100">Prefeitura</p>
            <h1 className="mt-2 text-3xl font-black">SIGOS</h1>
            <p className="mt-2 text-sm text-teal-50">Sistema Integrado de Gestao de Ordens de Servico</p>
          </div>

          <nav className="mt-6 space-y-2">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-lg font-semibold transition ${
                    isActive
                      ? "bg-teal-50 text-teal-800"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                <Icon className="h-6 w-6" />
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/setores" element={<SetoresPage />} />
            <Route path="/funcionarios" element={<FuncionariosPage />} />
            <Route path="/solicitantes" element={<SolicitantesPage />} />
            <Route path="/ordens" element={<OrdensPage />} />
            <Route path="/ordens/nova" element={<NovaOrdemPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
