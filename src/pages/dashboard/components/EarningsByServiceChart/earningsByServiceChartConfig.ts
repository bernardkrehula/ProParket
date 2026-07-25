import type { SxProps, Theme } from "@mui/material";
import { MONO_FONT, LABEL_FONT, microLabelSx } from "#/theme/tokens";

export const CHART_HEIGHT = 240;

export const earningsChartRootSx: SxProps<Theme> = {
  p: 3,
  borderRadius: "12px",
  borderColor: "divider",
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

export const earningsChartTitleSx: SxProps<Theme> = microLabelSx;

/** Desktop vertical bar chart: theme the x-charts value labels. */
export const earningsChartSx: SxProps<Theme> = {
  mt: 1,
  "& .MuiBarChart-label": {
    fontFamily: MONO_FONT,
    fontSize: 12,
    fontWeight: 600,
    fill: "#f3f4f6",
  },
};

/* ---- Mobile: ranked meter list ---- */

export const earningsListSx: SxProps<Theme> = {
  mt: 2.5,
  gap: 2.25,
  flexGrow: 1,
  justifyContent: "center",
};

export const earningsRowHeaderSx: SxProps<Theme> = {
  direction: "row",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: 1.5,
  mb: 1,
};

export const earningsRowNameWrapSx: SxProps<Theme> = {
  direction: "row",
  alignItems: "center",
  gap: 1,
  minWidth: 0,
};

export const earningsRowDot = (color: string): SxProps<Theme> => ({
  width: 9,
  height: 9,
  borderRadius: "3px",
  bgcolor: color,
  flexShrink: 0,
});

export const earningsRowNameSx: SxProps<Theme> = {
  fontFamily: LABEL_FONT,
  fontSize: 14,
  fontWeight: 500,
  color: "text.primary",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const earningsRowValueWrapSx: SxProps<Theme> = {
  direction: "row",
  alignItems: "baseline",
  gap: 1,
  flexShrink: 0,
};

export const earningsRowValueSx: SxProps<Theme> = {
  fontFamily: MONO_FONT,
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: "-0.01em",
  color: "text.primary",
};

export const earningsRowShareSx: SxProps<Theme> = {
  fontFamily: MONO_FONT,
  fontSize: 12,
  color: "text.secondary",
};

export const earningsMeterSx = (color: string): SxProps<Theme> => ({
  height: 8,
  borderRadius: 999,
  bgcolor: "rgba(255, 255, 255, 0.06)",
  "& .MuiLinearProgress-bar": {
    borderRadius: 999,
    backgroundColor: color,
  },
});

export const earningsChartEmptySx: SxProps<Theme> = {
  flexGrow: 1,
  minHeight: CHART_HEIGHT,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  color: "text.secondary",
  fontSize: 14,
};
