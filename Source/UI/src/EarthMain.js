// src/App.js

import React from "react";
import { motion } from "framer-motion"; // Import framer-motion for animation
import EarthCanvas from "./components/EarthCanvas"; // Import the EarthCanvas component
import "./styles/loader.css"; // Import the loader CSS

// Animation variant for motion.div
const slideIn = (direction, type, delay, duration) => ({
  hidden: {
    x: direction === "left" ? -1000 : direction === "right" ? 1000 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      type: type,
      delay: delay,
      duration: duration,
    },
  },
});

function EarthMain() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)} // Apply slide-in animation
        initial="hidden"
        animate="show"
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]" // Responsive height
      >
        <EarthCanvas /> {/* EarthCanvas will fill its parent container */}
      </motion.div>
    </div>
  );
}

export default EarthMain;
