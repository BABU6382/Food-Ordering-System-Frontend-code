import React, { useState } from "react";
import {
  Drawer,
  Divider,
  useMediaQuery,
  IconButton,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShopTwoIcon from "@mui/icons-material/ShopTwo";
import CategoryIcon from "@mui/icons-material/Category";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import EventIcon from "@mui/icons-material/Event";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../component/State/Authentication/Action";

const menu = [
  { title: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { title: "Orders", icon: <ShoppingBagIcon />, path: "/orders" },
  { title: "Menu", icon: <ShopTwoIcon />, path: "/menu" },
  { title: "Food Category", icon: <CategoryIcon />, path: "/category" },
  { title: "Ingredients", icon: <FastfoodIcon />, path: "/ingredients" },
  { title: "Events", icon: <EventIcon />, path: "/event" },
  { title: "Details", icon: <AdminPanelSettingsIcon />, path: "/details" },
  { title: "Logout", icon: <LogoutIcon />, path: "/" },
];

export const AdminSideBar = ({ handleClose: externalClose }) => {
  const isSmall = useMediaQuery("(max-width:1080px)");
  const isMedium = useMediaQuery(
    "(min-width:1081px) and (max-width:1199px)"
  );
  const isDesktop = useMediaQuery("(min-width:1200px)");

  // Sidebar is open by default on tablet & desktop
  const [open, setOpen] = useState(isMedium || isDesktop);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDrawer = () => setOpen((prev) => !prev);

  const handleNavigate = (item) => {
    navigate(`/admin/restaurants${item.path}`);
    if (item.title === "Logout") {
      dispatch(logout());
      navigate("/");
      if (externalClose) externalClose();
    }
    if (isSmall) setOpen(false);
  };

  const variant = isDesktop
    ? "permanent"
    : isSmall
    ? "temporary"
    : "persistent";

  return (
    <>
      {/* Toggle button for mobile and tablet */}
      {(isSmall || isMedium) && (
        <Toolbar>
          <IconButton onClick={toggleDrawer} edge="start">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      )}

      <Drawer
        variant={variant}
        open={open}
        onClose={toggleDrawer}
        anchor="left"
        ModalProps={{ keepMounted: true }}
        sx={{ zIndex: 1 }}
      >
        <div className="w-[80vw] sm:w-[60vw] md:w-[40vw] lg:w-[20vw] h-full flex flex-col pt-10 text-base sm:text-lg space-y-6">
          {menu.map((item, i) => (
            <React.Fragment key={item.title}>
              <div
                onClick={() => handleNavigate(item)}
                className="px-5 flex items-center gap-5 cursor-pointer"
              >
                {item.icon}
                <span>{item.title}</span>
              </div>
              {i !== menu.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </div>
      </Drawer>
    </>
  );
};
