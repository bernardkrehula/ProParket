import type { SxProps, Theme } from "@mui/material";

export const dashboardLoadingSx: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  py: 10,
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
