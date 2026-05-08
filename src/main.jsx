import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import App from './App.jsx'
import { ProfileProvider } from "./context/ProfileContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <Toaster />
    <AuthProvider>
      <ProfileProvider>
        <RouterProvider router={router} />
      </ProfileProvider>
    </AuthProvider>
  </React.StrictMode>,
);

