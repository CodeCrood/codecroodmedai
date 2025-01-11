import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUpload,
  FaEye,
  FaChartPie,
  FaUsers,
  FaChevronLeft,
  FaChevronRight,
  FaSkull,
} from "react-icons/fa"; // Import icons

function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false); // State to track sidebar collapse

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={`bg-gray-100 shadow-lg min-h-screen p-4 sticky top-0 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-1/4"
      } relative`}
    >
      {/* Toggle Sidebar Button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-6 right-6 p-2 bg-gray-200 rounded-full focus:outline-none z-10 items-center justify-center"
      >
        {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}{" "}
        {/* Toggle icon */}
      </button>

      {/* Interactive Navigation Heading */}
      {!isCollapsed && (
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-6 transition-transform transform hover:scale-105">
          Navigation
        </h2>
      )}

      <nav className="space-y-6 mt-14 justify-center items-center">
        {[
          {
            path: "/",
            label: "Home",
            icon: <FaHome />,
          },
          {
            path: "/workspace/upload",
            label: "Upload Image",
            icon: <FaUpload />,
          },
          {
            path: "/workspace/show",
            label: "View Segmentation",
            icon: <FaEye />,
          },
          {
            path: "/workspace/pie",
            label: "Pie Chart",
            icon: <FaChartPie />,
          },
          {
            path: "/workspace/anatomy",
            label: "Human Anatomy",
            icon: <FaSkull/>,
          },
          {
            path: "/about",
            label: "Team",
            icon: <FaUsers />,
          },
        ].map(({ path, label, icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
              location.pathname === path
                ? "bg-blue-600 text-white font-semibold scale-105"
                : "text-blue-500 hover:bg-blue-500 hover:text-white"
            } ${isCollapsed ? "px-3" : "px-4"}`} // Increase padding when collapsed for a wider highlighted area
          >
            {/* If sidebar is collapsed, show only icon with larger size and center it */}
            <span
              className={ `${
                isCollapsed ? "text-xl" : "text-base"
              } flex justify-center items-center mr-2`} // Increase icon size when collapsed
            >
              {icon}
            </span>
            {/* If sidebar is expanded, show label */}
            {!isCollapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;