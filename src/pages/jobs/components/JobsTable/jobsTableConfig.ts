import type { SxProps, Theme } from "@mui/material";
import type { JobStatus } from "#/utils/getJobStatus";

export const jobsTableRootSx: SxProps<Theme> = {
  borderColor: "divider",
};

export const jobsTableSx: SxProps<Theme> = {
  minWidth: 800,
};

export const jobsTableContainerSx: SxProps<Theme> = {
  scrollbarWidth: { xs: "none", sm: "thin" },
  scrollbarColor: "#3b5bdb transparent",
  "&::-webkit-scrollbar": {
    width: { xs: 0, sm: 6 },
    height: { xs: 0, sm: 6 },
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 8,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "rgba(255,255,255,0.35)",
  },
  "&::-webkit-scrollbar-button": {
    display: "none",
  },
};

export const jobsTableHeaderCellSx: SxProps<Theme> = {
  color: "text.secondary",
  border: 0,
  fontSize: 15,
  whiteSpace: "nowrap",
};

export const jobsTableBodyCellSx: SxProps<Theme> = {
  borderColor: "divider",
  fontSize: 15,
  whiteSpace: "nowrap",
};

export const jobsTableNotesCellSx: SxProps<Theme> = {
  borderColor: "divider",
  fontSize: 15,
  whiteSpace: "nowrap",
  maxWidth: 200,
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export const jobsTableRowSx: SxProps<Theme> = {
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

export const jobsTableStatusChipSx: SxProps<Theme> = {
  fontWeight: 600,
};

export const JOB_STATUS_CHIP_COLOR: Record<JobStatus, "info" | "warning" | "success"> = {
  new: "info",
  in_progress: "warning",
  completed: "success",
};

export const jobsTableFooterSx: SxProps<Theme> = {
  justifyContent: "space-between",
  alignItems: "center",
  px: 3,
  py: 2,
};
