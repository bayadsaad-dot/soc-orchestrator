import { motion } from "framer-motion";
import {
  ShieldAlert,
  ShieldCheck,
  Activity,
  Database,
} from "lucide-react";

export default function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      {/* Glow */}
      <div className="absolute -inset-4 rounded-3xl bg-blue-500/10 blur-3xl"></div>

      <div className="relative rounded-3xl border border-gray-800 bg-gray-900/70 backdrop-blur-xl p-6 shadow-2xl shadow-blue-500/10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold text-white">
              SOC Dashboard
            </h3>

            <p className="text-gray-400 text-sm">
              Live Security Overview
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-green-400 text-sm">
              Live
            </span>
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-4">

          <div className="flex items-center justify-between rounded-xl bg-gray-800/60 p-4">
            <div className="flex items-center gap-3">
              <ShieldAlert className="text-red-400" size={22} />
              <span className="text-gray-300">
                Critical Alerts
              </span>
            </div>

            <span className="text-red-400 font-bold text-xl">
              12
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-gray-800/60 p-4">
            <div className="flex items-center gap-3">
              <Activity className="text-yellow-400" size={22} />
              <span className="text-gray-300">
                Active Incidents
              </span>
            </div>

            <span className="text-yellow-400 font-bold text-xl">
              8
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-gray-800/60 p-4">
            <div className="flex items-center gap-3">
              <Database className="text-cyan-400" size={22} />
              <span className="text-gray-300">
                IOC Matches
              </span>
            </div>

            <span className="text-cyan-400 font-bold text-xl">
              54
            </span>
          </div>

        </div>

        {/* Status */}
        <div className="mt-8">

          <div className="flex justify-between mb-2 text-sm">
            <span className="text-gray-400">
              Security Status
            </span>

            <span className="text-blue-400 font-medium">
              Protected
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-gray-800 overflow-hidden">
            <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"></div>
          </div>

          <div className="mt-6 flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/10 p-4">
            <ShieldCheck className="text-green-400" size={24} />

            <div>
              <p className="font-semibold text-white">
                System Secure
              </p>

              <p className="text-sm text-gray-400">
                Last synchronization: 2 minutes ago
              </p>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}