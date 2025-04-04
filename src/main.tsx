import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { Toaster } from "sonner";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster position="bottom-right" />
  </StrictMode>
);
