import type { SxProps, Theme } from "@mui/material";

/** Hides the browser's native number spinners so our own arrows show instead. */
export const numberStepperFieldSx: SxProps<Theme> = {
  "& input[type='number']": {
    MozAppearance: "textfield",
  },
  "& input[type='number']::-webkit-inner-spin-button, & input[type='number']::-webkit-outer-spin-button":
    {
      WebkitAppearance: "none",
      margin: 0,
    },
};

export const numberStepperUnitSx: SxProps<Theme> = {
  fontSize: 13,
  color: "text.secondary",
  whiteSpace: "nowrap",
};

export const numberStepperButtonsSx: SxProps<Theme> = {
  mr: -0.5,
};

export const numberStepperButtonSx: SxProps<Theme> = {
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
