import { useMemo, useState } from "react";
import {
  Box,
  Chip,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { requestJobs } from "#/api/jobs/requestJobs";
import { requestEditJob } from "#/api/jobs/requestEditJob";
import type { NewJob } from "#/api/jobs/requestAddNewJob";
import type { JobType } from "#/types/Job.type";
import { getJobStatus, JOB_STATUS_LABELS } from "#/utils/getJobStatus";
import { JOB_STATUS_CHIP_COLOR } from "#/pages/jobs/components/JobsTable/jobsTableConfig";
import { formatDate } from "#/utils/format";
import JobFormModal from "#/pages/jobs/components/JobFormModal";
import {
  scheduledJobsLoadingSx,
  scheduledJobsTitleSx,
  scheduledJobsDayGroupSx,
  scheduledJobsDayHeadingSx,
  scheduledJobsRowSx,
  scheduledJobsRowAddressSx,
  scheduledJobsStatusChipSx,
} from "./scheduledJobsConfig";

const Schedule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobType | null>(null);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["jobs", ""],
    queryFn: () => requestJobs(""),
  });

  const jobs = useMemo(() => {
    return data && "data" in data && data.data ? data.data : [];
  }, [data]);

  const dayGroups = useMemo(() => {
    const groups = new Map<string, JobType[]>();

    jobs.forEach((job) => {
      const existing = groups.get(job.date);
      if (existing) {
        existing.push(job);
      } else {
        groups.set(job.date, [job]);
      }
    });

    return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [jobs]);

  const onOpenJobModal = (job: JobType) => () => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const onCloseJobModal = () => {
    setIsModalOpen(false);
  };

  const editJobMutation = useMutation({
    mutationFn: (payload: { id: string; values: NewJob }) =>
      requestEditJob(payload.id, payload.values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      setIsModalOpen(false);
    },
  });

  const onSubmitJobForm = async (values: NewJob): Promise<string | undefined> => {
    if (!selectedJob) return undefined;
    await editJobMutation.mutateAsync({ id: selectedJob.id, values });
    return selectedJob.id;
  };

  if (isLoading) {
    return (
      <Box sx={scheduledJobsLoadingSx}>
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
      <Typography variant="h5" sx={scheduledJobsTitleSx}>
        Raspored poslova
      </Typography>

      {dayGroups.length === 0 && (
        <Typography variant="body2" color="textSecondary">
          Nema zakazanih poslova.
        </Typography>
      )}

      {dayGroups.map(([date, jobsForDay]) => (
        <Paper key={date} variant="outlined" sx={scheduledJobsDayGroupSx}>
          <Typography variant="subtitle1" sx={scheduledJobsDayHeadingSx}>
            {formatDate(date)}
          </Typography>

          <Stack>
            {jobsForDay.map((job) => {
              const status = getJobStatus(job);

              return (
                <Stack
                  key={job.id}
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1}
                  sx={scheduledJobsRowSx}
                  onClick={onOpenJobModal(job)}
                >
                  <Stack>
                    <Typography variant="body1" sx={scheduledJobsRowAddressSx}>
                      {job.address}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {job.client_name} · {job.phone}
                    </Typography>
                  </Stack>

                  <Chip
                    label={JOB_STATUS_LABELS[status]}
                    color={JOB_STATUS_CHIP_COLOR[status]}
                    size="small"
                    sx={scheduledJobsStatusChipSx}
                  />
                </Stack>
              );
            })}
          </Stack>
        </Paper>
      ))}

      <JobFormModal
        key={isModalOpen ? (selectedJob?.id ?? "closed") : "closed"}
        open={isModalOpen}
        onClose={onCloseJobModal}
        onSubmit={onSubmitJobForm}
        job={selectedJob}
        isSubmitting={editJobMutation.isPending}
      />
    </Stack>
  );
};

export default Schedule;
