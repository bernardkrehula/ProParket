import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import NumberStepperField from "#/components/NumberStepperField";
import InvestmentReceipts from "./InvestmentReceipts";
import type { InvestmentRow } from "#/api/investments/requestInvestments";
import type { NewInvestment } from "#/api/investments/requestAddInvestment";
import { formatCurrency, formatDateShort, toDateInputValue } from "#/utils/format";
import { jobFormModalDateInputSx } from "#/pages/jobs/components/JobFormModal/utils/jobFormModalConfig";
import {
  INVESTMENT_CATEGORIES,
  getCategory,
  investmentCardSx,
  investmentCardHeaderSx,
  investmentCardDot,
  investmentCardNameSx,
  investmentCardDeleteButtonSx,
  investmentCardActionButtonSx,
  investmentCardChipSx,
  investmentCardMetaRowSx,
  investmentCardMetaLabelSx,
  investmentCardMetaValueSx,
  investmentCardTotalRowSx,
  investmentCardTotalLabelSx,
  investmentCardTotalValueSx,
  investmentCardNotesSx,
  investmentCardEditGridSx,
  investmentCardEditFullSx,
  investmentCardEditActionsSx,
} from "#/pages/investments/investmentsConfig";

type InvestmentCardProps = {
  investment: InvestmentRow;
  onSave: (id: string, values: Partial<NewInvestment>) => void;
  onDelete: (investment: InvestmentRow) => void;
  isSaving: boolean;
  isDeleting: boolean;
};

const InvestmentCard = ({
  investment,
  onSave,
  onDelete,
  isSaving,
  isDeleting,
}: InvestmentCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(investment.name);
  const [category, setCategory] = useState(investment.category);
  const [unitPrice, setUnitPrice] = useState(String(investment.unit_price));
  const [quantity, setQuantity] = useState(String(investment.quantity));
  const [purchaseDate, setPurchaseDate] = useState(
    toDateInputValue(investment.purchase_date),
  );
  const [supplier, setSupplier] = useState(investment.supplier ?? "");
  const [notes, setNotes] = useState(investment.notes ?? "");

  const accent = getCategory(isEditing ? category : investment.category);

  const parsedPrice = Number(unitPrice);
  const parsedQuantity = Number(quantity);
  const isPriceValid =
    unitPrice.trim() !== "" && !Number.isNaN(parsedPrice) && parsedPrice >= 0;
  const isQuantityValid = !Number.isNaN(parsedQuantity) && parsedQuantity > 0;
  const canSave =
    name.trim() !== "" &&
    isPriceValid &&
    isQuantityValid &&
    purchaseDate !== "" &&
    !isSaving;

  const startEditing = () => {
    setName(investment.name);
    setCategory(investment.category);
    setUnitPrice(String(investment.unit_price));
    setQuantity(String(investment.quantity));
    setPurchaseDate(toDateInputValue(investment.purchase_date));
    setSupplier(investment.supplier ?? "");
    setNotes(investment.notes ?? "");
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!canSave) return;

    onSave(investment.id, {
      name: name.trim(),
      category,
      unit_price: parsedPrice,
      quantity: parsedQuantity,
      purchase_date: purchaseDate,
      supplier: supplier.trim() || null,
      notes: notes.trim() || null,
    });

    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Box sx={investmentCardSx(accent.color)}>
        <Stack direction="row" sx={investmentCardHeaderSx}>
          <Box sx={investmentCardDot(accent.color)} />
          <Typography sx={investmentCardNameSx}>Uredi ulaganje</Typography>
        </Stack>

        <Box sx={investmentCardEditGridSx}>
          <TextField
            size="small"
            label="Naziv"
            value={name}
            onChange={(event) => setName(event.target.value)}
            sx={investmentCardEditFullSx}
            fullWidth
          />
          <NumberStepperField
            size="small"
            label="Cijena"
            value={unitPrice}
            onValueChange={setUnitPrice}
            unit="€"
            error={!isPriceValid}
            onEnter={handleSave}
            ariaLabel={`Cijena za ${investment.name}`}
            fullWidth
          />
          <NumberStepperField
            size="small"
            label="Količina"
            value={quantity}
            onValueChange={setQuantity}
            min={1}
            error={!isQuantityValid}
            onEnter={handleSave}
            ariaLabel={`Količina za ${investment.name}`}
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
            sx={investmentCardEditFullSx}
            fullWidth
          />
          <TextField
            size="small"
            label="Bilješka"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            sx={investmentCardEditFullSx}
            fullWidth
            multiline
            minRows={1}
          />
        </Box>

        <Stack direction="row" sx={investmentCardTotalRowSx}>
          <Typography sx={investmentCardTotalLabelSx}>Uloženo</Typography>
          <Typography sx={investmentCardTotalValueSx}>
            {formatCurrency(
              isPriceValid && isQuantityValid ? parsedPrice * parsedQuantity : 0,
            )}
          </Typography>
        </Stack>

        <Stack direction="row" sx={investmentCardEditActionsSx}>
          <Button
            size="small"
            onClick={() => setIsEditing(false)}
            sx={{ color: "text.secondary" }}
          >
            Odustani
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={handleSave}
            disabled={!canSave}
          >
            Spremi
          </Button>
        </Stack>
      </Box>
    );
  }

  const unitPriceValue = Number(investment.unit_price) || 0;
  const quantityValue = Number(investment.quantity) || 0;

  return (
    <Box sx={investmentCardSx(accent.color)}>
      <Stack direction="row" sx={investmentCardHeaderSx}>
        <Box sx={investmentCardDot(accent.color)} />
        <Typography sx={investmentCardNameSx} title={investment.name}>
          {investment.name}
        </Typography>
        <Tooltip title="Uredi ulaganje">
          <span>
            <IconButton
              size="small"
              disableRipple
              aria-label={`Uredi ${investment.name}`}
              onClick={startEditing}
              sx={{ ...investmentCardActionButtonSx, ml: "auto" }}
            >
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Obriši ulaganje">
          <span>
            <IconButton
              size="small"
              disableRipple
              aria-label={`Obriši ${investment.name}`}
              onClick={() => onDelete(investment)}
              disabled={isDeleting}
              sx={{ ...investmentCardDeleteButtonSx, ml: 0 }}
            >
              <DeleteOutlineRoundedIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>

      <Chip
        label={accent.label}
        size="small"
        sx={investmentCardChipSx(accent.color)}
      />

      <Stack spacing={0.75}>
        <Stack direction="row" sx={investmentCardMetaRowSx}>
          <Typography sx={investmentCardMetaLabelSx}>Cijena</Typography>
          <Typography sx={investmentCardMetaValueSx}>
            {formatCurrency(unitPriceValue)}
          </Typography>
        </Stack>
        <Stack direction="row" sx={investmentCardMetaRowSx}>
          <Typography sx={investmentCardMetaLabelSx}>Količina</Typography>
          <Typography sx={investmentCardMetaValueSx}>{quantityValue}</Typography>
        </Stack>
        <Stack direction="row" sx={investmentCardMetaRowSx}>
          <Typography sx={investmentCardMetaLabelSx}>Kupljeno</Typography>
          <Typography sx={investmentCardMetaValueSx}>
            {formatDateShort(investment.purchase_date)}
          </Typography>
        </Stack>
        {investment.supplier && (
          <Stack direction="row" sx={investmentCardMetaRowSx}>
            <Typography sx={investmentCardMetaLabelSx}>Dobavljač</Typography>
            <Typography
              sx={investmentCardMetaValueSx}
              title={investment.supplier}
            >
              {investment.supplier}
            </Typography>
          </Stack>
        )}
      </Stack>

      {investment.notes && (
        <Typography sx={investmentCardNotesSx}>{investment.notes}</Typography>
      )}

      <Stack direction="row" sx={investmentCardTotalRowSx}>
        <Typography sx={investmentCardTotalLabelSx}>Uloženo</Typography>
        <Typography sx={investmentCardTotalValueSx}>
          {formatCurrency(unitPriceValue * quantityValue)}
        </Typography>
      </Stack>

      <InvestmentReceipts investmentId={investment.id} />
    </Box>
  );
};

export default InvestmentCard;
