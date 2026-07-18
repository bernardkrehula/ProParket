import type { SxProps, Theme } from "@mui/material";

export const loginRootSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  bgcolor: "background.default",
  p: 2,
};

export const loginCardSx: SxProps<Theme> = {
  width: "100%",
  maxWidth: 400,
  p: 4,
  borderColor: "divider",
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

export const loginTitleSx: SxProps<Theme> = {
  fontWeight: 700,
  textAlign: "center",
};

export const loginErrorSx: SxProps<Theme> = {
  color: "error.main",
};

export const loginQuestionsSx: SxProps<Theme> = {
  pt: 1,
  borderTop: "1px solid",
  borderColor: "divider",
};

export const loginQuestionRowSx: SxProps<Theme> = {
  alignItems: "center",
  justifyContent: "center",
};
