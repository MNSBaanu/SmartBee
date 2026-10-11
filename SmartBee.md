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
- [ ] Rotate Neon DB password, clear test data
- [ ] Submit to builtlist.space

## Log
- 2026-10-10: Web auth and Modules/Tasks wired to API; added render.yaml, vercel.json, LICENSE.
- 2026-10-11: Added public landing page (web/src/pages/Landing.jsx); logged-out users see it at / and Login at /login.
- 2026-10-11: Expanded landing page: stats, product preview, Bee AI demo, how-it-works steps, final CTA.
