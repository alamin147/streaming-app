import { useTheme } from "@/components/themeProvider/ThemeProvider";
import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/redux/authUlits";
import { Sun } from "lucide-react";
import { IoIosMoon } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { LogOut, User } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { useEffect, useRef, useState } from "react";
import { House } from "lucide-react";
export const UserAndTheme = ({ on }: { on: boolean }) => {
  const user = getUserInfo();
  const { theme, setTheme } = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setIsDropdownOpen(false);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const ThemeToggleButton = () =>
    theme === "dark" ? (
      <button
        onClick={handleThemeToggle}
        className="focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-full p-1"
      >
        <Sun
          className="cursor-pointer w-6 h-6 md:w-7 md:h-7 text-yellow-600"
          size={24}
        />
      </button>
    ) : (
      <button
        onClick={handleThemeToggle}
        className="focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full p-1"
      >
        <IoIosMoon className="cursor-pointer w-6 h-6 md:w-7 md:h-7 text-black" />
      </button>
    );

  const UserDropdown = () => (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="border-2 border-gray-700 flex items-center justify-center text-black dark:text-white font-bold rounded-full w-10 h-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {user?.name?.charAt(0)}
        {user?.name?.charAt(user?.name?.indexOf(" ") + 1)}
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            <div className="flex items-center px-4 py-2 gap-2 p-2 border-b broder">
              <div className="font-medium">{user?.name}</div>
            </div>

            <Link
              to="/"
              className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <House className="mr-2 h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              to="/dashboard/edit-profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>

            <Link
              to="/dashboard/my-dashboard"
              className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaUserShield className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>

            <div className="border-t"></div>

            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {on ? (
        <div className="flex items-center gap-4">
          <ThemeToggleButton />
          {user ? (
            <UserDropdown />
          ) : (
            <Link to="/login">
              <Button
                className="py-5 px-5 md:text-lg dark:bg-yellow-500"
                size="sm"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <>
          <ThemeToggleButton />
          {user ? (
            <UserDropdown />
          ) : (
            <Link to="/login">
              <Button
                className="py-5 px-5 md:text-lg dark:bg-yellow-500"
                size="sm"
              >
                Login
              </Button>
            </Link>
          )}
        </>
      )}
    </>
  );
};
