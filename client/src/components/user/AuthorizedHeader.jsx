import React, { useState } from "react";
import { Link } from "react-router-dom";
import DarkMode from "../shared/DarkMode";

const AuthorizedHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="p-2 text-xs font-medium relative">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div className="hidden sm:flex items-center gap-6">
          <Link to="/products/women" className="hover:underline uppercase">
            Women
          </Link>
          <Link to="/products/men" className="hover:underline uppercase">
            Men
          </Link>
          <Link to="/products/kids" className="hover:underline uppercase">
            Kids
          </Link>
          <Link to="/about" className="hover:underline uppercase">
            About
          </Link>
          <Link to="/contact" className="hover:underline uppercase">
            Contact
          </Link>
        </div>

        <div className="flex justify-center sm:justify-start w-24">
          <Link to="/">
            <img
              src="https://cdn.worldvectorlogo.com/logos/mango-4.svg"
              alt="Logo"
              className="h-8"
            />
          </Link>
        </div>

        <div className="hidden sm:flex items-center gap-6">
          <Link to="/user/get-order" className="hover:underline uppercase">
            Orders
          </Link>
          <Link to="/user/cart" className="hover:underline uppercase">
            Bag
          </Link>
          <Link to="/user/profile" className="hover:underline uppercase">
            My Account
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
          <Link to="/products/women" className="block py-2 border-b uppercase">
            Women
          </Link>
          <Link to="/products/men" className="block py-2 border-b uppercase">
            Men
          </Link>
          <Link to="/products/kids" className="block py-2 border-b uppercase">
            Kids
          </Link>
          <Link to="/about" className="block py-2 border-b uppercase">
            About
          </Link>
          <Link to="/contact" className="block py-2 border-b uppercase">
            Contact
          </Link>
          <Link to="/user/get-order" className="block py-2 border-b uppercase">
            Orders
          </Link>
          <Link to="/user/cart" className="block py-2 border-b uppercase">
            Bag
          </Link>
          <Link to="/user/profile" className="block py-2 border-b uppercase">
            My Account
          </Link>
          <DarkMode />
        </div>
      )}
    </div>
  );
};

export default AuthorizedHeader;
