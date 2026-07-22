import MainLayout from "../layouts/MainLayout";
import { ShieldAlert, Globe, Radar, Activity } from "lucide-react";

export default function ThreatDashboard() {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">
            Threat Intelligence Dashboard
          </h1>

          <p className="mt-2 text-slate-400">
            Monitor global cyber threats, IOC intelligence and attack trends.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <ShieldAlert className="mb-4 h-8 w-8 text-red-500" />
            <h2 className="text-lg font-semibold text-white">
              Active Threats
            </h2>
            <p className="mt-2 text-4xl font-bold text-red-500">
              0
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <Globe className="mb-4 h-8 w-8 text-cyan-400" />
            <h2 className="text-lg font-semibold text-white">
              Countries
            </h2>
            <p className="mt-2 text-4xl font-bold text-cyan-400">
              0
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <Radar className="mb-4 h-8 w-8 text-purple-500" />
            <h2 className="text-lg font-semibold text-white">
              IOC Feeds
            </h2>
            <p className="mt-2 text-4xl font-bold text-purple-500">
              0
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <Activity className="mb-4 h-8 w-8 text-green-500" />
            <h2 className="text-lg font-semibold text-white">
              Risk Score
            </h2>
            <p className="mt-2 text-4xl font-bold text-green-500">
              Low
            </p>
          </div>
        </div>

        {/* Placeholder */}
        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900 p-16 text-center">
          <h2 className="text-2xl font-semibold text-white">
            🚀 Threat Intelligence Module
          </h2>

          <p className="mt-4 text-slate-400">
            This module will include Threat Feeds, MITRE ATT&CK Mapping,
            VirusTotal Intelligence, Global Threat Map and IOC Analytics.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}