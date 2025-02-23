import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  Search,
  ShoppingCart,
  X,
  Home,
  Upload,
  Image,
  PieChart,
  Skull,
  Users,
  HelpCircle,
} from "lucide-react";
import { UserButton, useUser } from "@clerk/clerk-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const { user } = useUser();


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
          <button className="bg-white/20 px-2 py-2 hover:bg-white/30 transition">
            <Search className="text-white w-5 h-5" />
          </button>
        </div>

        {/* Icons & User Profile */}
        <div className="hidden md:flex items-center space-x-5">
          <Link to="/cart" className="hover:text-gray-300 transition">
            <ShoppingCart className="w-5 h-5" />
          </Link>
          <UserButton className="transform scale-125" />
        </div>
        

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Navigation with Sidebar Routes */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-blue-950 via-blue-500 transform transition-transform duration-300 z-50 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-5 py-4 border-b border-blue-700">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setIsMenuOpen(false)}>
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        
        <nav className="flex flex-col items-start space-y-4 px-6 py-6 text-sm">
          {[
            { path: "/", label: "Home", icon: <Home size={20} /> },
            {
              path: "/workspace/upload",
              label: "Upload Image",
              icon: <Upload size={20} />,
            },
            {
              path: "/workspace/show",
              label: "View Segmentation",
              icon: <Image size={20} />,
            },
            {
              path: "/workspace/pie",
              label: "Pie Chart",
              icon: <PieChart size={20} />,
            },
            {
              path: "/workspace/anatomy",
              label: "Human Anatomy",
              icon: <Skull size={20} />,
            },
            { path: "/about", label: "Team", icon: <Users size={20} /> },
            {
              path: "/help",
              label: "Help & Support",
              icon: <HelpCircle size={20} />,
            },
          ].map(({ path, label, icon }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center space-x-3 text-white hover:bg-blue-700 p-2 rounded-lg w-full transition-all duration-300 ${
                location.pathname === path ? "bg-blue-600" : ""
              }`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          ))}
        </nav>
        

      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-20 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </header>
  );
}
