import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./client/index.css";

const rootElement = document.getElementById("root")!;

// Example: detect mode based on URL
const isAdmin = window.location.pathname.startsWith("/admin");

// You can pass props to App to switch routes/layouts internally
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App mode={isAdmin ? "admin" : "client"} />
  </React.StrictMode>
);
