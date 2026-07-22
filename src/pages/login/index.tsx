import type { FormEvent } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { requestLogin } from "#/api/auth/requestLogin";

import { useAuth } from "./hooks/useAuth";
import {
  loginLoadingSx,
  loginRootSx,
  loginCardSx,
  loginTitleSx,
  loginErrorSx,
} from "./loginConfig";
import { LoginScheme } from "./loginScheme";

const Login = () => {
  const { error, isLoading, handleAuth } = useAuth(requestLogin, LoginScheme);

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    handleAuth({ email, password });
  };

  if (isLoading) {
    return (
      <Box sx={loginLoadingSx}>
        <CircularProgress size={120} />
      </Box>
    );
  }

  return (
    <Box sx={loginRootSx}>
      <Paper
        variant="outlined"
        component="form"
        onSubmit={handleLogin}
        sx={loginCardSx}
      >
        <Typography variant="h5" sx={loginTitleSx}>
          Prijava
        </Typography>

        <Stack spacing={2}>
          <TextField name="email" label="Email" type="text" fullWidth />
          <TextField
            name="password"
            label="Lozinka"
            type="password"
            fullWidth
          />

          {error && (
            <Typography variant="body2" sx={loginErrorSx}>
              {error}
            </Typography>
          )}

          <Button type="submit" variant="contained" size="large">
            Prijavi se
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Login;
