import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import User from "../types/User";
import Authentication from "../components/Authentication/Authentication";
import AppState from "../types/AppState";
import { Typography, Paper, Button, AlertColor } from "@mui/material";
import { handleLogout } from "../helpers/AuthenticationHelpers";

type SignInProps = {
  handleLogin: (
    data: User,
    setAppState: React.Dispatch<React.SetStateAction<AppState>>
  ) => void;
  handleLogout: (
    setAppState: React.Dispatch<React.SetStateAction<AppState>>
  ) => Promise<void>;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  loggedInStatus: string;
  notice: (message: string, severity: AlertColor) => void;
};

const SignIn: React.FC<SignInProps> = ({
  handleLogin,
  setAppState,
  loggedInStatus,
  notice,
}) => {
  const navigate = useNavigate();

  const handleSuccessfulLogin = (data: User) => {
    handleLogin(data, setAppState);
    navigate("/dashboard");
    notice("LOGGED IN SUCCESSFULLY!", "success");
  };
  const handleSuccessfulLogout = () => {
    handleLogout(setAppState);
    navigate("/");
    notice("LOGGED OUT SUCCESSFULLY!", "info");
  };

  return (
    <Paper
      elevation={24}
      sx={{
        paddingTop: 3,
        paddingBottom: 7,
        borderRadius: 30,
        display: "flex",
        flexDirection: "column",
        // justifyContent: "top",
        alignItems: "center",
        margin: "auto",
        marginTop: 3,
        marginBottom: 3,
        width: "70%",
        // height: "100%",
      }}
    >
      <Typography
        variant="h3"
        fontFamily={"monospace"}
        fontWeight={"bold"}
        sx={{
          marginTop: 5,
          marginBottom: 7,
          textAlign: "center",
          color: "steelblue",
        }}
      >
        {loggedInStatus !== "LOGGED_IN" ? "SIGN IN" : "SIGNED IN"}
      </Typography>

      {loggedInStatus !== "LOGGED_IN" && (
        <Authentication
          handleSuccessfulLogin={(data) => handleSuccessfulLogin(data)}
          notice={notice}
        />
      )}

      {loggedInStatus !== "LOGGED_IN" ? (
        // in case some bugger go back to the sign_in page when already signed_in
        <Fragment>
          <Typography
            variant="body1"
            fontFamily={"monospace"}
            fontStyle={"italic"}
            fontWeight={"bold"}
            fontSize={17}
            sx={{
              marginTop: 5,
              textAlign: "center",
            }}
          >
            Sign up using a new username!
          </Typography>
          <Typography
            variant="body1"
            fontFamily={"monospace"}
            fontStyle={"italic"}
            fontWeight={"bold"}
            fontSize={17}
            sx={{
              marginTop: 5,
              marginBottom: 3,
              textAlign: "center",
            }}
          >
            Sign in with an existing one!
          </Typography>
        </Fragment>
      ) : (
        <Button
          size="large"
          variant="outlined"
          onClick={() => handleSuccessfulLogout()}
          color="secondary"
        >
          logout
        </Button>
      )}
    </Paper>
  );
};

export default SignIn;
