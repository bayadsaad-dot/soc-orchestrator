import { useEffect, useState, useCallback } from "react";
import api from "../services/api";

import MainLayout from "../layouts/MainLayout";

import DashboardCards from "../components/dashboard/DashboardCards";
import ThreatFeed from "../components/dashboard/ThreatFeed";

import SeverityChart from "../components/SeverityChart";
import StatusPieChart from "../components/StatusPieChart";
import RecentIncidents from "../components/RecentIncidents";

import IOCTypeChart from "../components/threat/IOCTypeChart";
import TopSourcesChart from "../components/threat/TopSourcesChart";
import ThreatTrendChart from "../components/threat/ThreatTrendChart";
import MitreAttackChart from "../components/threat/MitreAttackChart";

export default function Dashboard() {
  const [stats, setStats] = useState({
    incidents: 0,
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    iocs: 0,
    users: 0,
    open_incidents: 0,
    closed_incidents: 0,
  });

  const fetchStats = useCallback(async () => {
    try {
      const response = await api.get("/dashboard/stats");
      setStats(response.data);
    } catch (error) {
      console.error("Failed to load dashboard stats:", error);
    }
  }, []);

  useEffect(() => {
    fetchStats();

    const interval = setInterval(fetchStats, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval);
  }, [fetchStats]);

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Monitor incidents, IOCs, users and SOC activity in real time.
        </p>
      </div>

      <DashboardCards stats={stats} />

      <div className="grid gap-6 mt-8 lg:grid-cols-2">
        <SeverityChart stats={stats} />
        <StatusPieChart stats={stats} />
      </div>

      <div className="grid gap-6 mt-8 lg:grid-cols-2">
        <IOCTypeChart />
        <TopSourcesChart />
      </div>

      <div className="mt-8">
        <ThreatTrendChart />
      </div>

      <div className="mt-8">
        <RecentIncidents />
      </div>

      <div className="mt-8">
        <ThreatFeed />
      </div>

      <div className="mt-8">
        <MitreAttackChart />
      </div>
    </MainLayout>
  );
}