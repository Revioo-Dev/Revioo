import {
  Brain,
  MessageSquare,
  BarChart3,
  Bell,
  Globe,
  Shield,
  Zap,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Responses",
    description:
      "Generate personalized, on-brand replies to every review in seconds. Our AI learns your tone and handles the heavy lifting.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: BarChart3,
    title: "Sentiment Analytics",
    description:
      "Deep insights into customer sentiment trends. Spot issues before they escalate and celebrate what's working.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: Bell,
    title: "Real-Time Alerts",
    description:
      "Never miss a review again. Get instant notifications across all platforms — Google, Yelp, TripAdvisor, and more.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Globe,
    title: "Multi-Platform Sync",
    description:
      "Manage reviews from 50+ platforms in one unified dashboard. One inbox, total control.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: MessageSquare,
    title: "Review Campaigns",
    description:
      "Automated SMS and email campaigns that turn happy customers into glowing reviews at the perfect moment.",
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Assign reviews to team members, set workflows, and keep your whole team aligned on reputation management.",
    color: "from-indigo-500 to-violet-600",
  },
  {
    icon: Shield,
    title: "Review Verification",
    description:
      "AI fraud detection flags suspicious reviews so you can focus on genuine customer feedback that matters.",
    color: "from-red-500 to-pink-600",
  },
  {
    icon: Zap,
    title: "Instant Embeds",
    description:
      "Beautiful, auto-updating review widgets for your website. Display your best reviews and watch conversions climb.",
    color: "from-yellow-500 to-amber-600",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-purple-500/20 text-sm text-purple-300 mb-6">
            <Zap size={14} className="text-purple-400" />
            Everything you need
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            The review platform that
            <br />
            <span className="gradient-text">actually works</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            From collection to analytics to AI-assisted responses — every tool
            you need to dominate your online reputation.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="glass-hover rounded-2xl p-6 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
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
