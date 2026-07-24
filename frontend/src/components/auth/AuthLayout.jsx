import { ShieldCheck, CheckCircle } from "lucide-react";

export default function AuthLayout({ title, subtitle, children }) {
  const features = [
    "Incident Management",
    "Threat Intelligence",
    "IOC Management",
    "PDF Reports",
  ];

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-gray-800 bg-gray-900/60 backdrop-blur-xl shadow-2xl">

        {/* Left Panel */}
        <div className="hidden lg:flex flex-col justify-center p-12 border-r border-gray-800">

          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
              <ShieldCheck className="text-white" size={24} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white">
                SOC <span className="text-blue-500">Orchestrator</span>
              </h1>

              <p className="text-gray-400">
                Security Operations Platform
              </p>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-white leading-tight">
            Modern Security Operations Platform
          </h2>

          <p className="mt-6 text-gray-400 leading-8">
            Manage incidents, investigate threats, and centralize
            security operations through one enterprise platform.
          </p>

          <div className="mt-10 space-y-4">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <CheckCircle className="text-blue-400" size={20} />
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="p-8 md:p-12 flex items-center">
          <div className="w-full max-w-md mx-auto">

            <h2 className="text-3xl font-bold text-white">
              {title}
            </h2>

            <p className="mt-2 text-gray-400">
              {subtitle}
            </p>

            <div className="mt-8">
              {children}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}