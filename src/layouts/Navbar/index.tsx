import { Box, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import type { SvgIconComponent } from "@mui/icons-material";
import {
  navbarRootSx,
  brandStackSx,
  brandIconBoxSx,
  brandIconSx,
  brandTextSx,
  navListSpacing,
  navItemSx,
  navItemIconSx,
  navItemLabelSx,
} from "./navbarConfig";

type NavItem = {
  label: string;
  to: string;
  icon: SvgIconComponent;
};

const navItems: NavItem[] = [
  { label: "Nadzorna ploča", to: "/", icon: SpaceDashboardOutlinedIcon },
  { label: "Poslovi", to: "/poslovi", icon: WorkOutlineOutlinedIcon },
  { label: "Cjenik", to: "/cjenik", icon: ApartmentOutlinedIcon },
  { label: "Postavke", to: "/postavke", icon: SettingsOutlinedIcon },
];

const Navbar = () => {
  return (
    <Box component="nav" sx={navbarRootSx}>
      <Stack direction="row" spacing={1.5} sx={brandStackSx}>
        <Box sx={brandIconBoxSx}>
          <GridViewRoundedIcon sx={brandIconSx} />
        </Box>
        <Typography variant="subtitle1" sx={brandTextSx}>
          ParketPro
        </Typography>
      </Stack>

      <Stack spacing={navListSpacing}>
        {navItems.map(({ label, to, icon: Icon }) => (
          <Box
            key={to}
            component={NavLink}
            to={to}
            end={to === "/"}
            sx={navItemSx}
          >
            <Icon sx={navItemIconSx} />
            <Typography variant="body2" color="inherit" sx={navItemLabelSx}>
              {label}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Navbar;
