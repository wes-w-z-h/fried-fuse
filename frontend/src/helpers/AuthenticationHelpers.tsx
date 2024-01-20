import axios from "axios";
import AppState from "../types/AppState";
import User from "../types/User";
import React from "react";
import NoticeObj from "../types/NoticeObj";
import { useNavigate } from "react-router-dom";

const handleLogin = (
  data: User,
  setAppState: React.Dispatch<React.SetStateAction<AppState>>,
  notice: NoticeObj
) => {
  setAppState({
    loggedInStatus: "LOGGED_IN",
    user: data,
  });
  notice.setNoticeMessage("LOGGED IN SUCCESSFULLY!");
  notice.setNoticeSeverity("success");
  notice.setOpenNotice(true);
};

const handleLogout = (
  setAppState: React.Dispatch<React.SetStateAction<AppState>>,
  notice: NoticeObj
) => {
  axios
    .delete("http://localhost:3001/users/logout", { withCredentials: true })
    .then((resp) => {
      // console.log(resp.data);
    })
    .catch((error) => console.log(error));
  setAppState({
    loggedInStatus: "NOT_LOGGED_IN",
    user: {} as User,
  });
  notice.setNoticeMessage("LOGGED OUT SUCCESSFULLY!");
  notice.setNoticeSeverity("success");
  notice.setOpenNotice(true);
};

const checkLoggedIn = (
  appState: AppState,
  setAppState: React.Dispatch<React.SetStateAction<AppState>>,
  notice: NoticeObj
) => {
  axios
    .get("http://localhost:3001/users/logged_in", { withCredentials: true })
    .then((resp) => {
      console.log(resp.data);
      if (appState.loggedInStatus === "NOT_LOGGED_IN" && resp.data.logged_in) {
        handleLogin(resp.data.user, setAppState, notice);
      } else if (
        !resp.data.logged_in &&
        appState.loggedInStatus === "LOGGED_IN"
      ) {
        handleLogout(setAppState, notice);
      }
    })
    .catch((errors) => {
      notice.setNoticeMessage(
        errors.response ? String(errors.response) : "error checking login"
      );
      notice.setNoticeSeverity("error");
      notice.setOpenNotice(true);
    });
};

export { handleLogin, handleLogout, checkLoggedIn };
