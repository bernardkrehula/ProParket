<div align="center">

<img src="public/ProParketLogo2.png" alt="ProParket" width="96" />

# ProParket

**Job management for flooring contractors — jobs, scheduling, photos and profit tracking in one app.**

*In daily use by paušalni obrt Flajsman, a flooring contractor in Croatia.*

[**🔗 Live app — pro-parket.vercel.app**](https://pro-parket.vercel.app)

**Demo login** — `demo@gmail.com` / `demo1234`

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![MUI](https://img.shields.io/badge/MUI-9-007FFF?logo=mui&logoColor=white)](https://mui.com)
[![Supabase](https://img.shields.io/badge/Supabase-Postgres%20%2B%20Auth%20%2B%20Storage-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com)
[![PWA](https://img.shields.io/badge/PWA-installable-5A0FC8?logo=pwa&logoColor=white)](https://vite-pwa-org.netlify.app)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-live-000000?logo=vercel&logoColor=white)](https://pro-parket.vercel.app)

</div>

---

## About

Parquet and flooring contractors still run their business out of a notebook: an address here, a phone
number there, square metres on the back of a receipt, and no real idea what a finished job actually
earned once material and tools were paid for.

**ProParket** replaces that notebook. Every job carries its client, address, schedule, rooms, services
and photos; every room's square metres and price per m² roll up into revenue, material cost and net
profit that the dashboard reports for any period you pick. Tools and machines bought for the business
are tracked separately and subtracted from that profit, so the number on the dashboard is the number
that actually stays in your pocket.

The app is built as an installable PWA with a dark, mobile-first UI — it is meant to be used on a
phone, on site, with dusty hands. The interface language is **Croatian**, since it was written for the
Croatian market.

---

## Built for a real business

ProParket is not a demo. It is in daily use by **paušalni obrt Flajsman**, a Croatian flooring
contractor — parquet, laminate, vinyl, sanding and varnishing. The app was designed around how that
business actually works, and every screen in this repository exists because the work demanded it.

**Why a flat-rate sole trader needs this.** A *paušalni obrt* is taxed on a lump-sum basis tied to
annual revenue, so it keeps no ledger of expenses. That is simple for the tax office and useless for
the owner: revenue is visible, but the cost of material, and of the tools and machines bought to do
the work, is not recorded anywhere. Without that, "was this month good?" is a feeling rather than a
number. ProParket fills exactly that gap — it records what came in, what the material cost, what was
spent on equipment, and reports the difference for any period.

**What that changed about the app:**

- **Pricing is per m², because the trade is.** Jobs break into rooms, rooms into services, and each
  line is square metres × price per m². That is how quotes are given on site, so it is how the app models money.
- **Investments are first-class.** A parquet sander or a van is a real cost that the tax model ignores.
  The Investments page tracks them and the dashboard subtracts them, so net profit means net profit.
- **It has to work on a phone, on site.** Hence the PWA, the dark theme, the large touch targets, and
  a jobs table that turns into cards on a small screen. Jobs get entered standing in the room being measured.
- **The interface is Croatian**, because the person using it works in Croatian.
- **Addresses come from Google Places.** Typing a full Croatian street address on a phone with dusty
  hands is miserable; two or three characters and a tap is not.

The roadmap below is not a wish list — it is what the business has asked for next.

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

## Features

### 📊 Dashboard (`/`)
- Headline stats — total revenue, material cost, investments, net profit and job count
- Profit donut with margin, and an earnings-by-service bar chart (MUI X Charts)
- Jobs in the period, sortable by price
- Period filter: day / month / year / custom date range, shared across the whole app
- Previous data is kept on screen while a new period loads (`keepPreviousData`), so the layout never flashes

### 🧾 Jobs (`/poslovi`)
- Debounced full-text search across address, client name and phone number
- Status filter — derived, not stored: a job is *Novo* before it starts, *U tijeku* once started, *Završeno* when finished
- Client-side pagination over the filtered set
- Create, edit and delete jobs from one modal that switches between **view** and **edit** mode
- **Rooms & services:** a job breaks into rooms, each room into services (sanding, polishing, parquet, laminate…). Square metres × price per m² gives the room total; material cost is tracked per line; totals roll up live as you type
- Prices are pre-filled from the price list but stay editable per job
- Required-field validation with an inline snackbar, and a confirmation dialog before delete

### 📍 Addresses & maps
- Google **Places (New)** autocomplete on the address field, debounced, biased to Croatia
- `freeSolo` — an address Places doesn't know still types and saves; suggestions never gate the field
- Map preview with a marker under the address in both view and edit mode; clicking it opens the location in Google Maps
- Saved jobs resolve their coordinates from the stored address via Places text search, cached per address

### 📷 Photos
- Upload site photos per job to Supabase Storage
- Compressed in the browser before upload (`browser-image-compression`, max 1 MB / 1024 px) so a 6 MB phone photo doesn't cost 6 MB of bandwidth
- Full-screen viewer, delete support

### 📅 Schedule (`/raspored`)
- Jobs grouped by day as cards, or laid out on a month calendar
- Multi-day jobs span their whole range
- Tap any job to open the same job modal used everywhere else

### 💶 Price list (`/cjenik`)
- Default price per m² per service, editable inline
- Add and remove services; deleting a service that is still used by a job is refused with a clear message
- Each service keeps its own colour, reused by the dashboard charts

### 🧰 Investments (`/ulaganja`)
- Tools, machines and equipment bought for the business, with name, category, price, quantity, purchase date, supplier and a free-text note
- Running totals: invested overall, invested this year, item count and largest single investment
- Search by name or supplier, plus a category filter
- Investments are subtracted from revenue on the dashboard, so net profit accounts for equipment, not just material

### 🔐 Auth & routing
- Supabase email/password auth, with Valibot schema validation on the login form
- `PrivateRoutes` / `PublicRoutes` guards around the router; session state served through TanStack Query

### 📱 PWA
- Installable, standalone display, auto-updating service worker
- Mobile-first layout throughout — the jobs table becomes cards, the modal goes full-screen

---

## Tech stack

| Area | Choice |
| --- | --- |
| UI | React 19, TypeScript 6, Vite 8 |
| Components & styling | MUI 9, Emotion, custom dark theme + design tokens |
| Charts | MUI X Charts |
| Server state | TanStack Query 5 |
| Backend | Supabase — Postgres, Auth, Storage |
| Maps | `@vis.gl/react-google-maps`, Google Places API (New) |
| Validation | Valibot |
| Routing | React Router 7 |
| PWA | `vite-plugin-pwa` |
| Tooling | ESLint 10, `typescript-eslint`, `#/*` path alias |

---

## Architecture

The codebase follows one rule consistently: **each unit of UI is a folder, and everything it owns
lives in it.** Styles and constants sit in a sibling `*Config.ts` next to the component, so `index.tsx`
holds behaviour and nothing else.

```
src/
├── api/              # one file per Supabase call — requestJobs, requestAddNewJob, …
│   ├── auth/
│   ├── dashboard/
│   ├── investments/
│   ├── jobs/
│   └── services/
├── components/       # shared, page-agnostic components
├── config/           # Supabase clients (browser + node for seed scripts)
├── hooks/            # useServices, useAddressLocation, useDebouncedValue, useSession, …
├── layouts/          # MainLayout + Navbar
├── lib/              # handleSupabaseError
├── pages/
│   ├── dashboard/    # StatCard, ProfitDonut, EarningsByServiceChart, PeriodFilter
│   ├── investments/
│   ├── jobs/         # JobsTable, JobCard, JobStatusPill
│   │   └── components/JobFormModal/
│   │       ├── components/{address,rooms,photos}/
│   │       └── utils/
│   ├── login/
│   ├── priceList/
│   └── schedule/
├── routes/           # router + auth guards
├── theme/            # MUI theme, chart colours, typography tokens
├── types/
└── utils/            # format, getJobStatus, getTotalPrice
```

**Decisions worth calling out**

- **Data-fetching lives in `api/`, never in components.** Every call is a named `request*` function with
  its own types, so a component reads as a description of the screen.
- **Job status is derived, not stored.** `getJobStatus` computes it from `date_started` / `date_finished`,
  so a status can never drift out of sync with the dates.
- **The `PeriodFilter` and its `getPeriodRange` helper are shared** by dashboard, jobs and schedule —
  one definition of "this month" across the app.
- **`JobFormModal` was refactored from one sprawling component into 12**, grouped by concern
  (`address/`, `rooms/`, `photos/`), with the parent owning form state and the submit flow.
- **`#/` path alias** instead of `../../../` chains.

### Data model

```
jobs          id, address, client_name, phone, date, end_date, start_time,
              notes, date_started, date_finished, created_at
job_items     id, job_id → jobs, service_id → services, room,
              square_meters, price_per_m2, material_cost
services      id, name, price_per_m2
investments   id, name, category, price, quantity, purchase_date, supplier, note
storage       job-photos/{job_id}/{timestamp}-{filename}
```

Revenue is never stored — it is always `square_meters × price_per_m2` summed over a job's items, so
editing a price can't leave a stale total behind.

---

## Try it

The app is live at **[pro-parket.vercel.app](https://pro-parket.vercel.app)**. Sign in with the demo
account — no signup needed:

| | |
| --- | --- |
| Email | `demo@gmail.com` |
| Password | `demo1234` |

The demo account is seeded with sample jobs, services and investments. Feel free to add, edit and
delete — it is there to be poked at.

---

## Getting started

### Prerequisites

- Node.js 20+
- A Supabase project (Postgres + Auth + a public `job-photos` storage bucket)
- A Google Maps API key with **Places API (New)** and **Maps JavaScript API** enabled

### Install

```bash
git clone https://github.com/bernardkrehula/ProParket.git
cd ProParket
npm install
```

### Environment

Create a `.env` in the project root:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_ANON_KEY=your-supabase-anon-key
VITE_GOOGLE_MAPS_PLACES_API_KEY=your-google-maps-key
VITE_GOOGLE_MAPS_MAP_ID=your-map-id          # optional — falls back to DEMO_MAP_ID
```

### Run

```bash
npm run dev
```

The app is served at `http://localhost:5173`.

### Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint over the whole project |
| `npm run upload-jobs` | Seed the `jobs` table with sample data |
| `npm run upload-job-services` | Seed the `services` table |

---

## Deployment

Deployed on **Vercel** at [pro-parket.vercel.app](https://pro-parket.vercel.app). `vercel.json` rewrites
every path to `index.html` so client-side routing works on a hard refresh. Set the `VITE_*` variables in
the Vercel project settings before the first build — Vite inlines them at build time, so changing one
requires a redeploy.

---

## Roadmap

- [ ] One-click guest login button, so the demo needs no typed credentials
- [ ] Invoice / quote export to PDF
- [ ] Client records as first-class entities, with job history per client
- [ ] Offline write queue so jobs can be edited without signal on site
- [ ] Row-level security policies documented alongside the schema
- [ ] English locale alongside Croatian

---

<div align="center">

**Bernard Krehula** · [GitHub](https://github.com/bernardkrehula)

</div>
