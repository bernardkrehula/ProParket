import type { SxProps, Theme } from "@mui/material";

export const jobFormModalTitleSx: SxProps<Theme> = {
  fontWeight: 700,
};

export const jobFormModalContentSx: SxProps<Theme> = {
  pt: 2,
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

export const jobPhotoPreviewImageSx: SxProps<Theme> = {
  width: "100%",
  aspectRatio: "1 / 1",
  maxHeight: "80vh",
  objectFit: "contain",
  display: "block",
  bgcolor: "background.default",
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
