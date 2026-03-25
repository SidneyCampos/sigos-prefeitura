import {
  ClipboardList,
  LayoutDashboard,
  Layers3,
  Menu,
  Moon,
  PlusSquare,
  Sun,
  UserSquare2,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage.jsx";
import FuncionariosPage from "./pages/FuncionariosPage.jsx";
import NovaOrdemPage from "./pages/NovaOrdemPage.jsx";
import OrdensPage from "./pages/OrdensPage.jsx";
import SetoresPage from "./pages/SetoresPage.jsx";
import SolicitantesPage from "./pages/SolicitantesPage.jsx";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/setores", label: "Setores", icon: Layers3 },
  { to: "/funcionarios", label: "Funcionarios", icon: Users },
  { to: "/solicitantes", label: "Solicitantes", icon: UserSquare2 },
  { to: "/ordens", label: "Ordens", icon: ClipboardList },
  { to: "/ordens/nova", label: "Nova Ordem", icon: PlusSquare },
];

const THEME_STORAGE_KEY = "sigos-theme";

function ThemeButton({ theme, onToggle, compact = false }) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={`btn-secondary ${compact ? "h-10 w-10 px-0" : ""}`}
      onClick={onToggle}
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      title={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
    >
      <span className="inline-flex items-center gap-2">
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        {compact ? null : <span>{isDark ? "Modo claro" : "Modo escuro"}</span>}
      </span>
    </button>
  );
}

function Sidebar({ onNavigate, theme, onToggleTheme }) {
  return (
    <div className="flex h-full flex-col">
      <div className="rounded-2xl bg-[linear-gradient(180deg,#1f4e89_0%,#183b67_100%)] p-5 text-white">
        <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-blue-100/90">
          Prefeitura
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight">SIGOS</h1>
        <p className="mt-2 text-sm leading-6 text-blue-50/90">
          Sistema integrado para controle de ordens de servico.
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 px-1">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            Navegacao
          </p>
        </div>
        <ThemeButton theme={theme} onToggle={onToggleTheme} compact />
      </div>

      <nav className="mt-3 space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            onClick={onNavigate}
            className={({ isActive }) =>
              `nav-item ${isActive ? "nav-item-active" : "nav-item-inactive"}`
            }
          >
            <Icon className="h-4.5 w-4.5 shrink-0" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto hidden pt-4 lg:block">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          Sistema simples, responsivo e focado em operacao.
        </div>
      </div>
    </div>
  );
}

function MobileTopbar({ onToggleMenu, theme, onToggleTheme }) {
  const location = useLocation();
  const current = links.find((item) => item.to === location.pathname)?.label || "SIGOS";

  return (
    <header className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-950 lg:hidden">
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
          SIGOS
        </p>
        <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
          {current}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <ThemeButton theme={theme} onToggle={onToggleTheme} compact />
        <button
          type="button"
          className="btn-secondary h-10 w-10 px-0"
          onClick={onToggleMenu}
          aria-label="Abrir menu"
        >
          <Menu className="h-4.5 w-4.5" />
        </button>
      </div>
    </header>
  );
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);

    if (saved === "light" || saved === "dark") {
      return saved;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }

  return (
    <div className="min-h-screen bg-[var(--app-bg)] text-slate-800 transition-colors dark:text-slate-100">
      <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 gap-4 px-3 py-3 sm:px-4 sm:py-4 lg:grid-cols-[248px,minmax(0,1fr)] lg:gap-6 lg:px-6 lg:py-6">
        <aside className="app-card hidden min-h-[calc(100vh-3rem)] p-4 lg:sticky lg:top-6 lg:block">
          <Sidebar theme={theme} onToggleTheme={toggleTheme} />
        </aside>

        <div className="min-w-0">
          <MobileTopbar
            theme={theme}
            onToggleTheme={toggleTheme}
            onToggleMenu={() => setMobileMenuOpen(true)}
          />

          {mobileMenuOpen ? (
            <div className="fixed inset-0 z-50 bg-slate-950/45 px-3 py-3 lg:hidden">
              <div className="app-card ml-auto h-full max-w-xs p-4">
                <div className="mb-4 flex items-center justify-end">
                  <button
                    type="button"
                    className="btn-secondary h-10 w-10 px-0"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Fechar menu"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>

                <Sidebar
                  theme={theme}
                  onToggleTheme={toggleTheme}
                  onNavigate={() => setMobileMenuOpen(false)}
                />
              </div>
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
