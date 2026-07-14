import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/60 via-purple-900/40 to-indigo-900/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.3),transparent_60%)]" />
          <div className="absolute inset-px rounded-3xl border border-purple-500/20" />

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(168,85,247,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 px-8 py-16 sm:px-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-sm text-purple-300 mb-6">
              <Sparkles size={14} />
              Start building trust today
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
              Ready to dominate your
              <br />
              <span className="gradient-text">online reputation?</span>
            </h2>

            <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
              Join 18,000+ businesses. No credit card required. 14-day free
              trial. Setup in 5 minutes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup" className="btn-primary text-base px-8 py-4">
                Get started free
                <ArrowRight size={18} />
              </Link>
              <Link href="/login" className="btn-secondary text-base px-8 py-4">
                Sign in to your account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
