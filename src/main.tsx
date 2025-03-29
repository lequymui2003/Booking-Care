import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.tsx";
import MainRouter from "./router/router.tsx";
import React from "react";
// Import StoreProvider và store
import { StoreProvider } from "easy-peasy";
import store from "./store/store.ts";
import "@fortawesome/fontawesome-free/css/all.min.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <MainRouter />
    </StoreProvider>
  </React.StrictMode>
);
