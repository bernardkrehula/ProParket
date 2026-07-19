import type { SxProps, Theme } from "@mui/material";

export const dashboardLoadingSx: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  py: 10,
  marginTop: 25
};

export const dashboardHeaderSx: SxProps<Theme> = {
  justifyContent: "space-between",
  alignItems: "flex-start",
};

export const dashboardTitleSx: SxProps<Theme> = {
  fontWeight: 700,
};

export const dashboardButtonSx: SxProps<Theme> = {
  borderColor: "divider",
  color: "text.primary",
};

export const dashboardStatsRowSx: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" },
  gap: 2,
};
