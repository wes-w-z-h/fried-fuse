import axios from "axios";
import AppState from "../types/AppState";
import User from "../types/User";
import React from "react";
import { AlertColor } from "@mui/material";

const handleLogin = (
  data: User,
  setAppState: React.Dispatch<React.SetStateAction<AppState>>
) => {
  setAppState({
    loggedInStatus: "LOGGED_IN",
    user: data,
  });
};

const handleLogout = async (
  setAppState: React.Dispatch<React.SetStateAction<AppState>>
): Promise<void> => {
  await axios
    .delete("http://localhost:3001/users/logout", { withCredentials: true })
    .then((resp) => {
      setAppState({
        loggedInStatus: "NOT_LOGGED_IN",
        user: {} as User,
      });
      return Promise.resolve();
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject();
    });
};

const checkLoggedIn = (
  appState: AppState,
  setAppState: React.Dispatch<React.SetStateAction<AppState>>,
  notice: (message: string, severity: AlertColor) => void
) => {
  axios
    .get("http://localhost:3001/users/logged_in", { withCredentials: true })
    .then((resp) => {
      console.log(resp.data);
      if (appState.loggedInStatus === "NOT_LOGGED_IN" && resp.data.logged_in) {
        handleLogin(resp.data.user, setAppState);
      } else if (
        !resp.data.logged_in &&
        appState.loggedInStatus === "LOGGED_IN"
      ) {
        handleLogout(setAppState);
      }
    })
    .catch((errors) => {
      notice(`error checking login: ${errors}`, "error");
    });
};

export { handleLogin, handleLogout, checkLoggedIn };
