import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import { Add, DeleteOutlined } from "@mui/icons-material";
import NumberStepperField from "#/components/NumberStepperField";
import { formatCurrency } from "#/utils/format";
import {
  createEmptyMaterial,
  getMaterialTotal,
  getRoomMaterialsTotal,
  type JobMaterialFormItem,
} from "#/pages/jobs/components/JobFormModal/utils/jobRoomUtils";
import {
  jobMaterialsSectionSx,
  jobMaterialsHeaderSx,
  jobMaterialsTitleSx,
  jobMaterialRowSx,
  jobMaterialNameFieldSx,
  jobMaterialQuantityFieldSx,
  jobMaterialPriceFieldSx,
  jobMaterialRemoveButtonSx,
  jobMaterialLineTotalSx,
  jobMaterialAddButtonSx,
  jobMaterialsEmptySx,
  jobRoomTotalValueSx,
} from "#/pages/jobs/components/JobFormModal/utils/jobFormModalConfig";

type JobMaterialsFieldsProps = {
  materials: JobMaterialFormItem[];
  roomIndex: number;
  onChange: (materials: JobMaterialFormItem[]) => void;
};

const JobMaterialsFields = ({
  materials,
  roomIndex,
  onChange,
}: JobMaterialsFieldsProps) => {
  const updateMaterial = (id: string, patch: Partial<JobMaterialFormItem>) => {
    onChange(
      materials.map((material) =>
        material.id === id ? { ...material, ...patch } : material,
      ),
    );
  };

  const addMaterial = () => onChange([...materials, createEmptyMaterial()]);

  const removeMaterial = (id: string) =>
    onChange(materials.filter((material) => material.id !== id));

  return (
    <Box sx={jobMaterialsSectionSx}>
      <Stack direction="row" sx={jobMaterialsHeaderSx}>
        <Typography sx={jobMaterialsTitleSx}>Materijal</Typography>
        <Typography sx={jobRoomTotalValueSx}>
          {formatCurrency(getRoomMaterialsTotal(materials))}
        </Typography>
      </Stack>

      {materials.length === 0 && (
        <Typography sx={jobMaterialsEmptySx}>
          Nema stavki materijala.
        </Typography>
      )}

      {materials.map((material, index) => (
        <Box key={material.id}>
          <Box sx={jobMaterialRowSx}>
            <TextField
              size="small"
              label="Naziv"
              value={material.name}
              onChange={(event) =>
                updateMaterial(material.id, { name: event.target.value })
              }
              placeholder="npr. Lak"
              sx={jobMaterialNameFieldSx}
            />
            <NumberStepperField
              size="small"
              label="Kom"
              value={material.quantity}
              onValueChange={(value) =>
                updateMaterial(material.id, { quantity: value })
              }
              ariaLabel={`Količina materijala ${index + 1} u prostoriji ${roomIndex + 1}`}
              sx={jobMaterialQuantityFieldSx}
            />
            <NumberStepperField
              size="small"
              label="Cijena"
              value={material.unit_price}
              onValueChange={(value) =>
                updateMaterial(material.id, { unit_price: value })
              }
              unit="€"
              ariaLabel={`Cijena materijala ${index + 1} u prostoriji ${roomIndex + 1}`}
              sx={jobMaterialPriceFieldSx}
            />
            <IconButton
              size="small"
              aria-label={`Ukloni materijal ${index + 1}`}
              onClick={() => removeMaterial(material.id)}
              sx={jobMaterialRemoveButtonSx}
            >
              <DeleteOutlined fontSize="small" />
            </IconButton>
          </Box>

          <Typography sx={jobMaterialLineTotalSx}>
            {formatCurrency(getMaterialTotal(material))}
          </Typography>
        </Box>
      ))}

      <Button
        size="small"
        startIcon={<Add />}
        onClick={addMaterial}
        sx={jobMaterialAddButtonSx}
      >
        Dodaj materijal
      </Button>
    </Box>
  );
};

export default JobMaterialsFields;
