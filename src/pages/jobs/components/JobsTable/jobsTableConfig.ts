import type { SxProps, Theme } from "@mui/material";

export const jobsTableRootSx: SxProps<Theme> = {
  borderColor: "divider",
};

export const jobsTableHeaderCellSx: SxProps<Theme> = {
  color: "text.secondary",
  border: 0,
  fontSize: 15,
};

export const jobsTableBodyCellSx: SxProps<Theme> = {
  borderColor: "divider",
  fontSize: 15,
};

export const jobsTableRowSx: SxProps<Theme> = {
  cursor: "pointer",
  "&:hover": {
    bgcolor: "action.hover",
  },
};

export const jobsTableFooterSx: SxProps<Theme> = {
  justifyContent: "space-between",
  alignItems: "center",
  px: 3,
  py: 2,
};
