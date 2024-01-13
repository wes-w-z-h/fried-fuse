import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import { CatchingPokemon } from "@mui/icons-material";
import { handleLogout } from "../helpers/Authentication_helpers";
import AppState from "../types/AppState";

type NavBarProps = {
  loggedInStatus: string;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
};

const Navbar: React.FC<NavBarProps> = ({ loggedInStatus, setAppState }) => {
  const navigate = useNavigate();

  const Buttons: Array<JSX.Element> = [
    <Button
      variant="contained"
      color="secondary"
      sx={{ marginLeft: "auto" }}
      onClick={() => {
        handleLogout(setAppState);
        navigate("/");
      }}
    >
      Logout
    </Button>,
    <Button
      variant="contained"
      color="primary"
      sx={{ marginLeft: "auto" }}
      onClick={() => {
        navigate("/users/sign_in");
      }}
    >
      Sign In
    </Button>,
  ];

  return (
    <AppBar
      position="static"
      sx={{
        display: "flex",
        backgroundColor: "#CBF6E9",
      }}
    >
      <Toolbar>
        {/* <Typography variant="h6" color="black">
          Chatter
        </Typography> */}
        <IconButton
          onClick={() => {
            navigate("/");
          }}
          sx={{ color: "#FF5154" }}
        >
          <CatchingPokemon />
        </IconButton>

        <Link style={{ color: "#161925" }} to="/dashboard">
          Dashboard
        </Link>
        {loggedInStatus === "LOGGED_IN" ? Buttons[0] : Buttons[1]}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
