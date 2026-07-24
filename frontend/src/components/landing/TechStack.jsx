import {
  Atom,
  ShieldCheck,
  Database,
  Server,
  Lock,
  Globe,
} from "lucide-react";

const technologies = [
  {
    icon: Atom,
    title: "React",
    description: "Modern frontend built with React and Tailwind CSS.",
    color: "text-cyan-400",
  },
  {
    icon: Server,
    title: "FastAPI",
    description: "High-performance Python backend with REST APIs.",
    color: "text-green-400",
  },
  {
    icon: Database,
    title: "PostgreSQL",
    description: "Reliable relational database for incidents and IOCs.",
    color: "text-blue-400",
  },
  {
    icon: Lock,
    title: "JWT Authentication",
    description: "Secure authentication with role-based access control.",
    color: "text-yellow-400",
  },
  {
    icon: ShieldCheck,
    title: "Wazuh Integration",
    description: "Collect and investigate security events from Wazuh.",
    color: "text-purple-400",
  },
  {
    icon: Globe,
    title: "VirusTotal API",
    description: "Enrich investigations with threat intelligence lookups.",
    color: "text-red-400",
  },
];

export default function TechStack() {
  return (
    <section id="tech-stack" className="bg-gray-950 py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white">
            Technology Stack
          </h2>

          <p className="mt-4 text-gray-400 max-w-3xl mx-auto">
            Built with modern technologies used in enterprise security
            platforms to deliver performance, scalability and reliability.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {technologies.map((tech, index) => {
            const Icon = tech.icon;

            return (
              <div
                key={index}
                className="rounded-2xl border border-gray-800 bg-gray-900/60 p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className="mb-6">
                  <Icon size={34} className={tech.color} />
                </div>

                <h3 className="text-xl font-semibold text-white">
                  {tech.title}
                </h3>

                <p className="mt-3 text-gray-400 leading-7">
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