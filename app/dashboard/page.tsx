import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Review } from "@/types/database";
import {
  Star,
  TrendingUp,
  MessageSquare,
  Users,
  ArrowUpRight,
  Brain,
  AlertCircle,
  Clock,
  PlusCircle,
} from "lucide-react";
import { StarRating } from "@/components/ui/StarRating";
import Link from "next/link";

// ── Helpers ────────────────────────────────────────────────────────────────

const AVATAR_COLORS = [
  "from-pink-500 to-rose-600",
  "from-blue-500 to-cyan-600",
  "from-violet-500 to-purple-600",
  "from-amber-500 to-orange-600",
  "from-emerald-500 to-teal-600",
  "from-red-500 to-pink-600",
];

function avatarColor(name: string) {
  const hash = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function relativeTime(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const m = Math.floor(ms / 60_000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d} day${d === 1 ? "" : "s"} ago`;
}

const PLATFORM_COLORS: Record<string, string> = {
  Google: "bg-blue-500",
  Yelp: "bg-red-500",
  TripAdvisor: "bg-emerald-500",
  Facebook: "bg-indigo-500",
  Trustpilot: "bg-green-500",
};

// ── Page ──────────────────────────────────────────────────────────────────

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // ── Fetch reviews ────────────────────────────────────────────────────────
  // Use admin client — @supabase/ssr generic inference doesn't propagate
  // row types reliably; admin client (createClient from supabase-js) does.
  const admin = createAdminClient();
  const { data: reviewRows, error } = await admin
    .from("reviews")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const allReviews: Review[] = reviewRows ?? [];

  // ── Compute stats ────────────────────────────────────────────────────────
  const totalReviews = allReviews.length;
  const avgRating =
    totalReviews > 0
      ? (allReviews.reduce((s, r) => s + r.rating, 0) / totalReviews).toFixed(
          1
        )
      : "—";
  const respondedCount = allReviews.filter((r) => r.responded).length;
  const responseRate =
    totalReviews > 0
      ? Math.round((respondedCount / totalReviews) * 100)
      : 0;

  // ── Platform breakdown ───────────────────────────────────────────────────
  const platformMap: Record<string, { count: number; total: number }> = {};
  allReviews.forEach((r) => {
    if (!platformMap[r.platform])
      platformMap[r.platform] = { count: 0, total: 0 };
    platformMap[r.platform].count++;
    platformMap[r.platform].total += r.rating;
  });
  const platformBreakdown = Object.entries(platformMap)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5)
    .map(([name, d]) => ({
      name,
      reviews: d.count,
      rating: parseFloat((d.total / d.count).toFixed(1)),
      color: PLATFORM_COLORS[name] ?? "bg-purple-500",
    }));

  // ── Sentiment insights (computed from real data) ─────────────────────────
  const fiveStarPct =
    totalReviews > 0
      ? Math.round(
          (allReviews.filter((r) => r.rating === 5).length / totalReviews) *
            100
        )
      : 0;
  const lowRatingCount = allReviews.filter((r) => r.rating <= 3).length;
  const pendingCount = allReviews.filter((r) => !r.responded).length;

  // ── User display name ────────────────────────────────────────────────────
  const firstName =
    user.user_metadata?.full_name?.split(" ")[0] ?? "there";

  // ── Stats config ─────────────────────────────────────────────────────────
  const stats = [
    {
      label: "Average Rating",
      value: avgRating === "—" ? "—" : `${avgRating}`,
      sub: "across all platforms",
      icon: Star,
      color: "from-amber-500 to-orange-600",
    },
    {
      label: "Total Reviews",
      value: totalReviews.toString(),
      sub: `across ${Object.keys(platformMap).length || 0} platform${Object.keys(platformMap).length !== 1 ? "s" : ""}`,
      icon: MessageSquare,
      color: "from-blue-500 to-cyan-600",
    },
    {
      label: "Response Rate",
      value: `${responseRate}%`,
      sub: `${respondedCount} of ${totalReviews} responded`,
      icon: TrendingUp,
      color: "from-emerald-500 to-teal-600",
    },
    {
      label: "Awaiting Reply",
      value: pendingCount.toString(),
      sub: pendingCount === 1 ? "review needs a response" : "reviews need a response",
      icon: Users,
      color: "from-violet-500 to-purple-600",
    },
  ];

  const recentReviews = allReviews.slice(0, 4);

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-white mb-1">
            Good morning, {firstName} 👋
          </h1>
          <p className="text-zinc-500 text-sm">
            Here&apos;s what&apos;s happening with your reviews today.
          </p>
        </div>
        <Link href="/dashboard/reviews/new" className="btn-primary text-sm px-4 py-2">
          <PlusCircle size={15} />
          Add Review
        </Link>
      </div>

      {/* DB error banner */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm mb-6">
          <AlertCircle size={16} className="flex-shrink-0" />
          <span>
            Could not load reviews. Make sure the database migration has been
            applied.
          </span>
        </div>
      )}

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
                {totalReviews > 0 && (
                  <div className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                    <ArrowUpRight size={12} />
                    Live
                  </div>
                )}
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
            <Link
              href="/dashboard/reviews"
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              View all
            </Link>
          </div>

          {recentReviews.length === 0 ? (
            <EmptyReviews />
          ) : (
            <div className="space-y-3">
              {recentReviews.map((review) => (
                <div key={review.id} className="glass rounded-2xl p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColor(review.reviewer_name)} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                      >
                        {review.reviewer_name[0]?.toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {review.reviewer_name}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-zinc-500">
                            {review.platform}
                          </span>
                          <span className="text-zinc-700">•</span>
                          <div className="flex items-center gap-1 text-xs text-zinc-500">
                            <Clock size={10} />
                            {relativeTime(review.created_at)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <StarRating rating={review.rating} size={13} />
                  </div>

                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                    &ldquo;{review.text}&rdquo;
                  </p>

                  {review.response_text && (
                    <div className="text-xs text-zinc-500 bg-white/5 rounded-lg p-3 mb-4 border-l-2 border-purple-500/40">
                      <span className="text-purple-400 font-medium">
                        Your reply:{" "}
                      </span>
                      {review.response_text}
                    </div>
                  )}

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
          )}
        </div>

        {/* Sidebar panels */}
        <div className="space-y-6">
          {/* Platform breakdown */}
          <div>
            <h2 className="text-lg font-bold text-white mb-4">By Platform</h2>
            <div className="glass rounded-2xl p-5">
              {platformBreakdown.length === 0 ? (
                <p className="text-sm text-zinc-600 text-center py-4">
                  No platform data yet
                </p>
              ) : (
                <div className="space-y-4">
                  {platformBreakdown.map((p) => (
                    <div key={p.name}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${p.color}`}
                          />
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
                            width: `${
                              totalReviews > 0
                                ? (p.reviews / totalReviews) * 100
                                : 0
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* AI Insights */}
          <div>
            <h2 className="text-lg font-bold text-white mb-4">AI Insights</h2>
            <div className="glass rounded-2xl p-5 space-y-4">
              {totalReviews === 0 ? (
                <p className="text-sm text-zinc-600 text-center py-4">
                  Insights appear once you have reviews
                </p>
              ) : (
                <>
                  <InsightRow
                    icon="🌟"
                    title={`${fiveStarPct}% five-star reviews`}
                    text={
                      fiveStarPct >= 70
                        ? "Outstanding! Most customers are highly satisfied."
                        : fiveStarPct >= 40
                        ? "Good performance. Keep engaging with customers."
                        : "Room to grow. Consider follow-up campaigns."
                    }
                  />
                  <InsightRow
                    icon={lowRatingCount > 0 ? "⚠️" : "✅"}
                    title={
                      lowRatingCount > 0
                        ? `${lowRatingCount} low-rating review${lowRatingCount > 1 ? "s" : ""}`
                        : "No low ratings"
                    }
                    text={
                      lowRatingCount > 0
                        ? "Consider responding personally to reviews under 4 stars."
                        : "Great job maintaining a strong rating across all reviews."
                    }
                  />
                  <InsightRow
                    icon="💡"
                    title={`${pendingCount} unanswered review${pendingCount !== 1 ? "s" : ""}`}
                    text={
                      pendingCount === 0
                        ? "All reviews have responses. Excellent engagement!"
                        : "Use AI Reply to respond quickly and boost your score."
                    }
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────

function EmptyReviews() {
  return (
    <div className="glass rounded-2xl p-12 text-center">
      <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
        <Star size={28} className="text-purple-400" />
      </div>
      <h3 className="text-white font-semibold mb-2">No reviews yet</h3>
      <p className="text-zinc-500 text-sm max-w-xs mx-auto mb-6">
        Add your first review to start tracking your reputation.
      </p>
      <Link href="/dashboard/reviews/new" className="btn-primary text-sm px-5 py-2.5">
        <PlusCircle size={15} />
        Add your first review
      </Link>
    </div>
  );
}

function InsightRow({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-lg">{icon}</span>
      <div>
        <div className="text-sm font-semibold text-white mb-0.5">{title}</div>
        <div className="text-xs text-zinc-500 leading-relaxed">{text}</div>
      </div>
    </div>
  );
}
