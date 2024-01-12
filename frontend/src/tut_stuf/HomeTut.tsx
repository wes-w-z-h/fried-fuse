import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import User from "../types/User";
import Authentication from "../components/Authentication/Authentication";

type HomeProps = {
  loggedInStatus: string;
  handleLogin: (data: User) => void;
  handleLogout: () => void;
};

const HomeTut: React.FC<HomeProps> = ({
  loggedInStatus,
  handleLogin,
  handleLogout,
}) => {
  const navigate = useNavigate();

  return (
    <div className="HomeIndex">
      <div>
        <h1>HomePage</h1>
        <h1>STATUS: {loggedInStatus}</h1>
        <Authentication
          handleSuccessfulLogin={(data: User) => {
            handleLogin(data);
            navigate("/dashboard");
          }}
          handleSuccessfulLogout={() => {
            handleLogout();
            navigate("/");
          }}
        />
        <Link to={"/dashboard"}>to dashboard</Link>
      </div>
    </div>
  );
};

export default HomeTut;
