import { ArrowRight, ShieldCheck, Server, Database } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gray-950 pt-40 pb-24">

      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-24 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
          <ShieldCheck size={16} />
          Open Source Security Platform
        </div>

        {/* Title */}
        <h1 className="mt-8 text-5xl md:text-7xl font-extrabold text-white leading-tight">
          SOC
          <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            Orchestrator
          </span>
        </h1>

        {/* Description */}
        <p className="mt-8 max-w-2xl text-lg text-gray-400 leading-8">
          A modern Security Operations Center platform designed to centralize
          incident response, IOC management, threat intelligence, reporting,
          and security monitoring in one place.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap gap-4">

          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Get Started
            <ArrowRight size={18} />
          </Link>

          <a
            href="https://github.com/bayadsaad-dot/soc-orchestrator"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-gray-700 px-6 py-3 font-semibold text-gray-300 transition hover:border-blue-500 hover:text-white"
          >
            View on GitHub
          </a>

        </div>

        {/* Tech badges */}
        <div className="mt-14 flex flex-wrap gap-4">

          <div className="rounded-xl border border-gray-800 bg-gray-900/70 px-5 py-4">
            <div className="flex items-center gap-2 text-blue-400">
              <Server size={18} />
              <span className="font-semibold">FastAPI</span>
            </div>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900/70 px-5 py-4">
            <div className="flex items-center gap-2 text-cyan-400">
              <Database size={18} />
              <span className="font-semibold">PostgreSQL</span>
            </div>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900/70 px-5 py-4">
            <span className="font-semibold text-green-400">JWT Authentication</span>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900/70 px-5 py-4">
            <span className="font-semibold text-yellow-400">VirusTotal API</span>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900/70 px-5 py-4">
            <span className="font-semibold text-purple-400">Wazuh SIEM</span>
          </div>

        </div>

      </div>
    </section>
  );
}