import { useMemo, useState } from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "#/api/dashboard/dashboard";
import { formatCurrency } from "#/utils/format";
import { getPeriodRange } from "./period";
import type { PeriodType } from "./period";
import StatCard from "./components/StatCard";
import ProfitDonut from "./components/ProfitDonut";
import EarningsByServiceChart from "./components/EarningsByServiceChart";
import DashboardJobsList from "./components/DashboardJobsList";
import PeriodFilter from "./components/PeriodFilter";
import {
  STAT_ACCENTS,
  dashboardLoadingSx,
  dashboardHeaderSx,
  dashboardTitleSx,
  dashboardPeriodLabelSx,
  dashboardStatsRowSx,
  dashboardPanelsRowSx,
} from "./dashboardConfig";

const Dashboard = () => {
  const [period, setPeriod] = useState<PeriodType>("month");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  const range = useMemo(
    () =>
      getPeriodRange(period, {
        from: customFrom ? new Date(customFrom) : undefined,
        to: customTo ? new Date(customTo) : undefined,
      }),
    [period, customFrom, customTo],
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "dashboard",
      period,
      range.from.toISOString(),
      range.to.toISOString(),
    ],
    queryFn: () => fetchDashboardData(range),
    placeholderData: keepPreviousData,
  });

  const header = (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      sx={dashboardHeaderSx}
    >
      <Box>
        <Typography variant="h5" sx={dashboardTitleSx}>
          Pregled poslovanja
        </Typography>
        <Typography sx={dashboardPeriodLabelSx}>{range.label}</Typography>
      </Box>
      <PeriodFilter
        period={period}
        onPeriodChange={setPeriod}
        customFrom={customFrom}
        customTo={customTo}
        onCustomFromChange={setCustomFrom}
        onCustomToChange={setCustomTo}
      />
    </Stack>
  );

  if (isLoading && !data) {
    return (
      <Stack spacing={3}>
        {header}
        <Box sx={dashboardLoadingSx}>
          <CircularProgress size={120} />
        </Box>
      </Stack>
    );
  }

  if (isError) {
    return (
      <Stack spacing={3}>
        {header}
        <Typography color="error">
          Nešto je pošlo po krivu prilikom učitavanja podataka.
        </Typography>
      </Stack>
    );
  }

  if (!data) return null;

  return (
    <Stack spacing={3}>
      {header}

      <Stack spacing={2}>
        <Box sx={dashboardStatsRowSx}>
            <StatCard
              label="Ukupni prihod"
              value={formatCurrency(data.totalIncome)}
              icon={PaymentsRoundedIcon}
              accent={STAT_ACCENTS.income}
            />
            <StatCard
              label="Trošak materijala"
              value={formatCurrency(data.materialCost)}
              icon={Inventory2RoundedIcon}
              accent={STAT_ACCENTS.material}
            />
            <StatCard
              label="Ulaganja"
              value={formatCurrency(data.investmentCost)}
              icon={SavingsRoundedIcon}
              accent={STAT_ACCENTS.investment}
            />
            <StatCard
              label="Neto dobit"
              value={formatCurrency(data.netProfit)}
              icon={TrendingUpRoundedIcon}
              accent={STAT_ACCENTS.profit}
              hint="Nakon materijala i ulaganja"
            />
            <StatCard
              label="Broj poslova"
              value={String(data.jobsCount)}
              icon={WorkOutlineRoundedIcon}
              accent={STAT_ACCENTS.jobs}
            />
          </Box>

          <Box sx={dashboardPanelsRowSx}>
            <ProfitDonut
              totalIncome={data.totalIncome}
              materialCost={data.materialCost}
              investmentCost={data.investmentCost}
              netProfit={data.netProfit}
              profitMargin={data.profitMargin}
            />
            <EarningsByServiceChart data={data.earningsByService} />
          </Box>

          <DashboardJobsList jobs={data.jobs} />
        </Stack>
    </Stack>
  );
};

export default Dashboard;
