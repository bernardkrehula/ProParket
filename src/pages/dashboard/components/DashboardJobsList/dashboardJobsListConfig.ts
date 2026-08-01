import type { SxProps, Theme } from "@mui/material";
import { MONO_FONT, LABEL_FONT, microLabelSx } from "#/theme/tokens";

export type JobsSort = "price_desc" | "price_asc" | "date_asc" | "date_desc";

export const JOBS_SORT_OPTIONS: { value: JobsSort; label: string }[] = [
  { value: "price_desc", label: "Cijena: najviša" },
  { value: "price_asc", label: "Cijena: najniža" },
  { value: "date_asc", label: "Datum: najstariji" },
  { value: "date_desc", label: "Datum: najnoviji" },
];

export const jobsListRootSx: SxProps<Theme> = {
  p: 3,
  borderRadius: "12px",
  borderColor: "divider",
};

export const jobsListHeaderSx: SxProps<Theme> = {
  direction: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 2,
  mb: 2,
};

export const jobsListTitleSx: SxProps<Theme> = microLabelSx;

export const jobsListSortSelectSx: SxProps<Theme> = {
  minWidth: 172,
  borderRadius: "10px",
  "& .MuiSelect-select": {
    fontFamily: LABEL_FONT,
    fontSize: 13,
    fontWeight: 500,
    py: 0.85,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "divider",
  },
};

export const jobsListSx: SxProps<Theme> = {
  gap: 0.5,
};

export const jobsListRowSx: SxProps<Theme> = {
  position: "relative",
  borderRadius: "10px",
  px: 1.75,
  py: 1.25,
  overflow: "hidden",
  transition: "background-color 160ms ease",
  "@media (hover: hover)": {
    "&:hover": {
      bgcolor: "rgba(255, 255, 255, 0.02)",
    },
  },
};

export const jobsListRowFill = (pct: number): SxProps<Theme> => ({
  position: "absolute",
  left: 0,
  top: 0,
  bottom: 0,
  width: `${pct}%`,
  minWidth: pct > 0 ? 3 : 0,
  borderRadius: "10px",
  background:
    "linear-gradient(90deg, rgba(59, 91, 219, 0.22) 0%, rgba(59, 91, 219, 0.05) 100%)",
  transition: "width 260ms ease",
});

export const jobsListRowContentSx: SxProps<Theme> = {
  position: "relative",
  zIndex: 1,
  alignItems: "center",
  justifyContent: "space-between",
  gap: 2,
};

export const jobsListLeadSx: SxProps<Theme> = {
  minWidth: 0,
};

export const jobsListAddressSx: SxProps<Theme> = {
  fontFamily: LABEL_FONT,
  fontSize: 14.5,
  fontWeight: 600,
  color: "text.primary",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const jobsListMetaSx: SxProps<Theme> = {
  fontSize: 13,
  color: "text.secondary",
  mt: 0.25,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const jobsListTrailSx: SxProps<Theme> = {
  textAlign: "right",
  flexShrink: 0,
};

export const jobsListPriceSx: SxProps<Theme> = {
  fontFamily: MONO_FONT,
  fontSize: 16,
  fontWeight: 700,
  letterSpacing: "-0.02em",
  color: "text.primary",
  lineHeight: 1.2,
};

export const jobsListDateSx: SxProps<Theme> = {
  fontFamily: MONO_FONT,
  fontSize: 12,
  color: "text.secondary",
  mt: 0.25,
};

export const jobsListEmptySx: SxProps<Theme> = {
  py: 5,
  textAlign: "center",
  color: "text.secondary",
  fontSize: 14,
};
