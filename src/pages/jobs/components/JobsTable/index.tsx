import {
  Chip,
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
} from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import type { JobType } from "#/types/Job.type";
import { formatDate } from "#/utils/format";
import { getJobStatus, JOB_STATUS_LABELS } from "#/utils/getJobStatus";
import {
  jobsTableRootSx,
  jobsTableHeaderCellSx,
  jobsTableBodyCellSx,
  jobsTableFooterSx,
  jobsTableRowSx,
  jobsTableStatusChipSx,
  jobsTableSx,
  jobsTableContainerSx,
  jobsTableNotesCellSx,
  JOB_STATUS_CHIP_COLOR,
} from "./jobsTableConfig";

type JobsTableProps = {
  jobs: JobType[];
  rangeStart: number;
  rangeEnd: number;
  total: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onRowClick: (job: JobType) => void;
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
  hasPrevPage,
  hasNextPage,
}: JobsTableProps) => {
  const handleRowClick = (job: JobType) => () => onRowClick(job);

  return (
    <Paper variant="outlined" sx={jobsTableRootSx}>
      <TableContainer sx={jobsTableContainerSx}>
        <Table size="small" sx={jobsTableSx}>
          <TableHead>
            <TableRow>
              <TableCell sx={jobsTableHeaderCellSx}>Adresa</TableCell>
              <TableCell sx={jobsTableHeaderCellSx}>Klijent</TableCell>
              <TableCell sx={jobsTableHeaderCellSx}>Telefon</TableCell>
              <TableCell sx={jobsTableHeaderCellSx}>Datum</TableCell>
              <TableCell sx={jobsTableHeaderCellSx}>Datum završetka</TableCell>
              <TableCell sx={jobsTableHeaderCellSx}>Status</TableCell>
              <TableCell sx={jobsTableHeaderCellSx}>Napomena</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => {
              const status = getJobStatus(job);

              return (
                <TableRow key={job.id} sx={jobsTableRowSx} onClick={handleRowClick(job)}>
                  <TableCell sx={jobsTableBodyCellSx}>{job.address}</TableCell>
                  <TableCell sx={jobsTableBodyCellSx}>{job.client_name}</TableCell>
                  <TableCell sx={jobsTableBodyCellSx}>{job.phone}</TableCell>
                  <TableCell sx={jobsTableBodyCellSx}>
                    {formatDate(job.date)}
                  </TableCell>
                  <TableCell sx={jobsTableBodyCellSx}>
                    {job.date_finished ? formatDate(job.date_finished) : "U tijeku"}
                  </TableCell>
                  <TableCell sx={jobsTableBodyCellSx}>
                    <Chip
                      label={JOB_STATUS_LABELS[status]}
                      color={JOB_STATUS_CHIP_COLOR[status]}
                      size="small"
                      sx={jobsTableStatusChipSx}
                    />
                  </TableCell>
                  <TableCell sx={jobsTableNotesCellSx}>
                    {job.notes ?? "-"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" sx={jobsTableFooterSx}>
        <Typography variant="body2" color="textSecondary">
          Prikazano {rangeStart}-{rangeEnd} od {total}
        </Typography>
        <Stack direction="row" spacing={1}>
          <IconButton size="small" onClick={onPrevPage} disabled={!hasPrevPage}>
            <ChevronLeftRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={onNextPage} disabled={!hasNextPage}>
            <ChevronRightRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default JobsTable;
