import type { SxProps, Theme } from "@mui/material";
import { MONO_FONT, microLabelSx, type JobStatusToken } from "#/pages/jobs/jobsTokens";

export const jobCardRootSx = (token: JobStatusToken): SxProps<Theme> => ({
  position: "relative",
  p: 2,
  pl: 2.5,
  borderRadius: "12px",
  border: "1px solid",
  borderColor: "divider",
  bgcolor: "background.paper",
  overflow: "hidden",
  transition: "border-color 160ms ease, background-color 160ms ease",
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    bgcolor: token.rail,
  },
  "@media (hover: hover)": {
    "&:hover": {
      borderColor: token.border,
      bgcolor: "action.hover",
    },
  },
  "&:active": {
    bgcolor: "action.hover",
  },
  // The overlay button below is invisible, so the card carries its focus ring.
  "&:has(> button:focus-visible)": {
    outline: "2px solid",
    outlineColor: token.rail,
    outlineOffset: 2,
  },
});

/**
 * Covers the whole card so tapping anywhere opens the job. Kept as a real
 * button rather than a click handler on the card so it is keyboard reachable,
 * and separate from the phone link so both can be actioned independently.
 */
export const jobCardOverlayButtonSx: SxProps<Theme> = {
  position: "absolute",
  inset: 0,
  width: "100%",
  p: 0,
  border: "none",
  background: "none",
  cursor: "pointer",
  zIndex: 1,
  "&:focus-visible": {
    outline: "none",
  },
};

/** Sits above the overlay button so the number is tappable on its own. */
export const jobCardInteractiveSx: SxProps<Theme> = {
  position: "relative",
  zIndex: 2,
  width: "fit-content",
};

export const jobCardTopSx: SxProps<Theme> = {
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 1.5,
};

export const jobCardAddressSx: SxProps<Theme> = {
  fontSize: 16,
  fontWeight: 600,
  lineHeight: 1.35,
  color: "text.primary",
};

export const jobCardClientSx: SxProps<Theme> = {
  fontSize: 14,
  color: "text.secondary",
  mt: 0.25,
};

export const jobCardDatesSx: SxProps<Theme> = {
  mt: 2,
  gap: 2,
};

export const jobCardFieldSx: SxProps<Theme> = {
  flex: 1,
  minWidth: 0,
};

export const jobCardFieldLabelSx: SxProps<Theme> = microLabelSx;

export const jobCardFieldValueSx: SxProps<Theme> = {
  fontFamily: MONO_FONT,
  fontSize: 13,
  letterSpacing: "-0.01em",
  color: "text.primary",
  mt: 0.5,
};

export const jobCardFieldValueMutedSx: SxProps<Theme> = {
  ...jobCardFieldValueSx,
  color: "text.secondary",
};

/** The start time leads the planned field — bigger and bolder than the date. */
export const jobCardTimeSx: SxProps<Theme> = {
  fontFamily: MONO_FONT,
  fontSize: 20,
  fontWeight: 700,
  letterSpacing: "-0.02em",
  lineHeight: 1.15,
  color: "primary.light",
};

export const jobCardDividerSx: SxProps<Theme> = {
  my: 2,
  borderColor: "divider",
};

export const jobCardFooterSx: SxProps<Theme> = {
  alignItems: "center",
  justifyContent: "space-between",
  gap: 1.5,
};

export const jobCardPhoneSx: SxProps<Theme> = {
  display: "inline-flex",
  alignItems: "center",
  gap: 0.75,
  // Comfortable one-handed tap target on site, pulled flush with the card edge.
  minHeight: 44,
  py: 1,
  px: 1.25,
  mr: -1.25,
  borderRadius: "8px",
  fontFamily: MONO_FONT,
  fontSize: 13,
  letterSpacing: "-0.01em",
  color: "text.secondary",
  textDecoration: "none",
  "@media (hover: hover)": {
    "&:hover": {
      color: "primary.light",
      bgcolor: "action.hover",
    },
  },
  "&:focus-visible": {
    outline: "2px solid",
    outlineColor: "primary.main",
    outlineOffset: 2,
  },
};

export const jobCardPhoneIconSx: SxProps<Theme> = {
  fontSize: 15,
};

export const jobCardNotesSx: SxProps<Theme> = {
  mt: 2,
  p: 1.5,
  borderRadius: "8px",
  bgcolor: "rgba(255,255,255,0.03)",
  fontSize: 13,
  lineHeight: 1.5,
  color: "text.secondary",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

export const jobCardChevronSx: SxProps<Theme> = {
  fontSize: 20,
  color: "text.secondary",
  flexShrink: 0,
  mt: 0.25,
};
