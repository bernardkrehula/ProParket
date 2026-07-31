import type { ChangeEvent } from "react";
import { Stack, TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import {
  jobFormModalDateInputSx,
  jobFormModalFieldsSx,
  jobFormModalRowSx,
  jobFormModalTimeInputSx,
  type JobFormValues,
} from "../jobFormModalConfig";

type JobFormFieldsProps = {
  values: JobFormValues;
  isNewJob: boolean;
  /** Turns on the "Obavezno polje." messages after a failed submit. */
  showErrors: boolean;
  onValueChange: (field: keyof JobFormValues, value: string) => void;
};

/** Editable job fields, shown in edit mode. */
const JobFormFields = ({
  values,
  isNewJob,
  showErrors,
  onValueChange,
}: JobFormFieldsProps) => {
  const handleChange =
    (field: keyof JobFormValues) => (event: ChangeEvent<HTMLInputElement>) => {
      onValueChange(field, event.target.value);
    };

  const isFieldInvalid = (field: keyof JobFormValues) =>
    showErrors && !values[field].trim();

  const requiredProps = (field: keyof JobFormValues) => ({
    required: true,
    error: isFieldInvalid(field),
    helperText: isFieldInvalid(field) ? "Obavezno polje." : undefined,
  });

  return (
    <Stack spacing={2} sx={jobFormModalFieldsSx}>
      <TextField
        label="Adresa"
        value={values.address}
        onChange={handleChange("address")}
        {...requiredProps("address")}
        fullWidth
      />

      <Stack direction={{ xs: "column", sm: "row" }} sx={jobFormModalRowSx}>
        <TextField
          label="Klijent"
          value={values.client_name}
          onChange={handleChange("client_name")}
          {...requiredProps("client_name")}
          fullWidth
        />
        <MuiTelInput
          label="Telefon"
          value={values.phone}
          onChange={(value) => onValueChange("phone", value)}
          defaultCountry="HR"
          langOfCountryName="hr"
          {...requiredProps("phone")}
          fullWidth
        />
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} sx={jobFormModalRowSx}>
        <TextField
          label="Datum početka"
          type="date"
          value={values.date}
          onChange={handleChange("date")}
          {...requiredProps("date")}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={jobFormModalDateInputSx}
          fullWidth
        />
        <TextField
          label="Datum kraja"
          type="date"
          value={values.end_date}
          onChange={handleChange("end_date")}
          slotProps={{
            inputLabel: { shrink: true },
            htmlInput: { min: values.date || undefined },
          }}
          helperText="Ostavi prazno za jednodnevni posao"
          sx={jobFormModalDateInputSx}
          fullWidth
        />
      </Stack>

      <TextField
        label="Vrijeme početka"
        type="time"
        value={values.start_time}
        onChange={handleChange("start_time")}
        {...requiredProps("start_time")}
        slotProps={{ inputLabel: { shrink: true } }}
        sx={jobFormModalTimeInputSx}
        fullWidth
      />

      {!isNewJob && (
        <TextField
          label="Datum završetka"
          type="date"
          value={values.date_finished}
          onChange={handleChange("date_finished")}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={jobFormModalDateInputSx}
          fullWidth
        />
      )}

      <TextField
        label="Napomena"
        value={values.notes}
        onChange={handleChange("notes")}
        multiline
        rows={3}
        fullWidth
      />
    </Stack>
  );
};

export default JobFormFields;
