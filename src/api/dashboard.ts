export type ServiceEarning = {
  id: string;
  label: string;
  amount: number;
  color: string;
};

export type RecentJob = {
  id: string;
  address: string;
  service: string;
  serviceColor: string;
  areaM2: number;
  earnings: number;
  cost: number;
  profit: number;
};

export type DashboardData = {
  userName: string;
  period: string;
  totalEarnings: number;
  materialCost: number;
  netProfit: number;
  jobsCount: number;
  earningsByService: ServiceEarning[];
  recentJobs: RecentJob[];
};

const FAKE_DASHBOARD_DATA: DashboardData = {
  userName: "Ivan",
  period: "Srpanj 2026.",
  totalEarnings: 12450,
  materialCost: 3200,
  netProfit: 9250,
  jobsCount: 18,
  earningsByService: [
    { id: "brusenje", label: "Brušenje", amount: 3100, color: "#7c83f0" },
    { id: "poliranje", label: "Poliranje", amount: 2400, color: "#22b389" },
    { id: "parket", label: "Parket", amount: 4950, color: "#ef6c3b" },
    { id: "laminat", label: "Laminat", amount: 2000, color: "#e0428a" },
  ],
  recentJobs: [
    {
      id: "1",
      address: "Ilica 42, Zagreb",
      service: "Parket",
      serviceColor: "#ef6c3b",
      areaM2: 45,
      earnings: 2250,
      cost: 680,
      profit: 1570,
    },
    {
      id: "2",
      address: "Vukovarska 15, Split",
      service: "Brušenje",
      serviceColor: "#7c83f0",
      areaM2: 60,
      earnings: 1800,
      cost: 200,
      profit: 1600,
    },
    {
      id: "3",
      address: "Selska cesta 8, Zagreb",
      service: "Poliranje",
      serviceColor: "#22b389",
      areaM2: 45,
      earnings: 900,
      cost: 90,
      profit: 810,
    },
  ],
};

// Swap this out for a Supabase query later; the async shape/return type stays the same.
export const fetchDashboardData = async (): Promise<DashboardData> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return FAKE_DASHBOARD_DATA;
};
