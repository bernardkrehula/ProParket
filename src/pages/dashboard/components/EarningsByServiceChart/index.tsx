import { Box, Paper, Stack, Typography } from "@mui/material";
import type { ServiceEarning } from "#/api/dashboard/dashboard";
import { formatCurrency } from "#/utils/format";
import {
  earningsChartRootSx,
  earningsChartTitleSx,
  earningsChartBarsRowSx,
  earningsChartBarColumnSx,
  earningsChartAmountLabelSx,
  earningsChartBarSx,
  earningsChartLegendRowSx,
  earningsChartLegendItemSx,
  earningsChartLegendDotSx,
} from "./earningsByServiceChartConfig";

type EarningsByServiceChartProps = {
  data: ServiceEarning[];
};

const EarningsByServiceChart = ({ data }: EarningsByServiceChartProps) => {
  const maxAmount = Math.max(...data.map((item) => item.amount), 1);

  return (
    <Paper variant="outlined" sx={earningsChartRootSx}>
      <Typography variant="subtitle1" sx={earningsChartTitleSx}>
        Zarada po usluzi
      </Typography>
      <Stack
        direction="row"
        spacing={{ xs: 1, sm: 3 }}
        sx={earningsChartBarsRowSx}
      >
        {data.map((item) => (
          <Box key={item.id} sx={earningsChartBarColumnSx}>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={earningsChartAmountLabelSx}
            >
              {formatCurrency(item.amount)}
            </Typography>
            <Box
              sx={{
                ...earningsChartBarSx,
                height: `${(item.amount / maxAmount) * 100}%`,
                bgcolor: item.color,
              }}
            />
          </Box>
        ))}
      </Stack>
      <Stack direction="row" spacing={3} sx={earningsChartLegendRowSx}>
        {data.map((item) => (
          <Stack
            key={item.id}
            direction="row"
            spacing={0.75}
            sx={earningsChartLegendItemSx}
          >
            <Box sx={{ ...earningsChartLegendDotSx, bgcolor: item.color }} />
            <Typography variant="caption" color="textSecondary">
              {item.label}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
};

export default EarningsByServiceChart;
