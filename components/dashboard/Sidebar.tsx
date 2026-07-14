"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Star,
  BarChart3,
  MessageSquare,
  Bell,
  Settings,
  Zap,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/reviews", icon: Star, label: "Reviews" },
  { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/dashboard/campaigns", icon: MessageSquare, label: "Campaigns" },
  { href: "/dashboard/alerts", icon: Bell, label: "Alerts" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <aside className="w-64 flex-shrink-0 h-screen sticky top-0 flex flex-col border-r border-white/5 bg-[#08080a]">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Zap size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold text-white">Revioo</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                active
                  ? "bg-purple-600/20 text-white border border-purple-500/30"
                  : "text-zinc-500 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon
                size={18}
                className={cn(
                  "transition-colors",
                  active ? "text-purple-400" : "text-zinc-600 group-hover:text-zinc-400"
                )}
              />
              {label}
              {active && (
                <ChevronRight size={14} className="ml-auto text-purple-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade banner */}
      <div className="p-4">
        <div className="rounded-xl bg-gradient-to-br from-violet-900/40 to-purple-900/20 border border-purple-500/20 p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={14} className="text-purple-400" />
            <span className="text-xs font-bold text-purple-300">Trial — 11 days left</span>
          </div>
          <p className="text-xs text-zinc-500 mb-3">Upgrade to unlock AI responses and advanced analytics.</p>
          <Link
            href="/dashboard/settings"
            className="block text-center py-2 px-3 rounded-lg text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors"
          >
            Upgrade now
          </Link>
        </div>

        {/* Sign out */}
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-600 hover:text-red-400 hover:bg-red-500/5 transition-all w-full"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
