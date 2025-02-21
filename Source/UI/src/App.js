import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignUp } from "@clerk/clerk-react";
import Layout from "./components/Layout"; // Using Layout instead of Sidebar
import HomePage from "./components/HomePage";
import UploadImage from "./components/UploadImage";
import ShowImages from "./components/ShowImages";
import PieChart from "./components/PieChart";
import AboutPage from "./components/AboutPage";
import ProtectedRoute from "./components/ProtectedRoute";
import HelpScreen from "./components/Help";
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
          <Route path="/help" element={<HelpScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
