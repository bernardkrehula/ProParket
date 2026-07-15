import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "#/layouts/Navbar";
import { mainLayoutRootSx, mainLayoutContentSx } from "./mainLayoutConfig";

const MainLayout = () => {
  return (
    <Box sx={mainLayoutRootSx}>
      <Navbar />
      <Box component="main" sx={mainLayoutContentSx}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
