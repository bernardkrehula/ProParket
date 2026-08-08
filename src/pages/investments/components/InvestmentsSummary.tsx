import { Box, Typography } from "@mui/material";
import type { InvestmentRow } from "#/api/investments/requestInvestments";
import { formatCurrency } from "#/utils/format";
import {
  investmentsSummaryGridSx,
  investmentsSummaryCardSx,
  investmentsSummaryLabelSx,
  investmentsSummaryValueSx,
} from "#/pages/investments/investmentsConfig";

type InvestmentsSummaryProps = {
  investments: InvestmentRow[];
};

const getInvested = (investment: InvestmentRow) =>
  (Number(investment.unit_price) || 0) * (Number(investment.quantity) || 0);

const InvestmentsSummary = ({ investments }: InvestmentsSummaryProps) => {
  const total = investments.reduce((sum, item) => sum + getInvested(item), 0);

  const thisYear = new Date().getFullYear();
  const yearTotal = investments
    .filter(
      (item) => new Date(item.purchase_date).getFullYear() === thisYear,
    )
    .reduce((sum, item) => sum + getInvested(item), 0);

  const biggest = investments.reduce(
    (max, item) => Math.max(max, getInvested(item)),
    0,
  );

  const tiles = [
    { label: "Ukupno uloženo", value: formatCurrency(total) },
    { label: `Uloženo ${thisYear}.`, value: formatCurrency(yearTotal) },
    { label: "Broj stavki", value: String(investments.length) },
    { label: "Najveće ulaganje", value: formatCurrency(biggest) },
  ];

  return (
    <Box sx={investmentsSummaryGridSx}>
      {tiles.map((tile) => (
        <Box key={tile.label} sx={investmentsSummaryCardSx}>
          <Typography sx={investmentsSummaryLabelSx}>{tile.label}</Typography>
          <Typography sx={investmentsSummaryValueSx} title={tile.value}>
            {tile.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default InvestmentsSummary;
