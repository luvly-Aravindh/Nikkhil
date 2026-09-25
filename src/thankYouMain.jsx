import React from "react";
import ReactDOM from "react-dom/client";
import ThankYou from "./ThankYou.jsx";
import "./index.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ThankYou />
    </React.StrictMode>
  );
}
