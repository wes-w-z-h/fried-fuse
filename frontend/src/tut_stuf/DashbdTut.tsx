import React from "react";
import { Link } from "react-router-dom";

const Dashboard: React.FC<{ loggedInStatus: string }> = ({
  loggedInStatus,
}) => {
  return (
    <div>
      <div>
        <h1>Dashboard</h1>
        <h1>STATUS: {loggedInStatus}</h1>
        <Link to={"/"}>back to Home</Link>
      </div>
    </div>
  );
};

export default Dashboard;
