import type { SxProps, Theme } from "@mui/material";
import { LABEL_FONT, microLabelSx } from "#/theme/tokens";

export const scheduledJobsLoadingSx: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  py: 10,
  marginTop: 25,
};

export const scheduledJobsHeaderSx: SxProps<Theme> = {
  justifyContent: "space-between",
  alignItems: { xs: "stretch", md: "flex-start" },
};

export const scheduledJobsControlsSx: SxProps<Theme> = {
  alignItems: { xs: "stretch", sm: "center" },
  justifyContent: "flex-end",
  gap: 1.5,
};

export const scheduledViewToggleSx: SxProps<Theme> = {
  bgcolor: "background.paper",
  border: "1px solid",
  borderColor: "divider",
  borderRadius: "10px",
  p: 0.5,
  gap: 0.5,
  flexShrink: 0,
  // Size to its buttons instead of stretching full width on a phone.
  alignSelf: { xs: "flex-start", sm: "auto" },
  "& .MuiToggleButtonGroup-grouped": {
    border: 0,
    borderRadius: "8px !important",
    px: 1.25,
    py: 0.5,
    gap: 0.75,
    color: "text.secondary",
    "&.Mui-selected": {
      bgcolor: "primary.main",
      color: "#fff",
      "&:hover": { bgcolor: "primary.main" },
    },
    "&:not(.Mui-selected):hover": {
      bgcolor: "rgba(255,255,255,0.04)",
      color: "text.primary",
    },
  },
};

export const scheduledViewToggleLabelSx: SxProps<Theme> = {
  fontFamily: LABEL_FONT,
  fontSize: 13,
  fontWeight: 600,
  textTransform: "none",
};

export const scheduledJobsTitleSx: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: { xs: 22, sm: 26 },
  letterSpacing: "-0.015em",
  lineHeight: 1.2,
};

export const scheduledJobsSubtitleSx: SxProps<Theme> = {
  ...microLabelSx,
  mt: 0.75,
};

export const scheduledJobsDayGroupSx: SxProps<Theme> = {
  gap: 1.5,
};

export const scheduledJobsDayHeadingSx: SxProps<Theme> = {
  fontFamily: LABEL_FONT,
  fontSize: 13,
  fontWeight: 600,
  color: "text.secondary",
  textTransform: "capitalize",
};

export const scheduledJobsCardListSx: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(auto-fill, minmax(300px, 1fr))",
  },
  gap: 1.5,
  alignItems: "start",
};

export const scheduledJobsEmptySx: SxProps<Theme> = {
  alignItems: "center",
  textAlign: "center",
  gap: 1,
  px: 3,
  py: { xs: 6, md: 9 },
  borderRadius: "12px",
  border: "1px dashed",
  borderColor: "divider",
};

export const scheduledJobsEmptyTitleSx: SxProps<Theme> = {
  fontSize: 16,
  fontWeight: 600,
  color: "text.primary",
};

export const scheduledJobsEmptyBodySx: SxProps<Theme> = {
  fontSize: 14,
  color: "text.secondary",
  maxWidth: 340,
};
