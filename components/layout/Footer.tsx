import Link from "next/link";
import { MessageCircle } from "lucide-react";

const footerLinks = {
  PRODUCTS: ["Pricing", "Roadmap"],
  COMPANY: ["About"],
  LEGAL: ["Privacy", "Terms"],
};

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/10 bg-gradient-to-b from-[#12061f] via-[#1a0d2f] to-black">
  {/* Purple glow */}
  <div className="absolute -bottom-24 left-1/2 h-80 w-[900px] -translate-x-1/2 rounded-full bg-purple-600/30 blur-[120px]" />

  {/* Glossy wave */}
  <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
    <svg
      viewBox="0 0 1440 220"
      className="w-full h-[220px]"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="footerWave" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="45%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>

        <linearGradient id="waveGloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.65)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      <path
  d="M0,220
     C220,120 420,180 720,110
     C980,60 1180,170 1440,120
     L1440,220
     Z"
  fill="url(#footerWave)"
/>

      <path
  d="M0,215
     C220,115 420,175 720,105
     C980,55 1180,165 1440,115"
        stroke="url(#waveGloss)"
        strokeWidth="6"
        fill="none"
      />
    </svg>
  </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center text-white font-bold">
  R
</div>
              <span className="text-xl font-bold text-white">Revioo</span>
            </Link>

            <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
              The AI-powered review platform that turns authentic customer
              feedback into your biggest competitive advantage📈
            </p>

            <div className="flex items-center gap-3 mt-6">
  <a
    href="https://wa.me/923353727314"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-zinc-400 hover:text-green-500 transition-all"
  >
    <MessageCircle size={22} />
    <span className="text-sm font-medium">+92 335 3727314</span>
  </a>
</div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-lg font-bold text-zinc-300 uppercase tracking-wide mb-4">
                {category}
              </h4>

              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Revioo. All rights reserved.
          </p>

          <p className="text-xs text-zinc-600">
            Built with ❤️ for businesses that care about trust.
          </p>

        </div>

      </div>

    </footer>

  );

}
