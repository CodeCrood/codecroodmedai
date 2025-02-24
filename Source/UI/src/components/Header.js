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
  LogOut,
  LayoutDashboardIcon,
} from "lucide-react";
import { UserButton, useUser, useClerk } from "@clerk/clerk-react";
import logo from "../assets/logo-1.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showTitle, setShowTitle] = useState(true);
  const location = useLocation();
  const { user } = useUser();
  
  const { signOut } = useClerk();
  

  // Scroll effect to hide title
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setShowTitle(false); // Hide on scroll down
      } else {
        setShowTitle(true); // Show on scroll up
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="bg-gradient-to-r from-blue-900 to-cyan-700 text-white shadow-lg fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-3 px-2">
        {/* Logo */}
        {/* Sidebar Logo and Title Aligned Left */}
        <div className="flex items-center">
          <div>
            <img src={logo} alt="logo" className="h-12" />
          </div>
          <div className="text-2xl font-bold">
            <Link to="/dashboard" className="hover:text-gray-200 transition">
              LiverTumor<span className="text-teal-300">AI</span>
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex bg-transparent border border-white rounded-lg overflow-hidden w-96 shadow-md">
          <input
            type="text"
            placeholder="Search scans, reports, etc."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 w-full outline-none text-white placeholder-white bg-transparent "
          />
          <button className="bg-white/20 px-2 py-2 hover:bg-white/30 transition">
            <Search className="text-white w-5 h-5" />
          </button>
        </div>

        {/* Icons & User Profile */}
        <div className="hidden md:flex items-center space-x-5 pl-52">
          <Link to="/cart" className="hover:text-gray-300 transition">
            <ShoppingCart className="w-5 h-5" />
          </Link>
          <UserButton className="transform scale-125" />
        </div>

        {/* Mobile Menu Button with Animation */}
        <button
          className="md:hidden text-white transition-transform duration-300 px-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <Menu className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Opening Below Header */}
      <div
        className={`absolute top-full left-0 w-full border-t bg-gradient-to-r from-blue-900 to-cyan-700 shadow-lg transition-all duration-300 z-40 transform ${
          {
            true: "scale-y-100 opacity-95",
            false: "scale-y-0 opacity-0",
          }[isMenuOpen]
        }`}
        style={{ transformOrigin: "top" }}
      >
        <nav className="flex flex-col items-start space-y-4 px-6 py-6 text-lg">
          {[
            { path: "/", label: "Home", icon: <Home size={20} /> },
            { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboardIcon size={20} /> },
            {
              path: "/liver-service/upload",
              label: "Upload Image",
              icon: <Upload size={20} />,
            },
            {
              path: "/liver-service/show",
              label: "View Segmentation",
              icon: <Image size={20} />,
            },
            {
              path: "/liver-service/pie",
              label: "Pie Chart",
              icon: <PieChart size={20} />,
            },
            {
              path: "/liver-service/anatomy",
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
              className={`flex items-center space-x-3 text-white p-2 rounded-lg w-full transition duration-300 ${
                location.pathname === path
                  ? "border-l-4 border-white bg-gradient-to-r "
                  : ""
              }`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-between p-4 border-b border-white space-x-4">
          <div className="flex items-center space-x-3">
            <UserButton className="transform scale-110" />
            <span className="font-medium">{user?.fullName || "User"}</span>
          </div>
          <button
            onClick={() => signOut()}
            className="flex items-center space-x-1 text-white hover:text-red-500 transition"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
