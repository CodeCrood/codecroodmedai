import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignUp } from "@clerk/clerk-react";
import Sidebar from "./components/Sidebar";
import HomePage from "./components/HomePage";
import UploadImage from "./components/UploadImage";
import ShowImages from "./components/ShowImages";
import PieChart from "./components/PieChart";
import AboutPage from "./components/AboutPage";
import ProtectedRoute from "./components/ProtectedRoute";
import HelpScreen from "./components/Help";
import Header from "./components/Header";
import BioDigitalEmbed from "./3dmodel/BioDigitalEmbed";
import BioDigitalAnatomyViewer from "./3dmodel/BioDigitalAnatomyViewer ";

function App() {
  return (
    <Router>
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <Header />

        {/* Layout with Sidebar and Main Content */}
        <div className="flex">
          {/* Sidebar: Fixed width */}
          <Sidebar />

          {/* Main Content */}
          <main
            className="flex-1 bg-white shadow-inner ml-20 md:ml-1/4 p-6"
            style={{ marginLeft: "calc(var(--sidebar-width))" }} // Responsive margin
          >
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />

              {/* Protected Routes */}
              <Route
                path="/workspace/upload"
                element={<ProtectedRoute element={<UploadImage />} />}
              />
              <Route
                path="/workspace/show"
                element={<ProtectedRoute element={<ShowImages />} />}
              />
              <Route
                path="/workspace/pie"
                element={<ProtectedRoute element={<PieChart />} />}
              />
              <Route
                path="/workspace/anatomy"
                element={<ProtectedRoute element={<BioDigitalEmbed />} />}
              />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/help" element={<HelpScreen />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
