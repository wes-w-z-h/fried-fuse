import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import User from "../types/User";
import Authentication from "../components/Authentication/Authentication";
import AppState from "../types/AppState";

type HomeProps = {
  loggedInStatus: string;
  handleLogin: (
    data: User,
    setAppState: React.Dispatch<React.SetStateAction<AppState>>
  ) => void;
  handleLogout: (
    setAppState: React.Dispatch<React.SetStateAction<AppState>>
  ) => void;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
};

const HomeTut: React.FC<HomeProps> = ({
  loggedInStatus,
  handleLogin,
  handleLogout,
  setAppState,
}) => {
  const navigate = useNavigate();

  return (
    <div className="HomeIndex">
      <div>
        <h1>HomePage</h1>
        <h1>STATUS: {loggedInStatus}</h1>
        <Authentication
          handleSuccessfulLogin={(data: User) => {
            handleLogin(data, setAppState);
            navigate("/dashboard");
          }}
          handleSuccessfulLogout={(
            setAppState: React.Dispatch<React.SetStateAction<AppState>>
          ) => {
            handleLogout(setAppState);
            navigate("/");
          }}
          setAppState={setAppState}
        />
        <Link to={"/dashboard"}>to dashboard</Link>
      </div>
    </div>
  );
};

export default HomeTut;
