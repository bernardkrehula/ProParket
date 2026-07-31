import { Stack, Typography } from "@mui/material";
import { formatDate, formatTime } from "#/utils/format";
import {
  jobDetailLabelSx,
  jobDetailValueSx,
  type JobFormValues,
} from "../jobFormModalConfig";

type DetailField = {
  label: string;
  key: keyof JobFormValues;
  isDate?: boolean;
  isTime?: boolean;
  emptyFallback?: string;
};

const JOB_DETAIL_FIELDS: DetailField[] = [
  { label: "Adresa", key: "address" },
  { label: "Klijent", key: "client_name" },
  { label: "Telefon", key: "phone" },
  { label: "Datum početka", key: "date", isDate: true },
  { label: "Datum kraja", key: "end_date", isDate: true, emptyFallback: "-" },
  { label: "Vrijeme početka", key: "start_time", isTime: true },
  {
    label: "Datum završetka",
    key: "date_finished",
    isDate: true,
    emptyFallback: "U tijeku",
  },
  { label: "Napomena", key: "notes" },
];

type JobDetailsViewProps = {
  values: JobFormValues;
};

/** Read-only rendering of the job's fields, shown in view mode. */
const JobDetailsView = ({ values }: JobDetailsViewProps) => (
  <Stack spacing={2}>
    {JOB_DETAIL_FIELDS.map((field) => (
      <Stack key={field.key}>
        <Typography variant="caption" sx={jobDetailLabelSx}>
          {field.label}
        </Typography>
        <Typography
          variant="body1"
          sx={
            field.isDate
              ? { ...jobDetailValueSx, textTransform: "capitalize" }
              : jobDetailValueSx
          }
        >
          {field.isDate
            ? formatDate(values[field.key] || null)
            : field.isTime
              ? formatTime(values[field.key] || null)
              : values[field.key] || (field.emptyFallback ?? "-")}
        </Typography>
      </Stack>
    ))}
  </Stack>
);

export default JobDetailsView;
