import React from "react";
import ReactDOM from "react-dom/client";

import "./bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-bootstrap/dist/react-bootstrap.min.js";

import App from "./App";
// import PRWSocketCtxProvider from "./socket/SocketProvider";

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
  // <React.StrictMode>
  // <PRWSocketCtxProvider>
  <App />
  // </PRWSocketCtxProvider>
  // </React.StrictMode>
);
