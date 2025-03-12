import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/themeProvider/ThemeProvider.tsx";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/movies" element={<div>movies</div>} />
              <Route path="/trending" element={<div>trendign</div>} />
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
