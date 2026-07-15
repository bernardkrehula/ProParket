import { Stack, Typography } from "@mui/material";

type ComingSoonProps = {
  title: string;
};

const ComingSoon = ({ title }: ComingSoonProps) => {
  return (
    <Stack spacing={1}>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Ova stranica je u izradi.
      </Typography>
    </Stack>
  );
};

export default ComingSoon;
