import {
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
import {
  jobsTableRootSx,
  jobsTableHeaderCellSx,
  jobsTableBodyCellSx,
  jobsTableFooterSx,
  jobsTableRowSx,
} from "./jobsTableConfig";

type JobsTableProps = {
  jobs: JobType[];
  rangeStart: number;
  rangeEnd: number;
  total: number;
  onPrevPage: () => void;
  onNextPage: () => void;
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
  hasPrevPage,
  hasNextPage,
}: JobsTableProps) => {
  return (
    <Paper variant="outlined" sx={jobsTableRootSx}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={jobsTableHeaderCellSx}>Adresa</TableCell>
              <TableCell sx={jobsTableHeaderCellSx}>Klijent</TableCell>
              <TableCell sx={jobsTableHeaderCellSx}>Telefon</TableCell>
              <TableCell sx={jobsTableHeaderCellSx}>Datum</TableCell>
              <TableCell sx={jobsTableHeaderCellSx}>Datum završetka</TableCell>
              <TableCell sx={jobsTableHeaderCellSx}>Napomena</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id} sx={jobsTableRowSx}>
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
                  {job.notes ?? "-"}
                </TableCell>
              </TableRow>
            ))}
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
