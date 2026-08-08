import type { SxProps, Theme } from "@mui/material";
import { LABEL_FONT, MONO_FONT, microLabelSx } from "#/theme/tokens";

export type InvestmentCategory = {
  value: string;
  label: string;
  color: string;
};

export const INVESTMENT_CATEGORIES: InvestmentCategory[] = [
  { value: "alat", label: "Alat", color: "#7c83f0" },
  { value: "stroj", label: "Stroj", color: "#22b389" },
  { value: "vozilo", label: "Vozilo", color: "#ef6c3b" },
  { value: "materijal", label: "Materijal", color: "#e0428a" },
  { value: "oprema", label: "Oprema", color: "#3b5bdb" },
  { value: "ostalo", label: "Ostalo", color: "#f59e0b" },
];

export const getCategory = (value: string): InvestmentCategory =>
  INVESTMENT_CATEGORIES.find((category) => category.value === value) ??
  INVESTMENT_CATEGORIES[INVESTMENT_CATEGORIES.length - 1];

export const investmentsLoadingSx: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  py: 10,
  marginTop: 25,
};

export const investmentsTitleSx: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: { xs: 22, sm: 26 },
  letterSpacing: "-0.015em",
  lineHeight: 1.2,
};

export const investmentsSubtitleSx: SxProps<Theme> = {
  ...microLabelSx,
  mt: 0.75,
};

export const investmentsSummaryGridSx: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" },
  gap: { xs: 1.5, sm: 2 },
};

export const investmentsSummaryCardSx: SxProps<Theme> = {
  p: { xs: 1.75, sm: 2.25 },
  borderRadius: "12px",
  border: "1px solid",
  borderColor: "divider",
  bgcolor: "background.paper",
  minWidth: 0,
};

export const investmentsSummaryLabelSx: SxProps<Theme> = {
  ...microLabelSx,
  fontSize: 10,
};

export const investmentsSummaryValueSx: SxProps<Theme> = {
  fontFamily: MONO_FONT,
  fontSize: { xs: 18, sm: 22 },
  fontWeight: 700,
  letterSpacing: "-0.02em",
  color: "text.primary",
  mt: 0.5,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const investmentsToolbarSx: SxProps<Theme> = {
  gap: 1.5,
  alignItems: { xs: "stretch", sm: "center" },
};

export const investmentsSearchFieldSx: SxProps<Theme> = {
  flex: 1,
  minWidth: 0,
};

export const investmentsFilterFieldSx: SxProps<Theme> = {
  width: { xs: "100%", sm: 190 },
  flexShrink: 0,
};

export const investmentsAddPaperSx: SxProps<Theme> = {
  p: { xs: 2, sm: 2.5 },
  borderRadius: "12px",
  border: "1px dashed",
  borderColor: "divider",
  bgcolor: "transparent",
};

export const investmentsAddLabelSx: SxProps<Theme> = {
  ...microLabelSx,
  mb: 1.5,
};

export const investmentsAddGridSx: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2, 1fr)",
    md: "2fr 1fr 1fr 1fr",
  },
  gap: 1.5,
  alignItems: "start",
};

export const investmentsAddSecondaryGridSx: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
  gap: 1.5,
  mt: 1.5,
};

export const investmentsAddFooterSx: SxProps<Theme> = {
  gap: 1.5,
  mt: 2,
  alignItems: { xs: "stretch", sm: "center" },
  justifyContent: "space-between",
};

export const investmentsAddTotalSx: SxProps<Theme> = {
  fontFamily: MONO_FONT,
  fontSize: 15,
  fontWeight: 700,
  color: "text.primary",
};

export const investmentsAddButtonSx: SxProps<Theme> = {
  flexShrink: 0,
  minHeight: 40,
  px: 3,
};

export const investmentsGridSx: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(auto-fill, minmax(280px, 1fr))",
  },
  gap: 2,
  alignItems: "start",
};

export const investmentCardSx = (color: string): SxProps<Theme> => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: 1.5,
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

export const investmentCardHeaderSx: SxProps<Theme> = {
  alignItems: "center",
  gap: 1,
};

export const investmentCardDot = (color: string): SxProps<Theme> => ({
  width: 9,
  height: 9,
  borderRadius: "3px",
  bgcolor: color,
  flexShrink: 0,
});

export const investmentCardNameSx: SxProps<Theme> = {
  fontFamily: LABEL_FONT,
  fontSize: 16,
  fontWeight: 600,
  color: "text.primary",
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const investmentCardDeleteButtonSx: SxProps<Theme> = {
  ml: "auto",
  mr: -0.5,
  color: "text.secondary",
  "&:hover": {
    color: "error.main",
    bgcolor: "rgba(244, 67, 54, 0.08)",
  },
};

export const investmentCardChipSx = (color: string): SxProps<Theme> => ({
  alignSelf: "flex-start",
  height: 22,
  fontFamily: LABEL_FONT,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  color,
  bgcolor: `${color}1f`,
  border: "1px solid",
  borderColor: `${color}59`,
});

export const investmentCardMetaRowSx: SxProps<Theme> = {
  alignItems: "center",
  justifyContent: "space-between",
  gap: 1,
};

export const investmentCardMetaLabelSx: SxProps<Theme> = {
  fontSize: 13,
  color: "text.secondary",
};

export const investmentCardMetaValueSx: SxProps<Theme> = {
  fontFamily: MONO_FONT,
  fontSize: 13.5,
  letterSpacing: "-0.01em",
  color: "text.primary",
};

export const investmentCardTotalRowSx: SxProps<Theme> = {
  alignItems: "center",
  justifyContent: "space-between",
  gap: 1,
  pt: 1.25,
  borderTop: "1px solid",
  borderColor: "divider",
};

export const investmentCardTotalLabelSx: SxProps<Theme> = {
  ...microLabelSx,
  fontSize: 10,
};

export const investmentCardTotalValueSx: SxProps<Theme> = {
  fontFamily: MONO_FONT,
  fontSize: 20,
  fontWeight: 700,
  letterSpacing: "-0.02em",
  color: "text.primary",
};

export const investmentCardNotesSx: SxProps<Theme> = {
  fontSize: 12.5,
  color: "text.secondary",
  lineHeight: 1.45,
};

export const investmentCardEditGridSx: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
  gap: 1.25,
};

export const investmentCardEditFullSx: SxProps<Theme> = {
  gridColumn: { sm: "1 / -1" },
};

export const investmentCardEditActionsSx: SxProps<Theme> = {
  gap: 1,
  justifyContent: "flex-end",
  pt: 0.5,
};

export const investmentCardActionButtonSx: SxProps<Theme> = {
  color: "text.secondary",
  mr: -0.5,
  "&:hover": {
    color: "primary.light",
    bgcolor: "rgba(59, 91, 219, 0.12)",
  },
};

export const investmentReceiptsSectionSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  gap: 1,
  pt: 1.25,
  borderTop: "1px dashed",
  borderColor: "divider",
};

export const investmentReceiptsHeaderSx: SxProps<Theme> = {
  alignItems: "center",
  justifyContent: "space-between",
  gap: 1,
};

export const investmentReceiptsLabelSx: SxProps<Theme> = {
  ...microLabelSx,
  fontSize: 10,
};

export const investmentReceiptsAddButtonSx: SxProps<Theme> = {
  textTransform: "none",
  fontWeight: 600,
  fontSize: 12.5,
  color: "primary.light",
  px: 1,
  minWidth: 0,
};

export const investmentReceiptsGridSx: SxProps<Theme> = {
  display: "flex",
  flexWrap: "wrap",
  gap: 1,
};

export const investmentReceiptWrapperSx: SxProps<Theme> = {
  position: "relative",
  width: 56,
  height: 56,
};

export const investmentReceiptThumbnailSx: SxProps<Theme> = {
  width: "100%",
  height: "100%",
  borderRadius: 1,
  objectFit: "cover",
  cursor: "pointer",
  border: "1px solid",
  borderColor: "divider",
};

export const investmentReceiptDeleteButtonSx: SxProps<Theme> = {
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

export const investmentReceiptsEmptySx: SxProps<Theme> = {
  fontSize: 12.5,
  color: "text.disabled",
};

export const investmentsEmptySx: SxProps<Theme> = {
  px: 3,
  py: 6,
  textAlign: "center",
  color: "text.secondary",
  fontSize: 14,
  borderRadius: "12px",
  border: "1px dashed",
  borderColor: "divider",
};
