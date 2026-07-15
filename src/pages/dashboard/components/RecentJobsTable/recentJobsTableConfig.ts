import type { SxProps, Theme } from "@mui/material";

export const recentJobsTableRootSx: SxProps<Theme> = {
  p: 3,
  borderColor: "divider",
};

export const recentJobsTableTitleSx: SxProps<Theme> = {
  fontWeight: 600,
  mb: 2,
};

export const recentJobsTableHeaderCellSx: SxProps<Theme> = {
  color: "text.secondary",
  border: 0,
};

export const recentJobsTableBodyCellSx: SxProps<Theme> = {
  borderColor: "divider",
};

export const recentJobsTableServiceStackSx: SxProps<Theme> = {
  alignItems: "center",
};

export const recentJobsTableServiceDotSx: SxProps<Theme> = {
  width: 8,
  height: 8,
  borderRadius: "50%",
};

export const recentJobsTableProfitCellSx: SxProps<Theme> = {
  borderColor: "divider",
  color: "success.main",
  fontWeight: 600,
};
