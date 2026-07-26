import type { SxProps, Theme } from "@mui/material";
import { MONO_FONT, microLabelSx } from "#/theme/tokens";

export const DONUT_SIZE = 152;
export const DONUT_INNER_RADIUS = 50;
export const DONUT_OUTER_RADIUS = 74;

export const profitDonutRootSx: SxProps<Theme> = {
  p: 3,
  borderRadius: "12px",
  borderColor: "divider",
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

export const profitDonutTitleSx: SxProps<Theme> = microLabelSx;

export const profitDonutBodySx: SxProps<Theme> = {
  mt: 3,
  gap: 3,
  alignItems: "center",
  flexWrap: "wrap",
  flexGrow: 1,
};

export const profitDonutRingWrapSx: SxProps<Theme> = {
  width: DONUT_SIZE,
  height: DONUT_SIZE,
  flexShrink: 0,
};

export const profitDonutEmptyRingSx: SxProps<Theme> = {
  width: DONUT_SIZE,
  height: DONUT_SIZE,
  borderRadius: "50%",
  border: "24px solid rgba(255, 255, 255, 0.06)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: MONO_FONT,
  fontSize: 22,
  color: "text.secondary",
};

export const profitDonutLegendSx: SxProps<Theme> = {
  gap: 1.5,
  minWidth: 150,
  flexGrow: 1,
};

export const profitDonutLegendRowSx: SxProps<Theme> = {
  alignItems: "center",
  gap: 1.25,
};

export const profitDonutLegendDot = (color: string): SxProps<Theme> => ({
  width: 10,
  height: 10,
  borderRadius: "3px",
  bgcolor: color,
  flexShrink: 0,
  mt: 0.25,
});

export const profitDonutLegendLabelSx: SxProps<Theme> = {
  fontSize: 13,
  color: "text.secondary",
  lineHeight: 1.3,
};

export const profitDonutLegendValueSx: SxProps<Theme> = {
  fontFamily: MONO_FONT,
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: "-0.01em",
  color: "text.primary",
  lineHeight: 1.3,
};

export const profitDonutLegendPctSx: SxProps<Theme> = {
  fontFamily: MONO_FONT,
  fontSize: 12,
  color: "text.secondary",
};

export const profitDonutDividerSx: SxProps<Theme> = {
  borderColor: "divider",
  my: 0.5,
};

export const profitDonutTotalLabelSx: SxProps<Theme> = {
  fontSize: 13,
  color: "text.secondary",
};

export const profitDonutTotalValueSx: SxProps<Theme> = {
  fontFamily: MONO_FONT,
  fontSize: 15,
  fontWeight: 700,
  letterSpacing: "-0.01em",
  color: "text.primary",
};
