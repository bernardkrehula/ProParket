import { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import NumberStepperField from "#/components/NumberStepperField";
import type { NewInvestment } from "#/api/investments/requestAddInvestment";
import { formatCurrency, todayInputValue } from "#/utils/format";
import {
  INVESTMENT_CATEGORIES,
  investmentsAddPaperSx,
  investmentsAddLabelSx,
  investmentsAddGridSx,
  investmentsAddSecondaryGridSx,
  investmentsAddFooterSx,
  investmentsAddTotalSx,
  investmentsAddButtonSx,
} from "#/pages/investments/investmentsConfig";
import { jobFormModalDateInputSx } from "#/pages/jobs/components/JobFormModal/utils/jobFormModalConfig";

type AddInvestmentFormProps = {
  onAdd: (investment: NewInvestment) => void;
  isAdding: boolean;
};

const AddInvestmentForm = ({ onAdd, isAdding }: AddInvestmentFormProps) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(INVESTMENT_CATEGORIES[0].value);
  const [unitPrice, setUnitPrice] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [purchaseDate, setPurchaseDate] = useState(todayInputValue());
  const [supplier, setSupplier] = useState("");
  const [notes, setNotes] = useState("");

  const trimmedName = name.trim();
  const parsedPrice = Number(unitPrice);
  const parsedQuantity = Number(quantity);

  const isPriceValid =
    unitPrice.trim() !== "" && !Number.isNaN(parsedPrice) && parsedPrice >= 0;
  const isQuantityValid = !Number.isNaN(parsedQuantity) && parsedQuantity > 0;
  const canAdd =
    trimmedName !== "" &&
    isPriceValid &&
    isQuantityValid &&
    purchaseDate !== "" &&
    !isAdding;

  const total = isPriceValid && isQuantityValid ? parsedPrice * parsedQuantity : 0;

  const handleAdd = () => {
    if (!canAdd) return;

    onAdd({
      name: trimmedName,
      category,
      unit_price: parsedPrice,
      quantity: parsedQuantity,
      purchase_date: purchaseDate,
      supplier: supplier.trim() || null,
      notes: notes.trim() || null,
    });

    setName("");
    setUnitPrice("");
    setQuantity("1");
    setPurchaseDate(todayInputValue());
    setSupplier("");
    setNotes("");
  };

  return (
    <Paper variant="outlined" sx={investmentsAddPaperSx}>
      <Typography sx={investmentsAddLabelSx}>Novo ulaganje</Typography>

      <Box sx={investmentsAddGridSx}>
        <TextField
          size="small"
          label="Naziv"
          value={name}
          onChange={(event) => setName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleAdd();
          }}
          placeholder="npr. Brusilica"
          fullWidth
        />
        <TextField
          select
          size="small"
          label="Kategorija"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          fullWidth
        >
          {INVESTMENT_CATEGORIES.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <NumberStepperField
          size="small"
          label="Cijena"
          value={unitPrice}
          onValueChange={setUnitPrice}
          unit="€"
          onEnter={handleAdd}
          ariaLabel="Cijena ulaganja"
          fullWidth
        />
        <NumberStepperField
          size="small"
          label="Količina"
          value={quantity}
          onValueChange={setQuantity}
          min={1}
          onEnter={handleAdd}
          ariaLabel="Količina"
          fullWidth
        />
      </Box>

      <Box sx={investmentsAddSecondaryGridSx}>
        <TextField
          size="small"
          type="date"
          label="Datum kupnje"
          value={purchaseDate}
          onChange={(event) => setPurchaseDate(event.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={jobFormModalDateInputSx}
          fullWidth
        />
        <TextField
          size="small"
          label="Dobavljač"
          value={supplier}
          onChange={(event) => setSupplier(event.target.value)}
          placeholder="npr. Bauhaus"
          fullWidth
        />
      </Box>

      <Box sx={investmentsAddSecondaryGridSx}>
        <TextField
          size="small"
          label="Bilješka"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Neobavezno"
          fullWidth
          multiline
          minRows={1}
          sx={{ gridColumn: { sm: "1 / -1" } }}
        />
      </Box>

      <Stack direction={{ xs: "column", sm: "row" }} sx={investmentsAddFooterSx}>
        <Typography sx={investmentsAddTotalSx}>
          Ukupno: {formatCurrency(total)}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={handleAdd}
          disabled={!canAdd}
          sx={investmentsAddButtonSx}
        >
          Dodaj
        </Button>
      </Stack>
    </Paper>
  );
};

export default AddInvestmentForm;
