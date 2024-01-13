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
import Category from "./components/Category/Category";
import { ThemeProvider, createTheme } from "@mui/material";
import { blue, orange } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: orange,
  },
});

const AppTut: React.FC = () => {
  // see how to add a type for authstate
  const [appState, setAppState] = useState({
    loggedInStatus: "NOT_LOGGED_IN",
    user: {} as User,
  });

  // use effect with dependecies on authstate crashes the program even though no errors
  useEffect(() => checkLoggedIn(appState, setAppState), []);

  return (
    <div className="App Tut">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar
            loggedInStatus={appState.loggedInStatus}
            setAppState={setAppState}
          />
          <Routes>
            <Route
              path="/dashboard"
              element={<Dashboard loggedInStatus={appState.loggedInStatus} />}
            />
            <Route
              path="/users/sign_in"
              element={
                <SignIn
                  handleLogin={handleLogin}
                  handleLogout={handleLogout}
                  setAppState={setAppState}
                  loggedInStatus={appState.loggedInStatus}
                />
              }
            />
            <Route path="/" element={<Category />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default AppTut;
