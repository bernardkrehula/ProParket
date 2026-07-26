import type { JobStatus } from "#/utils/getJobStatus";

// Shared type and surface primitives now live in the theme so every page reads
// as one system. Re-exported here so existing jobs imports keep working.
export {
  MONO_FONT,
  LABEL_FONT,
  microLabelSx,
  monoValueSx,
  scrollbarSx,
} from "#/theme/tokens";

export type JobStatusToken = {
  /** Text and dot colour. */
  fg: string;
  /** Tonal pill fill. */
  bg: string;
  /** Tonal pill border. */
  border: string;
  /** Leading-edge rail on a row or a card. */
  rail: string;
};

export const JOB_STATUS_TOKENS: Record<JobStatus, JobStatusToken> = {
  new: {
    fg: "#9aa2f5",
    bg: "rgba(124, 131, 240, 0.14)",
    border: "rgba(124, 131, 240, 0.32)",
    rail: "#7c83f0",
  },
  in_progress: {
    fg: "#f5b06a",
    bg: "rgba(240, 145, 60, 0.14)",
    border: "rgba(240, 145, 60, 0.32)",
    rail: "#f0913c",
  },
  completed: {
    fg: "#54cfa2",
    bg: "rgba(43, 189, 140, 0.14)",
    border: "rgba(43, 189, 140, 0.32)",
    rail: "#2bbd8c",
  },
};
