import { Box, Stack, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import type { SvgIconComponent } from "@mui/icons-material";
import { requestLogout } from "#/api/auth/requestLogout";
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
  navLogoutSx,
} from "./navbarConfig";
import { useSession } from "#/hooks/useSession";

type NavItem = {
  label: string;
  to: string;
  icon: SvgIconComponent;
};

type NavbarProps = {
  onNavigate?: () => void;
};

const navItems: NavItem[] = [
  { label: "Nadzorna ploča", to: "/", icon: SpaceDashboardOutlinedIcon },
  { label: "Poslovi", to: "/poslovi", icon: WorkOutlineOutlinedIcon },
  { label: "Raspored", to: "/raspored", icon: CalendarMonthOutlinedIcon },
  { label: "Cjenik", to: "/cjenik", icon: SellOutlinedIcon },
];

const Navbar = ({ onNavigate }: NavbarProps) => {
  const navigate = useNavigate();
  const { clearSession } = useSession();

  const onLogout = async () => {
    try {
      await requestLogout();
    } finally {
      navigate("/login");
      clearSession();
      onNavigate?.();
    }
  };

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
            onClick={onNavigate}
            sx={navItemSx}
          >
            <Icon sx={navItemIconSx} />
            <Typography variant="body2" color="inherit" sx={navItemLabelSx}>
              {label}
            </Typography>
          </Box>
        ))}
      </Stack>

      <Box component="button" type="button" onClick={onLogout} sx={navLogoutSx}>
        <LogoutRoundedIcon sx={navItemIconSx} />
        <Typography variant="body2" color="inherit" sx={navItemLabelSx}>
          Odjava
        </Typography>
      </Box>
    </Box>
  );
};

export default Navbar;
