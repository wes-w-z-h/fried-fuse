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
) => {
  const token = localStorage.getItem("jwt");
  await axios
    .delete("https://poke-app-backend-xe80.onrender.com/users/logout", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((resp) => {
      setAppState({
        loggedInStatus: "NOT_LOGGED_IN",
        user: {} as User,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const checkLoggedIn = (
  appState: AppState,
  setAppState: React.Dispatch<React.SetStateAction<AppState>>,
  notice: (message: string, severity: AlertColor) => void
) => {
  const token = localStorage.getItem("jwt");
  axios
    .get("https://poke-app-backend-xe80.onrender.com/users/logged_in", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((resp) => {
      // console.log(resp.data);
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
