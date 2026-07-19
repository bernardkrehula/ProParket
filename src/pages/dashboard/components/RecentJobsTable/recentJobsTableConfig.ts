import type { SxProps, Theme } from "@mui/material";

export const recentJobsTableRootSx: SxProps<Theme> = {
  p: 3,
  borderColor: "divider",
};

export const recentJobsTableTitleSx: SxProps<Theme> = {
  fontWeight: 600,
  mb: 2,
};

export const recentJobsTableSx: SxProps<Theme> = {
  minWidth: 650,
};

export const recentJobsTableContainerSx: SxProps<Theme> = {
  scrollbarWidth: { xs: "none", sm: "thin" },
  scrollbarColor: "#3b5bdb transparent",
  "&::-webkit-scrollbar": {
    width: { xs: 0, sm: 6 },
    height: { xs: 0, sm: 6 },
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 8,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "rgba(255,255,255,0.35)",
  },
  "&::-webkit-scrollbar-button": {
    display: "none",
  },
};

export const recentJobsTableHeaderCellSx: SxProps<Theme> = {
  color: "text.secondary",
  border: 0,
  whiteSpace: "nowrap",
};

export const recentJobsTableBodyCellSx: SxProps<Theme> = {
  borderColor: "divider",
  whiteSpace: "nowrap",
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
