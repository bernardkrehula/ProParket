import type { SxProps, Theme } from "@mui/material";
import { microLabelSx } from "./jobsTokens";

export const jobsLoadingSx: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  py: 10,
  marginTop: 25,
};

export const jobsHeaderSx: SxProps<Theme> = {
  justifyContent: "space-between",
  alignItems: { xs: "stretch", sm: "flex-end" },
};

export const jobsTitleSx: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: { xs: 22, sm: 26 },
  letterSpacing: "-0.015em",
  lineHeight: 1.2,
};

export const jobsSubtitleSx: SxProps<Theme> = {
  ...microLabelSx,
  mt: 0.75,
};

export const jobsFiltersGroupSx: SxProps<Theme> = {
  alignItems: "stretch",
};

export const jobsPeriodFilterWrapSx: SxProps<Theme> = {
  alignSelf: { xs: "stretch", sm: "flex-end" },
};

export const jobsFiltersSx: SxProps<Theme> = {
  alignItems: { xs: "stretch", sm: "center" },
};

export const jobsSearchFieldSx: SxProps<Theme> = {
  flex: 1,
  maxWidth: { sm: 360 },
};

export const jobsStatusSelectSx: SxProps<Theme> = {
  minWidth: { xs: "100%", sm: 170 },
};

export const PAGE_SIZE = 10;
export const ALL_STATUSES = "all";

export const getJobCountLabel = (count: number) => {
  const lastTwo = count % 100;
  const last = count % 10;

  if (lastTwo >= 11 && lastTwo <= 14) return `${count} poslova`;
  if (last === 1) return `${count} posao`;
  if (last >= 2 && last <= 4) return `${count} posla`;
  return `${count} poslova`;
};
