<div align="center">

<img src="public/ProParketLogo2.png" alt="ProParket" width="96" />

# ProParket

**Job management for flooring contractors — jobs, scheduling, photos and profit tracking in one app.**

[**🔗 Live app — pro-parket.vercel.app**](https://pro-parket.vercel.app) · Demo login: `demo@gmail.com` / `demo1234`

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![MUI](https://img.shields.io/badge/MUI-9-007FFF?logo=mui&logoColor=white)](https://mui.com)
[![Supabase](https://img.shields.io/badge/Supabase-Postgres%20%2B%20Auth%20%2B%20Storage-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com)
[![PWA](https://img.shields.io/badge/PWA-installable-5A0FC8?logo=pwa&logoColor=white)](https://vite-pwa-org.netlify.app)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-live-000000?logo=vercel&logoColor=white)](https://pro-parket.vercel.app)

</div>

---

## What it is

An App that replaces the notebook a flooring contractor runs their business out of. It is in daily
use by **paušalni obrt Flajsman**, a Croatian flooring contractor. The interface is in Croatian.

## How it works

- A job holds its client, address, schedule, rooms, services and photos.
- Every room breaks into services priced **per m²** — that is how quotes are given on site.
- Those lines roll up into revenue, material cost and net profit on the dashboard, for any period you pick.
- Tools and machines go on the Investments page and are subtracted from profit, so the number on the
  dashboard is what actually stays in your pocket.
- It is an installable PWA with a dark, mobile-first UI — made to be used on a phone, on site.

## Tech

React 19 · TypeScript · Vite · MUI 9 + MUI X Charts · TanStack Query · Supabase (Postgres, Auth, Storage)
· React Router 7 · Valibot · Google Places API · `vite-plugin-pwa` · deployed on Vercel.

---

## Screenshots

### Login

![Login](docs/screenshots/login.png)

### Dashboard — revenue, material cost, investments and net profit for the selected period

![Dashboard](docs/screenshots/dashboard.png)

### Dashboard — profit structure, revenue per service and jobs in the period

![Dashboard jobs](docs/screenshots/dashboard-jobs.png)

### Jobs — searchable, filterable, paginated job list

![Jobs](docs/screenshots/jobs.png)

### Schedule — jobs grouped by day

![Schedule cards](docs/screenshots/schedule-cards.png)

### Schedule — month calendar

![Schedule calendar](docs/screenshots/schedule-calendar.png)

### Price list — default price per m² per service

![Price list](docs/screenshots/price-list.png)

### Investments — tools, machines and equipment bought for the business

![Investments](docs/screenshots/investments.png)

---

## Run it locally

Needs Node 20+, a Supabase project (with a public `job-photos` bucket) and a Google Maps key with
**Places API (New)** enabled.

```bash
git clone https://github.com/bernardkrehula/ProParket.git
cd ProParket
npm install
npm run dev
```

`.env` in the project root:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_ANON_KEY=your-supabase-anon-key
VITE_GOOGLE_MAPS_PLACES_API_KEY=your-google-maps-key
VITE_GOOGLE_MAPS_MAP_ID=your-map-id          # optional
```

---

<div align="center">

**Bernard Krehula** · [GitHub](https://github.com/bernardkrehula)

</div>
