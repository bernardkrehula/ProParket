import type { SxProps, Theme } from "@mui/material";

export const jobFormModalTitleSx: SxProps<Theme> = {
  fontWeight: 700,
};

export const jobFormModalPaperSx: SxProps<Theme> = {
  maxHeight: { sm: "80vh" },
};

export const jobFormModalContentSx: SxProps<Theme> = {
  pt: 3,
  scrollbarWidth: { xs: "none", sm: "thin" },
  scrollbarColor: "#3b5bdb transparent",
  "&::-webkit-scrollbar": {
    width: { xs: 0, sm: 6 },
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
};

export const jobFormModalFieldsSx: SxProps<Theme> = {
  mt: 2,
};

export const jobFormModalRowSx: SxProps<Theme> = {
  gap: 2,
};

export const jobFormModalDateInputSx: SxProps<Theme> = {
  "& input[type='date']": {
    colorScheme: "dark",
  },
  "& input[type='date']::-webkit-calendar-picker-indicator": {
    cursor: "pointer",
  },
};

export const jobFormModalNumberInputSx: SxProps<Theme> = {
  "& input[type='number']": {
    colorScheme: "dark",
    MozAppearance: "textfield",
  },
  "& input[type='number']::-webkit-inner-spin-button, & input[type='number']::-webkit-outer-spin-button":
    {
      WebkitAppearance: "none",
      margin: 0,
    },
};

export const jobFormModalStepperButtonsSx: SxProps<Theme> = {
  mr: -1,
};

export const jobFormModalStepperButtonSx: SxProps<Theme> = {
  p: 0,
  height: 16,
  width: 20,
  borderRadius: 0.5,
  color: "text.secondary",
  "&:hover": {
    color: "primary.main",
    bgcolor: "action.hover",
  },
};

export const jobFormModalActionsSx: SxProps<Theme> = {
  px: 3,
  pb: 3,
};

export const jobFormModalCancelButtonSx: SxProps<Theme> = {
  color: "text.secondary",
};

export const jobDetailLabelSx: SxProps<Theme> = {
  color: "text.secondary",
};

export const jobDetailValueSx: SxProps<Theme> = {
  fontWeight: 500,
};

export const jobPhotoSectionSx: SxProps<Theme> = {
  pt: 1,
  borderTop: "1px solid",
  borderColor: "divider",
};

export const jobItemSectionSx: SxProps<Theme> = {
  pt: 1,
  borderTop: "1px solid",
  borderColor: "divider",
};

export const jobPhotoActionsRowSx: SxProps<Theme> = {
  alignItems: "center",
};

export const jobPhotoGridSx: SxProps<Theme> = {
  display: "flex",
  flexWrap: "wrap",
  gap: 1,
};

export const jobPhotoThumbnailWrapperSx: SxProps<Theme> = {
  position: "relative",
  width: 64,
  height: 64,
};

export const jobPhotoThumbnailSx: SxProps<Theme> = {
  width: "100%",
  height: "100%",
  borderRadius: 1,
  objectFit: "cover",
  cursor: "pointer",
  border: "1px solid",
  borderColor: "divider",
};

export const jobPhotoDeleteButtonSx: SxProps<Theme> = {
  position: "absolute",
  top: -6,
  right: -6,
  width: 20,
  height: 20,
  color: "common.white",
  bgcolor: "rgba(0, 0, 0, 0.55)",
  "&:hover": {
    bgcolor: "error.main",
  },
};

export const jobPhotoPreviewBackdropSx = {
  backdropFilter: "blur(16px)",
  bgcolor: "rgba(0, 0, 0, 0.55)",
};

export const jobPhotoPreviewPaperSx: SxProps<Theme> = {
  bgcolor: "transparent",
  boxShadow: "none",
};

export const jobPhotoPreviewContainerSx: SxProps<Theme> = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: { xs: "100dvh", sm: "80vh" },
  bgcolor: "transparent",
  boxShadow: "none",
};

export const jobPhotoPreviewImageSx: SxProps<Theme> = {
  maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "contain",
  display: "block",
  borderRadius: 1,
};

export const jobPhotoPreviewNavButtonSx: SxProps<Theme> = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  color: "common.white",
  bgcolor: "rgba(0, 0, 0, 0.35)",
  "&:hover": {
    bgcolor: "rgba(0, 0, 0, 0.55)",
  },
};

export const jobPhotoPreviewPrevButtonSx: SxProps<Theme> = {
  ...jobPhotoPreviewNavButtonSx,
  left: { xs: 8, sm: 16 },
};

export const jobPhotoPreviewNextButtonSx: SxProps<Theme> = {
  ...jobPhotoPreviewNavButtonSx,
  right: { xs: 8, sm: 16 },
};

export const EMPTY_JOB_FORM_VALUES = {
  address: "",
  client_name: "",
  phone: "",
  date: "",
  date_finished: "",
  notes: "",
};

export const JOB_SERVICE_OPTIONS = [
  "Brušenje",
  "Postavljanje",
  "Lakiranje",
  "Parket",
  "Laminat",
  "Vinil",
];

export const JOB_SERVICE_ID_TO_NAME: Record<string, string> = {
  "b2b2c3d4-0001-4b1b-9c1a-222222222222": "Brušenje",
  "b2b2c3d4-0002-4b1b-9c1a-222222222222": "Lakiranje",
  "b2b2c3d4-0003-4b1b-9c1a-222222222222": "Postavljanje",
  "b2b2c3d4-0004-4b1b-9c1a-222222222222": "Parket",
  "b2b2c3d4-0005-4b1b-9c1a-222222222222": "Laminat",
  "b2b2c3d4-0006-4b1b-9c1a-222222222222": "Vinil",
};

export const JOB_SERVICE_NAME_TO_ID: Record<string, string> = Object.fromEntries(
  Object.entries(JOB_SERVICE_ID_TO_NAME).map(([id, name]) => [name, id]),
);
