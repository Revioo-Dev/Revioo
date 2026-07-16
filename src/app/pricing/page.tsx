import Link from "next/link";
import { CheckCircle, Star, Zap, Crown } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Rs. 1,000",
    duration: "/1 Month",
    icon: Zap,
    badge: "Best Value",
    button: "Choose Starter",
    featured: false,
    features: [
      "Everything in Explore",
      "Unlimited Reviews",
      "Custom QR Designs",
      "Upload your catalogue",
      "Google Review Analytics",
      "AI Review Replies",
      "Priority Support",
    ],
  },
  {
    name: "Professional",
    price: "Rs. 3,000",
    duration: "/6 Months",
    icon: Crown,
    badge: "Most Popular",
    button: "Choose Professional",
    featured: true,
    features: [
      "Everything in Starter",
      "Upload your catalogue",
      "Multiple Locations",
      "6 Months Guaranteed Access",
      "Advanced Analytics",
      "Review Widgets",
      "API Access",
    ],
  },
];
export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f0b1f] via-[#130d29] to-black text-white">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
          Transparent Pricing
        </div>

        <h1 className="mt-6 text-5xl md:text-6xl font-extrabold">
          Simple Pricing
          <span className="block bg-gradient-to-r from-purple-400 via-fuchsia-300 to-violet-500 bg-clip-text text-transparent">
            For Every Business
          </span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-zinc-400 text-lg">
          Whether you're a small shop or a growing business, Revioo has
          everything you need to collect more Google reviews and build trust.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                key={plan.name}
                className={`relative rounded-3xl border p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 ${
                  plan.featured
                    ? "border-purple-500 bg-gradient-to-b from-purple-700/20 to-black shadow-[0_0_60px_rgba(168,85,247,0.25)]"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-4 py-1 text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-purple-600/20 p-3">
                    <Icon className="text-purple-400" size={28} />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">{plan.name}</h2>
                    <p className="text-sm text-zinc-400">{plan.badge}</p>
                  </div>
                </div>

                <div className="mt-8">
                  <span className="text-5xl font-extrabold">
                    {plan.price}
                  </span>

                  {"duration" in plan && (
                    <span className="text-zinc-400">
                      {plan.duration}
                    </span>
                  )}
                </div>

                <a
  href={`https://wa.me/923353727314?text=${encodeURIComponent(
    `Hi Revioo! I'm interested in the ${plan.name} plan.`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className={`mt-8 flex w-full items-center justify-center rounded-xl py-3 font-semibold transition ${
    plan.featured
      ? "bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:opacity-90"
      : "border border-white/20 hover:bg-white/10"
  }`}
>
  {plan.button}
</a>

                <div className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle
                        size={18}
                        className="text-green-400"
                      />
                      <span className="text-zinc-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise */}
        <div className="mt-20 rounded-3xl border border-purple-500/20 bg-gradient-to-r from-purple-900/20 to-fuchsia-900/20 p-10 text-center">
          <h2 className="text-3xl font-bold">
            Need a custom enterprise solution?
          </h2>

          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
            Manage multiple branches, advanced analytics, dedicated onboarding,
            and priority support tailored for large organizations.
          </p>

          <a
            href="https://wa.me/923353727314"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-8 py-4 font-semibold hover:opacity-90"
          >
            Contact Sales
          </a>
        </div>

        {/* Bottom */}
        <div className="mt-20 text-center">
          <Link
            href="/"
            className="text-purple-400 hover:text-purple-300 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
