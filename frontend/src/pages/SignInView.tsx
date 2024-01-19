import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import User from "../types/User";
import Authentication from "../components/Authentication/Authentication";
import AppState from "../types/AppState";
import { Typography, Paper } from "@mui/material";
import NoticeObj from "../types/NoticeObj";

type SignInProps = {
  handleLogin: (
    data: User,
    setAppState: React.Dispatch<React.SetStateAction<AppState>>,
    notice: NoticeObj
  ) => void;
  handleLogout: (
    setAppState: React.Dispatch<React.SetStateAction<AppState>>,
    notice: NoticeObj
  ) => void;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  loggedInStatus: string;
  // notice props functions needed
  notice: NoticeObj;
};

const SignIn: React.FC<SignInProps> = ({
  handleLogin,
  setAppState,
  loggedInStatus,
  notice,
}) => {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={24}
      sx={{
        paddingTop: 3,
        paddingBottom: 7,
        borderRadius: 30,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "top",
        alignItems: "center",
        margin: "auto",
        marginTop: 3,
        height: "70vh",
        width: "70vh",
      }}
    >
      <Typography
        variant="h4"
        fontFamily={"monospace"}
        sx={{
          marginTop: 5,
          marginBottom: 11,
          textAlign: "center",
        }}
      >
        {loggedInStatus !== "LOGGED_IN" ? "SIGN IN" : "SIGNED IN"}
      </Typography>

      {loggedInStatus !== "LOGGED_IN" && (
        <Authentication
          handleSuccessfulLogin={(data) => {
            handleLogin(data, setAppState, notice);
            navigate("/dashboard");
          }}
          notice={notice}
        />
      )}

      <Typography
        variant="body1"
        sx={{
          marginTop: 5,
          marginBottom: 11,
          textAlign: "center",
        }}
      >
        {loggedInStatus !== "LOGGED_IN" ? (
          <Fragment>
            <pre>Sign up using a new username</pre>
            <pre>Sign in with an existing one!</pre>
          </Fragment>
        ) : (
          ""
        )}
      </Typography>
    </Paper>
  );
};

export default SignIn;
