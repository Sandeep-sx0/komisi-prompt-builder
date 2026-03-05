import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import SmoothScrolling from "./components/SmoothScrolling.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <SmoothScrolling>
    <App />
  </SmoothScrolling>
);
