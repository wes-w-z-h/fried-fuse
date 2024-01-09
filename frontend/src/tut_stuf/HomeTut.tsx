import { defaultCipherList } from "constants";
import React from "react";
import { Link } from "react-router-dom";
import Registration from "./auth/Registration";

const HomeTut: React.FC = () => {
  return (
    <div className="HomeIndex">
      <div>
        <h1>HomePage</h1>
        <h1>HomePage</h1>
        <Registration />
        <Link to={"/dashboard"}>to dashboard</Link>
      </div>
    </div>
  );
};

export default HomeTut;
