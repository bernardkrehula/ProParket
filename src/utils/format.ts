const currencyFormatter = new Intl.NumberFormat("hr-HR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export const formatCurrency = (value: number) => {
  return currencyFormatter.format(value);
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

export const toDateInputValue = (value: string | null) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};
