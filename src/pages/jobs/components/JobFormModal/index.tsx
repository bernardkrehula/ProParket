import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Add,
  ChevronLeft,
  ChevronRight,
  DeleteOutlined,
  KeyboardArrowUp,
  KeyboardArrowDown,
  Close,
} from "@mui/icons-material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { JobType, NewJob } from "#/types/Job.type";
import { requestAddJobPhoto } from "#/api/jobs/requestAddJobPhoto";
import { requestJobPhotos } from "#/api/jobs/requestJobPhotos";
import { requestDeleteJobPhoto } from "#/api/jobs/requestDeleteJobPhoto";
import { requestJobItems } from "#/api/jobs/requestJobItems";
import { requestSaveJobItems } from "#/api/jobs/requestSaveJobItems";
import type { JobItemInput } from "#/api/jobs/requestSaveJobItems";
import { requestServices } from "#/api/services/requestServices";
import { MuiTelInput } from "mui-tel-input";
import { useClickOutside } from "#/hooks/useClickOutside";
import { GenericError } from "#/utils/GenericError";
import {
  formatCurrency,
  formatDate,
  formatTime,
  toDateInputValue,
} from "#/utils/format";
import { getJobStatus } from "#/utils/getJobStatus";
import JobStatusPill from "#/pages/jobs/components/JobStatusPill";
import { getTotalPrice } from "#/utils/getTotalPrice";
import {
  jobFormModalTitleSx,
  jobFormModalPaperSx,
  jobFormModalContentSx,
  jobFormModalRowSx,
  jobFormModalDateInputSx,
  jobFormModalTimeInputSx,
  jobFormModalNumberInputSx,
  jobFormModalStepperButtonsSx,
  jobFormModalStepperButtonSx,
  jobFormModalActionsSx,
  jobFormModalCancelButtonSx,
  jobDetailLabelSx,
  jobDetailValueSx,
  jobItemSectionSx,
  jobRoomCardSx,
  jobRoomHeaderSx,
  jobRoomTitleSx,
  jobRoomRemoveButtonSx,
  jobRoomTotalRowSx,
  jobRoomTotalLabelSx,
  jobRoomTotalValueSx,
  jobRoomViewTitleSx,
  jobRoomViewServiceSx,
  jobRoomViewMetaSx,
  jobRoomViewTotalSx,
  jobRoomAddButtonSx,
  jobRoomsTotalBarSx,
  jobRoomsTotalLabelSx,
  jobRoomsTotalValueSx,
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
  jobPhotoPreviewCloseButtonSx,
  jobFormModalFieldsSx,
  EMPTY_JOB_FORM_VALUES,
} from "./jobFormModalConfig";

type JobFormValues = typeof EMPTY_JOB_FORM_VALUES;
type ModalMode = "view" | "edit";

type JobFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: NewJob) => Promise<string | undefined>;
  onDelete?: (jobId: string) => void;
  job?: JobType | null;
  isSubmitting?: boolean;
};

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
  { label: "Planirani datum", key: "date", isDate: true },
  { label: "Vrijeme početka", key: "start_time", isTime: true },
  {
    label: "Datum završetka",
    key: "date_finished",
    isDate: true,
    emptyFallback: "U tijeku",
  },
  { label: "Napomena", key: "notes" },
];

const REQUIRED_FIELDS: { key: keyof JobFormValues; label: string }[] = [
  { key: "address", label: "Adresa" },
  { key: "client_name", label: "Klijent" },
  { key: "phone", label: "Telefon" },
  { key: "date", label: "Planirani datum" },
  { key: "start_time", label: "Vrijeme početka" },
];

const jobToFormValues = (job?: JobType | null): JobFormValues => {
  if (!job) return EMPTY_JOB_FORM_VALUES;

  return {
    address: job.address,
    client_name: job.client_name,
    phone: job.phone,
    date: toDateInputValue(job.date),
    start_time: job.start_time ?? "",
    date_finished: job.date_finished ?? "",
    notes: job.notes ?? "",
  };
};

type NumberStepperFieldProps = {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  unit?: string;
};

const NumberStepperField = ({
  label,
  value,
  onValueChange,
  unit,
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
            <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
              {unit && (
                <Typography variant="body2" color="text.secondary">
                  {unit}
                </Typography>
              )}
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
            </Stack>
          ),
        },
      }}
      sx={jobFormModalNumberInputSx}
      fullWidth
    />
  );
};

export type JobRoomFormItem = {
  id: string;
  room: string;
  service: string;
  square_meters: string;
  price_per_m2: string;
  material_cost: string;
};

export type JobItemsFieldsHandle = {
  getValues: () => JobRoomFormItem[];
};

type JobItemsFieldsProps = {
  defaults: JobRoomFormItem[];
};

const createEmptyRoom = (): JobRoomFormItem => ({
  id:
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `room-${Math.random().toString(36).slice(2)}`,
  room: "",
  service: "",
  square_meters: "",
  price_per_m2: "",
  material_cost: "",
});

const JobItemsFields = forwardRef<JobItemsFieldsHandle, JobItemsFieldsProps>(
  ({ defaults }, ref) => {
    const [rooms, setRooms] = useState<JobRoomFormItem[]>(
      defaults.length > 0 ? defaults : [createEmptyRoom()],
    );

    // Default prices come from the price list (Cjenik); selecting a service
    // fills that room's price per m² automatically.
    const servicesQuery = useQuery({
      queryKey: ["services"],
      queryFn: requestServices,
    });

    const { servicePriceByName, serviceNames } = useMemo(() => {
      const response = servicesQuery.data;
      const list =
        response && "data" in response && response.data ? response.data : [];
      const priceMap = new Map<string, number>();
      const names: string[] = [];
      list.forEach((service) => {
        priceMap.set(service.name, Number(service.price_per_m2));
        names.push(service.name);
      });
      return { servicePriceByName: priceMap, serviceNames: names };
    }, [servicesQuery.data]);

    useImperativeHandle(ref, () => ({ getValues: () => rooms }));

    const updateRoom = (id: string, patch: Partial<JobRoomFormItem>) => {
      setRooms((prev) =>
        prev.map((room) => (room.id === id ? { ...room, ...patch } : room)),
      );
    };

    const addRoom = () => setRooms((prev) => [...prev, createEmptyRoom()]);

    const removeRoom = (id: string) =>
      setRooms((prev) =>
        prev.length > 1 ? prev.filter((room) => room.id !== id) : prev,
      );

    const handleServiceChange = (id: string, serviceName: string) => {
      const price = servicePriceByName.get(serviceName);
      updateRoom(id, {
        service: serviceName,
        ...(price != null ? { price_per_m2: String(price) } : {}),
      });
    };

    const jobTotal = rooms.reduce(
      (sum, room) => sum + getTotalPrice(room.square_meters, room.price_per_m2),
      0,
    );

    return (
      <Stack spacing={2}>
        {rooms.map((room, index) => (
          <Box key={room.id} sx={jobRoomCardSx}>
            <Stack direction="row" sx={jobRoomHeaderSx}>
              <Typography sx={jobRoomTitleSx}>Prostorija {index + 1}</Typography>
              {rooms.length > 1 && (
                <IconButton
                  size="small"
                  aria-label={`Ukloni prostoriju ${index + 1}`}
                  onClick={() => removeRoom(room.id)}
                  sx={jobRoomRemoveButtonSx}
                >
                  <DeleteOutlined fontSize="small" />
                </IconButton>
              )}
            </Stack>

            <TextField
              label="Naziv prostorije"
              value={room.room}
              onChange={(event) =>
                updateRoom(room.id, { room: event.target.value })
              }
              placeholder="npr. Dnevni boravak"
              fullWidth
            />

            <Autocomplete
              options={serviceNames}
              value={room.service || null}
              onChange={(_event, value) =>
                handleServiceChange(room.id, value ?? "")
              }
              renderInput={(params) => <TextField {...params} label="Usluga" />}
            />

            <Stack
              direction={{ xs: "column", sm: "row" }}
              sx={jobFormModalRowSx}
            >
              <NumberStepperField
                label="Kvadratura (m²)"
                value={room.square_meters}
                onValueChange={(value) =>
                  updateRoom(room.id, { square_meters: value })
                }
                unit="m²"
              />
              <NumberStepperField
                label="Cijena po m²"
                value={room.price_per_m2}
                onValueChange={(value) =>
                  updateRoom(room.id, { price_per_m2: value })
                }
                unit="€"
              />
            </Stack>

            <NumberStepperField
              label="Trošak materijala"
              value={room.material_cost}
              onValueChange={(value) =>
                updateRoom(room.id, { material_cost: value })
              }
              unit="€"
            />

            <Stack direction="row" sx={jobRoomTotalRowSx}>
              <Typography sx={jobRoomTotalLabelSx}>Cijena prostorije</Typography>
              <Typography sx={jobRoomTotalValueSx}>
                {formatCurrency(
                  getTotalPrice(room.square_meters, room.price_per_m2),
                )}
              </Typography>
            </Stack>
          </Box>
        ))}

        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={addRoom}
          sx={jobRoomAddButtonSx}
        >
          Dodaj prostoriju
        </Button>

        <Stack direction="row" sx={jobRoomsTotalBarSx}>
          <Typography sx={jobRoomsTotalLabelSx}>Ukupna cijena posla</Typography>
          <Typography sx={jobRoomsTotalValueSx}>
            {formatCurrency(jobTotal)}
          </Typography>
        </Stack>
      </Stack>
    );
  },
);

JobItemsFields.displayName = "JobItemsFields";

const JobFormModal = ({
  open,
  onClose,
  onSubmit,
  onDelete,
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
  const [showErrors, setShowErrors] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const previewImageRef = useRef<HTMLImageElement>(null);
  const jobItemsFieldsRef = useRef<JobItemsFieldsHandle>(null);

  const isNewJob = !job;
  const isViewMode = mode === "view";

  const queryClient = useQueryClient();

  // Services (with prices) are managed in the price list; map them for
  // showing saved job items by name and for saving selections back by id.
  const parentServicesQuery = useQuery({
    queryKey: ["services"],
    queryFn: requestServices,
  });

  const { serviceIdToName, serviceNameToId } = useMemo(() => {
    const response = parentServicesQuery.data;
    const list =
      response && "data" in response && response.data ? response.data : [];
    const idToName = new Map<string, string>();
    const nameToId = new Map<string, string>();
    list.forEach((service) => {
      idToName.set(service.id, service.name);
      nameToId.set(service.name, service.id);
    });
    return { serviceIdToName: idToName, serviceNameToId: nameToId };
  }, [parentServicesQuery.data]);

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

  const jobItemDefaults = useMemo<JobRoomFormItem[]>(() => {
    return jobItems.map((item, index) => ({
      id: item.id ?? `room-${index}`,
      room: item.room ?? "",
      service: serviceIdToName.get(item.service_id) ?? "",
      square_meters: item.square_meters != null ? String(item.square_meters) : "",
      price_per_m2: item.price_per_m2 != null ? String(item.price_per_m2) : "",
      material_cost:
        item.material_cost != null ? String(item.material_cost) : "",
    }));
  }, [jobItems, serviceIdToName]);

  const jobTotalPrice = useMemo(
    () =>
      jobItemDefaults.reduce(
        (sum, room) => sum + getTotalPrice(room.square_meters, room.price_per_m2),
        0,
      ),
    [jobItemDefaults],
  );

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
      // Job items drive the dashboard earnings/material figures.
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file || !job) return;

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

  const isFieldInvalid = (field: keyof JobFormValues) =>
    showErrors && !values[field].trim();

  const handlePhoneChange = (value: string) => {
    setValues((prev) => ({ ...prev, phone: value }));
  };

  const handleSubmit = async () => {
    const missing = REQUIRED_FIELDS.filter((field) => !values[field.key].trim());
    if (missing.length > 0) {
      setShowErrors(true);
      setValidationError(
        `Molimo ispunite obavezna polja: ${missing.map((field) => field.label).join(", ")}.`,
      );
      return;
    }

    const itemsValues = jobItemsFieldsRef.current?.getValues();

    let savedJobId: string | undefined;

    try {
      if (isNewJob) {
        savedJobId = await onSubmit({
          address: values.address,
          client_name: values.client_name,
          phone: values.phone,
          date: values.date,
          start_time: values.start_time || null,
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
          start_time: values.start_time || null,
          date_started: values.date,
          date_finished: values.date_finished || null,
          notes: values.notes || null,
        });
      }
    } catch {
      return;
    }

    if (!savedJobId || !itemsValues) return;

    const items: JobItemInput[] = itemsValues
      .map((room) => {
        const serviceId = serviceNameToId.get(room.service);
        if (!serviceId) return null;
        return {
          room: room.room.trim() || null,
          service_id: serviceId,
          square_meters: Number(room.square_meters) || 0,
          price_per_m2: Number(room.price_per_m2) || 0,
          material_cost: Number(room.material_cost) || 0,
        };
      })
      .filter((item): item is JobItemInput => item !== null);

    saveJobItemsMutation.mutate({ jobId: savedJobId, items });
  };

  // Marks the job completed by stamping today as the finish date. Works even
  // when today is before the planned date (a job can be finished early).
  const handleMarkFinished = async () => {
    const today = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const todayStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;

    try {
      await onSubmit({
        address: values.address,
        client_name: values.client_name,
        phone: values.phone,
        date: values.date,
        start_time: values.start_time || null,
        date_started: values.date,
        date_finished: todayStr,
        notes: values.notes || null,
      });
    } catch {
      return;
    }
  };

  // Reopens a finished job as "U tijeku": clears the finish date and stamps the
  // start as today, so the status isn't computed back to "Novo" for a job whose
  // planned date is still in the future.
  const handleReturnToProgress = async () => {
    const today = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const todayStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;

    try {
      await onSubmit({
        address: values.address,
        client_name: values.client_name,
        phone: values.phone,
        date: values.date,
        start_time: values.start_time || null,
        date_started: todayStr,
        date_finished: null,
        notes: values.notes || null,
      });
    } catch {
      return;
    }
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

  const onDeleteClick = () => {
    if (!job || !onDelete) return;
    setIsDeleteConfirmOpen(true);
  };

  const onCancelDelete = () => {
    setIsDeleteConfirmOpen(false);
  };

  const onConfirmDelete = () => {
    setIsDeleteConfirmOpen(false);
    if (job && onDelete) onDelete(job.id);
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
      <DialogTitle sx={jobFormModalTitleSx}>
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <span>{modalTitle}</span>
          {!isNewJob && job && <JobStatusPill status={getJobStatus(job)} />}
        </Stack>
      </DialogTitle>

      <DialogContent sx={jobFormModalContentSx}>
        {isViewMode ? (
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
        ) : (
          <Stack spacing={2} sx={jobFormModalFieldsSx}>
            <TextField
              label="Adresa"
              value={values.address}
              onChange={handleChange("address")}
              required
              error={isFieldInvalid("address")}
              helperText={isFieldInvalid("address") ? "Obavezno polje." : undefined}
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
                required
                error={isFieldInvalid("client_name")}
                helperText={
                  isFieldInvalid("client_name") ? "Obavezno polje." : undefined
                }
                fullWidth
              />
              <MuiTelInput
                label="Telefon"
                value={values.phone}
                onChange={handlePhoneChange}
                defaultCountry="HR"
                langOfCountryName="hr"
                required
                error={isFieldInvalid("phone")}
                helperText={isFieldInvalid("phone") ? "Obavezno polje." : undefined}
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
                required
                error={isFieldInvalid("date")}
                helperText={isFieldInvalid("date") ? "Obavezno polje." : undefined}
                slotProps={{ inputLabel: { shrink: true } }}
                sx={jobFormModalDateInputSx}
                fullWidth
              />
              <TextField
                label="Vrijeme početka"
                type="time"
                value={values.start_time}
                onChange={handleChange("start_time")}
                required
                error={isFieldInvalid("start_time")}
                helperText={
                  isFieldInvalid("start_time") ? "Obavezno polje." : undefined
                }
                slotProps={{ inputLabel: { shrink: true } }}
                sx={jobFormModalTimeInputSx}
                fullWidth
              />
            </Stack>

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
            jobItemDefaults.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                Nema stavki usluge.
              </Typography>
            ) : (
              <Stack spacing={1.5}>
                {jobItemDefaults.map((room, index) => (
                  <Box key={room.id} sx={jobRoomCardSx}>
                    <Stack direction="row" sx={jobRoomHeaderSx}>
                      <Typography sx={jobRoomViewTitleSx}>
                        {room.room || `Prostorija ${index + 1}`}
                      </Typography>
                      <Typography sx={jobRoomViewTotalSx}>
                        {formatCurrency(
                          getTotalPrice(room.square_meters, room.price_per_m2),
                        )}
                      </Typography>
                    </Stack>
                    <Typography sx={jobRoomViewServiceSx}>
                      {room.service || "-"}
                    </Typography>
                    <Typography sx={jobRoomViewMetaSx}>
                      {room.square_meters || 0} m² · {room.price_per_m2 || 0}{" "}
                      €/m²
                      {room.material_cost
                        ? ` · materijal ${room.material_cost} €`
                        : ""}
                    </Typography>
                  </Box>
                ))}

                <Stack direction="row" sx={jobRoomsTotalBarSx}>
                  <Typography sx={jobRoomsTotalLabelSx}>
                    Ukupna cijena posla
                  </Typography>
                  <Typography sx={jobRoomsTotalValueSx}>
                    {formatCurrency(jobTotalPrice)}
                  </Typography>
                </Stack>
              </Stack>
            )
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
        <Box>
          {!isNewJob && onDelete && (
            <Button onClick={onDeleteClick} color="error">
              Obriši
            </Button>
          )}
        </Box>

        <Stack direction="row" spacing={1}>
          {isViewMode ? (
            <>
              <Button onClick={onClose} sx={jobFormModalCancelButtonSx}>
                Zatvori
              </Button>
              {!isNewJob &&
                (values.date_finished ? (
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={handleReturnToProgress}
                    disabled={isSubmitting}
                  >
                    Vrati u tijek
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleMarkFinished}
                    disabled={isSubmitting}
                  >
                    Završi
                  </Button>
                ))}
              <Button variant="outlined" onClick={onEnterEditMode}>
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
        </Stack>
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
            {isMobile && (
              <IconButton
                onClick={onClosePreview}
                sx={jobPhotoPreviewCloseButtonSx}
                aria-label="Zatvori pregled"
              >
                <Close />
              </IconButton>
            )}

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

      <Dialog open={isDeleteConfirmOpen} onClose={onCancelDelete} maxWidth="xs" fullWidth>
        <DialogTitle sx={jobFormModalTitleSx}>Obriši posao</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Jeste li sigurni da želite obrisati posao "{job?.address}"? Ova radnja
            se ne može poništiti.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancelDelete} sx={jobFormModalCancelButtonSx}>
            Odustani
          </Button>
          <Button variant="contained" color="error" onClick={onConfirmDelete}>
            Obriši
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={Boolean(validationError)}
        autoHideDuration={6000}
        onClose={() => setValidationError(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setValidationError(null)}
          sx={{ width: "100%" }}
        >
          {validationError}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default JobFormModal;
