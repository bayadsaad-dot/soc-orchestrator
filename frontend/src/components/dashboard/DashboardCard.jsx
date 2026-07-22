import {
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  Activity,
  Database,
  Users,
  FolderOpen,
  Bell,
} from "lucide-react";

const icons = {
  Incidents: AlertTriangle,
  Critical: ShieldAlert,
  "High Severity": Activity,
  "Medium Severity": Activity,
  "Low Severity": ShieldCheck,
  "Open Incidents": FolderOpen,
  "Closed Incidents": Bell,
  IOCs: Database,
  Users: Users,
};

export default function DashboardCard({ title, value, color }) {
  const Icon = icons[title] || Activity;

  return (
    <div
      className="
        group
        rounded-xl
        border border-slate-800
        bg-slate-900
        p-5
        min-h-[120px]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-cyan-500/60
        hover:shadow-2xl
        hover:shadow-cyan-500/10
      "
    >
      <div className="flex items-center justify-between">

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            {title}
          </p>

          <h2 className={`mt-4 text-4xl font-bold ${color}`}>
            {value ?? 0}
          </h2>
        </div>

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-xl
            bg-slate-800
            transition-all
            duration-300
            group-hover:bg-slate-700
          "
        >
          <Icon className={`h-7 w-7 ${color}`} />
        </div>

      </div>
    </div>
  );
}