import { Box } from "@mui/material";
import { JOB_STATUS_LABELS } from "#/utils/getJobStatus";
import type { JobStatus } from "#/utils/getJobStatus";
import { JOB_STATUS_TOKENS } from "#/pages/jobs/jobsTokens";
import { jobStatusPillSx, jobStatusDotSx } from "./jobStatusPillConfig";

type JobStatusPillProps = {
  status: JobStatus;
};

const JobStatusPill = ({ status }: JobStatusPillProps) => {
  const token = JOB_STATUS_TOKENS[status];

  return (
    <Box component="span" sx={jobStatusPillSx(token)}>
      <Box component="span" sx={jobStatusDotSx(token)} />
      {JOB_STATUS_LABELS[status]}
    </Box>
  );
};

export default JobStatusPill;
