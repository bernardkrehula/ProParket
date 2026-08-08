import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { requestInvestments } from "#/api/investments/requestInvestments";
import type { InvestmentRow } from "#/api/investments/requestInvestments";
import { requestAddInvestment } from "#/api/investments/requestAddInvestment";
import type { NewInvestment } from "#/api/investments/requestAddInvestment";
import { requestUpdateInvestment } from "#/api/investments/requestUpdateInvestment";
import { requestDeleteInvestment } from "#/api/investments/requestDeleteInvestment";
import AddInvestmentForm from "./components/AddInvestmentForm";
import InvestmentCard from "./components/InvestmentCard";
import InvestmentsSummary from "./components/InvestmentsSummary";
import {
  INVESTMENT_CATEGORIES,
  investmentsLoadingSx,
  investmentsTitleSx,
  investmentsSubtitleSx,
  investmentsToolbarSx,
  investmentsSearchFieldSx,
  investmentsFilterFieldSx,
  investmentsGridSx,
  investmentsEmptySx,
} from "./investmentsConfig";

const ALL_CATEGORIES = "sve";

const Investments = () => {
  const queryClient = useQueryClient();
  const [actionError, setActionError] = useState<string | null>(null);
  const [investmentToDelete, setInvestmentToDelete] =
    useState<InvestmentRow | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(ALL_CATEGORIES);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["investments"],
    queryFn: requestInvestments,
  });

  const investments = useMemo<InvestmentRow[]>(() => {
    return data && "data" in data && data.data
      ? (data.data as InvestmentRow[])
      : [];
  }, [data]);

  const visibleInvestments = useMemo(() => {
    const term = search.trim().toLowerCase();

    return investments.filter((investment) => {
      const matchesCategory =
        categoryFilter === ALL_CATEGORIES ||
        investment.category === categoryFilter;
      if (!matchesCategory) return false;
      if (!term) return true;

      return (
        investment.name.toLowerCase().includes(term) ||
        (investment.supplier ?? "").toLowerCase().includes(term)
      );
    });
  }, [investments, search, categoryFilter]);

  const onMutationSuccess = () => {
    setActionError(null);
    queryClient.invalidateQueries({ queryKey: ["investments"] });
    // Investments feed the dashboard's cost and margin figures.
    queryClient.invalidateQueries({ queryKey: ["dashboard"] });
  };

  const addInvestmentMutation = useMutation({
    mutationFn: (payload: NewInvestment) => requestAddInvestment(payload),
    onSuccess: onMutationSuccess,
    onError: () => setActionError("Dodavanje ulaganja nije uspjelo."),
  });

  const updateInvestmentMutation = useMutation({
    mutationFn: (payload: { id: string; values: Partial<NewInvestment> }) =>
      requestUpdateInvestment(payload.id, payload.values),
    onSuccess: onMutationSuccess,
    onError: () => setActionError("Spremanje ulaganja nije uspjelo."),
  });

  const deleteInvestmentMutation = useMutation({
    mutationFn: (id: string) => requestDeleteInvestment(id),
    onSuccess: onMutationSuccess,
    onError: () => setActionError("Brisanje ulaganja nije uspjelo."),
  });

  const confirmDelete = () => {
    if (!investmentToDelete) return;
    deleteInvestmentMutation.mutate(investmentToDelete.id);
    setInvestmentToDelete(null);
  };

  const header = (
    <Box>
      <Typography variant="h5" sx={investmentsTitleSx}>
        Ulaganja
      </Typography>
      <Typography sx={investmentsSubtitleSx}>
        Alat, strojevi i oprema kupljeni za posao
      </Typography>
    </Box>
  );

  const errorToast = (
    <Snackbar
      open={Boolean(actionError)}
      autoHideDuration={6000}
      onClose={() => setActionError(null)}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        severity="error"
        variant="filled"
        onClose={() => setActionError(null)}
        sx={{ width: "100%" }}
      >
        {actionError}
      </Alert>
    </Snackbar>
  );

  if (isLoading) {
    return (
      <Stack spacing={3}>
        {header}
        <Box sx={investmentsLoadingSx}>
          <CircularProgress size={120} />
        </Box>
      </Stack>
    );
  }

  if (isError) {
    return (
      <Stack spacing={3}>
        {header}
        <Typography color="error">
          Nešto je pošlo po krivu prilikom učitavanja ulaganja.
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      {header}

      <InvestmentsSummary investments={investments} />

      <AddInvestmentForm
        onAdd={(investment) => addInvestmentMutation.mutate(investment)}
        isAdding={addInvestmentMutation.isPending}
      />

      <Stack direction={{ xs: "column", sm: "row" }} sx={investmentsToolbarSx}>
        <TextField
          size="small"
          label="Pretraži"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Naziv ili dobavljač"
          sx={investmentsSearchFieldSx}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          select
          size="small"
          label="Kategorija"
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
          sx={investmentsFilterFieldSx}
        >
          <MenuItem value={ALL_CATEGORIES}>Sve kategorije</MenuItem>
          {INVESTMENT_CATEGORIES.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      {visibleInvestments.length === 0 ? (
        <Box sx={investmentsEmptySx}>
          {investments.length === 0
            ? "Još nema ulaganja. Dodaj prvo ulaganje iznad."
            : "Nema ulaganja koja odgovaraju filtru."}
        </Box>
      ) : (
        <Box sx={investmentsGridSx}>
          {visibleInvestments.map((investment) => (
            <InvestmentCard
              key={investment.id}
              investment={investment}
              onSave={(id, values) =>
                updateInvestmentMutation.mutate({ id, values })
              }
              onDelete={setInvestmentToDelete}
              isSaving={updateInvestmentMutation.isPending}
              isDeleting={
                deleteInvestmentMutation.isPending &&
                deleteInvestmentMutation.variables === investment.id
              }
            />
          ))}
        </Box>
      )}

      <Dialog
        open={Boolean(investmentToDelete)}
        onClose={() => setInvestmentToDelete(null)}
      >
        <DialogTitle>Obrisati ulaganje?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Jeste li sigurni da želite obrisati „{investmentToDelete?.name}”?
            Ova radnja je nepovratna.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setInvestmentToDelete(null)}
            sx={{ color: "text.secondary" }}
          >
            Odustani
          </Button>
          <Button color="error" variant="contained" onClick={confirmDelete}>
            Obriši
          </Button>
        </DialogActions>
      </Dialog>

      {errorToast}
    </Stack>
  );
};

export default Investments;
