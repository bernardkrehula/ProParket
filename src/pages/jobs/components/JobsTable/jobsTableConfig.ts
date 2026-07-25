import type { SxProps, Theme } from "@mui/material";
import {
  MONO_FONT,
  microLabelSx,
  scrollbarSx,
  type JobStatusToken,
} from "#/pages/jobs/jobsTokens";

/** Fixed widths keep the table filling the space next to the sidebar
 *  instead of bunching up on the left. */
export const JOBS_TABLE_COLUMNS = [
  { id: "job", label: "Posao", width: "26%" },
  { id: "phone", label: "Kontakt", width: "14%" },
  { id: "planned", label: "Planirano", width: "15%" },
  { id: "finished", label: "Završeno", width: "15%" },
  { id: "status", label: "Status", width: "12%" },
  { id: "notes", label: "Napomena", width: "18%" },
] as const;

export const jobsTableRootSx: SxProps<Theme> = {
  borderColor: "divider",
  borderRadius: "12px",
  overflow: "hidden",
};

export const jobsTableContainerSx: SxProps<Theme> = scrollbarSx;

export const jobsTableSx: SxProps<Theme> = {
  minWidth: 880,
  tableLayout: "fixed",
};

export const jobsTableHeadRowSx: SxProps<Theme> = {
  bgcolor: "rgba(255,255,255,0.02)",
};

export const jobsTableHeaderCellSx: SxProps<Theme> = {
  ...microLabelSx,
  py: 1.75,
  px: 2.5,
  borderBottom: "1px solid",
  borderColor: "divider",
  whiteSpace: "nowrap",
};

export const jobsTableRowSx: SxProps<Theme> = {
  cursor: "pointer",
  transition: "background-color 160ms ease",
  "@media (hover: hover)": {
    "&:hover": {
      bgcolor: "action.hover",
    },
  },
  "&:active": {
    bgcolor: "action.hover",
  },
  "&:focus-visible": {
    outline: "2px solid",
    outlineColor: "primary.main",
    outlineOffset: -2,
  },
  "&:last-of-type td": {
    borderBottom: 0,
  },
};

export const jobsTableBodyCellSx: SxProps<Theme> = {
  borderColor: "divider",
  py: 1.75,
  px: 2.5,
  verticalAlign: "middle",
};

/** Carries the status rail down the leading edge of the row. */
export const jobsTableLeadCellSx = (token: JobStatusToken): SxProps<Theme> => ({
  ...jobsTableBodyCellSx,
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 6,
    bottom: 6,
    width: 3,
    borderRadius: 2,
    bgcolor: token.rail,
  },
});

export const jobsTableAddressSx: SxProps<Theme> = {
  fontSize: 15,
  fontWeight: 600,
  lineHeight: 1.35,
  color: "text.primary",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const jobsTableClientSx: SxProps<Theme> = {
  fontSize: 13,
  color: "text.secondary",
  mt: 0.25,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const jobsTableMonoCellSx: SxProps<Theme> = {
  ...jobsTableBodyCellSx,
  fontFamily: MONO_FONT,
  fontSize: 13,
  letterSpacing: "-0.01em",
  whiteSpace: "nowrap",
};

export const jobsTableMonoMutedCellSx: SxProps<Theme> = {
  ...jobsTableMonoCellSx,
  color: "text.secondary",
};

export const jobsTablePlannedTimeSx: SxProps<Theme> = {
  fontFamily: MONO_FONT,
  fontSize: 16,
  fontWeight: 700,
  letterSpacing: "-0.02em",
  lineHeight: 1.2,
  color: "primary.light",
};

export const jobsTablePlannedDateSubSx: SxProps<Theme> = {
  fontFamily: MONO_FONT,
  fontSize: 13,
  letterSpacing: "-0.01em",
  mt: 0.25,
};

export const jobsTablePhoneSx: SxProps<Theme> = {
  fontFamily: MONO_FONT,
  fontSize: 13,
  letterSpacing: "-0.01em",
  color: "text.secondary",
  textDecoration: "none",
  position: "relative",
  zIndex: 1,
  "@media (hover: hover)": {
    "&:hover": {
      color: "primary.light",
      textDecoration: "underline",
    },
  },
};

export const jobsTableNotesCellSx: SxProps<Theme> = {
  ...jobsTableBodyCellSx,
  fontSize: 13,
  lineHeight: 1.5,
  color: "text.secondary",
  "& > span": {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
};

/**
 * One column on a phone, two once there is room for them — so the tablet and
 * small-laptop range gets a real layout instead of very wide single cards.
 */
export const jobsCardListSx: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: 1.5,
  alignItems: "start",
};

export const jobsFooterSx: SxProps<Theme> = {
  justifyContent: "space-between",
  alignItems: "center",
  gap: 2,
  px: { xs: 0.5, md: 2.5 },
  py: { xs: 0, md: 2 },
  pt: { xs: 1, md: 2 },
  borderTop: { xs: 0, md: "1px solid" },
  borderColor: { md: "divider" },
};

export const jobsFooterRangeSx: SxProps<Theme> = {
  ...microLabelSx,
  letterSpacing: "0.06em",
};

export const jobsFooterButtonSx: SxProps<Theme> = {
  border: "1px solid",
  borderColor: "divider",
  borderRadius: "8px",
  width: 36,
  height: 36,
  "&.Mui-disabled": {
    borderColor: "rgba(255,255,255,0.06)",
  },
};

export const jobsEmptyStateSx: SxProps<Theme> = {
  alignItems: "center",
  textAlign: "center",
  gap: 1,
  px: 3,
  py: { xs: 6, md: 9 },
  borderRadius: "12px",
  border: "1px dashed",
  borderColor: "divider",
};

export const jobsEmptyIconSx: SxProps<Theme> = {
  fontSize: 32,
  color: "text.secondary",
  opacity: 0.5,
  mb: 0.5,
};

export const jobsEmptyTitleSx: SxProps<Theme> = {
  fontSize: 16,
  fontWeight: 600,
  color: "text.primary",
};

export const jobsEmptyBodySx: SxProps<Theme> = {
  fontSize: 14,
  color: "text.secondary",
  maxWidth: 340,
};
