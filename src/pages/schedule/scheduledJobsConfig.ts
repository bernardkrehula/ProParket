import type { SxProps, Theme } from "@mui/material";

export const scheduledJobsLoadingSx: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  py: 10,
};

export const scheduledJobsTitleSx: SxProps<Theme> = {
  fontWeight: 700,
};

export const scheduledJobsDayGroupSx: SxProps<Theme> = {
  borderColor: "divider",
  p: 2,
};

export const scheduledJobsDayHeadingSx: SxProps<Theme> = {
  fontWeight: 700,
};

export const scheduledJobsRowSx: SxProps<Theme> = {
  justifyContent: "space-between",
  alignItems: { xs: "flex-start", sm: "center" },
  py: 1.25,
  px: 1.5,
  borderRadius: 1,
  cursor: "pointer",
  "@media (hover: hover)": {
    "&:hover": {
      bgcolor: "action.hover",
    },
  },
  "&:active": {
    bgcolor: "action.hover",
  },
};

export const scheduledJobsRowAddressSx: SxProps<Theme> = {
  fontWeight: 500,
};

export const scheduledJobsStatusChipSx: SxProps<Theme> = {
  fontWeight: 600,
};
