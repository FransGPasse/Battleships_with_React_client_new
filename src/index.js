import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import RoomContextProvider from "./contexts/RoomContextProvider";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //  <React.StrictMode>
  <BrowserRouter>
    <RoomContextProvider>
      <App />
    </RoomContextProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
