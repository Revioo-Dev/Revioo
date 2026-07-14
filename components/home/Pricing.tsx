"use client";
import Link from "next/link";
import { Check, Zap } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    monthlyPrice: 49,
    yearlyPrice: 39,
    description: "Perfect for single-location businesses just getting started.",
    features: [
      "1 business location",
      "Up to 3 review platforms",
      "200 review requests/month",
      "AI response suggestions",
      "Basic analytics",
      "Email support",
    ],
    cta: "Start free trial",
    highlighted: false,
  },
  {
    name: "Growth",
    monthlyPrice: 99,
    yearlyPrice: 79,
    description: "For growing businesses serious about their online reputation.",
    features: [
      "3 business locations",
      "Unlimited review platforms",
      "1,000 review requests/month",
      "Full AI auto-responses",
      "Advanced sentiment analytics",
      "Review fraud detection",
      "Team collaboration (5 seats)",
      "Priority support",
    ],
    cta: "Start free trial",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    monthlyPrice: 299,
    yearlyPrice: 239,
    description: "For multi-location brands and agencies managing at scale.",
    features: [
      "Unlimited locations",
      "Unlimited review platforms",
      "Unlimited review requests",
      "Custom AI brand voice",
      "White-label widgets",
      "API access",
      "Unlimited team seats",
      "Dedicated account manager",
      "SLA guarantee",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            Simple,{" "}
            <span className="gradient-text">transparent pricing</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-8">
            No hidden fees. No surprises. Start free for 14 days.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 glass rounded-xl p-1">
            <button
              onClick={() => setYearly(false)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                !yearly
                  ? "bg-purple-600 text-white shadow"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                yearly
                  ? "bg-purple-600 text-white shadow"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              Yearly
              <span className="text-xs font-semibold text-emerald-400">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={cn(
                "rounded-2xl p-8 relative transition-all duration-300",
                plan.highlighted
                  ? "bg-gradient-to-b from-purple-600/20 to-purple-900/10 border border-purple-500/40 shadow-xl shadow-purple-500/10"
                  : "glass-hover"
              )}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-violet-600 to-purple-500 text-xs font-bold text-white shadow-lg">
                    <Zap size={11} />
                    {plan.badge}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-zinc-500">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-black text-white">
                    ${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-zinc-500 mb-2">/mo</span>
                </div>
                {yearly && (
                  <p className="text-xs text-emerald-400 mt-1">
                    Billed annually — save $
                    {(plan.monthlyPrice - plan.yearlyPrice) * 12}/yr
                  </p>
                )}
              </div>

              <Link
                href="/signup"
                className={cn(
                  "block text-center w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 mb-8",
                  plan.highlighted
                    ? "btn-primary"
                    : "btn-secondary"
                )}
              >
                {plan.cta}
              </Link>

              <ul className="space-y-3">
                {plan.features.map((feature, fi) => (
                  <li key={fi} className="flex items-start gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-purple-400" />
                    </div>
                    <span className="text-zinc-400">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
