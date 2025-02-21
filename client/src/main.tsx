import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/themeProvider/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="">
      {/* <div className="bg-[22262F] bg-white dark:bg-gray-900 text-white h-screen"> */}
        <App />
      {/* </div> */}
    </ThemeProvider>
  </StrictMode>
);
