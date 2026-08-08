-- Run this in the Supabase SQL editor before using the new screens.
-- Two independent changes:
--   1. `investments` — backs the new /ulaganja page.
--   2. `job_materials` — per-room material line items (name + count + unit price),
--      replacing the single "material_cost" number that used to be typed per room.

-- ---------------------------------------------------------------------------
-- 1. Investments
-- ---------------------------------------------------------------------------
create table if not exists public.investments (
  id            uuid primary key default gen_random_uuid(),
  name          text        not null,
  category      text        not null default 'alat',
  unit_price    numeric(12, 2) not null default 0,
  quantity      numeric(12, 2) not null default 1,
  purchase_date date        not null default current_date,
  supplier      text,
  notes         text,
  created_at    timestamptz not null default now()
);

create index if not exists investments_purchase_date_idx
  on public.investments (purchase_date desc);

alter table public.investments enable row level security;

drop policy if exists "investments are readable by authenticated" on public.investments;
create policy "investments are readable by authenticated"
  on public.investments for select
  to authenticated
  using (true);

drop policy if exists "investments are writable by authenticated" on public.investments;
create policy "investments are writable by authenticated"
  on public.investments for all
  to authenticated
  using (true)
  with check (true);

-- ---------------------------------------------------------------------------
-- 2. Job materials
-- ---------------------------------------------------------------------------
create table if not exists public.job_materials (
  id         uuid primary key default gen_random_uuid(),
  job_id     uuid not null references public.jobs (id) on delete cascade,
  room       text,
  name       text not null,
  quantity   numeric(12, 2) not null default 1,
  unit_price numeric(12, 2) not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists job_materials_job_id_idx
  on public.job_materials (job_id);

alter table public.job_materials enable row level security;

drop policy if exists "job materials are readable by authenticated" on public.job_materials;
create policy "job materials are readable by authenticated"
  on public.job_materials for select
  to authenticated
  using (true);

drop policy if exists "job materials are writable by authenticated" on public.job_materials;
create policy "job materials are writable by authenticated"
  on public.job_materials for all
  to authenticated
  using (true)
  with check (true);

-- ---------------------------------------------------------------------------
-- 3. Receipt storage for investments
-- ---------------------------------------------------------------------------
-- Private bucket, mirroring how `job-photos` is used. Files are read through
-- short-lived signed URLs, so this must NOT be made public.
insert into storage.buckets (id, name, public)
values ('investment-receipts', 'investment-receipts', false)
on conflict (id) do nothing;

drop policy if exists "investment receipts read" on storage.objects;
create policy "investment receipts read"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'investment-receipts');

drop policy if exists "investment receipts insert" on storage.objects;
create policy "investment receipts insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'investment-receipts');

drop policy if exists "investment receipts delete" on storage.objects;
create policy "investment receipts delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'investment-receipts');

-- ---------------------------------------------------------------------------
-- Note on job_items.material_cost
-- ---------------------------------------------------------------------------
-- `job_items.material_cost` is intentionally KEPT. The app now writes the sum of
-- a room's material line items back into it, so the dashboard's profit maths
-- (src/api/dashboard/dashboard.ts) keeps working untouched. Do not drop it.
