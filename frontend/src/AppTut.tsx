import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Dashboard from "./tut_stuf/DashbdTut";
import HomeTut from "./tut_stuf/HomeTut";
import User from "./types/User";

const AppTut: React.FC = () => {
  // see how to add a type for authstate
  const [authState, setAuthState] = useState({
    loggedInStatus: "NOT_LOGGED_IN",
    user: {} as User,
  });

  const handleLogin = (data: User) => {
    console.log(data);
    setAuthState({
      loggedInStatus: "LOGGED_IN",
      user: data,
    });
  };

  return (
    <div className="App Tut">
      <BrowserRouter>
        <Routes>
          <Route
            path="/dashboard"
            element={<Dashboard loggedInStatus={authState.loggedInStatus} />}
          />
          <Route
            path="/"
            element={
              <HomeTut
                handleLogin={handleLogin}
                loggedInStatus={authState.loggedInStatus}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppTut;
