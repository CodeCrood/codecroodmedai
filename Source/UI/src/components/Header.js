import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-gradient-to-r from-blue-900 to-cyan-700 text-white shadow-lg fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide">
          <Link to="/" className="hover:text-gray-200 transition">
            LiverTumor<span className="text-teal-300">AI</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex bg-transparent border border-white rounded-lg overflow-hidden w-96 shadow-md">
          <input
            type="text"
            placeholder="Search scans, reports, etc."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 w-full outline-none text-white placeholder-white bg-transparent"
          />
          <button className="bg-white/20 px-4 py-2 hover:bg-white/30 transition">
            <Search className="text-white w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link to="/about" className="hover:text-gray-300 transition">About</Link>
          <Link to="/features" className="hover:text-gray-300 transition">Features</Link>
          <Link to="/team" className="hover:text-gray-300 transition">Team</Link>
          <Link to="/contact" className="hover:text-gray-300 transition">Contact</Link>
        </nav>

        {/* Icons & User Profile */}
        <div className="hidden md:flex items-center space-x-5">
          <Link to="/cart" className="hover:text-gray-300 transition">
            <ShoppingCart className="w-5 h-5" />
          </Link>
          
          {/* User Profile Button */}
          <UserButton className="transform scale-125" />
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Navigation (Sliding Menu) */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-blue-900 transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"} shadow-lg`}>
        <div className="flex justify-between items-center px-5 py-4 border-b border-blue-700">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setIsMenuOpen(false)}>
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
        <nav className="flex flex-col items-start space-y-4 px-6 py-6 text-sm">
          <Link to="/about" className="hover:text-gray-300 transition">About</Link>
          <Link to="/features" className="hover:text-gray-300 transition">Features</Link>
          <Link to="/team" className="hover:text-gray-300 transition">Team</Link>
          <Link to="/contact" className="hover:text-gray-300 transition">Contact</Link>
        </nav>

        {/* Mobile Search Bar */}
        <div className="px-6">
          <div className="flex items-center bg-white rounded-lg shadow-md overflow-hidden">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 w-full text-gray-800 text-sm outline-none"
            />
            <button className="bg-blue-700 px-4 py-2">
              <Search className="text-white w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile User Button */}
        <div className="px-6 mt-6">
          <UserButton className="transform scale-125" />
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => setIsMenuOpen(false)}></div>
      )}
    </header>
  );
}
