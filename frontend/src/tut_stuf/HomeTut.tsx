import React from "react";
import { Link } from "react-router-dom";
import Registration from "./auth/Registration";
import { useNavigate } from "react-router-dom";
import User from "../types/User";

type HomeProps = {
  loggedInStatus: string;
  handleLogin: (data: User) => void;
};

const HomeTut: React.FC<HomeProps> = ({ loggedInStatus, handleLogin }) => {
  const navigate = useNavigate();
  const handleSuccessfulAuth = (data: User) => {
    handleLogin(data);
    navigate("/dashboard");
  };

  return (
    <div className="HomeIndex">
      <div>
        <h1>HomePage</h1>
        <h1>STATUS: {loggedInStatus}</h1>
        <Registration handleSuccessfulAuth={handleSuccessfulAuth} />
        <Link to={"/dashboard"}>to dashboard</Link>
      </div>
    </div>
  );
};

export default HomeTut;
