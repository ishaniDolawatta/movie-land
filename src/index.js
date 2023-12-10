import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import TanstackProvider from "./providers/TanstackProvider";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TanstackProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TanstackProvider>
  </React.StrictMode>
);
