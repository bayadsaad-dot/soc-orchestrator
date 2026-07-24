import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="py-24 bg-gray-950">

      <div className="max-w-4xl mx-auto px-6 text-center">

        <h2 className="text-5xl font-bold mb-6">
          Ready to Secure Your Operations?
        </h2>

        <p className="text-gray-400 text-xl mb-10">
          Manage incidents, investigate threats and monitor your SOC
          from one centralized platform.
        </p>

        <Link
          to="/login"
          className="inline-block bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded-xl font-semibold transition"
        >
          Get Started
        </Link>

      </div>

    </section>
  );
}