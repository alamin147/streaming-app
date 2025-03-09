import type React from "react";
import { FaCrown, FaPlay, FaBolt } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="mt-10 bg-gray-900 text-gray-300 py-8 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div>
            <h3 className="text-white mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-yellow-400">
                  Movies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400">
                  TV Shows
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400">
                  Top IMDB
                </a>
              </li>
            </ul>
          </div>

          {/* Middle Column */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    Action Movies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    Horror Movies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    Comedy Movies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    Thriller Movies
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    Terms of service
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:text-yellow-400">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <h3 className="text-white mb-4">About Us</h3>
            <p className="mb-3">
              <span className="text-yellow-400">N</span>-Movies is free
              streaming website with zero ads, it allows you{" "}
              <span className="font-medium">watch shows online free</span> in
              high quality for free. You can also download full tv shows and
              watch it later if you want.
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 border border-yellow-400 rounded-md px-3 py-1">
                <FaCrown className="text-yellow-400" />
                <span className="text-sm">High quality</span>
              </div>
              <div className="flex items-center gap-2 border border-yellow-400 rounded-md px-3 py-1">
                <FaPlay className="text-yellow-400" />
                <span className="text-sm">Free forever</span>
              </div>
              <div className="flex items-center gap-2 border border-yellow-400 rounded-md px-3 py-1">
                <FaBolt className="text-yellow-400" />
                <span className="text-sm">Fast load</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 pt-4 border-t border-gray-800 flex justify-center gap-8">
          <a href="#" className="hover:text-yellow-400">
            Contact
          </a>
          <a href="#" className="hover:text-yellow-400">
            Terms of service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
