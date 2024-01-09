// import App from "./App";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppTut from "./AppTut";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <AppTut />
    {/* <App /> */}
  </React.StrictMode>
);
