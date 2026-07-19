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
  width: 40,
  height: 40,
  borderRadius: "10px",
  bgcolor: "primary.main",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const brandIconSx: SxProps<Theme> = {
  fontSize: 24,
  color: "#fff",
};

export const brandTextSx: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: 20
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
  fontSize: 17
};

export const navLogoutSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  px: 2,
  py: 1.25,
  mt: "auto",
  borderRadius: "10px",
  color: "text.secondary",
  fontSize: 14,
  fontWeight: 500,
  cursor: "pointer",
  border: "none",
  background: "none",
  width: "100%",
  textAlign: "left",
  "&:hover": {
    bgcolor: "rgba(255,255,255,0.04)",
    color: "text.primary",
  },
};
