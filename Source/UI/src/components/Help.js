import React, { useState } from "react";

// HelpScreen Component
function HelpScreen() {
  const [searchTerm, setSearchTerm] = useState("");

  // Enhanced FAQ Data with More Questions
  const faqs = [
    {
      question: "How do I upload an image?",
      answer:
        "To upload an image, click on the 'Upload Image' button in the navigation menu, select your file, and hit 'Submit'.",
    },
    {
      question: "How can I view the segmentation?",
      answer:
        "After uploading the image, you can view the segmentation by selecting 'View Segmentation' from the navigation menu.",
    },
    {
      question: "Where can I learn more about the team?",
      answer:
        "For information about our team and project, visit the 'Team' section in the navigation menu.",
    },
  ];

  // Filter FAQs based on search term
  const filteredFAQs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-screen bg-gray-100 p-8">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Help & Support</h1>
        <p className="text-lg text-gray-600">
          Find answers to your questions or get help with using the app.
        </p>
      </header>

      {/* Search Bar */}
      <div className="mb-8 w-full max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Search for help..."
          className="w-full p-4 rounded-lg border-2 border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
              >
                <h3 className="text-xl font-bold text-gray-700 mb-3">{faq.question}</h3>
                <p className="text-gray-600 text-lg">{faq.answer}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-lg">No results found. Please try another search term.</p>
          )}
        </div>
      </section>

    </div>
  );
}

export default HelpScreen;
