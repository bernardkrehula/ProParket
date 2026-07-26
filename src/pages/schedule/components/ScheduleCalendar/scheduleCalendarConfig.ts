import type { SxProps, Theme } from "@mui/material";
import { MONO_FONT, LABEL_FONT, microLabelSx } from "#/theme/tokens";
import type { JobStatusToken } from "#/pages/jobs/jobsTokens";

export const WEEKDAYS = ["pon", "uto", "sri", "čet", "pet", "sub", "ned"];
export const MAX_CHIPS_PER_DAY = 3;

export const calendarRootSx: SxProps<Theme> = {
  borderRadius: "12px",
  borderColor: "divider",
  overflow: "hidden",
};

export const calendarNavSx: SxProps<Theme> = {
  alignItems: "center",
  justifyContent: "space-between",
  gap: 1.5,
  px: { xs: 2, sm: 2.5 },
  py: 1.5,
  borderBottom: "1px solid",
  borderColor: "divider",
};

export const calendarMonthLabelSx: SxProps<Theme> = {
  fontFamily: LABEL_FONT,
  fontWeight: 700,
  fontSize: { xs: 17, sm: 19 },
  letterSpacing: "-0.01em",
  textTransform: "capitalize",
};

export const calendarNavButtonsSx: SxProps<Theme> = {
  alignItems: "center",
  gap: 0.5,
  flexShrink: 0,
};

export const calendarTodayButtonSx: SxProps<Theme> = {
  fontFamily: LABEL_FONT,
  fontWeight: 600,
  fontSize: 13,
  textTransform: "none",
  color: "text.secondary",
  borderColor: "divider",
  mr: 0.5,
};

export const calendarNavIconButtonSx: SxProps<Theme> = {
  border: "1px solid",
  borderColor: "divider",
  borderRadius: "8px",
  width: 34,
  height: 34,
};

export const calendarWeekdayRowSx: SxProps<Theme> = {
  display: "grid",
  // minmax(0, 1fr) keeps all 7 columns exactly equal regardless of content.
  gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
  borderBottom: "1px solid",
  borderColor: "divider",
};

export const calendarWeekdayCellSx: SxProps<Theme> = {
  ...microLabelSx,
  textAlign: "center",
  py: 1,
};

export const calendarGridSx: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
};

export const calendarDayCellSx = (inMonth: boolean): SxProps<Theme> => ({
  minWidth: 0,
  minHeight: { xs: 76, sm: 108 },
  display: "flex",
  flexDirection: "column",
  gap: { xs: 0.25, sm: 0.375 },
  p: { xs: 0.375, sm: 0.625 },
  borderRight: "1px solid",
  borderBottom: "1px solid",
  borderColor: "divider",
  bgcolor: inMonth ? "transparent" : "rgba(0, 0, 0, 0.18)",
  // Trim the right edge so the outer border isn't doubled.
  "&:nth-of-type(7n)": { borderRight: 0 },
});

export const calendarDayNumberSx = (
  isToday: boolean,
  inMonth: boolean,
): SxProps<Theme> => ({
  fontFamily: MONO_FONT,
  fontSize: 12,
  fontWeight: isToday ? 700 : 500,
  lineHeight: "20px",
  textAlign: "center",
  alignSelf: "flex-start",
  minWidth: 20,
  height: 20,
  borderRadius: "6px",
  px: 0.5,
  color: isToday ? "#fff" : inMonth ? "text.primary" : "text.disabled",
  bgcolor: isToday ? "primary.main" : "transparent",
});

export const calendarChipSx = (token: JobStatusToken): SxProps<Theme> => ({
  width: "100%",
  boxSizing: "border-box",
  fontFamily: LABEL_FONT,
  fontSize: { xs: 10, sm: 10.5 },
  fontWeight: 600,
  lineHeight: 1.4,
  px: { xs: 0.4, sm: 0.625 },
  py: 0.25,
  borderRadius: "4px",
  borderLeft: "2px solid",
  borderColor: token.rail,
  bgcolor: token.bg,
  color: token.fg,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  cursor: "pointer",
  "@media (hover: hover)": {
    "&:hover": { filter: "brightness(1.25)" },
  },
});

export const calendarMoreSx: SxProps<Theme> = {
  fontFamily: LABEL_FONT,
  fontSize: 10,
  fontWeight: 600,
  color: "text.secondary",
  px: 0.625,
};

/* ---- Week rows with multi-day spanning bars ---- */

export const calendarWeekSx: SxProps<Theme> = {
  position: "relative",
  display: "grid",
  gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
  gridAutoRows: "minmax(0, auto)",
  rowGap: "3px",
  minHeight: { xs: 78, sm: 106 },
  pb: 0.5,
};

export const calendarDayBgSx = (
  inMonth: boolean,
  isLast: boolean,
): SxProps<Theme> => ({
  gridRow: "1 / -1",
  borderRight: isLast ? 0 : "1px solid",
  borderBottom: "1px solid",
  borderColor: "divider",
  bgcolor: inMonth ? "transparent" : "rgba(0, 0, 0, 0.18)",
});

export const calendarDayNumberCellSx: SxProps<Theme> = {
  gridRow: 1,
  display: "flex",
  justifyContent: "flex-start",
  p: 0.375,
  pointerEvents: "none",
};

export const calendarBarSx = (
  token: JobStatusToken,
  continuesLeft: boolean,
  continuesRight: boolean,
): SxProps<Theme> => ({
  minWidth: 0,
  alignSelf: "start",
  zIndex: 1,
  ml: continuesLeft ? 0 : "3px",
  mr: continuesRight ? 0 : "3px",
  px: { xs: 0.5, sm: 0.625 },
  py: 0.2,
  fontFamily: LABEL_FONT,
  fontSize: { xs: 10, sm: 10.5 },
  fontWeight: 600,
  lineHeight: 1.5,
  bgcolor: token.bg,
  color: token.fg,
  borderLeft: continuesLeft ? 0 : "2px solid",
  borderColor: token.rail,
  borderTopLeftRadius: continuesLeft ? 0 : "4px",
  borderBottomLeftRadius: continuesLeft ? 0 : "4px",
  borderTopRightRadius: continuesRight ? 0 : "4px",
  borderBottomRightRadius: continuesRight ? 0 : "4px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  cursor: "pointer",
  "@media (hover: hover)": {
    "&:hover": { filter: "brightness(1.25)" },
  },
});
