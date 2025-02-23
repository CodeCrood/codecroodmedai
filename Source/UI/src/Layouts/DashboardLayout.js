import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Menu, HelpCircle } from "lucide-react";
import Header from "../components/Header";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-blue-200">
      <div>
        <Header/>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Hidden on small screens */}
        <div className={`hidden md:block ${isSidebarOpen ? "w-64" : "w-20"}`}>
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        </div>

        {/* Main Content Area */}
        <main className={`flex-1 p-0 mt-16 overflow-y-auto transition-all duration-300`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
