import {
  Shield,
  Activity,
  FileText,
  BarChart3,
  Database,
  Lock,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Incident Management",
    description:
      "Create, assign, track and resolve security incidents through a centralized workflow.",
  },
  {
    icon: Database,
    title: "IOC Management",
    description:
      "Store and manage malicious IPs, domains, hashes and URLs from a single dashboard.",
  },
  {
    icon: Activity,
    title: "Threat Intelligence",
    description:
      "Integrate VirusTotal and Wazuh to enrich investigations with actionable intelligence.",
  },
  {
    icon: BarChart3,
    title: "Security Dashboard",
    description:
      "Visualize incidents, alerts and security metrics with real-time dashboards.",
  },
  {
    icon: FileText,
    title: "PDF Reports",
    description:
      "Generate professional incident reports for auditing and compliance.",
  },
  {
    icon: Lock,
    title: "Role-Based Access",
    description:
      "Protect the platform using JWT authentication and Role-Based Access Control.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-gray-950 py-24"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white">
            Enterprise Security Features
          </h2>

          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Everything needed to manage incidents, investigate threats and
            streamline SOC operations from one modern platform.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group rounded-2xl border border-gray-800 bg-gray-900/60 p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-600/20 flex items-center justify-center mb-6">
                  <Icon className="text-blue-400" size={28} />
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-7">
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