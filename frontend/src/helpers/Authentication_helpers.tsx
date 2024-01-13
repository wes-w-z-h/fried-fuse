import axios, { AxiosResponse } from "axios";
import AppState from "../types/AppState";
import User from "../types/User";
import React from "react";
import { NavigateFunction } from "react-router-dom";

const handleLogin = (
  data: User,
  setAppState: React.Dispatch<React.SetStateAction<AppState>>
) => {
  setAppState({
    loggedInStatus: "LOGGED_IN",
    user: data,
  });
};

const handleLogout = (
  setAppState: React.Dispatch<React.SetStateAction<AppState>>
) => {
  axios
    .delete("http://localhost:3001/users/logout", { withCredentials: true })
    .then((resp: AxiosResponse) => {
      console.log(resp.data);
    });
  setAppState({
    loggedInStatus: "NOT_LOGGED_IN",
    user: {} as User,
  });
};

const checkLoggedIn = (
  appState: AppState,
  setAppState: React.Dispatch<React.SetStateAction<AppState>>
) => {
  axios
    .get("http://localhost:3001/users/logged_in", { withCredentials: true })
    .then((resp: AxiosResponse) => {
      if (appState.loggedInStatus === "NOT_LOGGED_IN" && resp.data.logged_in) {
        handleLogin(resp.data.user, setAppState);
        // handleLogin(resp.data.user);
      } else if (
        !resp.data.logged_in &&
        appState.loggedInStatus === "LOGGED_IN"
      ) {
        handleLogout(setAppState);
      }
      console.log("logged in?", resp);
    })
    .catch((errors) => console.log(errors));
};

export { handleLogin, handleLogout, checkLoggedIn };
