import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Menu, HelpCircle } from "lucide-react";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Generate breadcrumb from current path
  const generateBreadcrumb = () => {
    const paths = location.pathname.split("/").filter((p) => p);
    return paths.map((segment, index) => (
      <span key={index} className="capitalize">
        {index > 0 && " / "}
        {segment.replace(/-/g, " ")}
      </span>
    ));
  };

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64 md:ml-64" : "ml-20 md:ml-20"
        }`}
      >
        {/* Layout Header */}
        <header className="flex items-center justify-between bg-white shadow px-4 py-2 sticky top-0 z-30">
          {/* Sidebar Toggle */}
          <button onClick={toggleSidebar} className="text-gray-700 md:hidden">
            <Menu size={24} />
          </button>

          {/* Breadcrumb Path */}
          <div className="text-gray-600 font-medium">{generateBreadcrumb()}</div>

          {/* Help Icon */}
          <button className="text-gray-700">
            <HelpCircle size={24} />
          </button>
        </header>

        {/* Page Content */}
        <main className="p-6 overflow-y-auto h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
