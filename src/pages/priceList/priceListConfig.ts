import type { SxProps, Theme } from "@mui/material";
import { LABEL_FONT, MONO_FONT, microLabelSx } from "#/theme/tokens";

/** One accent per service, assigned by index. Mirrors the dashboard hues. */
export const SERVICE_COLORS = [
  "#7c83f0",
  "#22b389",
  "#ef6c3b",
  "#e0428a",
  "#3b5bdb",
  "#f59e0b",
  "#2bbd8c",
  "#f0913c",
];

export const priceListLoadingSx: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  py: 10,
  marginTop: 25,
};

export const priceListTitleSx: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: { xs: 22, sm: 26 },
  letterSpacing: "-0.015em",
  lineHeight: 1.2,
};

export const priceListSubtitleSx: SxProps<Theme> = {
  ...microLabelSx,
  mt: 0.75,
};

export const priceListGridSx: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(auto-fill, minmax(250px, 1fr))",
  },
  gap: 2,
  alignItems: "start",
};

export const priceCardSx = (color: string): SxProps<Theme> => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: 2,
  p: 2.5,
  pl: 3,
  borderRadius: "12px",
  border: "1px solid",
  borderColor: "divider",
  bgcolor: "background.paper",
  overflow: "hidden",
  transition: "border-color 160ms ease",
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    bgcolor: color,
  },
  "@media (hover: hover)": {
    "&:hover": {
      borderColor: color,
    },
  },
});

export const priceCardHeaderSx: SxProps<Theme> = {
  direction: "row",
  alignItems: "center",
  gap: 1,
};

export const priceCardDeleteButtonSx: SxProps<Theme> = {
  ml: "auto",
  mr: -0.5,
  color: "text.secondary",
  "&:hover": {
    color: "error.main",
    bgcolor: "rgba(244, 67, 54, 0.08)",
  },
};

export const priceListAddPaperSx: SxProps<Theme> = {
  p: 2.5,
  borderRadius: "12px",
  border: "1px dashed",
  borderColor: "divider",
  bgcolor: "transparent",
};

export const priceListAddLabelSx: SxProps<Theme> = {
  ...microLabelSx,
  mb: 1.5,
};

export const priceListAddRowSx: SxProps<Theme> = {
  gap: 1.5,
  alignItems: { xs: "stretch", sm: "flex-start" },
};

export const priceListAddNameFieldSx: SxProps<Theme> = {
  flex: 1,
};

export const priceListAddPriceFieldSx: SxProps<Theme> = {
  width: { xs: "100%", sm: 150 },
  flexShrink: 0,
  "& input": {
    fontFamily: MONO_FONT,
  },
};

export const priceListAddButtonSx: SxProps<Theme> = {
  flexShrink: 0,
  minHeight: 40,
  px: 3,
};

export const priceCardDot = (color: string): SxProps<Theme> => ({
  width: 9,
  height: 9,
  borderRadius: "3px",
  bgcolor: color,
  flexShrink: 0,
});

export const priceCardNameSx: SxProps<Theme> = {
  fontFamily: LABEL_FONT,
  fontSize: 16,
  fontWeight: 600,
  color: "text.primary",
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const priceCardLabelSx: SxProps<Theme> = {
  ...microLabelSx,
  fontSize: 10,
  mb: 0.75,
};

export const priceCardFieldSx: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    bgcolor: "rgba(255,255,255,0.03)",
  },
  "& input": {
    fontFamily: MONO_FONT,
    fontSize: 24,
    fontWeight: 600,
    letterSpacing: "-0.02em",
    padding: "10px 12px",
  },
  "& input[type='number']": {
    MozAppearance: "textfield",
  },
  "& input[type='number']::-webkit-inner-spin-button, & input[type='number']::-webkit-outer-spin-button":
    {
      WebkitAppearance: "none",
      margin: 0,
    },
};

export const priceCardUnitSx: SxProps<Theme> = {
  fontFamily: LABEL_FONT,
  fontSize: 13,
  fontWeight: 500,
  color: "text.secondary",
};

export const priceCardSaveButtonSx: SxProps<Theme> = {
  alignSelf: "flex-end",
  minWidth: 96,
};

export const priceListEmptySx: SxProps<Theme> = {
  px: 3,
  py: 6,
  textAlign: "center",
  color: "text.secondary",
  fontSize: 14,
  borderRadius: "12px",
  border: "1px dashed",
  borderColor: "divider",
};
