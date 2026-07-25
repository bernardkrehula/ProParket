import type { SxProps, Theme } from "@mui/material";
import { MONO_FONT, microLabelSx } from "#/theme/tokens";
import type { StatAccent } from "#/pages/dashboard/dashboardConfig";

export const statCardRootSx = (accent: StatAccent): SxProps<Theme> => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: 1.25,
  p: 2.5,
  pl: 3,
  borderRadius: "12px",
  borderColor: "divider",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    bgcolor: accent.main,
  },
});

export const statCardIconChipSx = (accent: StatAccent): SxProps<Theme> => ({
  width: 38,
  height: 38,
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: accent.soft,
  color: accent.main,
});

export const statCardIconSx: SxProps<Theme> = {
  fontSize: 20,
};

export const statCardLabelSx: SxProps<Theme> = microLabelSx;

export const statCardValueSx: SxProps<Theme> = {
  fontFamily: MONO_FONT,
  fontWeight: 600,
  fontSize: { xs: 22, sm: 26 },
  letterSpacing: "-0.02em",
  lineHeight: 1.1,
  color: "text.primary",
};

export const statCardHintSx: SxProps<Theme> = {
  fontSize: 12,
  color: "text.secondary",
};
