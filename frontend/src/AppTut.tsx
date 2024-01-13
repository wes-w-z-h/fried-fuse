import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Dashboard from "./tut_stuf/DashbdTut";
import HomeTut from "./tut_stuf/HomeTut";
import User from "./types/User";
import {
  handleLogin,
  checkLoggedIn,
  handleLogout,
} from "./helpers/Authentication_helpers";

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
      <BrowserRouter>
        <Routes>
          <Route
            path="/dashboard"
            element={<Dashboard loggedInStatus={appState.loggedInStatus} />}
          />
          <Route
            path="/"
            element={
              <HomeTut
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                setAppState={setAppState}
                loggedInstatus={appState.loggedInStatus}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppTut;
