import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AlbumContextProvider } from "./context/AlbumContext";
import { UserContextProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <AlbumContextProvider>
        <App />
      </AlbumContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
