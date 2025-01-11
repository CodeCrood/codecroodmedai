import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";

const VITE_CLERK_PUBLISHABLE_KEY =
  "pk_test_d2l0dHktc3BhcnJvdy0xNi5jbGVyay5hY2NvdW50cy5kZXYk";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={VITE_CLERK_PUBLISHABLE_KEY}>
      <App/>
    </ClerkProvider>
  </React.StrictMode>
);
