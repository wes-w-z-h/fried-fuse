import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import SignIn from "./pages/SignInView";
import User from "./types/User";
import {
  handleLogin,
  checkLoggedIn,
  handleLogout,
} from "./helpers/AuthenticationHelpers";
import Navbar from "./components/Navbar";
import { AlertColor, ThemeProvider, createTheme } from "@mui/material";
import { blue, orange } from "@mui/material/colors";
import Notice from "./components/Notice";
import NoticeObj from "./types/NoticeObj";
import HomePage from "./pages/HomeIndex";
import AboutView from "./pages/AboutView";
import CategoriesView from "./pages/CategoriesView";
import TopicsView from "./pages/TopicsView";
import "./App.css";
import PostsView from "./pages/PostsView";
import AppState from "./types/AppState";

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: orange,
  },
});

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
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
  // seems fine now KIV
  useEffect(
    () => checkLoggedIn(appState, setAppState, NoticeObject),
    [appState]
  );

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
            <Route path="/dashboard" element={<CategoriesView />} />
            <Route path="/about" element={<AboutView />} />
            <Route path="/categories/:id" element={<TopicsView />} />
            <Route
              path="/topics/:id"
              element={<PostsView appState={appState} />}
            />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
