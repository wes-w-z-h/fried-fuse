import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Popover,
  List,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import {
  Menu,
  Home,
  Dashboard,
  ExitToApp,
  AccountCircle,
  CatchingPokemon,
} from "@mui/icons-material";
import { handleLogout } from "../helpers/Authentication_helpers";
import AppState from "../types/AppState";
import NoticeObj from "../types/NoticeObj";

type NavBarProps = {
  loggedInStatus: string;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  notice: NoticeObj;
};

const Navbar: React.FC<NavBarProps> = ({
  loggedInStatus,
  setAppState,
  notice,
}) => {
  const navigate = useNavigate();
  const [popupAnchor, setPopupAnchor] = useState<HTMLElement | null>(null);
  const openPopup = (event: React.MouseEvent<HTMLElement>) => {
    setPopupAnchor(event.currentTarget);
  };
  const closePopup = () => {
    setPopupAnchor(null);
  };
  const handleAction = (action: string) => {
    switch (action) {
      case "dashboard":
        navigate("/dashboard");
        break;
      case "logout":
        handleLogout(setAppState, notice);
        navigate("/");
        break;
      case "signin":
        navigate("/users/sign_in");
        break;
      case "home":
        navigate("/");
        break;
      default:
        break;
    }
    closePopup();
  };
  const popupItems = [
    { icon: <Home />, name: "home", label: "Home" },
    { icon: <Dashboard />, name: "dashboard", label: "Dashboard" },
    loggedInStatus === "LOGGED_IN"
      ? { icon: <ExitToApp />, name: "logout", label: "Logout" }
      : { icon: <AccountCircle />, name: "signin", label: "Sign In" },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        display: "flex",
        backgroundColor: "#14213D",
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          onClick={() => navigate("/")}
          sx={{ color: "floralwhite" }} // off red
        >
          <CatchingPokemon />
        </IconButton>
        <Typography
          variant="h4"
          sx={{
            color: "#FFFFFF",
            fontFamily: "chatter",
            paddingRight: 2,
            paddingLeft: 1,
          }}
        >
          C H A T T E R
        </Typography>
        <IconButton
          size="large"
          onClick={openPopup}
          sx={{
            marginLeft: "auto",
            color: "white",
            borderRadius: "50%", // Make it a circle
            transition: "background-color 0.5s ease-out", // Add a smooth transition effect
            "&:hover": {
              backgroundColor: "#8F8F8F", // Change the background color on hover to your desired color
            },
          }}
        >
          <Menu />
        </IconButton>
        <Popover
          anchorEl={popupAnchor}
          open={Boolean(popupAnchor)}
          onClose={closePopup}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          elevation={6}
        >
          <List>
            {popupItems.map((item) => (
              <ListItemButton
                key={item.name}
                onClick={() => handleAction(item.name)}
              >
                {item.icon}
                <ListItemText primary={item.label} sx={{ paddingLeft: 1.3 }} />
              </ListItemButton>
            ))}
          </List>
        </Popover>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
