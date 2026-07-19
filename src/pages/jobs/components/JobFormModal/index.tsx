import { useMemo, useRef, useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import {
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
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { JobType } from "#/types/Job.type";
import type { NewJob } from "#/api/requestAddNewJob";
import { requestAddJobPhoto, MAX_JOB_PHOTO_SIZE_BYTES } from "#/api/requestAddJobPhoto";
import { requestJobPhotos } from "#/api/requestJobPhotos";
import { useClickOutside } from "#/hooks/useClickOutside";
import { GenericError } from "#/utils/GenericError";
import { formatDate } from "#/utils/format";
import {
  jobFormModalTitleSx,
  jobFormModalContentSx,
  jobFormModalRowSx,
  jobFormModalActionsSx,
  jobFormModalCancelButtonSx,
  jobDetailLabelSx,
  jobDetailValueSx,
  jobPhotoSectionSx,
  jobPhotoActionsRowSx,
  jobPhotoGridSx,
  jobPhotoThumbnailSx,
  jobPhotoPreviewBackdropSx,
  jobPhotoPreviewPaperSx,
  jobPhotoPreviewContainerSx,
  jobPhotoPreviewImageSx,
  jobPhotoPreviewPrevButtonSx,
  jobPhotoPreviewNextButtonSx,
  jobFormModalFieldsSx,
  EMPTY_JOB_FORM_VALUES,
} from "./jobFormModalConfig";

type JobFormValues = typeof EMPTY_JOB_FORM_VALUES;
type ModalMode = "view" | "edit";

type JobFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: NewJob) => void;
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
  { label: "Datum", key: "date", isDate: true },
  { label: "Datum početka", key: "date_started", isDate: true },
  { label: "Datum završetka", key: "date_finished", isDate: true, emptyFallback: "U tijeku" },
  { label: "Napomena", key: "notes" },
];

const jobToFormValues = (job?: JobType | null): JobFormValues => {
  if (!job) return EMPTY_JOB_FORM_VALUES;

  return {
    address: job.address,
    client_name: job.client_name,
    phone: job.phone,
    date: job.date,
    date_started: job.date_started,
    date_finished: job.date_finished ?? "",
    notes: job.notes ?? "",
  };
};

const JobFormModal = ({ open, onClose, onSubmit, job, isSubmitting }: JobFormModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [values, setValues] = useState<JobFormValues>(() => jobToFormValues(job));
  const [mode, setMode] = useState<ModalMode>(() => (job ? "view" : "edit"));
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const previewImageRef = useRef<HTMLImageElement>(null);

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

  const onClosePreview = () => setPreviewIndex(null);

  const onPrevPhoto = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setPreviewIndex((prev) => (prev === null ? prev : (prev - 1 + photos.length) % photos.length));
  };

  const onNextPhoto = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setPreviewIndex((prev) => (prev === null ? prev : (prev + 1) % photos.length));
  };

  useClickOutside(previewImageRef, onClosePreview, previewIndex !== null);

  const handleChange = (field: keyof JobFormValues) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = () => {
    if (isNewJob) {
      onSubmit({
        address: values.address,
        client_name: values.client_name,
        phone: values.phone,
        date: values.date,
        date_started: values.date,
        date_finished: null,
        notes: values.notes || null,
      });
      return;
    }

    onSubmit({
      address: values.address,
      client_name: values.client_name,
      phone: values.phone,
      date: values.date,
      date_started: values.date_started,
      date_finished: values.date_finished || null,
      notes: values.notes || null,
    });
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

  const modalTitle = isNewJob ? "Novi posao" : isViewMode ? "Detalji posla" : "Uredi posao";

  const previewPhoto = previewIndex !== null ? photos[previewIndex] : null;
  const hasMultiplePhotos = photos.length > 1;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" fullScreen={isMobile}>
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

            <Stack direction={{ xs: "column", sm: "row" }} sx={jobFormModalRowSx}>
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

            <Stack direction={{ xs: "column", sm: "row" }} sx={jobFormModalRowSx}>
              <TextField
                label="Datum"
                type="date"
                value={values.date}
                onChange={handleChange("date")}
                slotProps={{ inputLabel: { shrink: true } }}
                fullWidth
              />
              {!isNewJob && (
                <TextField
                  label="Datum početka"
                  type="date"
                  value={values.date_started}
                  onChange={handleChange("date_started")}
                  slotProps={{ inputLabel: { shrink: true } }}
                  fullWidth
                />
              )}
              {!isNewJob && (
                <TextField
                  label="Datum završetka"
                  type="date"
                  value={values.date_finished}
                  onChange={handleChange("date_finished")}
                  slotProps={{ inputLabel: { shrink: true } }}
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

        {job && (
          <Stack spacing={1} sx={jobPhotoSectionSx}>
            <Typography variant="caption" sx={jobDetailLabelSx}>
              Fotografije
            </Typography>

            {!isViewMode && (
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={jobPhotoActionsRowSx}>
                <Button component="label" variant="outlined" disabled={addPhotoMutation.isPending}>
                  {addPhotoMutation.isPending ? "Učitavanje..." : "Dodaj fotografiju"}
                  <input type="file" accept="image/*" hidden onChange={handlePhotoChange} />
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
                  <Box
                    key={photo.name}
                    component="img"
                    src={photo.url ?? undefined}
                    onClick={onPreviewPhoto(index)}
                    sx={jobPhotoThumbnailSx}
                  />
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
            <Button variant="contained" onClick={handleSubmit} disabled={isSubmitting}>
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
              <IconButton onClick={onPrevPhoto} sx={jobPhotoPreviewPrevButtonSx} aria-label="Prethodna fotografija">
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
              <IconButton onClick={onNextPhoto} sx={jobPhotoPreviewNextButtonSx} aria-label="Sljedeća fotografija">
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
