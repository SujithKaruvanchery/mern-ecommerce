import React, { useState } from "react";
import { Link } from "react-router-dom";
import DarkMode from "../shared/DarkMode";

function AuthorizedHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="p-4 text-xs font-medium">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div className="hidden sm:flex space-x-6">
          <Link to="/admin/about" className="link link-hover uppercase">
            About
          </Link>
          <Link to="/admin/contact" className="link link-hover uppercase">
            Contact
          </Link>
        </div>
        <div className="flex justify-center sm:justify-start w-24">
          <Link to="/admin/dashboard">
            <img
              src="https://cdn.worldvectorlogo.com/logos/mango-4.svg"
              alt="Mango Logo"
              className="h-8 w-auto"
            />
          </Link>
        </div>
        <div className="hidden sm:flex space-x-6 items-center">
          <div className="flex items-center">
            <Link to={"/admin/profile"} className="link link-hover uppercase">
              My account
            </Link>
            <DarkMode />
          </div>
        </div>
        <div className="sm:hidden flex items-center">
          <button onClick={toggleMenu} className="focus:outline-none">
            <i
              className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} fa-lg`}
            ></i>
          </button>
        </div>
      </div>

      <div
        className={`sm:hidden mt-4 space-y-2 text-center ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <Link to="/admin/about" className="block link link-hover uppercase">
          About
        </Link>
        <Link to="/admin/contact" className="block link link-hover uppercase">
          Contact
        </Link>
        <Link to="/admin/profile" className="block link link-hover uppercase">
          My Account
        </Link>
        <div className="flex justify-center">
          <DarkMode />
        </div>
      </div>
    </div>
  );
}

export default AuthorizedHeader;
