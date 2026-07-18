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
import { useNavigate } from "react-router-dom";
import { requestLogin } from "#/api/auth/requestLogin";
import type { LoginCredentials } from "#/api/auth/requestLogin";
import { requestDemoLogin } from "#/api/auth/requestDemoLogin";
import { useAuth } from "./hooks/useAuth";
import {
  loginRootSx,
  loginCardSx,
  loginTitleSx,
  loginErrorSx,
  loginQuestionsSx,
  loginQuestionRowSx,
} from "./loginConfig";

const requestDemoLoginPayload = () => requestDemoLogin();

const Login = () => {
  const navigate = useNavigate();
  const { error, isLoading, handleAuth } = useAuth<LoginCredentials>(requestLogin);
  const {
    error: demoError,
    isLoading: demoLoading,
    handleAuth: demoLogin,
  } = useAuth<undefined>(requestDemoLoginPayload);

  const onNavigateToSignUp = () => {
    navigate("/sign-up");
  };

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    handleAuth({ email, password });
  };

  const handleDemoLogin = () => {
    demoLogin(undefined);
  };

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
          <TextField name="email" label="Email" type="email" required fullWidth />
          <TextField name="password" label="Lozinka" type="password" required fullWidth />

          {(error || demoError) && (
            <Typography variant="body2" sx={loginErrorSx}>
              {error || demoError}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isLoading || demoLoading}
          >
            {isLoading ? <CircularProgress size={22} color="inherit" /> : "Prijavi se"}
          </Button>
        </Stack>

        <Stack spacing={1.5} sx={loginQuestionsSx}>
          <Stack direction="row" spacing={1} sx={loginQuestionRowSx}>
            <Typography variant="body2" color="textSecondary">
              Nemate račun?
            </Typography>
            <Button type="button" onClick={onNavigateToSignUp} size="small">
              Registracija
            </Button>
          </Stack>

          <Stack direction="row" spacing={1} sx={loginQuestionRowSx}>
            <Typography variant="body2" color="textSecondary">
              Ili,
            </Typography>
            <Button
              type="button"
              onClick={handleDemoLogin}
              size="small"
              disabled={isLoading || demoLoading}
            >
              {demoLoading ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                "Prijavi se kao gost"
              )}
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Login;
