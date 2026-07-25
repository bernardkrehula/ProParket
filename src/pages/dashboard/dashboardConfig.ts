import type { SxProps, Theme } from "@mui/material";
import { microLabelSx } from "#/theme/tokens";

/** Accent per stat, keyed to meaning and shared with the profit donut. */
export type StatAccent = {
  main: string;
  soft: string;
};

export const STAT_ACCENTS: Record<
  "income" | "material" | "profit" | "jobs",
  StatAccent
> = {
  income: { main: "#3b5bdb", soft: "rgba(59, 91, 219, 0.15)" },
  material: { main: "#f0913c", soft: "rgba(240, 145, 60, 0.15)" },
  profit: { main: "#2bbd8c", soft: "rgba(43, 189, 140, 0.15)" },
  jobs: { main: "#7c83f0", soft: "rgba(124, 131, 240, 0.15)" },
};

export const dashboardLoadingSx: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  py: 10,
  marginTop: 25,
};

export const dashboardHeaderSx: SxProps<Theme> = {
  justifyContent: "space-between",
  alignItems: { xs: "stretch", md: "flex-start" },
};

export const dashboardTitleSx: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: { xs: 22, sm: 26 },
  letterSpacing: "-0.015em",
  lineHeight: 1.2,
};

export const dashboardPeriodLabelSx: SxProps<Theme> = {
  ...microLabelSx,
  mt: 0.75,
};

export const dashboardStatsRowSx: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: {
    xs: "repeat(2, 1fr)",
    md: "repeat(4, 1fr)",
  },
  gap: 2,
};

/** Donut on the left, service breakdown on the right, stacked on small screens. */
export const dashboardPanelsRowSx: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    lg: "minmax(0, 360px) minmax(0, 1fr)",
  },
  gap: 2,
  alignItems: "stretch",
};
