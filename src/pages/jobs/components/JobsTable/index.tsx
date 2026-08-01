import type { KeyboardEvent } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import type { JobType } from "#/types/job.types.ts/Job.type";
import { formatDateShort, formatTime } from "#/utils/format";
import { getJobStatus } from "#/utils/getJobStatus";
import { JOB_STATUS_TOKENS } from "#/pages/jobs/jobsTokens";
import JobCard from "#/pages/jobs/components/JobCard";
import JobStatusPill from "#/pages/jobs/components/JobStatusPill";
import {
  JOBS_TABLE_COLUMNS,
  jobsTableRootSx,
  jobsTableContainerSx,
  jobsTableSx,
  jobsTableHeadRowSx,
  jobsTableHeaderCellSx,
  jobsTableRowSx,
  jobsTableBodyCellSx,
  jobsTableLeadCellSx,
  jobsTableAddressSx,
  jobsTableClientSx,
  jobsTableMonoCellSx,
  jobsTableMonoMutedCellSx,
  jobsTablePlannedTimeSx,
  jobsTablePlannedDateSubSx,
  jobsTablePhoneSx,
  jobsTableNotesCellSx,
  jobsCardListSx,
  jobsFooterSx,
  jobsFooterRangeSx,
  jobsFooterButtonSx,
  jobsEmptyStateSx,
  jobsEmptyIconSx,
  jobsEmptyTitleSx,
  jobsEmptyBodySx,
} from "./jobsTableConfig";

type JobsTableProps = {
  jobs: JobType[];
  rangeStart: number;
  rangeEnd: number;
  total: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onRowClick: (job: JobType) => void;
  onAddJob: () => void;
  hasFilters: boolean;
  hasPrevPage: boolean;
  hasNextPage: boolean;
};

const JobsTable = ({
  jobs,
  rangeStart,
  rangeEnd,
  total,
  onPrevPage,
  onNextPage,
  onRowClick,
  onAddJob,
  hasFilters,
  hasPrevPage,
  hasNextPage,
}: JobsTableProps) => {
  const theme = useTheme();
  const isCompact = useMediaQuery(theme.breakpoints.down("lg"));

  const handleRowClick = (job: JobType) => () => onRowClick(job);

  const handleRowKeyDown =
    (job: JobType) => (event: KeyboardEvent<HTMLElement>) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      onRowClick(job);
    };

  const getFinishedLabel = (job: JobType) => {
    if (job.date_finished) return formatDateShort(job.date_finished);
    return getJobStatus(job) === "new" ? "Planirano" : "U tijeku";
  };

  if (total === 0) {
    return (
      <Stack sx={jobsEmptyStateSx}>
        <SearchOffRoundedIcon sx={jobsEmptyIconSx} />
        <Typography sx={jobsEmptyTitleSx}>
          {hasFilters ? "Nema rezultata" : "Još nema poslova"}
        </Typography>
        <Typography sx={jobsEmptyBodySx}>
          {hasFilters
            ? "Nijedan posao ne odgovara pretrazi i odabranom statusu. Promijeni pretragu ili status."
            : "Dodaj prvi posao i pojavit će se na ovom popisu."}
        </Typography>
        {hasFilters ? null : (
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={onAddJob}
            sx={{ mt: 2 }}
          >
            Novi posao
          </Button>
        )}
      </Stack>
    );
  }

  const footer = (
    <Stack direction="row" sx={jobsFooterSx}>
      <Typography sx={jobsFooterRangeSx}>
        {rangeStart}–{rangeEnd} od {total}
      </Typography>
      <Stack direction="row" spacing={1}>
        <IconButton
          size="small"
          onClick={onPrevPage}
          disabled={!hasPrevPage}
          aria-label="Prethodna stranica"
          sx={jobsFooterButtonSx}
        >
          <ChevronLeftRoundedIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={onNextPage}
          disabled={!hasNextPage}
          aria-label="Sljedeća stranica"
          sx={jobsFooterButtonSx}
        >
          <ChevronRightRoundedIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Stack>
  );

  if (isCompact) {
    return (
      <Box>
        <Box sx={jobsCardListSx}>
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onClick={onRowClick} />
          ))}
        </Box>
        {footer}
      </Box>
    );
  }

  return (
    <Paper variant="outlined" sx={jobsTableRootSx}>
      <TableContainer sx={jobsTableContainerSx}>
        <Table sx={jobsTableSx}>
          <TableHead>
            <TableRow sx={jobsTableHeadRowSx}>
              {JOBS_TABLE_COLUMNS.map((column) => (
                <TableCell
                  key={column.id}
                  width={column.width}
                  sx={jobsTableHeaderCellSx}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => {
              const status = getJobStatus(job);

              return (
                <TableRow
                  key={job.id}
                  tabIndex={0}
                  onClick={handleRowClick(job)}
                  onKeyDown={handleRowKeyDown(job)}
                  sx={jobsTableRowSx}
                >
                  <TableCell
                    sx={jobsTableLeadCellSx(JOB_STATUS_TOKENS[status])}
                  >
                    <Typography sx={jobsTableAddressSx} title={job.address}>
                      {job.address}
                    </Typography>
                    <Typography sx={jobsTableClientSx} title={job.client_name}>
                      {job.client_name}
                    </Typography>
                  </TableCell>
                  <TableCell sx={jobsTableBodyCellSx}>
                    <Box
                      component="a"
                      href={`tel:${job.phone}`}
                      onClick={(event) => event.stopPropagation()}
                      sx={jobsTablePhoneSx}
                    >
                      {job.phone}
                    </Box>
                  </TableCell>
                  <TableCell sx={jobsTableMonoCellSx}>
                    {job.start_time ? (
                      <>
                        <Box sx={jobsTablePlannedTimeSx}>
                          {formatTime(job.start_time)}
                        </Box>
                        <Box sx={jobsTablePlannedDateSubSx}>
                          {formatDateShort(job.date)}
                        </Box>
                      </>
                    ) : (
                      formatDateShort(job.date)
                    )}
                  </TableCell>
                  <TableCell
                    sx={
                      job.date_finished
                        ? jobsTableMonoCellSx
                        : jobsTableMonoMutedCellSx
                    }
                  >
                    {getFinishedLabel(job)}
                  </TableCell>
                  <TableCell sx={jobsTableBodyCellSx}>
                    <JobStatusPill status={status} />
                  </TableCell>
                  <TableCell sx={jobsTableNotesCellSx}>
                    <Box component="span" title={job.notes ?? undefined}>
                      {job.notes ?? "—"}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {footer}
    </Paper>
  );
};

export default JobsTable;
