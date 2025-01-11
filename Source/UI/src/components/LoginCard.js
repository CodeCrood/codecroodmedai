import React from "react";
import { SignIn } from "@clerk/clerk-react";

const LoginCard = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Login Required</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-lg font-bold"
          >
            ×
          </button>
        </div>
        <p className="mb-4">Please sign in to access this page.</p>
        <SignIn signUpUrl="/sign-up" />
      </div>
    </div>
  );
};

export default LoginCard;
