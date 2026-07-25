import type { SxProps, Theme } from "@mui/material";
import { LABEL_FONT } from "#/theme/tokens";

export const periodFilterRootSx: SxProps<Theme> = {
  gap: 1.5,
  alignItems: { xs: "stretch", sm: "center" },
};

export const periodFilterGroupSx: SxProps<Theme> = {
  bgcolor: "background.paper",
  border: "1px solid",
  borderColor: "divider",
  borderRadius: "10px",
  p: 0.5,
  gap: 0.5,
  // Date fields are DOM-first so they sit on the left on desktop; on a phone
  // the column stacks, so lift the buttons above them (dates land underneath).
  order: { xs: -1, sm: 0 },
  // The group is inline-flex, so force it full width on a phone; otherwise it
  // shrinks to its buttons and leaves dead space beside them.
  width: { xs: "100%", sm: "auto" },
  "& .MuiToggleButtonGroup-grouped": {
    border: 0,
    borderRadius: "8px !important",
    // Grow to fill the row on a phone (from each button's own width, so the
    // longer "Prilagođeno" still fits); natural size on desktop.
    flex: { xs: "1 1 auto", sm: "0 0 auto" },
    px: 1.75,
    py: 0.75,
    fontFamily: LABEL_FONT,
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: "0.01em",
    textTransform: "none",
    color: "text.secondary",
    "&.Mui-selected": {
      bgcolor: "primary.main",
      color: "#fff",
      "&:hover": {
        bgcolor: "primary.main",
      },
    },
    "&:not(.Mui-selected):hover": {
      bgcolor: "rgba(255,255,255,0.04)",
      color: "text.primary",
    },
  },
};

export const periodFilterCustomRowSx: SxProps<Theme> = {
  gap: 1,
  // Stack "Od"/"Do" on a phone — native date inputs won't shrink side-by-side.
  alignItems: { xs: "stretch", sm: "center" },
};

export const periodFilterDateFieldSx: SxProps<Theme> = {
  // Full width when stacked on a phone; fixed beside the buttons on desktop.
  flex: { sm: "0 0 auto" },
  width: { xs: "100%", sm: "auto" },
  minWidth: { sm: 150 },
  "& .MuiOutlinedInput-root": {
    bgcolor: "background.paper",
    borderRadius: "8px",
  },
  "& input": {
    py: 0.9,
    fontSize: 14,
    // Dark-render the native date control so it isn't a white box.
    colorScheme: "dark",
  },
};

export const periodFilterDashSx: SxProps<Theme> = {
  color: "text.secondary",
  px: 0.25,
  display: { xs: "none", sm: "block" },
};
