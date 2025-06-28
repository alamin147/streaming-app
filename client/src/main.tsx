import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/themeProvider/ThemeProvider.tsx";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import LoginPage from "./pages/login/Login.tsx";
import { RegisterPage } from "./pages/register/Register.tsx";
import { Toaster } from "react-hot-toast";
import { SingleVideo } from "./pages/singleVideoPage/SingleVideo.tsx";
import MyDashboard from "./pages/dashboard/myDashboard/MyDashboard.tsx";
import MyVideos from "./pages/dashboard/myVideos/MyVideos.tsx";
import EditProfile from "./pages/dashboard/editProfile/EditProfile.tsx";
import AdminDashboard from "./pages/dashboard/adminDashboard/adminDashboard.tsx";
import WatchLater from "./pages/watchLater/WatchLater.tsx";
import RecentlyWatched from "./pages/recentlyWatched/RecentlyWatched.tsx";
import TrendingVideos from "./pages/trending/TrendingVideos.tsx";
import PrivateRoutes from "./routes/PrivateRoutes.tsx";
import Videos from "./pages/videos/Videos.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/videos",
        element: <Videos />,
    },
    {
        element: <PrivateRoutes />,
        children: [
            {
                path: "video/:id",
                element: <SingleVideo />,
            },
            {

                path: "/bookmark",
                element: <WatchLater />,
            },
            {
                path: "/history",
                element: <RecentlyWatched />,
            },
            {
                path: "/dashboard/my-dashboard",
                element: <MyDashboard />,
            },
            {
                path: "/dashboard/my-videos",
                element: <MyVideos />,
            },
            {
                path: "/dashboard/edit-profile",
                element: <EditProfile />,
            },
        ],
    },
    {
        element: <PrivateRoutes allowedRoles={["admin"]} />,
        children: [
            {
                path: "/dashboard/adminDashboard",
                element: <AdminDashboard />,
            },
        ],
    },
    {
        path: "/trending",
        element: <TrendingVideos />,
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="light" storageKey="">
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <RouterProvider router={router} />
                </PersistGate>
            </Provider>
            <Toaster />
        </ThemeProvider>
    </StrictMode>
);
