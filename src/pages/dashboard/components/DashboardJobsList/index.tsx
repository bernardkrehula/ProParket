import { useMemo, useState } from "react";
import { Box, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import type { DashboardJob } from "#/api/dashboard/dashboard";
import { formatCurrency, formatDateShort } from "#/utils/format";
import {
  JOBS_SORT_OPTIONS,
  jobsListRootSx,
  jobsListHeaderSx,
  jobsListTitleSx,
  jobsListSortSelectSx,
  jobsListSx,
  jobsListRowSx,
  jobsListRowFill,
  jobsListRowContentSx,
  jobsListLeadSx,
  jobsListAddressSx,
  jobsListMetaSx,
  jobsListTrailSx,
  jobsListPriceSx,
  jobsListDateSx,
  jobsListEmptySx,
} from "./dashboardJobsListConfig";
import type { JobsSort } from "./dashboardJobsListConfig";

type DashboardJobsListProps = {
  jobs: DashboardJob[];
};

const DashboardJobsList = ({ jobs }: DashboardJobsListProps) => {
  const [sort, setSort] = useState<JobsSort>("price_desc");

  const maxPrice = useMemo(
    () => Math.max(...jobs.map((job) => job.price), 1),
    [jobs],
  );

  const sortedJobs = useMemo(() => {
    const list = [...jobs];
    switch (sort) {
      case "price_desc":
        return list.sort((a, b) => b.price - a.price);
      case "price_asc":
        return list.sort((a, b) => a.price - b.price);
      case "date_asc":
        return list.sort((a, b) => a.date.localeCompare(b.date));
      case "date_desc":
      default:
        return list.sort((a, b) => b.date.localeCompare(a.date));
    }
  }, [jobs, sort]);

  const onSortChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as JobsSort);
  };

  return (
    <Paper variant="outlined" sx={jobsListRootSx}>
      <Stack sx={jobsListHeaderSx}>
        <Typography sx={jobsListTitleSx}>Poslovi u razdoblju</Typography>
        <Select
          value={sort}
          onChange={onSortChange}
          size="small"
          sx={jobsListSortSelectSx}
          aria-label="Sortiraj poslove"
        >
          {JOBS_SORT_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </Stack>

      {sortedJobs.length === 0 ? (
        <Box sx={jobsListEmptySx}>Nema poslova za odabrano razdoblje.</Box>
      ) : (
        <Stack sx={jobsListSx}>
          {sortedJobs.map((job) => (
            <Box key={job.id} sx={jobsListRowSx}>
              <Box sx={jobsListRowFill((job.price / maxPrice) * 100)} />
              <Stack direction="row" sx={jobsListRowContentSx}>
                <Box sx={jobsListLeadSx}>
                  <Typography sx={jobsListAddressSx} title={job.address}>
                    {job.address}
                  </Typography>
                  <Typography sx={jobsListMetaSx}>
                    {job.client_name} · {job.phone}
                  </Typography>
                </Box>
                <Box sx={jobsListTrailSx}>
                  <Typography sx={jobsListPriceSx}>
                    {formatCurrency(job.price)}
                  </Typography>
                  <Typography sx={jobsListDateSx}>
                    {formatDateShort(job.date)}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          ))}
        </Stack>
      )}
    </Paper>
  );
};

export default DashboardJobsList;
