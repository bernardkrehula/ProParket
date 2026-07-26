import {
  Box,
  LinearProgress,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import type { ServiceEarning } from "#/api/dashboard/dashboard";
import { formatCurrency, formatPercent } from "#/utils/format";
import { LABEL_FONT } from "#/theme/tokens";
import {
  CHART_HEIGHT,
  earningsChartRootSx,
  earningsChartTitleSx,
  earningsChartSx,
  earningsListSx,
  earningsRowHeaderSx,
  earningsRowNameWrapSx,
  earningsRowDot,
  earningsRowNameSx,
  earningsRowValueWrapSx,
  earningsRowValueSx,
  earningsRowShareSx,
  earningsMeterSx,
  earningsChartEmptySx,
} from "./earningsByServiceChartConfig";

type EarningsByServiceChartProps = {
  data: ServiceEarning[];
};

const EarningsByServiceChart = ({ data }: EarningsByServiceChartProps) => {
  const theme = useTheme();
  // On a phone a vertical bar chart is cramped and its labels collide, so the
  // breakdown becomes a ranked meter list — one full-width lane per service.
  const isCompact = useMediaQuery(theme.breakpoints.down("sm"));

  const labels = data.map((item) => item.label);
  const colors = data.map((item) => item.color);
  const amounts = data.map((item) => item.amount);
  const total = data.reduce((sum, item) => sum + item.amount, 0);
  const maxAmount = Math.max(...amounts, 1);

  const renderBody = () => {
    if (data.length === 0) {
      return (
        <Box sx={earningsChartEmptySx}>Nema prihoda za odabrano razdoblje.</Box>
      );
    }

    if (isCompact) {
      return (
        <Stack sx={earningsListSx}>
          {data.map((item) => (
            <Box key={item.id}>
              <Stack sx={earningsRowHeaderSx}>
                <Stack sx={earningsRowNameWrapSx}>
                  <Box sx={earningsRowDot(item.color)} />
                  <Typography sx={earningsRowNameSx} title={item.label}>
                    {item.label}
                  </Typography>
                </Stack>
                <Stack sx={earningsRowValueWrapSx}>
                  <Typography sx={earningsRowValueSx}>
                    {formatCurrency(item.amount)}
                  </Typography>
                  <Typography sx={earningsRowShareSx}>
                    {formatPercent(total > 0 ? item.amount / total : 0)}
                  </Typography>
                </Stack>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={(item.amount / maxAmount) * 100}
                sx={earningsMeterSx(item.color)}
              />
            </Box>
          ))}
        </Stack>
      );
    }

    return (
      <BarChart
        height={CHART_HEIGHT}
        sx={earningsChartSx}
        hideLegend
        skipAnimation
        borderRadius={6}
        margin={{ top: 24, right: 8, bottom: 8, left: 8 }}
        xAxis={[
          {
            scaleType: "band",
            data: labels,
            disableLine: true,
            disableTicks: true,
            colorMap: { type: "ordinal", values: labels, colors },
            tickLabelStyle: {
              fontFamily: LABEL_FONT,
              fontSize: 12,
              fill: "#9ca3af",
            },
          },
        ]}
        yAxis={[{ width: 0 }]}
        series={[
          {
            data: amounts,
            valueFormatter: (value) =>
              value == null ? "" : formatCurrency(value),
            barLabel: (item) =>
              item.value == null ? "" : formatCurrency(item.value),
            barLabelPlacement: "outside",
          },
        ]}
      />
    );
  };

  return (
    <Paper variant="outlined" sx={earningsChartRootSx}>
      <Typography sx={earningsChartTitleSx}>Prihod po usluzi</Typography>
      {renderBody()}
    </Paper>
  );
};

export default EarningsByServiceChart;
