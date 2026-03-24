import { Menu, X, ClipboardList, LayoutDashboard, Layers3, PlusSquare, Users, UserSquare2 } from "lucide-react";
import { useState } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
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
  { to: "/ordens/nova", label: "Nova Ordem", icon: PlusSquare },
];

function SidebarContent({ onNavigate }) {
  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#1d4f91_0%,#153763_100%)] p-5 text-white">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-200">
          Prefeitura
        </p>
        <h1 className="mt-3 text-2xl font-bold">SIGOS</h1>
        <p className="mt-2 text-sm leading-6 text-slate-100/90">
          Sistema Integrado de Gestao de Ordens de Servico
        </p>
      </div>

      <nav className="mt-5 space-y-1.5">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "border border-blue-200 bg-blue-50 text-blue-900"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`
            }
          >
            <Icon className="h-4.5 w-4.5 shrink-0" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}

function App() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 gap-4 p-3 sm:p-4 lg:grid-cols-[240px,minmax(0,1fr)] lg:gap-6 lg:p-6">
        <aside className="hidden rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-sm lg:sticky lg:top-6 lg:block lg:h-[calc(100vh-3rem)] lg:overflow-y-auto">
          <SidebarContent />
        </aside>

        <div className="min-w-0">
          <header className="mb-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm lg:hidden">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                SIGOS
              </p>
              <p className="text-sm font-semibold text-slate-800">
                {links.find((item) => item.to === location.pathname)?.label || "Sistema"}
              </p>
            </div>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700"
              onClick={() => setMobileMenuOpen((state) => !state)}
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </header>

          {mobileMenuOpen ? (
            <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:hidden">
              <SidebarContent onNavigate={() => setMobileMenuOpen(false)} />
            </div>
          ) : null}

          <main className="min-w-0">
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
    </div>
  );
}

export default App;
