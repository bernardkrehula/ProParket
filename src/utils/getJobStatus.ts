import type { JobType } from "#/types/job.types.ts/Job.type";

export type JobStatus = "new" | "in_progress" | "completed";

export const JOB_STATUS_LABELS: Record<JobStatus, string> = {
  new: "Novo",
  in_progress: "U tijeku",
  completed: "Završeno",
};

const parseLocalDate = (value: string) => {
  const [year, month, day] = value.split("T")[0].split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1);
};

export const getJobStatus = (job: JobType): JobStatus => {
  if (job.date_finished) return "completed";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startDate = parseLocalDate(job.date_started);

  if (startDate > today) return "new";

  return "in_progress";
};
