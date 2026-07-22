import DashboardCard from "./DashboardCard";

import {
  ShieldAlert,
  AlertTriangle,
  TriangleAlert,
  ShieldCheck,
  Bell,
  CheckCircle2,
  Database,
  Users,
  Siren,
} from "lucide-react";

export default function DashboardCards({ stats }) {
  return (
    <div
      className="
        mt-8
        grid
        grid-cols-1
        gap-6
        sm:grid-cols-2
        xl:grid-cols-3
        2xl:grid-cols-4
      "
    >
      <DashboardCard
        title="Incidents"
        value={stats?.incidents ?? 0}
        color="text-red-500"
        icon={Siren}
      />

      <DashboardCard
        title="Critical"
        value={stats?.critical ?? 0}
        color="text-red-600"
        icon={ShieldAlert}
      />

      <DashboardCard
        title="High Severity"
        value={stats?.high ?? 0}
        color="text-orange-500"
        icon={AlertTriangle}
      />

      <DashboardCard
        title="Medium Severity"
        value={stats?.medium ?? 0}
        color="text-yellow-400"
        icon={TriangleAlert}
      />

      <DashboardCard
        title="Low Severity"
        value={stats?.low ?? 0}
        color="text-blue-400"
        icon={ShieldCheck}
      />

      <DashboardCard
        title="Open Incidents"
        value={stats?.open_incidents ?? 0}
        color="text-amber-400"
        icon={Bell}
      />

      <DashboardCard
        title="Closed Incidents"
        value={stats?.closed_incidents ?? 0}
        color="text-green-500"
        icon={CheckCircle2}
      />

      <DashboardCard
        title="IOCs"
        value={stats?.iocs ?? 0}
        color="text-cyan-400"
        icon={Database}
      />

      <DashboardCard
        title="Users"
        value={stats?.users ?? 0}
        color="text-emerald-500"
        icon={Users}
      />
    </div>
  );
}