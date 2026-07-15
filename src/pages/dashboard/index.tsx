import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import StatCard from "./components/StatCard";
import EarningsByServiceChart from "./components/EarningsByServiceChart";
import RecentJobsTable from "./components/RecentJobsTable";
import { formatCurrency } from "#/utils/format";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "#/api/dashboard";
import {
  dashboardLoadingSx,
  dashboardHeaderSx,
  dashboardTitleSx,
  dashboardButtonSx,
} from "./dashboardConfig";

const Dashboard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboardData,
  });

  if (isLoading) {
    return (
      <Box sx={dashboardLoadingSx}>
        <CircularProgress size={28} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error">
        Nešto je pošlo po krivu prilikom učitavanja podataka.
      </Typography>
    );
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" sx={dashboardHeaderSx}>
        <Box>
          <Typography variant="h5" sx={dashboardTitleSx}>
            Dobar dan, {data.userName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {data.period}
          </Typography>
        </Box>
        <Button variant="outlined" sx={dashboardButtonSx}>
          Ovaj mjesec
        </Button>
      </Stack>

      <Stack direction="row" spacing={2}>
        <StatCard
          label="Ukupna zarada"
          value={formatCurrency(data.totalEarnings)}
        />
        <StatCard
          label="Trošak materijala"
          value={formatCurrency(data.materialCost)}
        />
        <StatCard
          label="Neto profit"
          value={formatCurrency(data.netProfit)}
          emphasizeAsProfit
        />
        <StatCard label="Broj poslova" value={String(data.jobsCount)} />
      </Stack>

      <EarningsByServiceChart data={data.earningsByService} />

      <RecentJobsTable jobs={data.recentJobs} />
    </Stack>
  );
};

export default Dashboard;
