import { useMemo } from "react";
import { Box, Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import type { JobType } from "#/types/Job.type";
import { getJobStatus } from "#/utils/getJobStatus";
import { JOB_STATUS_TOKENS } from "#/pages/jobs/jobsTokens";
import {
  WEEKDAYS,
  calendarRootSx,
  calendarNavSx,
  calendarMonthLabelSx,
  calendarNavButtonsSx,
  calendarTodayButtonSx,
  calendarNavIconButtonSx,
  calendarWeekdayRowSx,
  calendarWeekdayCellSx,
  calendarWeekSx,
  calendarDayBgSx,
  calendarDayNumberCellSx,
  calendarDayNumberSx,
  calendarBarSx,
} from "./scheduleCalendarConfig";

type ScheduleCalendarProps = {
  jobs: JobType[];
  month: Date;
  onMonthChange: (month: Date) => void;
  onJobClick: (job: JobType) => void;
};

type Segment = {
  job: JobType;
  startCol: number;
  endCol: number;
  lane: number;
  continuesLeft: boolean;
  continuesRight: boolean;
};

const toKey = (date: Date) => {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

const parseLocal = (value: string) => {
  const [year, m, d] = value.split("T")[0].split("-").map(Number);
  return new Date(year, (m ?? 1) - 1, d ?? 1);
};

// Whole-day difference, DST-safe (compares calendar days, not elapsed time).
const daysBetween = (from: Date, to: Date) =>
  Math.round(
    (Date.UTC(to.getFullYear(), to.getMonth(), to.getDate()) -
      Date.UTC(from.getFullYear(), from.getMonth(), from.getDate())) /
      86400000,
  );

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
    const offset = (first.getDay() + 6) % 7; // Monday-first
    const grid = Array.from(
      { length: 42 },
      (_, i) => new Date(year, monthIndex, 1 - offset + i),
    );
    return { days: grid, monthLabel: monthFmt.format(first) };
  }, [month]);

  // Each week: its 7 days plus the lane-packed job segments that fall in it.
  const weeks = useMemo(() => {
    const gridStart = days[0];

    const items = jobs
      .map((job) => {
        const start = parseLocal(job.date);
        const endRaw = job.end_date ? parseLocal(job.end_date) : start;
        const end = endRaw < start ? start : endRaw;
        return {
          job,
          startIdx: daysBetween(gridStart, start),
          endIdx: daysBetween(gridStart, end),
        };
      })
      .filter((item) => item.endIdx >= 0 && item.startIdx <= 41);

    return Array.from({ length: 6 }, (_, week) => {
      const weekStart = week * 7;
      const weekEnd = weekStart + 6;
      const weekDays = days.slice(weekStart, weekStart + 7);

      const segments: Segment[] = items
        .filter((it) => it.startIdx <= weekEnd && it.endIdx >= weekStart)
        .map((it) => ({
          job: it.job,
          startCol: Math.max(it.startIdx, weekStart) - weekStart,
          endCol: Math.min(it.endIdx, weekEnd) - weekStart,
          lane: 0,
          continuesLeft: it.startIdx < weekStart,
          continuesRight: it.endIdx > weekEnd,
        }))
        .sort(
          (a, b) =>
            a.startCol - b.startCol ||
            b.endCol - b.startCol - (a.endCol - a.startCol),
        );

      // Greedy lane packing so overlapping bars stack instead of collide.
      const laneEnds: number[] = [];
      segments.forEach((seg) => {
        let lane = laneEnds.findIndex((end) => end < seg.startCol);
        if (lane === -1) {
          lane = laneEnds.length;
          laneEnds.push(seg.endCol);
        } else {
          laneEnds[lane] = seg.endCol;
        }
        seg.lane = lane;
      });

      return { weekDays, segments };
    });
  }, [days, jobs]);

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

      {weeks.map((week, weekIndex) => (
        <Box key={weekIndex} sx={calendarWeekSx}>
          {/* Background day cells (borders, dimming) span all lane rows */}
          {week.weekDays.map((day, col) => (
            <Box
              key={`bg-${col}`}
              sx={calendarDayBgSx(day.getMonth() === month.getMonth(), col === 6)}
              style={{ gridColumn: col + 1, gridRow: "1 / -1" }}
            />
          ))}

          {/* Day numbers */}
          {week.weekDays.map((day, col) => (
            <Box
              key={`num-${col}`}
              sx={calendarDayNumberCellSx}
              style={{ gridColumn: col + 1, gridRow: 1 }}
            >
              <Box
                component="span"
                sx={calendarDayNumberSx(
                  toKey(day) === todayKey,
                  day.getMonth() === month.getMonth(),
                )}
              >
                {day.getDate()}
              </Box>
            </Box>
          ))}

          {/* Spanning job bars */}
          {week.segments.map((seg) => (
            <Box
              key={seg.job.id}
              onClick={() => onJobClick(seg.job)}
              title={seg.job.address}
              sx={calendarBarSx(
                JOB_STATUS_TOKENS[getJobStatus(seg.job)],
                seg.continuesLeft,
                seg.continuesRight,
              )}
              style={{
                gridColumn: `${seg.startCol + 1} / ${seg.endCol + 2}`,
                gridRow: seg.lane + 2,
              }}
            >
              {seg.job.address}
            </Box>
          ))}
        </Box>
      ))}
    </Paper>
  );
};

export default ScheduleCalendar;
