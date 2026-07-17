const currencyFormatter = new Intl.NumberFormat("hr-HR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export const formatCurrency = (value: number) => {
  return currencyFormatter.format(value);
};

const dateFormatter = new Intl.DateTimeFormat("hr-HR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export const formatDate = (value: string | null) => {
  if (!value) return "-";
  return dateFormatter.format(new Date(value));
};
