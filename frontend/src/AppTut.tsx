import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Dashboard from "./tut_stuf/DashbdTut";
import HomeTut from "./tut_stuf/HomeTut";
import User from "./types/User";
import axios, { AxiosResponse } from "axios";

const AppTut: React.FC = () => {
  // see how to add a type for authstate
  const [authState, setAuthState] = useState({
    loggedInStatus: "NOT_LOGGED_IN",
    user: {} as User,
  });

  const handleLogin = (data: User) => {
    setAuthState({
      loggedInStatus: "LOGGED_IN",
      user: data,
    });
  };

  const handleLogout = () => {
    axios
      .delete("http://localhost:3001/users/logout", { withCredentials: true })
      .then((resp: AxiosResponse) => {
        console.log(resp.data);
      });
    setAuthState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {} as User,
    });
  };

  const checkLoggedIn = () => {
    axios
      .get("http://localhost:3001/users/logged_in", { withCredentials: true })
      .then((resp: AxiosResponse) => {
        if (
          authState.loggedInStatus === "NOT_LOGGED_IN" &&
          resp.data.logged_in
        ) {
          handleLogin(resp.data.user);
        } else if (
          !resp.data.logged_in &&
          authState.loggedInStatus === "LOGGED_IN"
        ) {
          handleLogout();
        }
        console.log("logged in?", resp);
      })
      .catch((errors) => console.log(errors));
  };

  // use effect with dependecies on authstate crashes the program even though no errors
  useEffect(checkLoggedIn, []);

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
                handleLogout={handleLogout}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppTut;
