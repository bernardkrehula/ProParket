import type { SxProps, Theme } from "@mui/material";

export const navbarRootSx: SxProps<Theme> = {
  width: 240,
  flexShrink: 0,
  height: "100vh",
  bgcolor: "background.default",
  borderRight: "1px solid",
  borderColor: "divider",
  display: "flex",
  flexDirection: "column",
  py: 3,
  px: 2,
};

export const brandStackSx: SxProps<Theme> = {
  px: 1,
  mb: 4,
  alignItems: "center",
};

export const brandIconBoxSx: SxProps<Theme> = {
  width: 34,
  height: 34,
  borderRadius: "10px",
  bgcolor: "primary.main",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const brandIconSx: SxProps<Theme> = {
  fontSize: 18,
  color: "#fff",
};

export const brandTextSx: SxProps<Theme> = {
  fontWeight: 700,
};

export const navListSpacing = 0.5;

export const navItemSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  px: 2,
  py: 1.25,
  borderRadius: "10px",
  textDecoration: "none",
  color: "text.secondary",
  fontSize: 14,
  fontWeight: 500,
  "&.active": {
    bgcolor: "primary.main",
    color: "#fff",
  },
  "&:not(.active):hover": {
    bgcolor: "rgba(255,255,255,0.04)",
    color: "text.primary",
  },
};

export const navItemIconSx: SxProps<Theme> = {
  fontSize: 20,
};

export const navItemLabelSx: SxProps<Theme> = {
  fontWeight: "inherit",
};
