import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import User from "../types/User";
import Authentication from "../components/Authentication/Authentication";
import AppState from "../types/AppState";
import { Box, Typography, Paper } from "@mui/material";

type SignInProps = {
  handleLogin: (
    data: User,
    setAppState: React.Dispatch<React.SetStateAction<AppState>>
  ) => void;
  handleLogout: (
    setAppState: React.Dispatch<React.SetStateAction<AppState>>
  ) => void;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  loggedInStatus: string;
};

const SignIn: React.FC<SignInProps> = ({
  handleLogin,
  setAppState,
  loggedInStatus,
}) => {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={24}
      className="HomeIndex"
      sx={{
        paddingTop: 3,
        paddingBottom: 7,
        borderRadius: 30, // Adjust the border radius as needed
        overflow: "hidden", // Optional: hide overflowing content
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 3,
        marginLeft: 3,
        marginRight: 3,
        height: "70vh",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: 11,
          textAlign: "center",
        }}
      >
        {loggedInStatus !== "LOGGED_IN" ? "SIGN IN" : "SIGNED IN"}
      </Typography>

      {loggedInStatus !== "LOGGED_IN" && (
        <Authentication
          handleSuccessfulLogin={(data) => {
            handleLogin(data, setAppState);
            navigate("/dashboard");
          }}
        />
      )}
    </Paper>
  );
};

export default SignIn;
