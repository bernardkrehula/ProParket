import {
  Box,
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
import type { RecentJob } from "#/api/dashboard";
import { formatCurrency } from "#/utils/format";
import {
  recentJobsTableRootSx,
  recentJobsTableTitleSx,
  recentJobsTableHeaderCellSx,
  recentJobsTableBodyCellSx,
  recentJobsTableServiceStackSx,
  recentJobsTableServiceDotSx,
  recentJobsTableProfitCellSx,
} from "./recentJobsTableConfig";

type RecentJobsTableProps = {
  jobs: RecentJob[];
};

const RecentJobsTable = ({ jobs }: RecentJobsTableProps) => {
  return (
    <Paper variant="outlined" sx={recentJobsTableRootSx}>
      <Typography variant="subtitle1" sx={recentJobsTableTitleSx}>
        Nedavni poslovi
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={recentJobsTableHeaderCellSx}>Adresa</TableCell>
              <TableCell sx={recentJobsTableHeaderCellSx}>Usluga</TableCell>
              <TableCell sx={recentJobsTableHeaderCellSx}>m²</TableCell>
              <TableCell sx={recentJobsTableHeaderCellSx}>Zarada</TableCell>
              <TableCell sx={recentJobsTableHeaderCellSx}>Trošak</TableCell>
              <TableCell sx={recentJobsTableHeaderCellSx} align="right">
                Profit
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell sx={recentJobsTableBodyCellSx}>
                  {job.address}
                </TableCell>
                <TableCell sx={recentJobsTableBodyCellSx}>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={recentJobsTableServiceStackSx}
                  >
                    <Box
                      sx={{
                        ...recentJobsTableServiceDotSx,
                        bgcolor: job.serviceColor,
                      }}
                    />
                    <Typography variant="body2">{job.service}</Typography>
                  </Stack>
                </TableCell>
                <TableCell sx={recentJobsTableBodyCellSx}>
                  {job.areaM2}
                </TableCell>
                <TableCell sx={recentJobsTableBodyCellSx}>
                  {formatCurrency(job.earnings)}
                </TableCell>
                <TableCell sx={recentJobsTableBodyCellSx}>
                  {formatCurrency(job.cost)}
                </TableCell>
                <TableCell sx={recentJobsTableProfitCellSx} align="right">
                  {formatCurrency(job.profit)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RecentJobsTable;
