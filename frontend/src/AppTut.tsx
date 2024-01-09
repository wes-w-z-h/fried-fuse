import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Dashboard from "./tut_stuf/DashbdTut";
import HomeTut from "./tut_stuf/HomeTut";

const AppTut: React.FC = () => {
  return (
    <div className="App Tut">
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<HomeTut />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppTut;
