"use client";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, TrendingUp } from "lucide-react";
import { StarRating } from "@/components/ui/StarRating";

const floatingReviews = [
  {
    name: "Sarah M.",
    company: "Bloom Bakery",
    text: "Absolutely incredible experience! The team went above and beyond.",
    rating: 5,
    avatar: "S",
    color: "from-pink-500 to-rose-500",
  },
  {
    name: "James K.",
    company: "Urban Cuts",
    text: "Best service I've had in years. Will definitely be back!",
    rating: 5,
    avatar: "J",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Priya L.",
    company: "Zenith Yoga",
    text: "Changed my life. Highly recommend to everyone.",
    rating: 5,
    avatar: "P",
    color: "from-emerald-500 to-teal-500",
  },
];

const stats = [
  { label: "Reviews Collected", value: "2.4M+" },
  { label: "Businesses", value: "18K+" },
  { label: "Avg. Rating Lift", value: "+1.2★" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background glow */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating review cards */}
      <div className="absolute left-[3%] top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 animate-float">
        {floatingReviews.slice(0, 2).map((r, i) => (
          <FloatingCard key={i} review={r} delay={i * 0.3} />
        ))}
      </div>
      <div className="absolute right-[3%] top-1/2 -translate-y-1/2 hidden xl:block animate-float" style={{ animationDelay: "2s" }}>
        <FloatingCard review={floatingReviews[2]} delay={0.6} />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-purple-500/20 text-sm text-purple-300 mb-8">
          <Sparkles size={14} className="text-purple-400" />
          <span>AI-powered reputation management</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6 leading-[1.05]">
          Build{" "}
          <span className="gradient-text">Trust.</span>
          <br />
          Get{" "}
          <span className="gradient-text">Discovered.</span>
        </h1>

        <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Revioo uses AI to help you collect, manage, and amplify authentic
          customer reviews — turning happy customers into your most powerful
          marketing channel.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/signup" className="btn-primary text-base px-8 py-4">
            Start for free
            <ArrowRight size={18} />
          </Link>
          <Link href="#how-it-works" className="btn-secondary text-base px-8 py-4">
            See how it works
          </Link>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500 mb-16">
          {[
            { icon: Shield, text: "No credit card required" },
            { icon: TrendingUp, text: "14-day free trial" },
            { icon: Sparkles, text: "Setup in 5 minutes" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon size={15} className="text-purple-500" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
              <div className="text-xs text-zinc-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FloatingCard({ review, delay }: { review: typeof floatingReviews[0]; delay: number }) {
  return (
    <div
      className="glass rounded-2xl p-4 w-64 shadow-xl"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          className={`w-9 h-9 rounded-full bg-gradient-to-br ${review.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
        >
          {review.avatar}
        </div>
        <div>
          <div className="text-sm font-semibold text-white">{review.name}</div>
          <div className="text-xs text-zinc-500">{review.company}</div>
        </div>
      </div>
      <StarRating rating={review.rating} size={13} />
      <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{review.text}</p>
    </div>
  );
}
