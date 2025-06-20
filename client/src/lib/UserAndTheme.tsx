import { useTheme } from "@/components/themeProvider/ThemeProvider";
import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/redux/authUlits";
import { Avatar } from "@radix-ui/react-avatar";
import { Sun } from "lucide-react";
import { IoIosMoon } from "react-icons/io";
import { Link } from "react-router-dom";

export const UserAndTheme = ({on}:{on:boolean}) => {

    const user = getUserInfo();
    const { theme, setTheme } = useTheme();
  return (
    <>

{on==true?
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
                            <Avatar className="border-2 border-gray-700 flex items-center justify-center text-black dark:text-white font-bold rounded-full w-10 h-10">
                                {user?.name?.charAt(0)}
                                {user?.name?.charAt(user?.name?.indexOf(" ") + 1)}
                            </Avatar>
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
 </div>:
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
                            <Avatar className="border-2 border-gray-700 flex items-center justify-center text-black dark:text-white font-bold rounded-full w-10 h-10">
                                {user?.name?.charAt(0)}
                                {user?.name?.charAt(user?.name?.indexOf(" ") + 1)}
                            </Avatar>
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

}

    </>
  )
}
