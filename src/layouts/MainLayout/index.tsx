import { useState } from "react";
import { Box, Drawer, IconButton, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import { Outlet } from "react-router-dom";
import Navbar from "#/layouts/Navbar";
import {
  mainLayoutRootSx,
  mainLayoutContentSx,
  mainLayoutMobileBarSx,
  mainLayoutMobileBrandIconBoxSx,
  mainLayoutMobileBrandIconSx,
  mainLayoutMobileBrandTextSx,
  mainLayoutDrawerPaperSx,
} from "./mainLayoutConfig";

const MainLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const onOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const onCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Box sx={mainLayoutRootSx}>
      {isMobile ? (
        <>
          <Stack direction="row" spacing={1.5} sx={mainLayoutMobileBarSx}>
            <IconButton onClick={onOpenDrawer} aria-label="Otvori izbornik">
              <MenuRoundedIcon />
            </IconButton>
            <Box sx={mainLayoutMobileBrandIconBoxSx}>
              <GridViewRoundedIcon sx={mainLayoutMobileBrandIconSx} />
            </Box>
            <Typography variant="subtitle1" sx={mainLayoutMobileBrandTextSx}>
              ParketPro
            </Typography>
          </Stack>

          <Drawer
            open={isDrawerOpen}
            onClose={onCloseDrawer}
            slotProps={{ paper: { sx: mainLayoutDrawerPaperSx } }}
          >
            <Navbar onNavigate={onCloseDrawer} />
          </Drawer>
        </>
      ) : (
        <Navbar />
      )}

      <Box component="main" sx={mainLayoutContentSx}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
