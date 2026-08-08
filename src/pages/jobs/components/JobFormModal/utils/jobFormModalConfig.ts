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
  },
};

export const addressMapPreviewSx: SxProps<Theme> = {
  position: "relative",
  height: 150,
  borderRadius: "10px",
  overflow: "hidden",
  border: "1px solid",
  borderColor: "divider",
  bgcolor: "rgba(255, 255, 255, 0.02)",
  "& .gm-style, & .gm-style > div": {
    borderRadius: "10px",
  },
  "& .gm-style-cc": {
    display: "none",
  },
};

export const addressMapOverlaySx: SxProps<Theme> = {
  position: "absolute",
  inset: 0,
  p: 0,
  border: "none",
  bgcolor: "transparent",
  cursor: "pointer",
  transition: "background-color 120ms ease",
  "&:hover": {
    bgcolor: "rgba(0, 0, 0, 0.12)",
  },
  "&:focus-visible": {
    outline: "2px solid",
    outlineColor: "primary.main",
    outlineOffset: "-2px",
  },
};

export const addressSuggestionsPaperSx: SxProps<Theme> = {
  mt: 0.5,
  borderRadius: "10px",
  border: "1px solid",
  borderColor: "divider",
  backgroundImage: "none",
  bgcolor: "background.paper",
  boxShadow: "0 12px 32px rgba(0, 0, 0, 0.45)",
  "& .MuiAutocomplete-listbox": {
    p: 0.5,
    scrollbarWidth: "thin",
  },
  "& .MuiAutocomplete-option": {
    borderRadius: "8px",
    "&[aria-selected='true'], &.Mui-focused": {
      bgcolor: "rgba(59, 91, 219, 0.16)",
    },
  },
};

export const addressOptionSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "flex-start",
  gap: 1.25,
  minWidth: 0,
};

export const addressOptionIconSx: SxProps<Theme> = {
  fontSize: 18,
  mt: 0.25,
  flexShrink: 0,
  color: "primary.light",
};

export const addressOptionMainSx: SxProps<Theme> = {
  fontFamily: LABEL_FONT,
  fontSize: 14.5,
  fontWeight: 600,
  color: "text.primary",
  lineHeight: 1.35,
};

export const addressOptionSecondarySx: SxProps<Theme> = {
  fontSize: 12.5,
  color: "text.secondary",
  lineHeight: 1.35,
};

export const addressAttributionSx: SxProps<Theme> = {
  display: "block",
  px: 1.5,
  py: 0.75,
  fontSize: 11,
  letterSpacing: "0.02em",
  color: "text.disabled",
  borderTop: "1px solid",
  borderColor: "divider",
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

export const jobMaterialsSectionSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  gap: 1,
  pt: 1.25,
  borderTop: "1px dashed",
  borderColor: "divider",
};

export const jobMaterialsHeaderSx: SxProps<Theme> = {
  alignItems: "center",
  justifyContent: "space-between",
  gap: 1,
};

export const jobMaterialsTitleSx: SxProps<Theme> = {
  fontFamily: LABEL_FONT,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.07em",
  textTransform: "uppercase",
  color: "text.secondary",
};

/**
 * Mobile keeps the name on its own row so quantity and price stay tappable;
 * from `sm` up the whole line collapses into a single row.
 */
export const jobMaterialRowSx: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr auto",
    sm: "minmax(0, 1fr) 88px 116px auto",
  },
  gridTemplateAreas: {
    xs: `"name remove" "qty price"`,
    sm: `"name qty price remove"`,
  },
  gap: 1,
  alignItems: "start",
};

export const jobMaterialNameFieldSx: SxProps<Theme> = {
  gridArea: "name",
  minWidth: 0,
};

export const jobMaterialQuantityFieldSx: SxProps<Theme> = {
  gridArea: "qty",
  minWidth: 0,
  "& input[type='number']": {
    colorScheme: "dark",
  },
};

export const jobMaterialPriceFieldSx: SxProps<Theme> = {
  gridArea: "price",
  minWidth: 0,
  "& input[type='number']": {
    colorScheme: "dark",
  },
};

export const jobMaterialRemoveButtonSx: SxProps<Theme> = {
  gridArea: "remove",
  alignSelf: "center",
  color: "text.secondary",
  "&:hover": { color: "error.main", bgcolor: "rgba(244, 67, 54, 0.08)" },
};

export const jobMaterialLineTotalSx: SxProps<Theme> = {
  fontFamily: MONO_FONT,
  fontSize: 12.5,
  color: "text.secondary",
  textAlign: "right",
  mt: -0.5,
};

export const jobMaterialAddButtonSx: SxProps<Theme> = {
  alignSelf: "flex-start",
  textTransform: "none",
  fontWeight: 600,
  fontSize: 13,
  color: "primary.light",
  px: 1,
};

export const jobMaterialsEmptySx: SxProps<Theme> = {
  fontSize: 12.5,
  color: "text.disabled",
};

export const jobRoomAddButtonSx: SxProps<Theme> = {
  alignSelf: "flex-start",
  textTransform: "none",
  fontWeight: 600,
  borderStyle: "dashed",
  borderColor: "divider",
  color: "text.secondary",
};

export const jobServiceViewRowSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  gap: 0.25,
  pt: 0.5,
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

export type JobFormValues = typeof EMPTY_JOB_FORM_VALUES;
