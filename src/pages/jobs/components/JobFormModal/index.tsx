import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  KeyboardArrowUp,
  KeyboardArrowDown,
  Close,
} from "@mui/icons-material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { JobType } from "#/types/Job.type";
import type { NewJob } from "#/api/jobs/requestAddNewJob";
import {
  requestAddJobPhoto,
  MAX_JOB_PHOTO_SIZE_BYTES,
} from "#/api/jobs/requestAddJobPhoto";
import { requestJobPhotos } from "#/api/jobs/requestJobPhotos";
import { requestDeleteJobPhoto } from "#/api/jobs/requestDeleteJobPhoto";
import { requestJobItems } from "#/api/jobs/requestJobItems";
import { requestSaveJobItems } from "#/api/jobs/requestSaveJobItems";
import type { JobItemInput } from "#/api/jobs/requestSaveJobItems";
import { useClickOutside } from "#/hooks/useClickOutside";
import { GenericError } from "#/utils/GenericError";
import { formatDate } from "#/utils/format";
import {
  jobFormModalTitleSx,
  jobFormModalPaperSx,
  jobFormModalContentSx,
  jobFormModalRowSx,
  jobFormModalDateInputSx,
  jobFormModalNumberInputSx,
  jobFormModalStepperButtonsSx,
  jobFormModalStepperButtonSx,
  jobFormModalActionsSx,
  jobFormModalCancelButtonSx,
  jobDetailLabelSx,
  jobDetailValueSx,
  jobItemSectionSx,
  jobPhotoSectionSx,
  jobPhotoActionsRowSx,
  jobPhotoGridSx,
  jobPhotoThumbnailWrapperSx,
  jobPhotoThumbnailSx,
  jobPhotoDeleteButtonSx,
  jobPhotoPreviewBackdropSx,
  jobPhotoPreviewPaperSx,
  jobPhotoPreviewContainerSx,
  jobPhotoPreviewImageSx,
  jobPhotoPreviewPrevButtonSx,
  jobPhotoPreviewNextButtonSx,
  jobFormModalFieldsSx,
  EMPTY_JOB_FORM_VALUES,
  JOB_SERVICE_OPTIONS,
  JOB_SERVICE_ID_TO_NAME,
  JOB_SERVICE_NAME_TO_ID,
} from "./jobFormModalConfig";

type JobFormValues = typeof EMPTY_JOB_FORM_VALUES;
type ModalMode = "view" | "edit";

type JobFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: NewJob) => Promise<string | undefined>;
  job?: JobType | null;
  isSubmitting?: boolean;
};

type DetailField = {
  label: string;
  key: keyof JobFormValues;
  isDate?: boolean;
  emptyFallback?: string;
};

const JOB_DETAIL_FIELDS: DetailField[] = [
  { label: "Adresa", key: "address" },
  { label: "Klijent", key: "client_name" },
  { label: "Telefon", key: "phone" },
  { label: "Planirani datum", key: "date", isDate: true },
  {
    label: "Datum završetka",
    key: "date_finished",
    isDate: true,
    emptyFallback: "U tijeku",
  },
  { label: "Napomena", key: "notes" },
];

const jobToFormValues = (job?: JobType | null): JobFormValues => {
  if (!job) return EMPTY_JOB_FORM_VALUES;

  return {
    address: job.address,
    client_name: job.client_name,
    phone: job.phone,
    date: job.date,
    date_finished: job.date_finished ?? "",
    notes: job.notes ?? "",
  };
};

type NumberStepperFieldProps = {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
};

const NumberStepperField = ({
  label,
  value,
  onValueChange,
}: NumberStepperFieldProps) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange(event.target.value);
  };

  const onStep = (direction: 1 | -1) => () => {
    onValueChange(String(Math.max(0, (Number(value) || 0) + direction)));
  };

  return (
    <TextField
      label={label}
      type="number"
      value={value}
      onChange={onChange}
      slotProps={{
        htmlInput: { min: 0 },
        input: {
          endAdornment: (
            <Stack sx={jobFormModalStepperButtonsSx}>
              <IconButton
                size="small"
                onClick={onStep(1)}
                sx={jobFormModalStepperButtonSx}
                aria-label={`Povećaj: ${label}`}
              >
                <KeyboardArrowUp fontSize="inherit" />
              </IconButton>
              <IconButton
                size="small"
                onClick={onStep(-1)}
                sx={jobFormModalStepperButtonSx}
                aria-label={`Smanji: ${label}`}
              >
                <KeyboardArrowDown fontSize="inherit" />
              </IconButton>
            </Stack>
          ),
        },
      }}
      sx={jobFormModalNumberInputSx}
      fullWidth
    />
  );
};

type JobItemsFieldsValues = {
  services: string[];
  square_meters: string;
  price_per_m2: string;
  material_cost: string;
};

export type JobItemsFieldsHandle = {
  getValues: () => JobItemsFieldsValues;
};

type JobItemsFieldsProps = {
  defaults: JobItemsFieldsValues;
};

const JobItemsFields = forwardRef<JobItemsFieldsHandle, JobItemsFieldsProps>(
  ({ defaults }, ref) => {
    const [services, setServices] = useState(defaults.services);
    const [squareMeters, setSquareMeters] = useState(defaults.square_meters);
    const [pricePerM2, setPricePerM2] = useState(defaults.price_per_m2);
    const [materialCost, setMaterialCost] = useState(defaults.material_cost);

    useImperativeHandle(ref, () => ({
      getValues: () => ({
        services,
        square_meters: squareMeters,
        price_per_m2: pricePerM2,
        material_cost: materialCost,
      }),
    }));

    return (
      <Stack spacing={2}>
        <Autocomplete
          multiple
          options={JOB_SERVICE_OPTIONS}
          value={services}
          onChange={(_event, newValue) => setServices(newValue)}
          renderInput={(params) => <TextField {...params} label="Usluge" />}
        />

        <Stack direction={{ xs: "column", sm: "row" }} sx={jobFormModalRowSx}>
          <NumberStepperField
            label="Kvadratura (m²)"
            value={squareMeters}
            onValueChange={setSquareMeters}
          />
          <NumberStepperField
            label="Cijena po m²"
            value={pricePerM2}
            onValueChange={setPricePerM2}
          />
        </Stack>

        <NumberStepperField
          label="Trošak materijala"
          value={materialCost}
          onValueChange={setMaterialCost}
        />
      </Stack>
    );
  },
);

JobItemsFields.displayName = "JobItemsFields";

const JobFormModal = ({
  open,
  onClose,
  onSubmit,
  job,
  isSubmitting,
}: JobFormModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [values, setValues] = useState<JobFormValues>(() =>
    jobToFormValues(job),
  );
  const [mode, setMode] = useState<ModalMode>(() => (job ? "view" : "edit"));
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const previewImageRef = useRef<HTMLImageElement>(null);
  const jobItemsFieldsRef = useRef<JobItemsFieldsHandle>(null);

  const isNewJob = !job;
  const isViewMode = mode === "view";

  const queryClient = useQueryClient();

  const photosQuery = useQuery({
    queryKey: ["jobPhotos", job?.id],
    queryFn: () => requestJobPhotos(job!.id),
    enabled: Boolean(job?.id),
  });

  const photos = useMemo(() => {
    const response = photosQuery.data;
    if (!response || !("data" in response) || !response.data) return [];

    return response.data;
  }, [photosQuery.data]);

  const jobItemsQuery = useQuery({
    queryKey: ["jobItems", job?.id],
    queryFn: () => requestJobItems(job!.id),
    enabled: Boolean(job?.id),
  });

  const jobItems = useMemo(() => {
    const response = jobItemsQuery.data;
    if (!response || !("data" in response) || !response.data) return [];

    return response.data;
  }, [jobItemsQuery.data]);

  const jobItemDefaults = useMemo(() => {
    const services = Array.from(
      new Set(
        jobItems
          .map((item) => JOB_SERVICE_ID_TO_NAME[item.service_id])
          .filter((name): name is string => Boolean(name)),
      ),
    );

    const firstItem = jobItems[0];

    return {
      services,
      square_meters: firstItem ? String(firstItem.square_meters) : "",
      price_per_m2: firstItem ? String(firstItem.price_per_m2) : "",
      material_cost: firstItem ? String(firstItem.material_cost) : "",
    };
  }, [jobItems]);

  const addPhotoMutation = useMutation({
    mutationFn: (photo: File) => {
      if (!job) throw new GenericError();
      return requestAddJobPhoto(job.id, photo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobPhotos", job?.id] });
    },
    onError: () => {
      setPhotoError("Došlo je do pogreške prilikom dodavanja fotografije.");
    },
  });

  const deletePhotoMutation = useMutation({
    mutationFn: (fileName: string) => {
      if (!job) throw new GenericError();
      return requestDeleteJobPhoto(job.id, fileName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobPhotos", job?.id] });
    },
    onError: () => {
      setPhotoError("Došlo je do pogreške prilikom brisanja fotografije.");
    },
  });

  const saveJobItemsMutation = useMutation({
    mutationFn: (payload: { jobId: string; items: JobItemInput[] }) =>
      requestSaveJobItems(payload.jobId, payload.items),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["jobItems", variables.jobId] });
    },
  });

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file || !job) return;

    if (file.size > MAX_JOB_PHOTO_SIZE_BYTES) {
      setPhotoError("Fotografija mora biti manja od 1MB.");
      return;
    }

    setPhotoError(null);
    addPhotoMutation.mutate(file);
  };

  const onPreviewPhoto = (index: number) => () => setPreviewIndex(index);

  const onDeletePhoto = (fileName: string) => (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    deletePhotoMutation.mutate(fileName);
  };

  const onClosePreview = () => setPreviewIndex(null);

  const onPrevPhoto = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setPreviewIndex((prev) =>
      prev === null ? prev : (prev - 1 + photos.length) % photos.length,
    );
  };

  const onNextPhoto = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setPreviewIndex((prev) =>
      prev === null ? prev : (prev + 1) % photos.length,
    );
  };

  useClickOutside(previewImageRef, onClosePreview, previewIndex !== null);

  const handleChange =
    (field: keyof JobFormValues) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async () => {
    const itemsValues = jobItemsFieldsRef.current?.getValues();

    let savedJobId: string | undefined;

    try {
      if (isNewJob) {
        savedJobId = await onSubmit({
          address: values.address,
          client_name: values.client_name,
          phone: values.phone,
          date: values.date,
          date_started: values.date,
          date_finished: null,
          notes: values.notes || null,
        });
      } else {
        savedJobId = await onSubmit({
          address: values.address,
          client_name: values.client_name,
          phone: values.phone,
          date: values.date,
          date_started: values.date,
          date_finished: values.date_finished || null,
          notes: values.notes || null,
        });
      }
    } catch {
      return;
    }

    if (!savedJobId || !itemsValues) return;

    const items: JobItemInput[] = itemsValues.services
      .map((name) => JOB_SERVICE_NAME_TO_ID[name])
      .filter((serviceId): serviceId is string => Boolean(serviceId))
      .map((serviceId) => ({
        service_id: serviceId,
        square_meters: Number(itemsValues.square_meters) || 0,
        price_per_m2: Number(itemsValues.price_per_m2) || 0,
        material_cost: Number(itemsValues.material_cost) || 0,
      }));

    saveJobItemsMutation.mutate({ jobId: savedJobId, items });
  };

  const onEnterEditMode = () => {
    setMode("edit");
  };

  const onCancelEdit = () => {
    if (isNewJob) {
      onClose();
      return;
    }

    setValues(jobToFormValues(job));
    setMode("view");
  };

  const modalTitle = isNewJob
    ? "Novi posao"
    : isViewMode
      ? "Detalji posla"
      : "Uredi posao";

  const previewPhoto = previewIndex !== null ? photos[previewIndex] : null;
  const hasMultiplePhotos = photos.length > 1;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      fullScreen={isMobile}
      slotProps={{ paper: { sx: jobFormModalPaperSx } }}
    >
      <DialogTitle sx={jobFormModalTitleSx}>{modalTitle}</DialogTitle>

      <DialogContent sx={jobFormModalContentSx}>
        {isViewMode ? (
          <Stack spacing={2}>
            {JOB_DETAIL_FIELDS.map((field) => (
              <Stack key={field.key}>
                <Typography variant="caption" sx={jobDetailLabelSx}>
                  {field.label}
                </Typography>
                <Typography variant="body1" sx={jobDetailValueSx}>
                  {field.isDate
                    ? formatDate(values[field.key] || null)
                    : values[field.key] || (field.emptyFallback ?? "-")}
                </Typography>
              </Stack>
            ))}
          </Stack>
        ) : (
          <Stack spacing={2} sx={jobFormModalFieldsSx}>
            <TextField
              label="Adresa"
              value={values.address}
              onChange={handleChange("address")}
              fullWidth
            />

            <Stack
              direction={{ xs: "column", sm: "row" }}
              sx={jobFormModalRowSx}
            >
              <TextField
                label="Klijent"
                value={values.client_name}
                onChange={handleChange("client_name")}
                fullWidth
              />
              <TextField
                label="Telefon"
                value={values.phone}
                onChange={handleChange("phone")}
                fullWidth
              />
            </Stack>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              sx={jobFormModalRowSx}
            >
              <TextField
                label="Planirani datum"
                type="date"
                value={values.date}
                onChange={handleChange("date")}
                slotProps={{ inputLabel: { shrink: true } }}
                sx={jobFormModalDateInputSx}
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
            </Stack>

            <TextField
              label="Napomena"
              value={values.notes}
              onChange={handleChange("notes")}
              multiline
              rows={3}
              fullWidth
            />
          </Stack>
        )}

        <Stack spacing={2} sx={jobItemSectionSx}>
          <Typography variant="caption" sx={jobDetailLabelSx}>
            Stavka usluge
          </Typography>

          {jobItemsQuery.isError && (
            <Typography variant="caption" color="error">
              Došlo je do pogreške prilikom dohvaćanja stavki usluge.
            </Typography>
          )}

          {isViewMode ? (
            <Stack spacing={2}>
              <Stack>
                <Typography variant="caption" sx={jobDetailLabelSx}>
                  Usluge
                </Typography>
                <Typography variant="body1" sx={jobDetailValueSx}>
                  {jobItemDefaults.services.length > 0
                    ? jobItemDefaults.services.join(", ")
                    : "-"}
                </Typography>
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                sx={jobFormModalRowSx}
              >
                <Stack>
                  <Typography variant="caption" sx={jobDetailLabelSx}>
                    Kvadratura (m²)
                  </Typography>
                  <Typography variant="body1" sx={jobDetailValueSx}>
                    {jobItemDefaults.square_meters || "-"}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="caption" sx={jobDetailLabelSx}>
                    Cijena po m²
                  </Typography>
                  <Typography variant="body1" sx={jobDetailValueSx}>
                    {jobItemDefaults.price_per_m2 || "-"}
                  </Typography>
                </Stack>
              </Stack>

              <Stack>
                <Typography variant="caption" sx={jobDetailLabelSx}>
                  Trošak materijala
                </Typography>
                <Typography variant="body1" sx={jobDetailValueSx}>
                  {jobItemDefaults.material_cost || "-"}
                </Typography>
              </Stack>
            </Stack>
          ) : (
            <JobItemsFields
              key={jobItemsQuery.dataUpdatedAt}
              ref={jobItemsFieldsRef}
              defaults={jobItemDefaults}
            />
          )}
        </Stack>

        {job && (
          <Stack spacing={1} sx={jobPhotoSectionSx}>
            <Typography variant="caption" sx={jobDetailLabelSx}>
              Fotografije
            </Typography>

            {!isViewMode && (
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={jobPhotoActionsRowSx}
              >
                <Button
                  component="label"
                  variant="outlined"
                  disabled={addPhotoMutation.isPending}
                >
                  {addPhotoMutation.isPending
                    ? "Učitavanje..."
                    : "Dodaj fotografiju"}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handlePhotoChange}
                  />
                </Button>
                {addPhotoMutation.isSuccess && !photoError && (
                  <Typography variant="caption" color="success.main">
                    Fotografija uspješno dodana.
                  </Typography>
                )}
              </Stack>
            )}

            {photoError && (
              <Typography variant="caption" color="error">
                {photoError}
              </Typography>
            )}

            {photos.length > 0 ? (
              <Box sx={jobPhotoGridSx}>
                {photos.map((photo, index) => (
                  <Box key={photo.name} sx={jobPhotoThumbnailWrapperSx}>
                    <Box
                      component="img"
                      src={photo.url ?? undefined}
                      onClick={onPreviewPhoto(index)}
                      sx={jobPhotoThumbnailSx}
                    />
                    {!isViewMode && (
                      <IconButton
                        size="small"
                        onClick={onDeletePhoto(photo.name)}
                        sx={jobPhotoDeleteButtonSx}
                        aria-label={`Ukloni fotografiju: ${photo.name}`}
                      >
                        <Close fontSize="inherit" />
                      </IconButton>
                    )}
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="textSecondary">
                Nema dodanih fotografija.
              </Typography>
            )}
          </Stack>
        )}
      </DialogContent>

      <DialogActions sx={jobFormModalActionsSx}>
        {isViewMode ? (
          <>
            <Button onClick={onClose} sx={jobFormModalCancelButtonSx}>
              Zatvori
            </Button>
            <Button variant="contained" onClick={onEnterEditMode}>
              Uredi
            </Button>
          </>
        ) : (
          <>
            <Button onClick={onCancelEdit} sx={jobFormModalCancelButtonSx}>
              Odustani
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isNewJob ? "Dodaj" : "Spremi"}
            </Button>
          </>
        )}
      </DialogActions>

      <Dialog
        open={Boolean(previewPhoto)}
        onClose={onClosePreview}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
        slotProps={{
          backdrop: { sx: jobPhotoPreviewBackdropSx },
          paper: { sx: jobPhotoPreviewPaperSx },
        }}
      >
        {previewPhoto && (
          <Box sx={jobPhotoPreviewContainerSx}>
            {hasMultiplePhotos && (
              <IconButton
                onClick={onPrevPhoto}
                sx={jobPhotoPreviewPrevButtonSx}
                aria-label="Prethodna fotografija"
              >
                <ChevronLeft />
              </IconButton>
            )}

            <Box
              ref={previewImageRef}
              component="img"
              src={previewPhoto.url ?? undefined}
              sx={jobPhotoPreviewImageSx}
            />

            {hasMultiplePhotos && (
              <IconButton
                onClick={onNextPhoto}
                sx={jobPhotoPreviewNextButtonSx}
                aria-label="Sljedeća fotografija"
              >
                <ChevronRight />
              </IconButton>
            )}
          </Box>
        )}
      </Dialog>
    </Dialog>
  );
};

export default JobFormModal;
