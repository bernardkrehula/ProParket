import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { APIProvider } from "@vis.gl/react-google-maps";
import theme from "#/theme/theme";

const queryClient = new QueryClient();

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_PLACES_API_KEY ?? "";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <APIProvider apiKey={googleMapsApiKey}>
          <RouterProvider router={router} />
        </APIProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);