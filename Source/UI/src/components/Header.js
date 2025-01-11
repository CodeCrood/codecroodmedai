import { UserButton } from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router-dom";
import { FaQuestionCircle } from "react-icons/fa";
import logo from "../assets/logo-1.png"

function Header() {
  return (
    <header className="p-3 bg-blue-500 text-white shadow-lg flex justify-between items-center sticky top-0 z-10">
      {/* Logo Section */}
      <Link
      to={'/'}>
      <div className="flex items-center">
        <img
          src= {logo} // Replace with your logo path
          alt="Logo"
          className="h-14 mr-0" // Adjust height and margin as needed
        />
        <h1 className="text-2xl font-bold text-center">CodecroodMed</h1>
      </div>
      </Link>
      
      {/* User Profile Button */}
      <div className="ml-auto">
        <UserButton
          className="transform scale-125"
          style={{ padding: "10px", borderRadius: "8px", fontSize: "16px" }}
        />
      </div>

      {/* Help Link with Icon */}
      <div className="ml-4 mb-1">
        <Link
          to="/help"
          className="flex items-center text-white font-semibold hover:text-blue-200 transition-all duration-300"
        >
          <FaQuestionCircle className="mr-2 text-xl" /> {/* Icon with margin */}
          {/* Optionally, you can add text if needed */}
          {/* <span>Help</span> */}
        </Link>
      </div>
    </header>
  );
}

export default Header;
