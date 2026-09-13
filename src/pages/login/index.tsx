import { useState } from "react";
import type { FormEvent } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { requestLogin } from "#/api/auth/requestLogin";
import { useAuth } from "./hooks/useAuth";
import {
  loginLoadingSx,
  loginRootSx,
  loginBrandPanelSx,
  loginBrandRowSx,
  loginBrandIconBoxSx,
  loginBrandIconSx,
  loginBrandTextSx,
  loginPanelHeadlineSx,
  loginPanelTaglineSx,
  loginFormPanelSx,
  loginFormSx,
  loginMobileBrandSx,
  loginHeadingSx,
  loginSubheadingSx,
  loginFieldSx,
  loginButtonSx,
  loginGuestButtonSx,
  loginDividerSx,
  loginErrorSx,
} from "./loginConfig";
import { LoginScheme } from "./loginScheme";

const GUEST_CREDENTIALS = {
  email: "demo@gmail.com",
  password: "demo1234",
};

const Login = () => {
  const { error, isLoading, handleAuth } = useAuth(requestLogin, LoginScheme);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    handleAuth({ email, password });
  };

  const handleGuestLogin = () => {
    handleAuth(GUEST_CREDENTIALS);
  };

  if (isLoading) {
    return (
      <Box sx={loginLoadingSx}>
        <CircularProgress size={64} />
      </Box>
    );
  }

  const brand = (
    <>
      <Box sx={loginBrandIconBoxSx}>
        <GridViewRoundedIcon sx={loginBrandIconSx} />
      </Box>
      <Typography sx={loginBrandTextSx}>ParketPro</Typography>
    </>
  );

  return (
    <Box sx={loginRootSx}>
      <Box sx={loginBrandPanelSx}>
        <Stack direction="row" spacing={1.5} sx={loginBrandRowSx}>
          {brand}
        </Stack>

        <Box>
          <Typography sx={loginPanelHeadlineSx}>
            Vodite parketarske poslove na jednom mjestu.
          </Typography>
          <Typography sx={loginPanelTaglineSx}>
            Poslovi, raspored i cjenik — pregledno i uvijek pri ruci.
          </Typography>
        </Box>
      </Box>

      <Box sx={loginFormPanelSx}>
        <Box component="form" onSubmit={handleLogin} sx={loginFormSx}>
          <Stack direction="row" spacing={1.5} sx={loginMobileBrandSx}>
            {brand}
          </Stack>

          <Box>
            <Typography sx={loginHeadingSx}>Dobrodošli natrag</Typography>
            <Typography sx={loginSubheadingSx}>
              Prijavite se u svoj račun.
            </Typography>
          </Box>

          <Stack spacing={2}>
            <TextField
              name="email"
              label="Email"
              type="text"
              fullWidth
              sx={loginFieldSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlineRoundedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              name="password"
              label="Lozinka"
              type={showPassword ? "text" : "password"}
              fullWidth
              sx={loginFieldSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                        size="small"
                        aria-label={
                          showPassword ? "Sakrij lozinku" : "Prikaži lozinku"
                        }
                      >
                        {showPassword ? (
                          <VisibilityOffRoundedIcon fontSize="small" />
                        ) : (
                          <VisibilityRoundedIcon fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            {error && <Typography sx={loginErrorSx}>{error}</Typography>}

            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={loginButtonSx}
            >
              Prijavi se
            </Button>

            <Divider sx={loginDividerSx}>ili</Divider>

            <Button
              type="button"
              variant="outlined"
              size="large"
              onClick={handleGuestLogin}
              startIcon={<PersonOutlineRoundedIcon />}
              sx={loginGuestButtonSx}
            >
              Prijavi se kao gost
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
