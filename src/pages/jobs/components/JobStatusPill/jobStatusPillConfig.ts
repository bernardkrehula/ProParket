import type { SxProps, Theme } from "@mui/material";
import { LABEL_FONT, type JobStatusToken } from "#/pages/jobs/jobsTokens";

export const jobStatusPillSx = (token: JobStatusToken): SxProps<Theme> => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 0.75,
  pl: 1,
  pr: 1.25,
  py: 0.5,
  borderRadius: "999px",
  border: "1px solid",
  borderColor: token.border,
  bgcolor: token.bg,
  color: token.fg,
  fontFamily: LABEL_FONT,
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "0.02em",
  lineHeight: 1.2,
  whiteSpace: "nowrap",
});

export const jobStatusDotSx = (token: JobStatusToken): SxProps<Theme> => ({
  width: 6,
  height: 6,
  borderRadius: "50%",
  bgcolor: token.fg,
  flexShrink: 0,
});
