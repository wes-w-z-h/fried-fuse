import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Dashboard from "./pages/DashbdTut";
import SignIn from "./pages/SignIn";
import User from "./types/User";
import {
  handleLogin,
  checkLoggedIn,
  handleLogout,
} from "./helpers/Authentication_helpers";
import Navbar from "./components/Navbar";

import { AlertColor, ThemeProvider, createTheme } from "@mui/material";
import { blue, orange } from "@mui/material/colors";
import Notice from "./components/Notice";
import NoticeObj from "./types/NoticeObj";
import CategoryPage from "./pages/Categories";
import HomePage from "./pages/HomeIndex";
import AboutUsPage from "./pages/About";

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: orange,
  },
});

const AppTut: React.FC = () => {
  const [appState, setAppState] = useState({
    loggedInStatus: "NOT_LOGGED_IN",
    user: {} as User,
  });

  const [openNotice, setOpenNotice] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState("hihi");
  const [noticeSeverity, setNoticeSeverity] = useState<AlertColor>("info");
  const NoticeObject: NoticeObj = {
    setNoticeMessage: setNoticeMessage,
    setNoticeSeverity: setNoticeSeverity,
    setOpenNotice: setOpenNotice,
  };

  // use effect with dependecies on authstate crashes the program even though no errors
  useEffect(() => checkLoggedIn(appState, setAppState, NoticeObject), []);

  return (
    <div className="App Tut">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Notice
            message={noticeMessage}
            severity={noticeSeverity}
            noticeState={[openNotice, setOpenNotice]}
          />
          <Navbar
            loggedInStatus={appState.loggedInStatus}
            setAppState={setAppState}
            notice={NoticeObject}
          />
          <Routes>
            {/* <Route
              path="/dashboard"
              element={<Dashboard loggedInStatus={appState.loggedInStatus} />}
            /> */}
            <Route
              path="/users/sign_in"
              element={
                <SignIn
                  handleLogin={handleLogin}
                  handleLogout={handleLogout}
                  setAppState={setAppState}
                  loggedInStatus={appState.loggedInStatus}
                  notice={NoticeObject}
                />
              }
            />
            <Route path="/dashboard" element={<CategoryPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default AppTut;
