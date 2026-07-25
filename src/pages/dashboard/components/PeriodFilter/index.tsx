import type { MouseEvent } from "react";
import {
  Box,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { PERIOD_OPTIONS } from "#/pages/dashboard/period";
import type { PeriodType } from "#/pages/dashboard/period";
import {
  periodFilterRootSx,
  periodFilterGroupSx,
  periodFilterCustomRowSx,
  periodFilterDateFieldSx,
  periodFilterDashSx,
} from "./periodFilterConfig";

type PeriodFilterProps = {
  period: PeriodType;
  onPeriodChange: (period: PeriodType) => void;
  customFrom: string;
  customTo: string;
  onCustomFromChange: (value: string) => void;
  onCustomToChange: (value: string) => void;
};

const PeriodFilter = ({
  period,
  onPeriodChange,
  customFrom,
  customTo,
  onCustomFromChange,
  onCustomToChange,
}: PeriodFilterProps) => {
  const handlePeriodChange = (
    _event: MouseEvent<HTMLElement>,
    next: PeriodType | null,
  ) => {
    // Ignore deselection so one option is always active.
    if (next) onPeriodChange(next);
  };

  return (
    <Stack direction={{ xs: "column", sm: "row" }} sx={periodFilterRootSx}>
      {period === "custom" ? (
        <Stack
          direction={{ xs: "column", sm: "row" }}
          sx={periodFilterCustomRowSx}
        >
          <TextField
            type="date"
            size="small"
            label="Od"
            value={customFrom}
            onChange={(event) => onCustomFromChange(event.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
            sx={periodFilterDateFieldSx}
          />
          <Box component="span" sx={periodFilterDashSx}>
            –
          </Box>
          <TextField
            type="date"
            size="small"
            label="Do"
            value={customTo}
            onChange={(event) => onCustomToChange(event.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
            sx={periodFilterDateFieldSx}
          />
        </Stack>
      ) : null}

      <ToggleButtonGroup
        exclusive
        value={period}
        onChange={handlePeriodChange}
        aria-label="Razdoblje"
        sx={periodFilterGroupSx}
      >
        {PERIOD_OPTIONS.map((option) => (
          <ToggleButton key={option.value} value={option.value}>
            {option.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
};

export default PeriodFilter;
