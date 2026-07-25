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
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { requestServices } from "#/api/services/requestServices";
import type { ServiceRow } from "#/api/services/requestServices";
import { requestUpdateServicePrice } from "#/api/services/requestUpdateServicePrice";
import { requestAddService } from "#/api/services/requestAddService";
import { requestDeleteService } from "#/api/services/requestDeleteService";
import ServicePriceCard from "./components/ServicePriceRow";
import AddServiceForm from "./components/AddServiceForm";
import {
  SERVICE_COLORS,
  priceListLoadingSx,
  priceListTitleSx,
  priceListSubtitleSx,
  priceListGridSx,
  priceListEmptySx,
} from "./priceListConfig";

const PriceList = () => {
  const queryClient = useQueryClient();
  const [actionError, setActionError] = useState<string | null>(null);
  const [serviceToDelete, setServiceToDelete] = useState<ServiceRow | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["services"],
    queryFn: requestServices,
  });

  const services = useMemo<ServiceRow[]>(() => {
    return data && "data" in data && data.data ? (data.data as ServiceRow[]) : [];
  }, [data]);

  const onMutationSuccess = () => {
    setActionError(null);
    queryClient.invalidateQueries({ queryKey: ["services"] });
  };

  const updatePriceMutation = useMutation({
    mutationFn: (payload: { id: string; pricePerM2: number }) =>
      requestUpdateServicePrice(payload.id, payload.pricePerM2),
    onSuccess: onMutationSuccess,
    onError: () => setActionError("Spremanje cijene nije uspjelo."),
  });

  const addServiceMutation = useMutation({
    mutationFn: (payload: { name: string; pricePerM2: number }) =>
      requestAddService({ name: payload.name, price_per_m2: payload.pricePerM2 }),
    onSuccess: onMutationSuccess,
    onError: () => setActionError("Dodavanje usluge nije uspjelo."),
  });

  const deleteServiceMutation = useMutation({
    mutationFn: (id: string) => requestDeleteService(id),
    onSuccess: onMutationSuccess,
    onError: () =>
      setActionError(
        "Brisanje nije uspjelo. Uslugu koja se koristi u poslovima nije moguće obrisati.",
      ),
  });

  const onSavePrice = (id: string, pricePerM2: number) => {
    updatePriceMutation.mutate({ id, pricePerM2 });
  };

  const onAddService = (name: string, pricePerM2: number) => {
    addServiceMutation.mutate({ name, pricePerM2 });
  };

  const confirmDelete = () => {
    if (!serviceToDelete) return;
    deleteServiceMutation.mutate(serviceToDelete.id);
    setServiceToDelete(null);
  };

  const header = (
    <Box>
      <Typography variant="h5" sx={priceListTitleSx}>
        Cjenik
      </Typography>
      <Typography sx={priceListSubtitleSx}>
        Zadane cijene po m² za usluge
      </Typography>
    </Box>
  );

  // Fixed-position toast so errors are visible on click even when scrolled down.
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
        <Box sx={priceListLoadingSx}>
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
          Nešto je pošlo po krivu prilikom učitavanja cjenika.
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      {header}

      <AddServiceForm
        existingNames={services.map((service) => service.name)}
        onAdd={onAddService}
        isAdding={addServiceMutation.isPending}
      />

      {services.length === 0 ? (
        <Box sx={priceListEmptySx}>
          Nema usluga u cjeniku. Dodaj prvu uslugu iznad.
        </Box>
      ) : (
        <Box sx={priceListGridSx}>
          {services.map((service, index) => (
            <ServicePriceCard
              key={`${service.id}-${service.price_per_m2}`}
              service={service}
              color={SERVICE_COLORS[index % SERVICE_COLORS.length]}
              onSave={onSavePrice}
              onDelete={setServiceToDelete}
              isSaving={updatePriceMutation.isPending}
              isDeleting={
                deleteServiceMutation.isPending &&
                deleteServiceMutation.variables === service.id
              }
            />
          ))}
        </Box>
      )}

      <Dialog
        open={Boolean(serviceToDelete)}
        onClose={() => setServiceToDelete(null)}
      >
        <DialogTitle>Obrisati uslugu?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Jeste li sigurni da želite obrisati uslugu „{serviceToDelete?.name}
            ”? Ova radnja je nepovratna.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setServiceToDelete(null)}
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

export default PriceList;
