const currencyFormatter = new Intl.NumberFormat("hr-HR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export const formatCurrency = (value: number) => {
  return currencyFormatter.format(value);
};

const percentFormatter = new Intl.NumberFormat("hr-HR", {
  style: "percent",
  maximumFractionDigits: 1,
});

export const formatPercent = (value: number) => {
  return percentFormatter.format(value);
};

const dateFormatter = new Intl.DateTimeFormat("hr-HR", {
  weekday: "long",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export const formatDate = (value: string | null) => {
  if (!value) return "-";
  return dateFormatter.format(new Date(value));
};

const shortDateFormatter = new Intl.DateTimeFormat("hr-HR", {
  weekday: "short",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export const formatDateShort = (value: string | null) => {
  if (!value) return "-";
  const formatted = shortDateFormatter.format(new Date(value));
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

export const formatTime = (value: string | null) => {
  if (!value) return "-";
  const [hours, minutes] = value.split(":");
  if (hours == null || minutes == null) return "-";
  return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}h`;
};

export const todayInputValue = () => {
  const today = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
};

export const toDateInputValue = (value: string | null) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};
