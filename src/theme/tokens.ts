import type { SxProps, Theme } from "@mui/material";

/**
 * App-wide type and surface primitives, shared across pages so the whole
 * product reads as one system. Both font stacks start with the webfont and
 * fall back to system faces, so the hierarchy survives with no network.
 * Mono keeps figures aligned digit-for-digit down a column; the label face
 * carries small uppercase headings and field names.
 */
export const MONO_FONT =
  '"Roboto Mono", ui-monospace, "Cascadia Mono", "Segoe UI Mono", Menlo, Consolas, monospace';

export const LABEL_FONT =
  '"Outfit", "Roboto", system-ui, "Segoe UI", Helvetica, Arial, sans-serif';

/** Small uppercase label used for headings, column heads and field names. */
export const microLabelSx: SxProps<Theme> = {
  fontFamily: LABEL_FONT,
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.09em",
  textTransform: "uppercase",
  color: "text.secondary",
  lineHeight: 1.4,
};

/** Tabular values: amounts, dates, phone numbers. */
export const monoValueSx: SxProps<Theme> = {
  fontFamily: MONO_FONT,
  fontSize: 13,
  letterSpacing: "-0.01em",
  color: "text.primary",
};

export const scrollbarSx: SxProps<Theme> = {
  scrollbarWidth: "thin",
  scrollbarColor: "rgba(255,255,255,0.2) transparent",
  "&::-webkit-scrollbar": {
    width: 6,
    height: 6,
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
