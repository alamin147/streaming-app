import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserAndTheme } from "@/lib/UserAndTheme";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between gap-2 px-4 bg-background rounded-t-lg shadow-sm">
      <div className="flex items-center gap-4">
        {<SidebarTrigger className="flex md:hidden -ml-1" />}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/">
                <span className="text-yellow-500 font-bold">N</span>
                Movies
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            {
              <BreadcrumbItem className="hidden md:flex flex-wrap gap-2 items-center">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `hover:text-yellow-400 text-sm font-medium px-2 ${
                      isActive ? "text-yellow-400" : ""
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/videos?category=movies"
                  className={({ isActive }) =>
                    `hover:text-yellow-400 text-sm font-medium px-2 ${
                      isActive ? "" : ""
                    }`
                  }
                >
                  Movies
                </NavLink>
                <NavLink
                  to="/videos?category=tv shows"
                  className={({ isActive }) =>
                    `hover:text-yellow-400 text-sm font-medium px-2 ${
                      isActive ? "" : ""
                    }`
                  }
                >
                  TV Shows
                </NavLink>
                <div className="relative">
                  <button
                    className="flex items-center hover:text-yellow-400 text-sm font-medium px-2"
                    onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                    onMouseEnter={() => setMegaMenuOpen(true)}
                  >
                    Categories
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </button>

                  {megaMenuOpen && (
                    <div
                      className="absolute top-full left-0 z-30 w-screen max-w-screen-lg bg-background shadow-lg rounded-lg p-4 grid grid-cols-3 gap-4 border"
                      onMouseLeave={() => setMegaMenuOpen(false)}
                    >
                      <div>
                        <h3 className="font-bold text-yellow-500 mb-2">
                          Genres
                        </h3>
                        <ul className="space-y-1">
                          <li>
                            <NavLink
                              to="/videos?genre=action"
                              className="text-sm hover:text-yellow-400"
                            >
                              Action
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/videos?genre=comedy"
                              className="text-sm hover:text-yellow-400"
                            >
                              Comedy
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/videos?genre=drama"
                              className="text-sm hover:text-yellow-400"
                            >
                              Drama
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/videos?genre=horror"
                              className="text-sm hover:text-yellow-400"
                            >
                              Horror
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/videos?genre=sci-fi"
                              className="text-sm hover:text-yellow-400"
                            >
                              Sci-Fi
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-bold text-yellow-500 mb-2">
                          Collections
                        </h3>
                        <ul className="space-y-1">
                          <li>
                            <NavLink
                              to="/videos?sortBy=rating"
                              className="text-sm hover:text-yellow-400"
                            >
                              Top Rated
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/videos?category=award-winning"
                              className="text-sm hover:text-yellow-400"
                            >
                              Award Winning
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/videos?category=classic"
                              className="text-sm hover:text-yellow-400"
                            >
                              Classic Movies
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/videos?category=family"
                              className="text-sm hover:text-yellow-400"
                            >
                              Family Friendly
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/videos?category=indie"
                              className="text-sm hover:text-yellow-400"
                            >
                              Independent Films
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-bold text-yellow-500 mb-2">
                          By Year
                        </h3>
                        <ul className="space-y-1">
                          <li>
                            <NavLink
                              to="/videos?year=2024"
                              className="text-sm hover:text-yellow-400"
                            >
                              2024
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/videos?year=2023"
                              className="text-sm hover:text-yellow-400"
                            >
                              2023
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/videos?year=2022"
                              className="text-sm hover:text-yellow-400"
                            >
                              2022
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/videos?year=2021"
                              className="text-sm hover:text-yellow-400"
                            >
                              2021
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/videos?year=older"
                              className="text-sm hover:text-yellow-400"
                            >
                              Older
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
                <NavLink
                  to="/videos?sortBy=rating"
                  className={({ isActive }) =>
                    `hover:text-yellow-400 text-sm font-medium px-2 ${
                      isActive ? "" : ""
                    }`
                  }
                >
                  Trending
                </NavLink>
                <NavLink
                  to="/videos?sortBy=views"
                  className={({ isActive }) =>
                    `hover:text-yellow-400 text-sm font-medium px-2 ${
                      isActive ? "" : ""
                    }`
                  }
                >
                  Popular
                </NavLink>
                <NavLink
                  to="/videos?year=2025"
                  className={({ isActive }) =>
                    `hover:text-yellow-400 text-sm font-medium px-2 ${
                      isActive ? "" : ""
                    }`
                  }
                >
                  New Releases
                </NavLink>
              </BreadcrumbItem>
            }
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-4">
        <UserAndTheme on={false} />
      </div>
    </header>
  );
};

export default Navbar;
