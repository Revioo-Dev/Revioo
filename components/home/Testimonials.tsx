import { StarRating } from "@/components/ui/StarRating";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marcus Chen",
    role: "Owner, Golden Dragon Restaurant",
    text: "Revioo tripled our Google reviews in 6 weeks. The AI responses are so good, customers think I wrote them personally. My rating went from 3.8 to 4.7.",
    rating: 5,
    avatar: "M",
    color: "from-amber-500 to-orange-600",
    metric: "+124 reviews",
  },
  {
    name: "Sophia Reeves",
    role: "Director, Apex Wellness Clinic",
    text: "The sentiment analytics showed us exactly why patients were leaving 3-star reviews. We fixed those issues and our NPS jumped 40 points in two months.",
    rating: 5,
    avatar: "S",
    color: "from-emerald-500 to-teal-600",
    metric: "+40 NPS",
  },
  {
    name: "Daniel Park",
    role: "GM, Parkside Hotel & Spa",
    text: "Managing reviews across 5 platforms was a nightmare. Revioo unified everything and the team actually enjoys responding now. Worth every penny.",
    rating: 5,
    avatar: "D",
    color: "from-blue-500 to-indigo-600",
    metric: "5 platforms unified",
  },
  {
    name: "Amara Johnson",
    role: "Founder, Curl Studio",
    text: "I was skeptical about AI responses — they always sound robotic. Revioo's are different. My clients compliment my 'thoughtful replies' constantly.",
    rating: 5,
    avatar: "A",
    color: "from-pink-500 to-rose-600",
    metric: "4.9★ rating",
  },
  {
    name: "Ryan Kowalski",
    role: "CEO, AutoCare Pro",
    text: "Our competitors have lower ratings but more reviews. Revioo's campaigns helped us collect 200+ reviews in 30 days. We now dominate the local search.",
    rating: 5,
    avatar: "R",
    color: "from-violet-500 to-purple-600",
    metric: "200+ in 30 days",
  },
  {
    name: "Leila Moradi",
    role: "Practice Manager, Bright Smile Dental",
    text: "The fraud detection alone is worth it. We caught 8 fake negative reviews from a competitor and got them removed. Unbelievable ROI.",
    rating: 5,
    avatar: "L",
    color: "from-cyan-500 to-blue-600",
    metric: "8 fakes removed",
  },
];

export function Testimonials() {
  return (
    <section id="reviews" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            Businesses that{" "}
            <span className="gradient-text">love Revioo</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Join 18,000+ businesses using Revioo to build trust and grow
            their online presence.
          </p>
        </div>

        {/* Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="glass-hover rounded-2xl p-6 break-inside-avoid"
            >
              {/* Quote icon */}
              <Quote size={20} className="text-purple-500/50 mb-3" />

              {/* Rating */}
              <StarRating rating={t.rating} size={15} className="mb-3" />

              {/* Text */}
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                "{t.text}"
              </p>

              {/* Metric badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/20 mb-4">
                {t.metric}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-zinc-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
