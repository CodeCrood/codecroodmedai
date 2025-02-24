import React from "react";
import { Link } from "react-router-dom";
import {
  Upload,
  Eye,
  PieChart,
  Users,
  HeartPulse,
  HelpCircle
} from "lucide-react";
import QuickStats from "../components/QuickStats";

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 flex flex-col p-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4 animate-fadeInUp">
          Empowering <span className="text-teal-400">Liver Segmentation</span>
        </h1>
        <p className="text-xl text-gray-700 mb-6 animate-fadeInUp delay-200">
          AI-driven workspace for accurate liver tumor detection.
        </p>
        <Link to="/liver-service/upload" className="px-6 py-3 bg-teal-400 text-white rounded-full hover:bg-teal-600 transition shadow-lg animate-fadeInUp delay-300">
          Lets Analyze
        </Link>
      </section>

      {/* Quick Stats Section */}
      <div className="w-full max-w-6xl mb-12 animate-fadeInUp delay-500 flex justify-center self-center">
        <QuickStats />
      </div>

      {/* Instructions Section */}
      <p className="text-gray-800 text-lg mb-8 text-center">Follow the steps below to get started:</p>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl flex justify-center self-center">
        {/* Instruction Cards */}
        {[
          {
            icon: <Upload className="text-blue-500 w-12 h-12 mb-4 mx-auto" />, 
            title: "Upload Image",
            desc: "Upload CT scans for analysis.",
            link: "/liver-service/upload"
          },
          {
            icon: <Eye className="text-green-500 w-12 h-12 mb-4 mx-auto" />,
            title: "View Segmentation",
            desc: "See the original CT scan with segmented tumors.",
            link: "/liver-service/show"
          },
          {
            icon: <PieChart className="text-purple-500 w-12 h-12 mb-4 mx-auto" />,
            title: "Data Visualization",
            desc: "Analyze tumor and liver proportions.",
            link: "/liver-service/pie"
          },
          {
            icon: <HeartPulse className="text-red-500 w-12 h-12 mb-4 mx-auto" />,
            title: "Liver Cancer Anatomy",
            desc: "Explore 3D models of liver cancer progression.",
            link: "/liver-service/anatomy"
          },
          {
            icon: <Users className="text-teal-500 w-12 h-12 mb-4 mx-auto" />,
            title: "Meet the Team",
            desc: "Learn about our expert team.",
            link: "/about"
          },
          {
            icon: <HelpCircle className="text-teal-500 w-12 h-12 mb-4 mx-auto" />,
            title: "Help & Support",
            desc: "Get assistance when needed.",
            link: "/help"
          }
        ].map((card, index) => (
          <Link
            key={index}
            to={card.link}
            className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition transform hover:scale-105 hover:bg-blue-50 "
          >
            {card.icon}
            <div className="flex justify-center items-center flex-col">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">{card.title}</h3>
            <p className="text-gray-600">{card.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
