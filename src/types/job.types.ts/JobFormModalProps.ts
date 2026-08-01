import type { JobType, NewJob } from "./Job.type";

export type JobFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: NewJob) => Promise<string | undefined>;
  onDelete?: (jobId: string) => void;
  job?: JobType | null;
  isSubmitting?: boolean;
};

export type ModalMode = "view" | "edit";