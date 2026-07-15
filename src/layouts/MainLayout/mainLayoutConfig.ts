import type { SxProps, Theme } from "@mui/material";

export const mainLayoutRootSx: SxProps<Theme> = {
  display: "flex",
  minHeight: "100vh",
};

export const mainLayoutContentSx: SxProps<Theme> = {
  flexGrow: 1,
  p: 4,
  overflowY: "auto",
};
