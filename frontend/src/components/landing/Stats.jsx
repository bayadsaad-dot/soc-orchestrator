import {
  ShieldCheck,
  Database,
  Layers3,
  Activity,
} from "lucide-react";

const stats = [
  {
    icon: Layers3,
    value: "10+",
    title: "Core Features",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    title: "JWT Secured",
  },
  {
    icon: Database,
    value: "6",
    title: "Technology Integrations",
  },
  {
    icon: Activity,
    value: "24/7",
    title: "Security Monitoring Ready",
  },
];

export default function Stats() {
  return (
    <section id="stats" className="bg-gray-950 py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white">
            Platform Highlights
          </h2>

          <p className="mt-4 text-gray-400">
            Designed with modern security operations in mind.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-2xl border border-gray-800 bg-gray-900/60 p-8 text-center transition duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className="flex justify-center mb-5">
                  <div className="rounded-full bg-blue-600/20 p-4">
                    <Icon className="text-blue-400" size={30} />
                  </div>
                </div>

                <h3 className="text-4xl font-bold text-white">
                  {item.value}
                </h3>

                <p className="mt-3 text-gray-400">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}