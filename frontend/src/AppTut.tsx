import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Dashboard from "./pages/DashbdTut";
import HomeTut from "./pages/HomeTut";

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
