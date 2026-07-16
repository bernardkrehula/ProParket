import type { SxProps, Theme } from "@mui/material";

export const jobsLoadingSx: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  py: 10,
  marginTop: 25
};

export const jobsHeaderSx: SxProps<Theme> = {
  justifyContent: "space-between",
  alignItems: "center",
};

export const jobsTitleSx: SxProps<Theme> = {
  fontWeight: 700,
};

export const jobsFiltersSx: SxProps<Theme> = {
  alignItems: "center",
};

export const jobsSearchFieldSx: SxProps<Theme> = {
  flex: 1,
};

export const PAGE_SIZE = 10;
