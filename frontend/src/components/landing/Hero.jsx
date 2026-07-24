import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full backdrop-blur-lg bg-gray-950/80 border-b border-gray-800 z-50">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-5">

        <h1 className="text-2xl font-bold">
          SOC <span className="text-blue-500">Orchestrator</span>
        </h1>

        <div className="flex gap-4">

          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-lg"
          >
            Login
          </Link>

        </div>

      </div>

    </header>
  );
}