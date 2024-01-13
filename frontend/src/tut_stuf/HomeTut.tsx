import React from "react";
import { useNavigate } from "react-router-dom";
import User from "../types/User";
import Authentication from "../components/Authentication/Authentication";
import AppState from "../types/AppState";
import { Grid, Button } from "@mui/material";

type HomeProps = {
  handleLogin: (
    data: User,
    setAppState: React.Dispatch<React.SetStateAction<AppState>>
  ) => void;
  handleLogout: (
    setAppState: React.Dispatch<React.SetStateAction<AppState>>
  ) => void;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  loggedInstatus: string;
};

const HomeTut: React.FC<HomeProps> = ({
  handleLogin,
  handleLogout,
  setAppState,
  loggedInstatus,
}) => {
  const navigate = useNavigate();

  return (
    <Grid
      className="HomeIndex"
      justifyContent="center"
      alignItems="center"
      container
    >
      <h1>Home Sign in </h1>
      {loggedInstatus !== "LOGGED_IN" && (
        <Authentication
          handleSuccessfulLogin={(data: User) => {
            handleLogin(data, setAppState);
            navigate("/dashboard");
          }}
        />
      )}
      {loggedInstatus === "LOGGED_IN" && (
        <Button
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            handleLogout(setAppState);
          }}
          variant="outlined"
        >
          logout
        </Button>
      )}
    </Grid>
  );
};

export default HomeTut;
