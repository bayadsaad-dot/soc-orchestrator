const stats = [
  {
    value: "10+",
    label: "Platform Features",
  },
  {
    value: "JWT",
    label: "Authentication",
  },
  {
    value: "RBAC",
    label: "Access Control",
  },
  {
    value: "24/7",
    label: "Security Monitoring",
  },
];

export default function Stats() {
  return (
    <section className="py-24 bg-gray-900">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-950 border border-gray-800 rounded-2xl p-10 text-center hover:border-blue-500 transition-all duration-300 hover:-translate-y-2"
            >
              <h2 className="text-5xl font-bold text-blue-500">
                {stat.value}
              </h2>

              <p className="text-gray-400 mt-4">
                {stat.label}
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}