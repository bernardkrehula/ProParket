import {
  Autocomplete,
  Box,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import NumberStepperField from "#/components/NumberStepperField";
import { formatCurrency } from "#/utils/format";
import { getTotalPrice } from "#/utils/getTotalPrice";
import JobMaterialsFields from "./JobMaterialsFields";
import type {
  JobMaterialFormItem,
  JobRoomFormItem,
} from "#/pages/jobs/components/JobFormModal/utils/jobRoomUtils";
import {
  jobFormModalNumberInputSx,
  jobFormModalRowSx,
  jobRoomCardSx,
  jobRoomHeaderSx,
  jobRoomRemoveButtonSx,
  jobRoomTitleSx,
  jobRoomTotalLabelSx,
  jobRoomTotalRowSx,
  jobRoomTotalValueSx,
} from "#/pages/jobs/components/JobFormModal/utils/jobFormModalConfig";

type JobRoomFieldsProps = {
  room: JobRoomFormItem;
  index: number;
  serviceNames: string[];
  canRemove: boolean;
  onChange: (patch: Partial<JobRoomFormItem>) => void;
  onServicesChange: (services: string[]) => void;
  onRemove: () => void;
};

const JobRoomFields = ({
  room,
  index,
  serviceNames,
  canRemove,
  onChange,
  onServicesChange,
  onRemove,
}: JobRoomFieldsProps) => (
  <Box sx={jobRoomCardSx}>
    <Stack direction="row" sx={jobRoomHeaderSx}>
      <Typography sx={jobRoomTitleSx}>Prostorija {index + 1}</Typography>
      {canRemove && (
        <IconButton
          size="small"
          aria-label={`Ukloni prostoriju ${index + 1}`}
          onClick={onRemove}
          sx={jobRoomRemoveButtonSx}
        >
          <DeleteOutlined fontSize="small" />
        </IconButton>
      )}
    </Stack>

    <TextField
      label="Naziv prostorije"
      value={room.room}
      onChange={(event) => onChange({ room: event.target.value })}
      placeholder="npr. Dnevni boravak"
      fullWidth
    />

    <Autocomplete
      multiple
      options={serviceNames}
      value={room.services}
      onChange={(_event, value) => onServicesChange(value)}
      renderInput={(params) => (
        <TextField {...params} label="Usluge" placeholder="Dodaj uslugu" />
      )}
    />

    <Stack direction={{ xs: "column", sm: "row" }} sx={jobFormModalRowSx}>
      <NumberStepperField
        label="Kvadratura (m²)"
        value={room.square_meters}
        onValueChange={(value) => onChange({ square_meters: value })}
        unit="m²"
        sx={jobFormModalNumberInputSx}
        fullWidth
      />
      <NumberStepperField
        label="Cijena po m²"
        value={room.price_per_m2}
        onValueChange={(value) => onChange({ price_per_m2: value })}
        unit="€"
        sx={jobFormModalNumberInputSx}
        fullWidth
      />
    </Stack>

    <JobMaterialsFields
      materials={room.materials}
      roomIndex={index}
      onChange={(materials: JobMaterialFormItem[]) => onChange({ materials })}
    />

    <Stack direction="row" sx={jobRoomTotalRowSx}>
      <Typography sx={jobRoomTotalLabelSx}>Cijena prostorije</Typography>
      <Typography sx={jobRoomTotalValueSx}>
        {formatCurrency(getTotalPrice(room.square_meters, room.price_per_m2))}
      </Typography>
    </Stack>
  </Box>
);

export default JobRoomFields;
