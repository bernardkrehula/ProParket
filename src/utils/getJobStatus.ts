import type { JobType } from "#/types/Job.type";

export type JobStatus = "new" | "in_progress" | "completed";

export const JOB_STATUS_LABELS: Record<JobStatus, string> = {
  new: "Novo",
  in_progress: "U tijeku",
  completed: "Završeno",
};

export const getJobStatus = (job: JobType): JobStatus => {
  if (job.date_finished) return "completed";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startDate = new Date(job.date_started);

  if (startDate > today) return "new";

  return "in_progress";
};
