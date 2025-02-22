import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Upload,
  Image,
  PieChart,
  Users,
  Menu,
  X,
  Skull,
  HelpCircle,
} from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside
      className={`bg-gradient-to-b from-white via-gray-50 to-gray-100 shadow-lg h-screen fixed left-0 top-0 pt-24 p-4 transition-all duration-400 rounded-r-2xl border-r border-gray-200 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Toggle Button */}
      <button onClick={toggleSidebar} className="mb-6 pl-2 text-gray-600 hover:text-blue-600 transition-colors">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4">
        {[
          { path: "/", label: "Home", icon: <Home size={24} /> },
          { path: "/workspace/upload", label: "Upload Image", icon: <Upload size={24} /> },
          { path: "/workspace/show", label: "View Segmentation", icon: <Image size={24} /> },
          { path: "/workspace/pie", label: "Pie Chart", icon: <PieChart size={24} /> },
          { path: "/workspace/anatomy", label: "Human Anatomy", icon: <Skull size={24} /> },
          { path: "/about", label: "Team", icon: <Users size={24} /> },
          { path: "/help", label: "Help & Support", icon: <HelpCircle size={24} /> },
        ].map(({ path, label, icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center space-x-3 text-gray-700 hover:bg-blue-100 hover:text-teal-700 p-3 rounded-lg transition-all duration-300 shadow-sm ${
              location.pathname === path ? "bg-blue-50 border-l-4 border-teal-500" : ""
            }`}
          >
            {icon}
            {isOpen && <span className="font-medium">{label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}