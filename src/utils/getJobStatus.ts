import type { JobType } from "#/types/Job.type";

export type JobStatus = "new" | "in_progress" | "completed";

export const JOB_STATUS_LABELS: Record<JobStatus, string> = {
  new: "Novo",
  in_progress: "U tijeku",
  completed: "Završeno",
};

// Parses a "YYYY-MM-DD" (or ISO) value at LOCAL midnight. `new Date("YYYY-MM-DD")`
// parses as UTC, which in a positive-offset timezone lands after local midnight
// and mislabels today's jobs as "Novo".
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
