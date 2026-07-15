import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#111827",
      paper: "#1c2431",
    },
    primary: {
      main: "#3b5bdb",
    },
    success: {
      main: "#22c55e",
    },
    text: {
      primary: "#f3f4f6",
      secondary: "#9ca3af",
    },
    divider: "#2a3341",
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    htmlFontSize: 10,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

export const chartColors = {
  brusenje: "#7c83f0",
  poliranje: "#22b389",
  parket: "#ef6c3b",
  laminat: "#e0428a",
};

export default theme;
