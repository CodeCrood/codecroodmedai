import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { UserButton } from "@clerk/clerk-react";
import { ChevronDown, Menu, X } from "lucide-react";
import video from "../assets/hero_sec_video.mp4";

export default function LandingPage() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(window.scrollY);
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="flex flex-col">
      <header
        className={`fixed top-0 left-0 w-full flex justify-between items-center bg-white p-4 z-50 shadow transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <h1 className="text-2xl font-bold text-teal-600">CodeCroodAI</h1>

        <nav className="hidden md:flex flex-1 justify-center space-x-6 relative">
          {[
            { label: "Home", to: "home" },
            { label: "Why CodeCroodAI", to: "why" },
            { label: "Internships", to: "internships" },
            { label: "External Database", to: "database" },
            { label: "Forums", to: "forums" },
          ].map(({ label, to }) => (
            <ScrollLink
              key={to}
              to={to}
              smooth={true}
              duration={500}
              offset={-70}
              className="text-gray-700 hover:text-teal-700 cursor-pointer"
            >
              {label}
            </ScrollLink>
          ))}
          <div
            className="relative cursor-pointer text-gray-700 hover:text-teal-700 flex items-center"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>Services</span>
            <ChevronDown
              className={`ml-1 transition-transform duration-300 ${
                isDropdownOpen ? "rotate-180" : "rotate-0"
              }`}
              size={16}
            />
            {isDropdownOpen && (
              <div className="absolute mt-60 bg-white opacity-80 shadow-lg rounded-lg py-2 w-48">
                {[
                  { label: "Image Segmentation", to: "services" },
                  { label: "Data Analysis", to: "services" },
                  { label: "Consultation Services", to: "services" },
                  { label: "Liver Segmentation Dashboard", to: "/dashboard" },
                ].map(({ label, to }) =>
                  to.startsWith("/") ? (
                    <a
                      key={label}
                      href={to}
                      className="block px-4 py-2 text-black hover:bg-teal-100"
                    >
                      {label}
                    </a>
                  ) : (
                    <ScrollLink
                      key={label}
                      to={to}
                      smooth={true}
                      duration={500}
                      offset={-70}
                      className="block px-4 py-2 text-black hover:bg-teal-100"
                    >
                      {label}
                    </ScrollLink>
                  )
                )}
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-white opacity-90 shadow-lg z-40 p-4 space-y-4">
          {[
            { label: "Home", to: "home" },
            { label: "Why CodeCroodAI", to: "why" },
            { label: "Internships", to: "internships" },
            { label: "External Database", to: "database" },
            { label: "Forums", to: "forums" },
          ].map(({ label, to }) => (
            <ScrollLink
              key={to}
              to={to}
              smooth={true}
              duration={500}
              offset={-70}
              className="block text-gray-700 hover:text-teal-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {label}
            </ScrollLink>
          ))}
          <div
            className="relative cursor-pointer text-gray-700 hover:text-teal-700 flex items-center"
            onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
          >
            <span>Services</span>
            <ChevronDown
              className={`ml-1 transition-transform duration-300 ${
                isMobileDropdownOpen ? "rotate-180" : "rotate-0"
              }`}
              size={16}
            />
          </div>
          {isMobileDropdownOpen && (
            <div className="mt-2 bg-white shadow-lg rounded-lg py-2">
              {[
                { label: "Liver Segmentation Dashboard", to: "/dashboard" },
                { label: "Image Segmentation", to: "services" },
                { label: "Data Analysis", to: "services" },
                { label: "Consultation Services", to: "services" },
                
              ].map(({ label, to }) =>
                to.startsWith("/") ? (
                  <a
                    key={label}
                    href={to}
                    className="block px-4 py-2 text-black hover:bg-teal-100"
                  >
                    {label}
                  </a>
                ) : (
                  <ScrollLink
                    key={label}
                    to={to}
                    smooth={true}
                    duration={500}
                    offset={-70}
                    className="block px-4 py-2 text-black hover:bg-teal-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {label}
                  </ScrollLink>
                )
              )}
            </div>
          )}
        </div>
      )}

      {/* Hero Section */}
      <section className="flex items-center justify-between bg-gradient-to-b from-blue-100 via-blue-50 to-teal-300 h-screen pt-16 bg-gray-100">
        <div className="w-full md:w-1/2 ml-7">
          <h2 className="text-4xl font-bold mb-4 text-teal-700">
            Welcome to CodeCroodAI
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Empowering AI solutions for your business needs.
          </p>
          <button className="bg-teal-600 text-white px-6 py-2 rounded-lg shadow hover:bg-teal-700">
            Get Started
          </button>
        </div>
        <div className="hidden md:flex w-1/3 h-full justify-end">
          <video
            src={video}
            autoPlay
            loop
            muted
            className="shadow-lg w-full h-full object-cover"
          ></video>
        </div>
      </section>

      {/* Why CodeCroodAI Section */}
      <section id="why" className="py-20 px-10 bg-white text-center">
        <h2 className="text-4xl font-bold text-teal-700 mb-6">
          Why CodeCroodAI?
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          CodeCroodAI leverages advanced AI algorithms and the nnFormer
          architecture to provide accurate and efficient liver tumor
          segmentation, aiding early detection and better treatment planning.
        </p>
      </section>

      {/* Other Services Section */}
      <section id="services" className="py-20 px-10 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold text-teal-700 mb-6">
          Other Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold">Image Segmentation</h3>
            <p className="mt-2 text-gray-600">
              Advanced segmentation tools for various medical imaging tasks.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold">Data Analysis</h3>
            <p className="mt-2 text-gray-600">
              Comprehensive analytical tools for medical datasets.
            </p>
          </div>
          
        </div>
      </section>

      {/* Internships Section */}
      <section id="internships" className="py-20 px-10 bg-white text-center">
        <h2 className="text-4xl font-bold text-teal-700 mb-6">
          Internship Opportunities
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Join our internship program to gain hands-on experience in AI-driven
          healthcare solutions.
        </p>
      </section>

      {/* External Database Section */}
      <section id="database" className="py-20 px-10 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold text-teal-700 mb-6">
          External Database Access
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Access a vast database of medical images and research resources to
          enhance your studies and research.
        </p>
      </section>

      {/* Forums Section */}
      <section id="forums" className="py-20 px-10 bg-white text-center">
        <h2 className="text-4xl font-bold text-teal-700 mb-6">
          Join the Community Forum
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Connect with researchers, professionals, and enthusiasts to discuss
          advancements in liver tumor detection.
        </p>
      </section>
    </div>
  );
}
