import { useMemo, useRef, useState } from "react";
import {
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  Snackbar,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { JobType, NewJob } from "#/types/Job.type";
import { requestJobItems } from "#/api/jobs/requestJobItems";
import { requestSaveJobItems } from "#/api/jobs/requestSaveJobItems";
import type { JobItemInput } from "#/api/jobs/requestSaveJobItems";
import { useServices } from "#/hooks/useServices";
import { toDateInputValue, todayInputValue } from "#/utils/format";
import { getJobStatus } from "#/utils/getJobStatus";
import JobStatusPill from "#/pages/jobs/components/JobStatusPill";
import DeleteJobDialog from "./components/DeleteJobDialog";
import JobDetailsView from "./components/JobDetailsView";
import JobFormFields from "./components/JobFormFields";
import JobFormModalActions from "./components/JobFormModalActions";
import JobItemsFields from "./components/JobItemsFields";
import JobPhotosSection from "./components/JobPhotosSection";
import JobRoomsView from "./components/JobRoomsView";
import {
  groupJobItemsIntoRooms,
  roomsToJobItems,
  type JobItemsFieldsHandle,
} from "./jobRoomUtils";
import {
  jobDetailLabelSx,
  jobFormModalContentSx,
  jobFormModalPaperSx,
  jobFormModalTitleSx,
  jobItemSectionSx,
  EMPTY_JOB_FORM_VALUES,
  type JobFormValues,
} from "./jobFormModalConfig";

type ModalMode = "view" | "edit";

type JobFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: NewJob) => Promise<string | undefined>;
  onDelete?: (jobId: string) => void;
  job?: JobType | null;
  isSubmitting?: boolean;
};

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
    end_date: toDateInputValue(job.end_date),
    start_time: job.start_time ?? "",
    date_finished: job.date_finished ?? "",
    notes: job.notes ?? "",
  };
};

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
  const [showErrors, setShowErrors] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const jobItemsFieldsRef = useRef<JobItemsFieldsHandle>(null);

  const isNewJob = !job;
  const isViewMode = mode === "view";

  const queryClient = useQueryClient();

  // Services (with prices) are managed in the price list; the maps turn saved
  // job items back into names and the picked names back into ids on save.
  const { serviceIdToName, serviceNameToId, servicePriceByName } = useServices();

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

  const jobItemDefaults = useMemo(
    () => groupJobItemsIntoRooms(jobItems, serviceIdToName),
    [jobItems, serviceIdToName],
  );

  const saveJobItemsMutation = useMutation({
    mutationFn: (payload: { jobId: string; items: JobItemInput[] }) =>
      requestSaveJobItems(payload.jobId, payload.items),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["jobItems", variables.jobId] });
      // Job items drive the dashboard earnings/material figures.
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  const onValueChange = (field: keyof JobFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const toNewJob = (overrides: Partial<NewJob> = {}): NewJob => ({
    address: values.address,
    client_name: values.client_name,
    phone: values.phone,
    date: values.date,
    end_date: values.end_date || null,
    start_time: values.start_time || null,
    date_started: values.date,
    date_finished: isNewJob ? null : values.date_finished || null,
    notes: values.notes || null,
    ...overrides,
  });

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
      savedJobId = await onSubmit(toNewJob());
    } catch {
      return;
    }

    if (!savedJobId || !itemsValues) return;

    saveJobItemsMutation.mutate({
      jobId: savedJobId,
      items: roomsToJobItems(itemsValues, serviceNameToId, servicePriceByName),
    });
  };

  // Marks the job completed by stamping today as the finish date. Works even
  // when today is before the planned date (a job can be finished early).
  const handleMarkFinished = async () => {
    try {
      await onSubmit(toNewJob({ date_finished: todayInputValue() }));
    } catch {
      return;
    }
  };

  // Reopens a finished job as "U tijeku": clears the finish date and stamps the
  // start as today, so the status isn't computed back to "Novo" for a job whose
  // planned date is still in the future.
  const handleReturnToProgress = async () => {
    try {
      await onSubmit(
        toNewJob({ date_started: todayInputValue(), date_finished: null }),
      );
    } catch {
      return;
    }
  };

  const onCancelEdit = () => {
    if (isNewJob) {
      onClose();
      return;
    }

    setValues(jobToFormValues(job));
    setMode("view");
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
          <JobDetailsView values={values} />
        ) : (
          <JobFormFields
            values={values}
            isNewJob={isNewJob}
            showErrors={showErrors}
            onValueChange={onValueChange}
          />
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
            <JobRoomsView rooms={jobItemDefaults} />
          ) : (
            <JobItemsFields
              key={jobItemsQuery.dataUpdatedAt}
              ref={jobItemsFieldsRef}
              defaults={jobItemDefaults}
            />
          )}
        </Stack>

        {job && (
          <JobPhotosSection
            jobId={job.id}
            isViewMode={isViewMode}
            isMobile={isMobile}
          />
        )}
      </DialogContent>

      <JobFormModalActions
        isViewMode={isViewMode}
        isNewJob={isNewJob}
        isSubmitting={isSubmitting}
        isFinished={Boolean(values.date_finished)}
        canDelete={!isNewJob && Boolean(onDelete)}
        onClose={onClose}
        onDelete={() => setIsDeleteConfirmOpen(true)}
        onEdit={() => setMode("edit")}
        onMarkFinished={handleMarkFinished}
        onReturnToProgress={handleReturnToProgress}
        onCancelEdit={onCancelEdit}
        onSubmit={handleSubmit}
      />

      <DeleteJobDialog
        open={isDeleteConfirmOpen}
        jobAddress={job?.address}
        onCancel={() => setIsDeleteConfirmOpen(false)}
        onConfirm={onConfirmDelete}
      />

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
