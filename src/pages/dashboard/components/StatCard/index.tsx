import { Box, Paper, Typography } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";
import type { StatAccent } from "#/pages/dashboard/dashboardConfig";
import {
  statCardRootSx,
  statCardIconChipSx,
  statCardIconSx,
  statCardLabelSx,
  statCardValueSx,
  statCardHintSx,
} from "./statCardConfig";

type StatCardProps = {
  label: string;
  value: string;
  icon: SvgIconComponent;
  accent: StatAccent;
  hint?: string;
};

const StatCard = ({ label, value, icon: Icon, accent, hint }: StatCardProps) => {
  return (
    <Paper variant="outlined" sx={statCardRootSx(accent)}>
      <Box sx={statCardIconChipSx(accent)}>
        <Icon sx={statCardIconSx} />
      </Box>
      <Box>
        <Typography sx={statCardLabelSx}>{label}</Typography>
        <Typography sx={statCardValueSx}>{value}</Typography>
      </Box>
      {hint ? <Typography sx={statCardHintSx}>{hint}</Typography> : null}
    </Paper>
  );
};

export default StatCard;
