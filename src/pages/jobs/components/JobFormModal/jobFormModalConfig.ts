import type { SxProps, Theme } from "@mui/material";
import { LABEL_FONT, MONO_FONT } from "#/theme/tokens";

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

export const jobFormModalTimeInputSx: SxProps<Theme> = {
  "& input[type='time']": {
    colorScheme: "dark",
  },
  "& input[type='time']::-webkit-calendar-picker-indicator": {
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
  justifyContent: "space-between",
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

export const jobRoomCardSx: SxProps<Theme> = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: 1.5,
  p: 2,
  pl: 2.25,
  borderRadius: "10px",
  border: "1px solid",
  borderColor: "divider",
  bgcolor: "rgba(255, 255, 255, 0.02)",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    bgcolor: "primary.main",
  },
};

export const jobRoomHeaderSx: SxProps<Theme> = {
  alignItems: "center",
  justifyContent: "space-between",
  gap: 1,
};

export const jobRoomTitleSx: SxProps<Theme> = {
  fontFamily: LABEL_FONT,
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "text.secondary",
};

export const jobRoomRemoveButtonSx: SxProps<Theme> = {
  color: "text.secondary",
  mr: -0.5,
  "&:hover": { color: "error.main", bgcolor: "rgba(244, 67, 54, 0.08)" },
};

export const jobRoomViewServiceSx: SxProps<Theme> = {
  fontFamily: LABEL_FONT,
  fontSize: 17,
  fontWeight: 600,
  color: "text.primary",
  lineHeight: 1.3,
};

export const jobRoomViewMetaSx: SxProps<Theme> = {
  fontFamily: MONO_FONT,
  fontSize: 14.5,
  letterSpacing: "-0.01em",
  color: "text.secondary",
};

export const jobRoomViewTotalSx: SxProps<Theme> = {
  fontFamily: MONO_FONT,
  fontSize: 18,
  fontWeight: 700,
  letterSpacing: "-0.02em",
  color: "text.primary",
};

export const jobRoomViewTitleSx: SxProps<Theme> = {
  fontFamily: LABEL_FONT,
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  color: "primary.light",
};

export const jobRoomTotalRowSx: SxProps<Theme> = {
  alignItems: "center",
  justifyContent: "space-between",
  pt: 0.5,
};

export const jobRoomTotalLabelSx: SxProps<Theme> = {
  fontSize: 13,
  color: "text.secondary",
};

export const jobRoomTotalValueSx: SxProps<Theme> = {
  fontFamily: MONO_FONT,
  fontSize: 15,
  fontWeight: 700,
  letterSpacing: "-0.01em",
  color: "text.primary",
};

export const jobRoomAddButtonSx: SxProps<Theme> = {
  alignSelf: "flex-start",
  textTransform: "none",
  fontWeight: 600,
  borderStyle: "dashed",
  borderColor: "divider",
  color: "text.secondary",
};

export const jobRoomsTotalBarSx: SxProps<Theme> = {
  alignItems: "center",
  justifyContent: "space-between",
  p: 2,
  borderRadius: "10px",
  bgcolor: "rgba(59, 91, 219, 0.1)",
  border: "1px solid",
  borderColor: "rgba(59, 91, 219, 0.28)",
};

export const jobRoomsTotalLabelSx: SxProps<Theme> = {
  fontFamily: LABEL_FONT,
  fontSize: 13,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "text.secondary",
};

export const jobRoomsTotalValueSx: SxProps<Theme> = {
  fontFamily: MONO_FONT,
  fontSize: 20,
  fontWeight: 700,
  letterSpacing: "-0.02em",
  color: "text.primary",
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

export const jobPhotoPreviewCloseButtonSx: SxProps<Theme> = {
  position: "absolute",
  top: 8,
  right: 8,
  color: "common.white",
  bgcolor: "rgba(0, 0, 0, 0.35)",
  "&:hover": {
    bgcolor: "rgba(0, 0, 0, 0.55)",
  },
};

export const EMPTY_JOB_FORM_VALUES = {
  address: "",
  client_name: "",
  phone: "",
  date: "",
  end_date: "",
  start_time: "",
  date_finished: "",
  notes: "",
};
