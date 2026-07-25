import { useMemo } from "react";
import { Box, Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import type { JobType } from "#/types/Job.type";
import { getJobStatus } from "#/utils/getJobStatus";
import { JOB_STATUS_TOKENS } from "#/pages/jobs/jobsTokens";
import {
  WEEKDAYS,
  MAX_CHIPS_PER_DAY,
  calendarRootSx,
  calendarNavSx,
  calendarMonthLabelSx,
  calendarNavButtonsSx,
  calendarTodayButtonSx,
  calendarNavIconButtonSx,
  calendarWeekdayRowSx,
  calendarWeekdayCellSx,
  calendarGridSx,
  calendarDayCellSx,
  calendarDayNumberSx,
  calendarChipSx,
  calendarMoreSx,
} from "./scheduleCalendarConfig";

type ScheduleCalendarProps = {
  jobs: JobType[];
  month: Date;
  onMonthChange: (month: Date) => void;
  onJobClick: (job: JobType) => void;
};

const toKey = (date: Date) => {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

const monthFmt = new Intl.DateTimeFormat("hr-HR", {
  month: "long",
  year: "numeric",
});

const ScheduleCalendar = ({
  jobs,
  month,
  onMonthChange,
  onJobClick,
}: ScheduleCalendarProps) => {
  const { days, monthLabel } = useMemo(() => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const first = new Date(year, monthIndex, 1);
    // Monday-first offset (getDay: 0=Sun..6=Sat).
    const offset = (first.getDay() + 6) % 7;
    const grid = Array.from(
      { length: 42 },
      (_, i) => new Date(year, monthIndex, 1 - offset + i),
    );
    return { days: grid, monthLabel: monthFmt.format(first) };
  }, [month]);

  const jobsByDate = useMemo(() => {
    const map = new Map<string, JobType[]>();
    jobs.forEach((job) => {
      const key = toKey(new Date(job.date));
      const list = map.get(key);
      if (list) list.push(job);
      else map.set(key, [job]);
    });
    return map;
  }, [jobs]);

  const todayKey = toKey(new Date());

  const shiftMonth = (delta: number) =>
    onMonthChange(new Date(month.getFullYear(), month.getMonth() + delta, 1));

  return (
    <Paper variant="outlined" sx={calendarRootSx}>
      <Stack direction="row" sx={calendarNavSx}>
        <Typography sx={calendarMonthLabelSx}>{monthLabel}</Typography>
        <Stack direction="row" sx={calendarNavButtonsSx}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => onMonthChange(new Date())}
            sx={calendarTodayButtonSx}
          >
            Danas
          </Button>
          <IconButton
            size="small"
            aria-label="Prethodni mjesec"
            onClick={() => shiftMonth(-1)}
            sx={calendarNavIconButtonSx}
          >
            <ChevronLeftRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            aria-label="Sljedeći mjesec"
            onClick={() => shiftMonth(1)}
            sx={calendarNavIconButtonSx}
          >
            <ChevronRightRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      <Box sx={calendarWeekdayRowSx}>
        {WEEKDAYS.map((day) => (
          <Typography key={day} sx={calendarWeekdayCellSx}>
            {day}
          </Typography>
        ))}
      </Box>

      <Box sx={calendarGridSx}>
        {days.map((day) => {
          const key = toKey(day);
          const inMonth = day.getMonth() === month.getMonth();
          const isToday = key === todayKey;
          const dayJobs = jobsByDate.get(key) ?? [];

          return (
            <Box key={key} sx={calendarDayCellSx(inMonth)}>
              <Box component="span" sx={calendarDayNumberSx(isToday, inMonth)}>
                {day.getDate()}
              </Box>

              {dayJobs.slice(0, MAX_CHIPS_PER_DAY).map((job) => (
                <Box
                  key={job.id}
                  onClick={() => onJobClick(job)}
                  title={job.address}
                  sx={calendarChipSx(JOB_STATUS_TOKENS[getJobStatus(job)])}
                >
                  {job.address}
                </Box>
              ))}

              {dayJobs.length > MAX_CHIPS_PER_DAY && (
                <Box component="span" sx={calendarMoreSx}>
                  +{dayJobs.length - MAX_CHIPS_PER_DAY} više
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};

export default ScheduleCalendar;
