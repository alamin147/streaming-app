import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/themeProvider/ThemeProvider.tsx";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import LoginPage from "./pages/login/Login.tsx";
import { RegisterPage } from "./pages/register/Register.tsx";
import { Toaster } from 'react-hot-toast';
import SingleVideo from "./pages/singleVideoPage/SingleVideo.tsx";
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
              <Route path="/login" element={<LoginPage/>} />
              <Route path="/register" element={<RegisterPage/>} />
              <Route path="/single" element={<SingleVideo/>} />

            </Routes>
          </Router>
        </PersistGate>
      </Provider>
      <Toaster/>
    </ThemeProvider>
  </StrictMode>
);
