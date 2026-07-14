import { createClient } from "@/lib/supabase/server";
import {
  Star,
  TrendingUp,
  MessageSquare,
  Users,
  ArrowUpRight,
  Brain,
  AlertCircle,
  Clock,
} from "lucide-react";
import { StarRating } from "@/components/ui/StarRating";

const recentReviews = [
  {
    name: "Emily Watson",
    platform: "Google",
    rating: 5,
    text: "Absolutely phenomenal service! The team was professional, fast, and exceeded all my expectations. I'll be coming back for sure.",
    time: "2 hours ago",
    avatar: "E",
    color: "from-pink-500 to-rose-600",
    responded: false,
  },
  {
    name: "Tom Nguyen",
    platform: "Yelp",
    rating: 4,
    text: "Great experience overall. The atmosphere was perfect and staff very friendly. Would have loved slightly faster service.",
    time: "5 hours ago",
    avatar: "T",
    color: "from-blue-500 to-cyan-600",
    responded: true,
  },
  {
    name: "Rachel Kim",
    platform: "Google",
    rating: 5,
    text: "Best decision I made this month! Everything was perfect from start to finish. Highly recommend to anyone.",
    time: "1 day ago",
    avatar: "R",
    color: "from-violet-500 to-purple-600",
    responded: true,
  },
  {
    name: "Carlos Mendez",
    platform: "TripAdvisor",
    rating: 3,
    text: "Decent experience but not what I expected based on the reviews. Some things could be improved.",
    time: "2 days ago",
    avatar: "C",
    color: "from-amber-500 to-orange-600",
    responded: false,
  },
];

const stats = [
  {
    label: "Average Rating",
    value: "4.8",
    sub: "★ across all platforms",
    icon: Star,
    trend: "+0.3 this month",
    color: "from-amber-500 to-orange-600",
    up: true,
  },
  {
    label: "Total Reviews",
    value: "347",
    sub: "across 3 platforms",
    icon: MessageSquare,
    trend: "+24 this month",
    color: "from-blue-500 to-cyan-600",
    up: true,
  },
  {
    label: "Response Rate",
    value: "94%",
    sub: "of reviews responded",
    icon: TrendingUp,
    trend: "+8% this month",
    color: "from-emerald-500 to-teal-600",
    up: true,
  },
  {
    label: "New Customers",
    value: "128",
    sub: "from review-driven visits",
    icon: Users,
    trend: "+12% this month",
    color: "from-violet-500 to-purple-600",
    up: true,
  },
];

const platformBreakdown = [
  { name: "Google", reviews: 218, rating: 4.9, color: "bg-blue-500" },
  { name: "Yelp", reviews: 89, rating: 4.6, color: "bg-red-500" },
  { name: "TripAdvisor", reviews: 40, rating: 4.7, color: "bg-emerald-500" },
];

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const firstName = user?.user_metadata?.full_name?.split(" ")[0] ?? "there";

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-white mb-1">
            Good morning, {firstName} 👋
          </h1>
          <p className="text-zinc-500 text-sm">
            Here's what's happening with your reviews today.
          </p>
        </div>
        <button className="btn-primary text-sm px-4 py-2">
          <Brain size={15} />
          AI Respond All
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glass rounded-2xl p-5">
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                >
                  <Icon size={18} className="text-white" />
                </div>
                <div className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                  <ArrowUpRight size={12} />
                  {stat.trend}
                </div>
              </div>
              <div className="text-3xl font-black text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-zinc-500">{stat.sub}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent reviews */}
        <div className="xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Recent Reviews</h2>
            <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
              View all
            </button>
          </div>
          <div className="space-y-3">
            {recentReviews.map((review, i) => (
              <div key={i} className="glass rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${review.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                    >
                      {review.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {review.name}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-zinc-500">
                          {review.platform}
                        </span>
                        <span className="text-zinc-700">•</span>
                        <div className="flex items-center gap-1 text-xs text-zinc-500">
                          <Clock size={10} />
                          {review.time}
                        </div>
                      </div>
                    </div>
                  </div>
                  <StarRating rating={review.rating} size={13} />
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                  "{review.text}"
                </p>

                <div className="flex items-center gap-2">
                  {review.responded ? (
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
                      <TrendingUp size={11} />
                      Responded
                    </span>
                  ) : (
                    <>
                      <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg">
                        <AlertCircle size={11} />
                        Awaiting response
                      </span>
                      <button className="inline-flex items-center gap-1.5 text-xs text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-lg hover:bg-purple-500/20 transition-colors">
                        <Brain size={11} />
                        AI Reply
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar panels */}
        <div className="space-y-6">
          {/* Platform breakdown */}
          <div>
            <h2 className="text-lg font-bold text-white mb-4">By Platform</h2>
            <div className="glass rounded-2xl p-5 space-y-4">
              {platformBreakdown.map((p) => (
                <div key={p.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${p.color}`} />
                      <span className="text-sm text-white">{p.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-white font-medium">
                        {p.reviews}
                      </span>
                      <span className="text-xs text-zinc-500 ml-2">
                        {p.rating}★
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${p.color} opacity-80`}
                      style={{
                        width: `${(p.reviews / 347) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI insights */}
          <div>
            <h2 className="text-lg font-bold text-white mb-4">AI Insights</h2>
            <div className="glass rounded-2xl p-5 space-y-4">
              {[
                {
                  icon: "🌟",
                  title: "Top praised: Speed",
                  text: "68% of 5-star reviews mention fast service.",
                },
                {
                  icon: "⚠️",
                  title: "Watch: Wait times",
                  text: "3-star reviews often mention waiting. Consider addressing peak hours.",
                },
                {
                  icon: "💡",
                  title: "Best time to request",
                  text: "Tuesday 2–4pm has the highest review completion rate.",
                },
              ].map((insight, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-lg">{insight.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-white mb-0.5">
                      {insight.title}
                    </div>
                    <div className="text-xs text-zinc-500 leading-relaxed">
                      {insight.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
