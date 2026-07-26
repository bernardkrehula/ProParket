import { useState } from "react";
import { Box, Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import type { ServiceRow } from "#/api/services/requestServices";
import NumberStepperField from "#/components/NumberStepperField";
import {
  priceCardSx,
  priceCardHeaderSx,
  priceCardDot,
  priceCardNameSx,
  priceCardDeleteButtonSx,
  priceCardLabelSx,
  priceCardFieldSx,
  priceCardSaveButtonSx,
} from "../priceListConfig";

type ServicePriceCardProps = {
  service: ServiceRow;
  color: string;
  onSave: (id: string, pricePerM2: number) => void;
  onDelete: (service: ServiceRow) => void;
  isSaving: boolean;
  isDeleting: boolean;
};

const ServicePriceCard = ({
  service,
  color,
  onSave,
  onDelete,
  isSaving,
  isDeleting,
}: ServicePriceCardProps) => {
  const [price, setPrice] = useState(String(service.price_per_m2));

  const parsed = Number(price);
  const isValid = price.trim() !== "" && !Number.isNaN(parsed) && parsed >= 0;
  const isDirty = isValid && parsed !== service.price_per_m2;

  const handleSave = () => {
    if (isDirty) onSave(service.id, parsed);
  };

  return (
    <Box sx={priceCardSx(color)}>
      <Stack sx={priceCardHeaderSx}>
        <Box sx={priceCardDot(color)} />
        <Typography sx={priceCardNameSx} title={service.name}>
          {service.name}
        </Typography>
        <Tooltip title="Obriši uslugu">
          <span>
            <IconButton
              size="small"
              disableRipple
              aria-label={`Obriši ${service.name}`}
              onClick={() => onDelete(service)}
              disabled={isDeleting}
              sx={priceCardDeleteButtonSx}
            >
              <DeleteOutlineRoundedIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>

      <Box>
        <Typography sx={priceCardLabelSx}>Cijena po m²</Typography>
        <NumberStepperField
          value={price}
          onValueChange={setPrice}
          unit="€/m²"
          fullWidth
          error={!isValid}
          onEnter={handleSave}
          ariaLabel={`Cijena za ${service.name}`}
          sx={priceCardFieldSx}
        />
      </Box>

      <Button
        variant="contained"
        size="small"
        onClick={handleSave}
        disabled={!isDirty || isSaving}
        sx={priceCardSaveButtonSx}
      >
        Spremi
      </Button>
    </Box>
  );
};

export default ServicePriceCard;
