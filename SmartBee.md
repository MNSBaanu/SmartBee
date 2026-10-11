---
title: SmartBee
aliases: [Smart Bee]
tags: [project, react, express, postgres]
status: in-progress
version: 0.1.0
created: 2026-10-10
updated: 2026-10-11
repo: https://github.com/MNSBaanu/SmartBee
author: MNS Baanu
---

> [!summary]
> Open source campus-life platform: modules, tasks, schedule, attendance and Bee AI chat. Web (React/Vite), API (Express + Postgres on Neon), mobile (Expo).

## Quick links
- [[README]]
- [[LICENSE]]

## Tech stack
- `api`: Node, Express, JWT, Zod, Swagger, `pg`, vitest
- `web`: React 18, Vite, Tailwind, React Router 7
- `app`: Expo ~54, TypeScript
- DB: Neon Postgres. Hosting: Render (API), Vercel (web)

## Commands
- API: `cd api && npm ci && npm run migrate && npm run dev` (tests: `npm test`)
- Web: `cd web && npm ci && npm run dev` (build: `npm run build`)

## Folder structure
- `api/` REST API, `web/` web app, `app/` mobile app
- `render.yaml` Render blueprint, `web/vercel.json` SPA rewrite
- `.github/workflows/ci.yml` CI

## How it works
Stateless JWT auth. Responses are `{success, data}`; the token is in `data.token`. The web app reads `VITE_API_URL` at build time.

## Deployment
- API: Render blueprint from `render.yaml`. Set `DATABASE_URL` (postgresql:// with `sslmode=require`), `CORS_ORIGIN` and `AI_API_KEY`. Run `npm run migrate` locally against the Neon URL.
- Web: Vercel, root directory `web`, env `VITE_API_URL` set to the Render URL.

## Open issues
- [ ] Wire Schedule and Home to the API
- [ ] API tables for Friends, Focus and Social Events
- [ ] Mobile app integration
- [ ] Native Android/iOS home-screen widget (needs mobile API integration + Expo dev build)
- [ ] Rotate Neon DB password, clear test data
- [ ] Submit to builtlist.space
- [x] Expired token mid-session shows raw alerts instead of logging out (web/src/api.js)
- [x] Replace alert() with inline errors; Home swallows API errors
- [ ] hero-bee.png is 1.4 MB; convert to WebP and resize
- [ ] Notifications, Bee AI, "Start a chat" and topbar search are not wired up; Bee AI button hidden on mobile
- [ ] No security headers in web/vercel.json
- [ ] Schedule and widget support weekdays only
- [ ] Delete live e2e test accounts (e2e-live-*@smartbee.test) from production DB

## Log
- 2026-10-10: Web auth and Modules/Tasks wired to API; added render.yaml, vercel.json, LICENSE.
- 2026-10-11: Added public landing page (web/src/pages/Landing.jsx); logged-out users see it at / and Login at /login.
- 2026-10-11: Expanded landing page: stats, product preview, Bee AI demo, how-it-works steps, final CTA.
- 2026-10-11: Added Playwright e2e suite (web/e2e, desktop + mobile). Fixed icon overflow, logged-in catch-all route, dead download links; added Focus/Friends to nav.
- 2026-10-11: Made the web app an installable PWA (web/public/manifest.webmanifest) with a pinnable /widget page showing today's classes (web/src/pages/Widget.jsx). Removed GitHub from the landing nav (it stays in the footer).
- 2026-10-11: Live test on Vercel/Render. Fixed task create 400 (due date now required), API error messages (`error` field), login "Please wait…" during cold start, auto-logout on 401, inline errors instead of alert() on Modules/Tasks/Schedule/Home.
- 2026-10-11: Added human-style e2e journeys (web/e2e/human.spec.js): sign-up through every feature to the widget and logout, keyboard-only login, and clicking every button on every page. No new issues found.
- 2026-10-11: Web audit. Bumped react-router 7.13.1 → 7.18.4 (npm audit: 2 high, now 0) and added a meta description. Remaining findings moved to Open issues.
