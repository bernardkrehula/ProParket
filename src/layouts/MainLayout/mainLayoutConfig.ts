import type { SxProps, Theme } from "@mui/material";

export const mainLayoutRootSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  height: "100vh",
};

export const mainLayoutContentSx: SxProps<Theme> = {
  flexGrow: 1,
  p: { xs: 2, sm: 4 },
  overflowY: "auto",
  scrollbarWidth: { xs: "none", sm: "thin" },
  scrollbarColor: "#3b5bdb transparent",
  "&::-webkit-scrollbar": {
    width: { xs: 0, sm: 6 },
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

export const mainLayoutMobileBarSx: SxProps<Theme> = {
  alignItems: "center",
  px: 2,
  py: 1.5,
  bgcolor: "background.default",
  borderBottom: "1px solid",
  borderColor: "divider",
};

export const mainLayoutMobileBrandIconBoxSx: SxProps<Theme> = {
  width: 32,
  height: 32,
  borderRadius: "8px",
  bgcolor: "primary.main",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const mainLayoutMobileBrandIconSx: SxProps<Theme> = {
  fontSize: 18,
  color: "#fff",
};

export const mainLayoutMobileBrandTextSx: SxProps<Theme> = {
  fontWeight: 700,
};

export const mainLayoutDrawerPaperSx: SxProps<Theme> = {
  width: 240,
};
