import { useState } from "react";
import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import NumberStepperField from "#/components/NumberStepperField";
import {
  priceListAddPaperSx,
  priceListAddLabelSx,
  priceListAddRowSx,
  priceListAddNameFieldSx,
  priceListAddPriceFieldSx,
  priceListAddButtonSx,
} from "#/pages/priceList/priceListConfig";

type AddServiceFormProps = {
  existingNames: string[];
  onAdd: (name: string, pricePerM2: number) => void;
  isAdding: boolean;
};

const AddServiceForm = ({ existingNames, onAdd, isAdding }: AddServiceFormProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const trimmedName = name.trim();
  const parsedPrice = Number(price);
  const isDuplicate = existingNames.some(
    (existing) => existing.toLowerCase() === trimmedName.toLowerCase(),
  );
  const isPriceValid =
    price.trim() !== "" && !Number.isNaN(parsedPrice) && parsedPrice >= 0;
  const canAdd = trimmedName !== "" && !isDuplicate && isPriceValid && !isAdding;

  const handleAdd = () => {
    if (!canAdd) return;
    onAdd(trimmedName, parsedPrice);
    setName("");
    setPrice("");
  };

  return (
    <Paper variant="outlined" sx={priceListAddPaperSx}>
      <Typography sx={priceListAddLabelSx}>Nova usluga</Typography>
      <Stack direction={{ xs: "column", sm: "row" }} sx={priceListAddRowSx}>
        <TextField
          size="small"
          label="Naziv usluge"
          value={name}
          onChange={(event) => setName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleAdd();
          }}
          error={isDuplicate}
          helperText={isDuplicate ? "Usluga s tim nazivom već postoji." : " "}
          sx={priceListAddNameFieldSx}
        />
        <NumberStepperField
          size="small"
          label="Cijena"
          value={price}
          onValueChange={setPrice}
          unit="€/m²"
          onEnter={handleAdd}
          ariaLabel="Cijena nove usluge"
          sx={priceListAddPriceFieldSx}
        />
        <Box>
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={handleAdd}
            disabled={!canAdd}
            sx={priceListAddButtonSx}
          >
            Dodaj
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};

export default AddServiceForm;
