import React from "react";
import { motion } from "framer-motion"; // For smooth animations

function AboutPage() {
  // Data for supervisor and committee members
  const teamMembers = [
    {
      name: "Dr. Mubashir Ahmad",
      designation: "Supervisor",
      imageUrl: "mubashirahmad.jpg", // Replace with actual image URL
      description: "Research Interests: Medical Imaging, Image Segmentation, Image Classification, and Image Recognition.",
    },
    {
      name: "Mukhtiar Zamin",
      designation: "Committee Member",
      imageUrl: "mukhtiarzamin.png", // Replace with actual image URL
      description: "Experienced in software engineering, specializing in system architecture, scalable applications, and efficient software design for complex environments.",
    },
    {
      name: "Bushra Mushtaq",
      designation: "Committee Member",
      imageUrl: "bushramushtaq.png", // Replace with actual image URL
      description: "Area of Interest: Computer Science.",
    },
    {
      name: "Ehzaz Mustafa",
      designation: "Committee Member",
      imageUrl: "ehzazmustafa.png", // Replace with actual image URL
      description: "Research Interests: Deep Learning, Digital Twins and Metaverse, Federated Learning, and Intelligent Networks.",
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Header */}
      <h2
        className="text-3xl font-extrabold text-gray-800 mb-4 text-center animate-pulse hover:text-blue-600 transition-all duration-300 ease-in-out"
      >
        Supervisor and Committee Members
      </h2>


      {/* Supervisor Section */}
      <section >

        <div className="flex justify-center mb-6">
          {teamMembers
            .filter((member) => member.designation === "Supervisor")
            .map((supervisor, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={supervisor.imageUrl}
                  alt={supervisor.name}
                  className="w-40 h-40 rounded-full mb-4 object-cover"
                />
                <h4 className="text-xl font-semibold text-gray-800">{supervisor.name}</h4>
                <p className="text-sm text-gray-500">{supervisor.designation}</p>
                <p className="text-sm text-gray-600 mt-2">{supervisor.description}</p>
              </motion.div>
            ))}
        </div>
      </section>

      {/* Committee Members Section */}
      <section className="mb-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers
            .filter((member) => member.designation === "Committee Member")
            .map((committeeMember, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center bg-white rounded-lg shadow-lg p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={committeeMember.imageUrl}
                  alt={committeeMember.name}
                  className="w-32 h-32 rounded-full mb-4 object-cover"
                />
                <h4 className="text-lg font-semibold text-gray-800">{committeeMember.name}</h4>
                <p className="text-sm text-gray-500">{committeeMember.designation}</p>
                <p className="text-sm text-gray-600 mt-2">{committeeMember.description}</p>
              </motion.div>
            ))}
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
