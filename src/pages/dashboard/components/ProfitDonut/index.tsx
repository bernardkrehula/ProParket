import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { formatCurrency, formatPercent } from "#/utils/format";
import { MONO_FONT, LABEL_FONT } from "#/theme/tokens";
import { STAT_ACCENTS } from "#/pages/dashboard/dashboardConfig";
import {
  DONUT_SIZE,
  DONUT_INNER_RADIUS,
  DONUT_OUTER_RADIUS,
  profitDonutRootSx,
  profitDonutTitleSx,
  profitDonutBodySx,
  profitDonutRingWrapSx,
  profitDonutEmptyRingSx,
  profitDonutLegendSx,
  profitDonutLegendRowSx,
  profitDonutLegendDot,
  profitDonutLegendLabelSx,
  profitDonutLegendValueSx,
  profitDonutLegendPctSx,
  profitDonutDividerSx,
  profitDonutTotalLabelSx,
  profitDonutTotalValueSx,
} from "./profitDonutConfig";

type ProfitDonutProps = {
  totalIncome: number;
  materialCost: number;
  netProfit: number;
  profitMargin: number;
};

const MATERIAL_COLOR = STAT_ACCENTS.material.main;
const PROFIT_COLOR = STAT_ACCENTS.profit.main;

type DonutCenterLabelProps = {
  primary: string;
  secondary: string;
};

const DonutCenterLabel = ({ primary, secondary }: DonutCenterLabelProps) => {
  const { width, height, left, top } = useDrawingArea();
  const cx = left + width / 2;
  const cy = top + height / 2;

  return (
    <>
      <text
        x={cx}
        y={cy - 5}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fill: "#f3f4f6",
          fontFamily: MONO_FONT,
          fontSize: 22,
          fontWeight: 600,
        }}
      >
        {primary}
      </text>
      <text
        x={cx}
        y={cy + 15}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fill: "#9ca3af",
          fontFamily: LABEL_FONT,
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "1px",
        }}
      >
        {secondary}
      </text>
    </>
  );
};

const ProfitDonut = ({
  totalIncome,
  materialCost,
  netProfit,
  profitMargin,
}: ProfitDonutProps) => {
  const hasIncome = totalIncome > 0;
  const materialShare = hasIncome ? materialCost / totalIncome : 0;
  const profitShare = hasIncome ? netProfit / totalIncome : 0;

  return (
    <Paper variant="outlined" sx={profitDonutRootSx}>
      <Typography sx={profitDonutTitleSx}>Struktura prihoda</Typography>

      <Stack direction="row" sx={profitDonutBodySx}>
        <Box sx={profitDonutRingWrapSx}>
          {hasIncome ? (
            <PieChart
              width={DONUT_SIZE}
              height={DONUT_SIZE}
              hideLegend
              skipAnimation
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              series={[
                {
                  innerRadius: DONUT_INNER_RADIUS,
                  outerRadius: DONUT_OUTER_RADIUS,
                  paddingAngle: 2,
                  cornerRadius: 4,
                  valueFormatter: (item) => formatCurrency(item.value),
                  highlightScope: { fade: "global", highlight: "item" },
                  data: [
                    {
                      id: "material",
                      value: materialCost,
                      label: "Trošak materijala",
                      color: MATERIAL_COLOR,
                    },
                    {
                      id: "profit",
                      value: Math.max(0, netProfit),
                      label: "Neto dobit",
                      color: PROFIT_COLOR,
                    },
                  ],
                },
              ]}
            >
              <DonutCenterLabel
                primary={formatPercent(profitMargin)}
                secondary="MARŽA"
              />
            </PieChart>
          ) : (
            <Box sx={profitDonutEmptyRingSx}>—</Box>
          )}
        </Box>

        <Stack sx={profitDonutLegendSx}>
          <Stack direction="row" sx={profitDonutLegendRowSx}>
            <Box sx={profitDonutLegendDot(MATERIAL_COLOR)} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography sx={profitDonutLegendLabelSx}>
                Trošak materijala
              </Typography>
              <Typography sx={profitDonutLegendValueSx}>
                {formatCurrency(materialCost)}
              </Typography>
            </Box>
            <Typography sx={profitDonutLegendPctSx}>
              {formatPercent(materialShare)}
            </Typography>
          </Stack>

          <Stack direction="row" sx={profitDonutLegendRowSx}>
            <Box sx={profitDonutLegendDot(PROFIT_COLOR)} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography sx={profitDonutLegendLabelSx}>Neto dobit</Typography>
              <Typography sx={profitDonutLegendValueSx}>
                {formatCurrency(netProfit)}
              </Typography>
            </Box>
            <Typography sx={profitDonutLegendPctSx}>
              {formatPercent(profitShare)}
            </Typography>
          </Stack>

          <Divider sx={profitDonutDividerSx} />

          <Stack direction="row" sx={profitDonutLegendRowSx}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography sx={profitDonutTotalLabelSx}>Ukupni prihod</Typography>
            </Box>
            <Typography sx={profitDonutTotalValueSx}>
              {formatCurrency(totalIncome)}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ProfitDonut;
