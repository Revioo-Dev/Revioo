# Revioo

**Build Trust. Get Discovered.**

An AI-powered review management platform helping businesses collect, manage, and amplify authentic customer reviews.

## Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3 with custom dark theme
- **Auth & DB**: Supabase (`@supabase/ssr`)
- **UI**: Lucide React icons, Framer Motion animations
- **Package manager**: pnpm

## How to run

```bash
pnpm install && pnpm dev
```

The app runs on port 3000 (workflow: "Run App").

## Project structure

```
app/
  page.tsx              # Landing page
  layout.tsx            # Root layout with fonts & metadata
  globals.css           # Tailwind + custom design tokens
  login/page.tsx        # Login with email/password + Google OAuth
  signup/page.tsx       # Signup with email/password + Google OAuth
  auth/callback/        # Supabase OAuth callback handler
  dashboard/
    layout.tsx          # Auth-protected layout with sidebar
    page.tsx            # Dashboard overview

components/
  layout/               # Navbar, Footer
  home/                 # Hero, Features, HowItWorks, Testimonials, Pricing, CTA
  ui/                   # StarRating, reusable primitives
  dashboard/            # Sidebar

lib/
  supabase/
    client.ts           # Browser Supabase client
    server.ts           # Server-side Supabase client (SSR)
  utils.ts              # cn(), formatDate(), getInitials()

middleware.ts           # Auth-based redirect guards
```

## Environment variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SESSION_SECRET` | Optional session secret |

## Design system

- **Background**: `#08080a` (near-black)
- **Accent**: Purple/violet gradient (`#7c3aed` → `#a855f7`)
- **Utility classes**: `.glass`, `.glass-hover`, `.btn-primary`, `.btn-secondary`, `.input-field`, `.gradient-text`

## User preferences

- Premium dark UI with purple accent colors
- Next.js 15 App Router (no Pages Router)
- Supabase for auth and database
- pnpm as package manager
