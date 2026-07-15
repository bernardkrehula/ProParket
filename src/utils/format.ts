const currencyFormatter = new Intl.NumberFormat("hr-HR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export const formatCurrency = (value: number) => {
  return currencyFormatter.format(value);
};
