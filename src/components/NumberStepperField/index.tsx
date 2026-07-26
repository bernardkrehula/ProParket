import type { ChangeEvent, KeyboardEvent } from "react";
import { IconButton, Stack, TextField, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  numberStepperFieldSx,
  numberStepperUnitSx,
  numberStepperButtonsSx,
  numberStepperButtonSx,
} from "./numberStepperFieldConfig";

type NumberStepperFieldProps = {
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  unit?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  error?: boolean;
  step?: number;
  min?: number;
  onEnter?: () => void;
  ariaLabel?: string;
  sx?: SxProps<Theme>;
};

const NumberStepperField = ({
  value,
  onValueChange,
  label,
  unit,
  size,
  fullWidth,
  error,
  step = 1,
  min = 0,
  onEnter,
  ariaLabel,
  sx,
}: NumberStepperFieldProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange(event.target.value);
  };

  const handleStep = (direction: 1 | -1) => () => {
    onValueChange(String(Math.max(min, (Number(value) || 0) + direction * step)));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && onEnter) onEnter();
  };

  return (
    <TextField
      type="number"
      label={label}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      error={error}
      size={size}
      fullWidth={fullWidth}
      sx={[
        numberStepperFieldSx,
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
      slotProps={{
        htmlInput: { min, step, "aria-label": ariaLabel },
        input: {
          endAdornment: (
            <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
              {unit && <Typography sx={numberStepperUnitSx}>{unit}</Typography>}
              <Stack sx={numberStepperButtonsSx}>
                <IconButton
                  size="small"
                  disableRipple
                  onClick={handleStep(1)}
                  sx={numberStepperButtonSx}
                  aria-label="Povećaj"
                >
                  <KeyboardArrowUpIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  size="small"
                  disableRipple
                  onClick={handleStep(-1)}
                  sx={numberStepperButtonSx}
                  aria-label="Smanji"
                >
                  <KeyboardArrowDownIcon fontSize="inherit" />
                </IconButton>
              </Stack>
            </Stack>
          ),
        },
      }}
    />
  );
};

export default NumberStepperField;
