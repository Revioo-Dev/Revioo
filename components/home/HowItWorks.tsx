import { UserPlus, Share2, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Connect your platforms",
    description:
      "Link your Google Business, Yelp, TripAdvisor and 47 more review platforms in under 2 minutes. No technical setup required.",
    color: "from-violet-500 to-purple-600",
  },
  {
    number: "02",
    icon: Share2,
    title: "Collect reviews automatically",
    description:
      "Deploy AI-driven review request campaigns via SMS and email. Our timing algorithm sends requests at the perfect moment for maximum response rates.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Watch your reputation grow",
    description:
      "AI responds to reviews, analytics surface insights, and your star rating climbs — all on autopilot while you focus on running your business.",
    color: "from-emerald-500 to-teal-600",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            Up and running in{" "}
            <span className="gradient-text">minutes</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Three simple steps to transform your online reputation forever.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-0.5 h-[calc(100%-4rem)] bg-gradient-to-b from-purple-500/50 via-blue-500/30 to-transparent hidden lg:block" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative text-center lg:text-left">
                  {/* Step card */}
                  <div className="glass-hover rounded-2xl p-8">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 mb-6">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 shadow-lg`}
                      >
                        <Icon size={26} className="text-white" />
                      </div>
                      <div className="text-6xl font-black text-white/5 leading-none select-none">
                        {step.number}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Connector arrow (horizontal on large screens) */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500/50 to-transparent" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
