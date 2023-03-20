import React from "react";
import ReactDOM from "react-dom/client";
import store from "./store/store";
import "./bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-bootstrap/dist/react-bootstrap.min.js";

import App from "./App";
import { Provider } from "react-redux";

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
