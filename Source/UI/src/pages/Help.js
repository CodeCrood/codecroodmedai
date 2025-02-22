import React, { useState } from "react";
import { Search, HelpCircle, MessageCircle } from "lucide-react";

// HelpScreen Component
function HelpScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const faqs = [
    {
      question: "How do I upload an image?",
      answer:
        "Click on the 'Upload Image' button in the navigation menu, select your file, and hit 'Submit'.",
    },
    {
      question: "How can I view the segmentation?",
      answer:
        "After uploading the image, select 'View Segmentation' from the navigation menu.",
    },
    {
      question: "Where can I learn more about the team?",
      answer: "Visit the 'Team' section in the navigation menu for details.",
    },
  ];

  const filteredFAQs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="text-center p-6 min-h-screen bg-cover bg-center bg-gray-50 relative">
      {/* Header */}
      <h1 className="text-4xl font-extrabold mb-6 animate-pulse text-gray-800 hover:text-blue-600 transition-all duration-300 ease-in-out">
        Help & Support
      </h1>
      <p className="mt-2 text-gray-800 mb-10 text-lg">
        Find answers to your questions or get help with using the app.
      </p>

      {/* Search Bar */}
      <div className="mb-10 w-full max-w-lg mx-auto relative">
        <input
          type="text"
          placeholder="Search for help..."
          className="w-full p-4 rounded-lg border-2 border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute top-4 right-4 text-gray-400" />
      </div>

      {/* FAQ Cards Grid */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 px-4">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300 transform hover:scale-105 hover:bg-blue-50"
            >
              <HelpCircle className="text-teal-500 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-600 text-lg">{faq.answer}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-lg col-span-full">
            No results found. Please try another search term.
          </p>
        )}
      </div>

      {/* Chatbot Floating Button */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-110"
        onClick={() => setIsChatbotOpen(true)}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chatbot Modal */}
      {isChatbotOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl p-4 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
              onClick={() => setIsChatbotOpen(false)}
            >
              ✖
            </button>
            <iframe
              src="http://192.168.100.247:3000"
              title="Live Chatbot"
              className="w-full h-[500px] rounded-xl border-2 border-gray-200"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default HelpScreen;
