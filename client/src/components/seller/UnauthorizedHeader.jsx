import React, { useState } from "react";
import { Link } from "react-router-dom";
import DarkMode from "../shared/DarkMode";

function UnauthorizedHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="p-2 text-xs font-medium relative">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div className="hidden sm:flex items-center gap-6">
          <Link to="/seller/about" className="hover:underline uppercase">
            About
          </Link>
          <Link to="/seller/contact" className="hover:underline uppercase">
            Contact
          </Link>
        </div>

        <div className="flex justify-center sm:justify-start w-24">
          <Link to="/seller">
            <img
              src="https://cdn.worldvectorlogo.com/logos/mango-4.svg"
              alt="Mango Logo"
              className="h-8"
            />
          </Link>
        </div>

        <div className="hidden sm:flex items-center gap-6">
          <Link to="/seller/login" className="hover:underline uppercase">
            Log In
          </Link>
          <DarkMode />
        </div>

        <div className="sm:hidden flex items-center">
          <button onClick={toggleMenu} className="text-lg">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden absolute left-0 top-16 w-full p-4 flex flex-col space-y-4 bg-white dark:bg-gray-800 shadow-md">
          <Link to="/seller/about" className="block py-2 border-b uppercase">
            About
          </Link>
          <Link to="/seller/contact" className="block py-2 border-b uppercase">
            Contact
          </Link>
          <Link to="/seller/login" className="block py-2 border-b uppercase">
            Log In
          </Link>
          <DarkMode />
        </div>
      )}
    </div>
  );
}

export default UnauthorizedHeader;
