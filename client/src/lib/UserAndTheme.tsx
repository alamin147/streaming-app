import { useTheme } from "@/components/themeProvider/ThemeProvider";
import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/redux/authUlits";
import { Avatar } from "@radix-ui/react-avatar";
import { Sun } from "lucide-react";
import { IoIosMoon } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";

export const UserAndTheme = ({ on }: { on: boolean }) => {
  const user = getUserInfo();
  const { theme, setTheme } = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // console.log(user)
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <>
      {on == true ? (
        <div className="flex items-center  gap-4">
          {theme == "dark" ? (
            <Sun
              onClick={() => setTheme("light")}
              className="cursor-pointer  w-6 h-6 md:w-7 md:h-7 text-yellow-600"
              size={24}
            />
          ) : (
            <IoIosMoon
              onClick={() => setTheme("dark")}
              className="cursor-pointer  w-6 h-6 md:w-7 md:h-7 text-black"
            />
          )}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="border-2 border-gray-700 flex items-center justify-center text-black dark:text-white font-bold rounded-full w-10 h-10 cursor-pointer">
                  {user?.name?.charAt(0)}
                  {user?.name?.charAt(user?.name?.indexOf(" ") + 1)}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="font-medium">{user?.name}</div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FaUserShield className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex items-center gap-2" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
          {theme == "dark" ? (
            <Sun
              onClick={() => setTheme("light")}
              className="cursor-pointer  w-6 h-6 md:w-7 md:h-7 text-yellow-600"
              size={24}
            />
          ) : (
            <IoIosMoon
              onClick={() => setTheme("dark")}
              className="cursor-pointer  w-6 h-6 md:w-7 md:h-7 text-black"
            />
          )}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="border-2 border-gray-700 flex items-center justify-center text-black dark:text-white font-bold rounded-full w-10 h-10 cursor-pointer">
                  {user?.name?.charAt(0)}
                  {user?.name?.charAt(user?.name?.indexOf(" ") + 1)}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="font-medium">{user?.name}</div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>
                    <Link to="/dashboard/edit-profile">Profile</Link>
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FaUserShield className="mr-2 h-4 w-4" />
                  <span>
                    <Link to="/dashboard/my-dashboard">Dashboard</Link>
                  </span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex items-center gap-2"  onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
