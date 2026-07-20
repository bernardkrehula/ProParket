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
import type { NewJob } from "#/api/jobs/requestAddNewJob";
import type { JobType } from "#/types/Job.type";
import { getJobStatus, JOB_STATUS_LABELS } from "#/utils/getJobStatus";
import type { JobStatus } from "#/utils/getJobStatus";
import JobsTable from "./components/JobsTable";
import JobFormModal from "./components/JobFormModal";
import {
  jobsLoadingSx,
  jobsHeaderSx,
  jobsTitleSx,
  jobsFiltersSx,
  jobsSearchFieldSx,
  jobsStatusSelectSx,
  PAGE_SIZE,
  ALL_STATUSES,
} from "./jobsConfig";

const Jobs = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    typeof ALL_STATUSES | JobStatus
  >(ALL_STATUSES);
  const [page, setPage] = useState(1);
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

  const filteredJobs = useMemo(() => {
    if (statusFilter === ALL_STATUSES) return jobs;
    return jobs.filter((job) => getJobStatus(job) === statusFilter);
  }, [jobs, statusFilter]);

  const pageCount = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const rangeStart =
    filteredJobs.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, filteredJobs.length);
  const pagedJobs = filteredJobs.slice((currentPage - 1) * PAGE_SIZE, rangeEnd);

  const onJobSaved = () => {
    queryClient.invalidateQueries({ queryKey: ["jobs"] });
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
        <Typography variant="h5" sx={jobsTitleSx}>
          Svi poslovi
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={onOpenAddJobModal}
        >
          Novi posao
        </Button>
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={jobsFiltersSx}
      >
        <TextField
          placeholder="Pretraži adresu..."
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

      <JobsTable
        jobs={pagedJobs}
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        total={filteredJobs.length}
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
        onRowClick={onOpenEditJobModal}
        hasPrevPage={currentPage > 1}
        hasNextPage={currentPage < pageCount}
      />

      <JobFormModal
        key={isModalOpen ? (selectedJob?.id ?? "new") : "closed"}
        open={isModalOpen}
        onClose={onCloseJobModal}
        onSubmit={onSubmitJobForm}
        job={selectedJob}
        isSubmitting={addJobMutation.isPending || editJobMutation.isPending}
      />
    </Stack>
  );
};

export default Jobs;
