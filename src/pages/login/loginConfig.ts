import type { SxProps, Theme } from "@mui/material";
import { LABEL_FONT } from "#/theme/tokens";

const HERRINGBONE =
  "<svg xmlns='http://www.w3.org/2000/svg' width='60' height='30'>" +
  "<g fill='none' stroke='rgba(124,131,240,0.16)' stroke-width='1.5'>" +
  "<path d='M0 30 L15 15 L30 30 L45 15 L60 30'/>" +
  "<path d='M0 15 L15 0 L30 15 L45 0 L60 15'/>" +
  "</g></svg>";

export const loginLoadingSx: SxProps<Theme> = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: "background.default",
};

export const loginRootSx: SxProps<Theme> = {
  minHeight: "100vh",
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "1.05fr 1fr" },
  bgcolor: "background.default",
};

export const loginBrandPanelSx: SxProps<Theme> = {
  display: { xs: "none", md: "flex" },
  flexDirection: "column",
  justifyContent: "space-between",
  p: 6,
  position: "relative",
  overflow: "hidden",
  background:
    "linear-gradient(160deg, #1f2942 0%, #141d30 55%, #0e1626 100%)",
  borderRight: "1px solid",
  borderColor: "divider",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(HERRINGBONE)}")`,
    backgroundSize: "60px 30px",
    opacity: 0.55,
    maskImage: "linear-gradient(155deg, #000 5%, transparent 75%)",
    WebkitMaskImage: "linear-gradient(155deg, #000 5%, transparent 75%)",
  },
  "& > *": {
    position: "relative",
    zIndex: 1,
  },
};

export const loginBrandRowSx: SxProps<Theme> = {
  alignItems: "center",
};

export const loginBrandIconBoxSx: SxProps<Theme> = {
  width: 44,
  height: 44,
  borderRadius: "12px",
  bgcolor: "primary.main",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

export const loginBrandIconSx: SxProps<Theme> = {
  fontSize: 26,
  color: "#fff",
};

export const loginBrandTextSx: SxProps<Theme> = {
  fontFamily: LABEL_FONT,
  fontWeight: 700,
  fontSize: 22,
  letterSpacing: "-0.01em",
};

export const loginPanelHeadlineSx: SxProps<Theme> = {
  fontFamily: LABEL_FONT,
  fontWeight: 700,
  fontSize: 32,
  lineHeight: 1.2,
  letterSpacing: "-0.02em",
  maxWidth: 440,
};

export const loginPanelTaglineSx: SxProps<Theme> = {
  fontSize: 16,
  lineHeight: 1.65,
  color: "text.secondary",
  mt: 2,
  maxWidth: 420,
};

export const loginFormPanelSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  p: { xs: 3, sm: 5 },
};

export const loginFormSx: SxProps<Theme> = {
  width: "100%",
  maxWidth: 400,
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

export const loginMobileBrandSx: SxProps<Theme> = {
  display: { xs: "flex", md: "none" },
  alignItems: "center",
  mb: 1,
};

export const loginHeadingSx: SxProps<Theme> = {
  fontFamily: LABEL_FONT,
  fontWeight: 700,
  fontSize: 26,
  letterSpacing: "-0.015em",
  lineHeight: 1.2,
};

export const loginSubheadingSx: SxProps<Theme> = {
  fontSize: 14,
  color: "text.secondary",
  mt: 0.5,
};

export const loginFieldSx: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
  },
};

export const loginButtonSx: SxProps<Theme> = {
  py: 1.25,
  borderRadius: "10px",
  fontFamily: LABEL_FONT,
  fontWeight: 600,
  fontSize: 15,
  textTransform: "none",
};

export const loginGuestButtonSx: SxProps<Theme> = {
  py: 1.25,
  borderRadius: "10px",
  fontFamily: LABEL_FONT,
  fontWeight: 600,
  fontSize: 15,
  textTransform: "none",
};

export const loginDividerSx: SxProps<Theme> = {
  "&::before, &::after": {
    borderColor: "divider",
  },
  "& .MuiDivider-wrapper": {
    fontSize: 12,
    color: "text.secondary",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
};

export const loginErrorSx: SxProps<Theme> = {
  color: "error.main",
  fontSize: 14,
};
