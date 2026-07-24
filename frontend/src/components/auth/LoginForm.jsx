import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import PasswordInput from "./PasswordInput";

export default function LoginForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/users/login", form);

      localStorage.setItem("token", response.data.access_token);

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.detail || "Invalid username or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-300">
          Username
        </label>

        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Enter your username"
          className="w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
          required
        />
      </div>

      <PasswordInput
        label="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Enter your password"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>

      <p className="text-center text-gray-400">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-blue-400 hover:text-blue-300"
        >
          Create one
        </Link>
      </p>

    </form>
  );
}