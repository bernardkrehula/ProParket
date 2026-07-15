import type { SxProps, Theme } from "@mui/material";

export const CHART_HEIGHT = 160;

export const earningsChartRootSx: SxProps<Theme> = {
  p: 3,
  borderColor: "divider",
};

export const earningsChartTitleSx: SxProps<Theme> = {
  fontWeight: 600,
  mb: 3,
};

export const earningsChartBarsRowSx: SxProps<Theme> = {
  height: CHART_HEIGHT,
  alignItems: "flex-end",
};

export const earningsChartBarColumnSx: SxProps<Theme> = {
  flex: 1,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-end",
};

export const earningsChartAmountLabelSx: SxProps<Theme> = {
  mb: 0.5,
  fontSize: 15
};

export const earningsChartBarSx: SxProps<Theme> = {
  width: "100%",
  borderRadius: "6px 6px 0 0",
};

export const earningsChartLegendRowSx: SxProps<Theme> = {
  mt: 2,
};

export const earningsChartLegendItemSx: SxProps<Theme> = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
};

export const earningsChartLegendDotSx: SxProps<Theme> = {
  width: 8,
  height: 8,
  borderRadius: "50%",
};
