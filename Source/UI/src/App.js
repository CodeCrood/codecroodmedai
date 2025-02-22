import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignUp } from "@clerk/clerk-react";
import Layout from "./Layouts/DashboardLayout"; // Using Layout instead of Sidebar
import HomePage from "./pages/HomePage";
import UploadImage from "./pages/UploadImage";
import ShowImages from "./pages/ShowImages";
import PieChart from "./pages/PieChart";
import AboutPage from "./pages/AboutPage";
import ProtectedRoute from "./components/ProtectedRoute";
import HelpScreen from "./pages/Help";
import Header from "./components/Header";
import BioDigitalEmbed from "./3dmodel/BioDigitalEmbed";
import LoginModal from "./components/CardModal";

function App() {
  return (
    <Router>
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <Header />

        {/* Main Layout with Sidebar inside */}
        <Routes>
          {/* Public Routes inside Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/help" element={<HelpScreen />} />{" "}
            {/* Moved inside Layout */}
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
            <Route
              path="/workspace/login"
              element={<ProtectedRoute element={<LoginModal />} />}
            />
          </Route>

          {/* Routes outside Layout */}
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
