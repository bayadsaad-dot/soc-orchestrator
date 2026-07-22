import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("/users/login", {
        username,
        password,
      });

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid username or password");
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">

        <h1 className="text-center text-4xl font-bold text-cyan-400">
          SOC Orchestrator
        </h1>

        <p className="mt-2 mb-8 text-center text-slate-400">
          Threat Intelligence & SOC Automation Platform
        </p>

        <form
          className="space-y-5"
          onSubmit={handleLogin}
        >

          <div>
            <label className="mb-2 block text-sm text-white">
              Username
            </label>

            <input
              type="text"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white">
              Password
            </label>

            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-cyan-500 py-3 font-semibold text-white hover:bg-cyan-600 transition"
          >
            Sign In
          </button>

        </form>

      </div>
    </div>
  );
}