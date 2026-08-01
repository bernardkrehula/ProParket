export type PeriodType = "day" | "month" | "year" | "custom";

export type PeriodRange = {
  from: Date;
  to: Date;
  label: string;
};

export type PeriodOption = {
  value: PeriodType;
  label: string;
};

export const PERIOD_OPTIONS: PeriodOption[] = [
  { value: "day", label: "Dan" },
  { value: "month", label: "Mjesec" },
  { value: "year", label: "Godina" },
  { value: "custom", label: "Prilagođeno" },
];

const dayLabelFmt = new Intl.DateTimeFormat("hr-HR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const monthLabelFmt = new Intl.DateTimeFormat("hr-HR", {
  month: "long",
  year: "numeric",
});

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const addDays = (date: Date, days: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

type PeriodInput = {
  ref?: Date;
  from?: Date;
  to?: Date;
};

export const getPeriodRange = (
  type: PeriodType,
  input: PeriodInput = {},
): PeriodRange => {
  const now = input.ref ?? new Date();

  switch (type) {
    case "day": {
      const from = startOfDay(now);
      return { from, to: addDays(from, 1), label: dayLabelFmt.format(from) };
    }
    case "year": {
      const from = new Date(now.getFullYear(), 0, 1);
      const to = new Date(now.getFullYear() + 1, 0, 1);
      return { from, to, label: `${now.getFullYear()}.` };
    }
    case "custom": {
      const from = input.from ? startOfDay(input.from) : startOfDay(now);
      const lastDay = input.to ? startOfDay(input.to) : from;
      const safeLast = lastDay < from ? from : lastDay;
      return {
        from,
        to: addDays(safeLast, 1),
        label: `${dayLabelFmt.format(from)} – ${dayLabelFmt.format(safeLast)}`,
      };
    }
    case "month":
    default: {
      const from = new Date(now.getFullYear(), now.getMonth(), 1);
      const to = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      return { from, to, label: capitalize(monthLabelFmt.format(from)) };
    }
  }
};
