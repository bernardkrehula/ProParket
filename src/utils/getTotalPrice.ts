export const getTotalPrice = (squareMeters: string, pricePerM2: string) => {
  const total = (Number(squareMeters) || 0) * (Number(pricePerM2) || 0);
  return Math.round(total * 100) / 100;
};
