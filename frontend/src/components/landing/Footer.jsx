import { GitBranch } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 py-12 bg-gray-950">

      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-3xl font-bold mb-3">
          SOC <span className="text-blue-500">Orchestrator</span>
        </h2>

        <p className="text-gray-400 mb-8">
          A modern Security Operations Platform built with React, FastAPI and PostgreSQL.
        </p>

        <a
          href="https://github.com/bayadsaad-dot/soc-orchestrator"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
        >
          <GitBranch size={20} />
          View on GitHub
        </a>

        <div className="mt-10 border-t border-gray-800 pt-8">

          <p className="text-lg font-semibold">
            Designed & Developed by
          </p>

          <h3 className="text-2xl font-bold text-blue-500 mt-2">
            Saad Byad
          </h3>

          <p className="text-gray-400 mt-2">
            Cybersecurity Engineer • SOC Analyst • Full Stack Developer
          </p>

          <p className="text-gray-500 mt-8 text-sm">
            © 2026 SOC Orchestrator. All Rights Reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}