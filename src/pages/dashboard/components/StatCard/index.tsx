import { Paper, Typography } from "@mui/material";
import { statCardRootSx, statCardValueSx } from "./statCardConfig";

type StatCardProps = {
  label: string;
  value: string;
  emphasizeAsProfit?: boolean;
};

const StatCard = ({ label, value, emphasizeAsProfit }: StatCardProps) => {
  return (
    <Paper variant="outlined" sx={statCardRootSx}>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        {label}
      </Typography>
      <Typography
        color={emphasizeAsProfit ? "success" : undefined}
        sx={statCardValueSx}
      >
        {value}
      </Typography>
    </Paper>
  );
};

export default StatCard;
