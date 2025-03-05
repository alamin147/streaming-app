import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/themeProvider/ThemeProvider.tsx";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="">
      <Router>
       
 <Routes>
        <Route path="/" element={<App />} />
        <Route path="/movies" element={<div>movies</div>} />
        <Route path="/trending" element={<div>trendign</div>} />
      </Routes>

      </Router>
    </ThemeProvider>
  </StrictMode>
);
