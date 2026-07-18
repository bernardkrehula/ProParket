import { Box, CircularProgress } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "#/hooks/useSession";

const PrivateRoutes = () => {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <CircularProgress size={28} />
      </Box>
    );
  }

  if (!session?.data.session && false) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
