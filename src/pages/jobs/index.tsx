import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { debounce } from "throttle-debounce";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { requestJobs } from "#/api/jobs/requestJobs";
import { requestAddNewJob } from "#/api/jobs/requestAddNewJob";
import { requestEditJob } from "#/api/jobs/requestEditJob";
import { requestDeleteJob } from "#/api/jobs/requestDeleteJob";
import type { JobType, NewJob } from "#/types/Job.type";
import { getJobStatus, JOB_STATUS_LABELS } from "#/utils/getJobStatus";
import type { JobStatus } from "#/utils/getJobStatus";
import JobsTable from "./components/JobsTable";
import JobFormModal from "./components/JobFormModal";
import PeriodFilter from "#/pages/dashboard/components/PeriodFilter";
import { getPeriodRange } from "#/pages/dashboard/period";
import type { PeriodType } from "#/pages/dashboard/period";
import {
  jobsLoadingSx,
  jobsHeaderSx,
  jobsTitleSx,
  jobsSubtitleSx,
  jobsFiltersSx,
  jobsFiltersGroupSx,
  jobsPeriodFilterWrapSx,
  jobsSearchFieldSx,
  jobsStatusSelectSx,
  getJobCountLabel,
  PAGE_SIZE,
  ALL_STATUSES,
} from "./jobsConfig";

const dateKeyOf = (date: Date) => {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

const Jobs = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    typeof ALL_STATUSES | JobStatus
  >(ALL_STATUSES);
  const [page, setPage] = useState(1);
  const [period, setPeriod] = useState<PeriodType>("month");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobType | null>(null);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["jobs", search],
    queryFn: () => requestJobs(search),
    placeholderData: keepPreviousData,
  });

  const jobs = useMemo(() => {
    return data && "data" in data && data.data ? data.data : [];
  }, [data]);

  const range = useMemo(
    () =>
      getPeriodRange(period, {
        from: customFrom ? new Date(customFrom) : undefined,
        to: customTo ? new Date(customTo) : undefined,
      }),
    [period, customFrom, customTo],
  );

  const filteredJobs = useMemo(() => {
    const fromKey = dateKeyOf(range.from);
    const toKey = dateKeyOf(range.to);

    return jobs.filter((job) => {
      // Range upper bound is exclusive; job.date is a "YYYY-MM-DD" string.
      if (job.date < fromKey || job.date >= toKey) return false;
      if (statusFilter !== ALL_STATUSES && getJobStatus(job) !== statusFilter) {
        return false;
      }
      return true;
    });
  }, [jobs, statusFilter, range]);

  const pageCount = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const rangeStart =
    filteredJobs.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, filteredJobs.length);
  const pagedJobs = filteredJobs.slice((currentPage - 1) * PAGE_SIZE, rangeEnd);

  const onJobSaved = () => {
    queryClient.invalidateQueries({ queryKey: ["jobs"] });
    // Dashboard stats (job count, earnings) are a separate query — refresh them too.
    queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    setIsModalOpen(false);
  };

  const addJobMutation = useMutation({
    mutationFn: requestAddNewJob,
    onSuccess: onJobSaved,
  });

  const editJobMutation = useMutation({
    mutationFn: (payload: { id: string; values: NewJob }) =>
      requestEditJob(payload.id, payload.values),
    onSuccess: onJobSaved,
  });

  const deleteJobMutation = useMutation({
    mutationFn: requestDeleteJob,
    onSuccess: onJobSaved,
  });

  const debouncedSearch = useMemo(
    () =>
      debounce(1000, (value: string) => {
        setSearch(value);
        setPage(1);
      }),
    [],
  );

  useEffect(() => {
    return () => debouncedSearch.cancel({ upcomingOnly: true });
  }, [debouncedSearch]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  const onStatusFilterChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value as typeof ALL_STATUSES | JobStatus);
    setPage(1);
  };

  const onPeriodChange = (next: PeriodType) => {
    setPeriod(next);
    setPage(1);
  };

  const onCustomFromChange = (value: string) => {
    setCustomFrom(value);
    setPage(1);
  };

  const onCustomToChange = (value: string) => {
    setCustomTo(value);
    setPage(1);
  };

  const onPrevPage = () => {
    setPage((prev) => Math.max(1, prev - 1));
  };

  const onNextPage = () => {
    setPage((prev) => Math.min(pageCount, prev + 1));
  };

  const onOpenAddJobModal = () => {
    setSelectedJob(null);
    setIsModalOpen(true);
  };

  const onOpenEditJobModal = (job: JobType) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const onCloseJobModal = () => {
    setIsModalOpen(false);
  };

  const onSubmitJobForm = async (values: NewJob): Promise<string | undefined> => {
    if (selectedJob) {
      await editJobMutation.mutateAsync({ id: selectedJob.id, values });
      return selectedJob.id;
    }

    const result = await addJobMutation.mutateAsync(values);
    if (result && "data" in result && result.data) {
      return result.data[0]?.id;
    }
    return undefined;
  };

  const onDeleteJob = (jobId: string) => {
    deleteJobMutation.mutate(jobId);
  };

  if (isLoading) {
    return (
      <Box sx={jobsLoadingSx}>
        <CircularProgress size={120} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error">
        Nešto je pošlo po krivu prilikom učitavanja podataka.
      </Typography>
    );
  }

  return (
    <Stack spacing={3}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={jobsHeaderSx}
      >
        <Box>
          <Typography variant="h5" sx={jobsTitleSx}>
            Svi poslovi
          </Typography>
          <Typography sx={jobsSubtitleSx}>
            {getJobCountLabel(filteredJobs.length)}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={onOpenAddJobModal}
        >
          Novi posao
        </Button>
      </Stack>

      <Stack spacing={1.5} sx={jobsFiltersGroupSx}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={jobsFiltersSx}
        >
          <TextField
            placeholder="Pretraži po adresi, imenu ili broju..."
            defaultValue={search}
            onChange={handleSearchChange}
            size="small"
            sx={jobsSearchFieldSx}
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
          <Select
            value={statusFilter}
            onChange={onStatusFilterChange}
            size="small"
            sx={jobsStatusSelectSx}
          >
            <MenuItem value={ALL_STATUSES}>Svi statusi</MenuItem>
            <MenuItem value="new">{JOB_STATUS_LABELS.new}</MenuItem>
            <MenuItem value="in_progress">
              {JOB_STATUS_LABELS.in_progress}
            </MenuItem>
            <MenuItem value="completed">{JOB_STATUS_LABELS.completed}</MenuItem>
          </Select>
        </Stack>

        <Box sx={jobsPeriodFilterWrapSx}>
          <PeriodFilter
            period={period}
            onPeriodChange={onPeriodChange}
            customFrom={customFrom}
            customTo={customTo}
            onCustomFromChange={onCustomFromChange}
            onCustomToChange={onCustomToChange}
          />
        </Box>
      </Stack>

      <JobsTable
        jobs={pagedJobs}
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        total={filteredJobs.length}
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
        onRowClick={onOpenEditJobModal}
        onAddJob={onOpenAddJobModal}
        hasFilters={
          search.trim() !== "" ||
          statusFilter !== ALL_STATUSES ||
          jobs.length !== filteredJobs.length
        }
        hasPrevPage={currentPage > 1}
        hasNextPage={currentPage < pageCount}
      />

      <JobFormModal
        key={isModalOpen ? (selectedJob?.id ?? "new") : "closed"}
        open={isModalOpen}
        onClose={onCloseJobModal}
        onSubmit={onSubmitJobForm}
        onDelete={onDeleteJob}
        job={selectedJob}
        isSubmitting={
          addJobMutation.isPending ||
          editJobMutation.isPending ||
          deleteJobMutation.isPending
        }
      />
    </Stack>
  );
};

export default Jobs;
