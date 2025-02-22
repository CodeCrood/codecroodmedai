import React from "react";

const EmbeddedChatbot = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-4xl h-[80vh] shadow-lg rounded-xl overflow-hidden border-2 border-blue-500">
        <iframe
          src="http://192.168.100.247:3000"
          title="Medical Chatbot"
          width="100%"
          height="100%"
          frameBorder="0"
          className="rounded-xl"
        />
      </div>
    </div>
  );
};

export default EmbeddedChatbot;
