import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { debounce } from "throttle-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { requestJobs } from "#/api/requestJobs";
import JobsTable from "./components/JobsTable";
import {
  jobsLoadingSx,
  jobsHeaderSx,
  jobsTitleSx,
  jobsFiltersSx,
  jobsSearchFieldSx,
  PAGE_SIZE,
} from "./jobsConfig";

const Jobs = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["jobs", search],
    queryFn: () => requestJobs(search),
    placeholderData: keepPreviousData,
  });

  const jobs = useMemo(() => {
    return data && "data" in data && data.data ? data.data : [];
  }, [data]);

  const pageCount = Math.max(1, Math.ceil(jobs.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const rangeStart = jobs.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, jobs.length);
  const pagedJobs = jobs.slice((currentPage - 1) * PAGE_SIZE, rangeEnd);

  const debouncedSearch = useMemo(
    () =>
      debounce(1000, (value: string) => {
        setSearch(value);
        setPage(1);
      }),
    [],
  );

  useEffect(() => {
    return () => debouncedSearch.cancel({ upcomingOnly: true });
  }, [debouncedSearch]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  const onPrevPage = () => {
    setPage((prev) => Math.max(1, prev - 1));
  };

  const onNextPage = () => {
    setPage((prev) => Math.min(pageCount, prev + 1));
  };

  if (isLoading) {
    return (
      <Box sx={jobsLoadingSx}>
        <CircularProgress size={28} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error">
        Nešto je pošlo po krivu prilikom učitavanja podataka.
      </Typography>
    );
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" sx={jobsHeaderSx}>
        <Typography variant="h5" sx={jobsTitleSx}>
          Svi poslovi
        </Typography>
        <Button variant="contained" startIcon={<AddRoundedIcon />}>
          Novi posao
        </Button>
      </Stack>

      <Stack direction="row" spacing={2} sx={jobsFiltersSx}>
        <TextField
          placeholder="Pretraži adresu..."
          defaultValue={search}
          onChange={handleSearchChange}
          size="small"
          sx={jobsSearchFieldSx}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
      </Stack>

      <JobsTable
        jobs={pagedJobs}
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        total={jobs.length}
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
        hasPrevPage={currentPage > 1}
        hasNextPage={currentPage < pageCount}
      />
    </Stack>
  );
};

export default Jobs;
