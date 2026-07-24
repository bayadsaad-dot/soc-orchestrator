import {
  Atom,
  Database,
  ShieldCheck,
  LockKeyhole,
  Server,
  SearchCheck,
} from "lucide-react";

const technologies = [
  {
    icon: Atom,
    name: "React",
    description: "Modern frontend framework",
  },
  {
    icon: Server,
    name: "FastAPI",
    description: "High-performance Python API",
  },
  {
    icon: Database,
    name: "PostgreSQL",
    description: "Reliable relational database",
  },
  {
    icon: LockKeyhole,
    name: "JWT",
    description: "Secure authentication",
  },
  {
    icon: ShieldCheck,
    name: "Wazuh",
    description: "Open-source SIEM platform",
  },
  {
    icon: SearchCheck,
    name: "VirusTotal",
    description: "Threat Intelligence Integration",
  },
];

export default function TechStack() {
  return (
    <section className="py-24 bg-gray-950">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-4">
          Technology Stack
        </h2>

        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Built using modern technologies trusted by cybersecurity professionals.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {technologies.map((tech) => {
            const Icon = tech.icon;

            return (
              <div
                key={tech.name}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-blue-500 transition-all duration-300 hover:scale-105"
              >

                <div className="w-14 h-14 rounded-xl bg-blue-600/20 flex items-center justify-center mb-6">
                  <Icon className="text-blue-500" size={30} />
                </div>

                <h3 className="text-2xl font-semibold mb-3">
                  {tech.name}
                </h3>

                <p className="text-gray-400">
                  {tech.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}