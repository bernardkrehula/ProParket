import { useMemo, useState } from "react";
import type { MouseEvent } from "react";
import {
  Box,
  CircularProgress,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { requestJobs } from "#/api/jobs/requestJobs";
import { requestEditJob } from "#/api/jobs/requestEditJob";
import { requestDeleteJob } from "#/api/jobs/requestDeleteJob";
import type { JobType, NewJob } from "#/types/Job.type";
import { formatDate } from "#/utils/format";
import JobFormModal from "#/pages/jobs/components/JobFormModal";
import JobCard from "#/pages/jobs/components/JobCard";
import PeriodFilter from "#/pages/dashboard/components/PeriodFilter";
import { getPeriodRange } from "#/pages/dashboard/period";
import type { PeriodType } from "#/pages/dashboard/period";
import ScheduleCalendar from "./components/ScheduleCalendar";
import {
  scheduledJobsLoadingSx,
  scheduledJobsHeaderSx,
  scheduledJobsTitleSx,
  scheduledJobsSubtitleSx,
  scheduledJobsControlsSx,
  scheduledViewToggleSx,
  scheduledViewToggleLabelSx,
  scheduledJobsDayGroupSx,
  scheduledJobsDayHeadingSx,
  scheduledJobsCardListSx,
  scheduledJobsEmptySx,
  scheduledJobsEmptyTitleSx,
  scheduledJobsEmptyBodySx,
} from "./scheduledJobsConfig";

type ScheduleView = "cards" | "calendar";

const toDateKey = (value: string | Date) => {
  const date = value instanceof Date ? value : new Date(value);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

const Schedule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobType | null>(null);
  const [period, setPeriod] = useState<PeriodType>("month");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [view, setView] = useState<ScheduleView>("cards");
  const [calendarMonth, setCalendarMonth] = useState(() => new Date());

  const onViewChange = (_event: MouseEvent<HTMLElement>, next: ScheduleView | null) => {
    if (next) setView(next);
  };

  const queryClient = useQueryClient();

  const range = useMemo(
    () =>
      getPeriodRange(period, {
        from: customFrom ? new Date(customFrom) : undefined,
        to: customTo ? new Date(customTo) : undefined,
      }),
    [period, customFrom, customTo],
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["jobs", ""],
    queryFn: () => requestJobs(""),
  });

  const jobs = useMemo(() => {
    return data && "data" in data && data.data ? data.data : [];
  }, [data]);

  const dayGroups = useMemo(() => {
    const fromKey = toDateKey(range.from);
    const toKey = toDateKey(range.to);
    const groups = new Map<string, JobType[]>();

    jobs.forEach((job) => {
      const dateKey = toDateKey(job.date);
      // Range upper bound is exclusive.
      if (dateKey < fromKey || dateKey >= toKey) return;

      const existing = groups.get(dateKey);
      if (existing) {
        existing.push(job);
      } else {
        groups.set(dateKey, [job]);
      }
    });

    return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [jobs, range]);

  const onOpenJobModal = (job: JobType) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const onCloseJobModal = () => {
    setIsModalOpen(false);
  };

  const onJobMutated = () => {
    queryClient.invalidateQueries({ queryKey: ["jobs"] });
    queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    setIsModalOpen(false);
  };

  const editJobMutation = useMutation({
    mutationFn: (payload: { id: string; values: NewJob }) =>
      requestEditJob(payload.id, payload.values),
    onSuccess: onJobMutated,
  });

  const deleteJobMutation = useMutation({
    mutationFn: requestDeleteJob,
    onSuccess: onJobMutated,
  });

  const onSubmitJobForm = async (values: NewJob): Promise<string | undefined> => {
    if (!selectedJob) return undefined;
    await editJobMutation.mutateAsync({ id: selectedJob.id, values });
    return selectedJob.id;
  };

  const onDeleteJob = (jobId: string) => {
    deleteJobMutation.mutate(jobId);
  };

  const viewToggle = (
    <ToggleButtonGroup
      exclusive
      value={view}
      onChange={onViewChange}
      aria-label="Prikaz"
      sx={scheduledViewToggleSx}
    >
      <ToggleButton value="cards" aria-label="Kartice">
        <ViewAgendaOutlinedIcon fontSize="small" />
        <Box component="span" sx={scheduledViewToggleLabelSx}>
          Kartice
        </Box>
      </ToggleButton>
      <ToggleButton value="calendar" aria-label="Kalendar">
        <CalendarMonthOutlinedIcon fontSize="small" />
        <Box component="span" sx={scheduledViewToggleLabelSx}>
          Kalendar
        </Box>
      </ToggleButton>
    </ToggleButtonGroup>
  );

  const header = (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      sx={scheduledJobsHeaderSx}
    >
      <Box>
        <Typography variant="h5" sx={scheduledJobsTitleSx}>
          Raspored poslova
        </Typography>
        {view === "cards" && (
          <Typography sx={scheduledJobsSubtitleSx}>{range.label}</Typography>
        )}
      </Box>
      <Stack direction={{ xs: "column", sm: "row" }} sx={scheduledJobsControlsSx}>
        {view === "cards" && (
          <PeriodFilter
            period={period}
            onPeriodChange={setPeriod}
            customFrom={customFrom}
            customTo={customTo}
            onCustomFromChange={setCustomFrom}
            onCustomToChange={setCustomTo}
          />
        )}
        {viewToggle}
      </Stack>
    </Stack>
  );

  if (isLoading) {
    return (
      <Stack spacing={3}>
        {header}
        <Box sx={scheduledJobsLoadingSx}>
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
          Nešto je pošlo po krivu prilikom učitavanja podataka.
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      {header}

      {view === "calendar" ? (
        <ScheduleCalendar
          jobs={jobs}
          month={calendarMonth}
          onMonthChange={setCalendarMonth}
          onJobClick={onOpenJobModal}
        />
      ) : dayGroups.length === 0 ? (
        <Stack sx={scheduledJobsEmptySx}>
          <Typography sx={scheduledJobsEmptyTitleSx}>
            Nema zakazanih poslova
          </Typography>
          <Typography sx={scheduledJobsEmptyBodySx}>
            Za odabrano razdoblje nema poslova. Promijeni razdoblje u filtru
            iznad.
          </Typography>
        </Stack>
      ) : (
        dayGroups.map(([date, jobsForDay]) => (
          <Stack key={date} sx={scheduledJobsDayGroupSx}>
            <Typography sx={scheduledJobsDayHeadingSx}>
              {formatDate(date)}
            </Typography>
            <Box sx={scheduledJobsCardListSx}>
              {jobsForDay.map((job) => (
                <JobCard key={job.id} job={job} onClick={onOpenJobModal} />
              ))}
            </Box>
          </Stack>
        ))
      )}

      <JobFormModal
        key={isModalOpen ? (selectedJob?.id ?? "closed") : "closed"}
        open={isModalOpen}
        onClose={onCloseJobModal}
        onSubmit={onSubmitJobForm}
        onDelete={onDeleteJob}
        job={selectedJob}
        isSubmitting={editJobMutation.isPending || deleteJobMutation.isPending}
      />
    </Stack>
  );
};

export default Schedule;
