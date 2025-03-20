import React, { useState } from "react";
import { Link } from "react-router-dom";
import DarkMode from "../shared/DarkMode";

function UnauthorizedHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
        <div className="flex justify-center w-24">
          <Link to="/admin">
            <img
              src="https://cdn.worldvectorlogo.com/logos/mango-4.svg"
              alt="Mango Logo"
              className="h-8 w-auto"
            />
          </Link>
        </div>
        <div className="hidden sm:flex space-x-6 items-center">
          <Link to="admin/login" className="link link-hover uppercase">
            Login
          </Link>
          <div className="flex items-center">
            <DarkMode />
          </div>
        </div>
        <div className="sm:hidden flex items-center">
          <button onClick={toggleMenu}>
            <i className="fas fa-bars fa-lg"></i>
          </button>
        </div>
      </div>

      <div
        className={`sm:hidden mt-4 space-y-4 text-center ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <Link to="/about" className="block uppercase">
          About
        </Link>
        <Link to="/contact" className="block uppercase">
          Contact
        </Link>
        <Link to="/admin/login" className="block uppercase">
          Login
        </Link>
        <Link to="/admin/signup" className="block uppercase">
          Register
        </Link>
        <div className="flex justify-center">
          <DarkMode />
        </div>
      </div>
    </div>
  );
}

export default UnauthorizedHeader;
