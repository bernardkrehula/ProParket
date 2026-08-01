import { Box, Divider, Stack, Typography } from "@mui/material";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import type { JobType } from "#/types/job.types.ts/Job.type";
import { formatDateShort, formatTime } from "#/utils/format";
import { getJobStatus } from "#/utils/getJobStatus";
import { JOB_STATUS_TOKENS } from "#/pages/jobs/jobsTokens";
import JobStatusPill from "#/pages/jobs/components/JobStatusPill";
import {
  jobCardRootSx,
  jobCardOverlayButtonSx,
  jobCardInteractiveSx,
  jobCardTopSx,
  jobCardAddressSx,
  jobCardClientSx,
  jobCardDatesSx,
  jobCardFieldSx,
  jobCardFieldLabelSx,
  jobCardFieldValueSx,
  jobCardFieldValueMutedSx,
  jobCardTimeSx,
  jobCardDividerSx,
  jobCardFooterSx,
  jobCardPhoneSx,
  jobCardPhoneIconSx,
  jobCardNotesSx,
  jobCardChevronSx,
} from "./jobCardConfig";

type JobCardProps = {
  job: JobType;
  onClick: (job: JobType) => void;
};

const JobCard = ({ job, onClick }: JobCardProps) => {
  const status = getJobStatus(job);
  const token = JOB_STATUS_TOKENS[status];

  const handleClick = () => onClick(job);

  const finishedLabel = job.date_finished
    ? formatDateShort(job.date_finished)
    : status === "new"
      ? "Planirano"
      : "U tijeku";

  return (
    <Box sx={jobCardRootSx(token)}>
      <Box
        component="button"
        type="button"
        onClick={handleClick}
        aria-label={`Uredi posao — ${job.address}, ${job.client_name}`}
        sx={jobCardOverlayButtonSx}
      />

      <Stack direction="row" sx={jobCardTopSx}>
        <Box>
          <Typography sx={jobCardAddressSx}>{job.address}</Typography>
          <Typography sx={jobCardClientSx}>{job.client_name}</Typography>
        </Box>
        <ChevronRightRoundedIcon sx={jobCardChevronSx} />
      </Stack>

      <Stack direction="row" sx={jobCardDatesSx}>
        <Box sx={jobCardFieldSx}>
          <Typography sx={jobCardFieldLabelSx}>Planirano</Typography>
          {job.start_time ? (
            <Typography sx={jobCardTimeSx}>
              {formatTime(job.start_time)}
            </Typography>
          ) : null}
          <Typography sx={jobCardFieldValueSx}>
            {formatDateShort(job.date)}
          </Typography>
        </Box>
        <Box sx={jobCardFieldSx}>
          <Typography sx={jobCardFieldLabelSx}>Završeno</Typography>
          <Typography
            sx={
              job.date_finished ? jobCardFieldValueSx : jobCardFieldValueMutedSx
            }
          >
            {finishedLabel}
          </Typography>
        </Box>
      </Stack>

      {job.notes ? <Box sx={jobCardNotesSx}>{job.notes}</Box> : null}

      <Divider sx={jobCardDividerSx} />

      <Stack direction="row" sx={jobCardFooterSx}>
        <JobStatusPill status={status} />
        <Box sx={jobCardInteractiveSx}>
          <Box component="a" href={`tel:${job.phone}`} sx={jobCardPhoneSx}>
            <PhoneRoundedIcon sx={jobCardPhoneIconSx} />
            {job.phone}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default JobCard;
