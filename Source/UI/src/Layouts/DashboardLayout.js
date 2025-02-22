import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
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
    <div className="flex h-screen w-screen bg-blue-200">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64 md:ml-64" : "ml-20 md:ml-20"
        }`}
      >

        {/* Page Content */}
        <main className=" py-16 overflow-y-auto h-[calc(120vh-4rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
