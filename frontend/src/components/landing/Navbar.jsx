import { Link } from "react-router-dom";
import { GitBranch, ShieldCheck } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-gray-800 bg-gray-950/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
            <ShieldCheck className="text-white" size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              SOC <span className="text-blue-500">Orchestrator</span>
            </h1>

            <p className="text-xs text-gray-400">
              Security Operations Platform
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">

          <a
            href="#features"
            className="text-gray-300 hover:text-blue-400 transition"
          >
            Features
          </a>

          <a
            href="#tech-stack"
            className="text-gray-300 hover:text-blue-400 transition"
          >
            Tech Stack
          </a>

          <a
            href="#stats"
            className="text-gray-300 hover:text-blue-400 transition"
          >
            Statistics
          </a>

        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <a
            href="https://github.com/bayadsaad-dot/soc-orchestrator"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-2 border border-gray-700 px-4 py-2 rounded-lg hover:border-blue-500 transition"
          >
            <GitBranch size={18} />
            GitHub
          </a>

          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-lg font-medium"
          >
            Login
          </Link>

        </div>

      </div>
    </header>
  );
}