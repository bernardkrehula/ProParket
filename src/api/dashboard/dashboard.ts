import supabase from "#/config/supabaseClientVite";
import { chartColors } from "#/theme/theme";
import type { PeriodRange } from "#/pages/dashboard/period";

export type ServiceEarning = {
  id: string;
  label: string;
  amount: number;
  color: string;
};

export type DashboardJob = {
  id: string;
  address: string;
  client_name: string;
  phone: string;
  date: string;
  /** Σ square_meters × price_per_m2 across this job's items. */
  price: number;
};

export type DashboardSummary = {
  /** Σ square_meters × price_per_m2 over job_items in range. */
  totalIncome: number;
  /** Σ material_cost over job_items in range. */
  materialCost: number;
  /** totalIncome − materialCost. */
  netProfit: number;
  /** netProfit / totalIncome, in [−∞, 1]; 0 when there is no income. */
  profitMargin: number;
  /** Count of jobs whose date falls in range. */
  jobsCount: number;
  /** Income grouped by service, largest first, zero-income services dropped. */
  earningsByService: ServiceEarning[];
  /** Jobs whose date falls in range, with their total price. */
  jobs: DashboardJob[];
};

// Reuse the app's chart hues first, then extend for any further services.
const SERVICE_PALETTE = [
  chartColors.brusenje,
  chartColors.poliranje,
  chartColors.parket,
  chartColors.laminat,
  "#3b5bdb",
  "#e0428a",
  "#22c55e",
  "#f59e0b",
];

const toDateStr = (date: Date) => {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

type JobItemRow = {
  square_meters: number | string | null;
  price_per_m2: number | string | null;
  material_cost: number | string | null;
  service_id: string | null;
};

type ServiceRow = { id: string; name: string };

type JobRow = {
  id: string;
  address: string;
  client_name: string;
  phone: string;
  date: string;
};

type JobPriceRow = {
  job_id: string;
  square_meters: number | string | null;
  price_per_m2: number | string | null;
};

export const fetchDashboardData = async (
  range: PeriodRange,
): Promise<DashboardSummary> => {
  const [itemsRes, servicesRes, jobsRes] = await Promise.all([
    supabase
      .from("job_items")
      .select("square_meters, price_per_m2, material_cost, service_id")
      .gte("created_at", range.from.toISOString())
      .lt("created_at", range.to.toISOString()),
    supabase.from("services").select("id, name"),
    supabase
      .from("jobs")
      .select("id, address, client_name, phone, date")
      .gte("date", toDateStr(range.from))
      .lt("date", toDateStr(range.to))
      .order("date", { ascending: false }),
  ]);

  if (itemsRes.error) throw itemsRes.error;
  if (servicesRes.error) throw servicesRes.error;
  if (jobsRes.error) throw jobsRes.error;

  const items = (itemsRes.data ?? []) as JobItemRow[];
  const services = (servicesRes.data ?? []) as ServiceRow[];
  const jobRows = (jobsRes.data ?? []) as JobRow[];

  // Total price per job, for the jobs list under the charts.
  const priceByJob = new Map<string, number>();
  if (jobRows.length > 0) {
    const jobPricesRes = await supabase
      .from("job_items")
      .select("job_id, square_meters, price_per_m2")
      .in(
        "job_id",
        jobRows.map((job) => job.id),
      );
    if (jobPricesRes.error) throw jobPricesRes.error;

    for (const row of (jobPricesRes.data ?? []) as JobPriceRow[]) {
      const price =
        (Number(row.square_meters) || 0) * (Number(row.price_per_m2) || 0);
      priceByJob.set(row.job_id, (priceByJob.get(row.job_id) ?? 0) + price);
    }
  }

  const jobs: DashboardJob[] = jobRows.map((job) => ({
    id: job.id,
    address: job.address,
    client_name: job.client_name,
    phone: job.phone,
    date: job.date,
    price: priceByJob.get(job.id) ?? 0,
  }));

  let totalIncome = 0;
  let materialCost = 0;
  const incomeByService = new Map<string, number>();

  for (const item of items) {
    const income =
      (Number(item.square_meters) || 0) * (Number(item.price_per_m2) || 0);
    totalIncome += income;
    materialCost += Number(item.material_cost) || 0;

    if (item.service_id) {
      incomeByService.set(
        item.service_id,
        (incomeByService.get(item.service_id) ?? 0) + income,
      );
    }
  }

  const netProfit = totalIncome - materialCost;
  const profitMargin = totalIncome > 0 ? netProfit / totalIncome : 0;

  const earningsByService: ServiceEarning[] = services
    .map((service, index) => ({
      id: service.id,
      label: service.name,
      amount: incomeByService.get(service.id) ?? 0,
      color: SERVICE_PALETTE[index % SERVICE_PALETTE.length],
    }))
    .filter((service) => service.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  return {
    totalIncome,
    materialCost,
    netProfit,
    profitMargin,
    jobsCount: jobs.length,
    earningsByService,
    jobs,
  };
};
