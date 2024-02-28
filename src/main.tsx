import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { StateContextProvider } from "./Context/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StateContextProvider>
      <App />
    </StateContextProvider>
  </React.StrictMode>
);
