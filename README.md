# Domain Expansion Portfolio — GOJO SATORU

An interactive, cinematic, data-driven portfolio inspired by Jujutsu Kaisen.

## Status: Phase 2 Foundation ✅
Structure, realm engine, data layer, stores, all section skeletons, admin shell,
audio engine (muted by default), and Supabase schema are in place.
**Images/audio are GATED** — every visual slot renders a placeholder until assets are provided.

## Stack
Next.js (App Router) · TypeScript · Tailwind · Framer Motion · GSAP · Three.js / R3F ·
Supabase (Auth/DB/Storage) · Zustand · React Query · Zod.

## Run
```bash
npm install
cp .env.example .env.local   # fill Supabase keys
npm run dev
```
The site renders with built-in fallback data even before Supabase is configured.

## Supabase
```bash
# apply in order
supabase/migrations/0001_schema.sql
supabase/migrations/0002_rls.sql
supabase/seed.sql
```

## Realms (data-driven)
Infinite Void · Six Eyes · Hollow Purple · Mahoraga · Domain Clash.
Accent colors + audio crossfade automatically per section (no user theme switching).

## What's NOT done yet (by design)
- Real images/audio (gated — awaiting uploads)
- Phase 3: R3F 3D scenes (black hole, Hollow Purple orb, Mahoraga wheel)
- Phase 1 wiring: admin CRUD forms -> Supabase mutations
- Phase 5: easter-egg overlay effects
