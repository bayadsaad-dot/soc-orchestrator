import {
  LayoutDashboard,
  AlertTriangle,
  Globe,
  Users,
  ClipboardList,
  FileText,
  LogOut,
  Shield,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Incidents",
    path: "/incidents",
    icon: AlertTriangle,
  },
  {
    name: "IOCs",
    path: "/iocs",
    icon: Globe,
  },
  {
    name: "Users",
    path: "/users",
    icon: Users,
  },
  {
    name: "Audit Logs",
    path: "/audit",
    icon: ClipboardList,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: FileText,
  },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-950">

      {/* Logo */}
      <div className="border-b border-slate-800 px-6 py-6">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-cyan-500/20 p-3">
            <Shield className="h-7 w-7 text-cyan-400" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              SOC
            </h1>

            <p className="text-sm text-slate-400">
              Orchestrator
            </p>
          </div>

        </div>

      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.name}
              </span>
            </NavLink>
          );
        })}

      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800 p-4">

        <button
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={20} />

          Logout
        </button>

      </div>

    </aside>
  );
}