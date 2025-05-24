import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getUserInfo } from "@/redux/authUlits";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRef, useEffect } from "react";

interface PrivateRoutesProps {
  allowedRoles?: string[];
}

const PrivateRoutes = ({ allowedRoles }: PrivateRoutesProps) => {
  const location = useLocation();
  const token = useAppSelector(useCurrentToken);
  const user = getUserInfo();

  const isLoading = token && !user;

  const toastShownRef = useRef(false);

  useEffect(() => {
    if (!user && !toastShownRef.current) {
      toast.error("You need to be logged in to access this page.");
      toastShownRef.current = true;
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-yellow-500" />
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location, needsAuth: true }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
