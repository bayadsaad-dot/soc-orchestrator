import {
  Shield,
  Globe,
  Activity,
  BarChart3,
  Lock,
  FileText,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Incident Management",
    description:
      "Create, assign, investigate and resolve security incidents efficiently.",
  },
  {
    icon: Globe,
    title: "IOC Management",
    description:
      "Manage IPs, Domains and File Hashes from one centralized platform.",
  },
  {
    icon: Activity,
    title: "Threat Intelligence",
    description:
      "Enrich indicators using VirusTotal and external threat intelligence.",
  },
  {
    icon: BarChart3,
    title: "Interactive Dashboard",
    description:
      "Visualize incidents, alerts and security metrics in real time.",
  },
  {
    icon: Lock,
    title: "Role-Based Access",
    description:
      "Secure authentication with JWT and RBAC permissions.",
  },
  {
    icon: FileText,
    title: "Professional Reports",
    description:
      "Generate PDF reports ready for SOC teams and management.",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-gray-900">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-4">
          Platform Features
        </h2>

        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
          Everything you need to manage incidents and security operations
          from one modern platform.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="bg-gray-950 border border-gray-800 rounded-2xl p-8 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-600/20 flex items-center justify-center mb-6">
                  <Icon size={28} className="text-blue-500" />
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}