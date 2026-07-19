import type { SxProps, Theme } from "@mui/material";

export const jobFormModalTitleSx: SxProps<Theme> = {
  fontWeight: 700,
};

export const jobFormModalContentSx: SxProps<Theme> = {
  pt: 3,
  scrollbarWidth: "thin",
  scrollbarColor: "#3b5bdb transparent",
  "&::-webkit-scrollbar": {
    width: 6,
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

export const jobPhotoActionsRowSx: SxProps<Theme> = {
  alignItems: "center",
};

export const jobPhotoGridSx: SxProps<Theme> = {
  display: "flex",
  flexWrap: "wrap",
  gap: 1,
};

export const jobPhotoThumbnailSx: SxProps<Theme> = {
  width: 64,
  height: 64,
  borderRadius: 1,
  objectFit: "cover",
  cursor: "pointer",
  border: "1px solid",
  borderColor: "divider",
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
  date_started: "",
  date_finished: "",
  notes: "",
};
