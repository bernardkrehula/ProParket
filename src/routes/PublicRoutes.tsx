import { Box, CircularProgress } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "#/hooks/useSession";

const PublicRoutes = () => {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <CircularProgress size={28} />
      </Box>
    );
  }

  if (session?.data.session) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoutes;
