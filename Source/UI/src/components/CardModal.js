import React, { useEffect } from "react";
import { SignIn } from "@clerk/clerk-react"; // Import Clerk's SignIn component
import { useUser } from "@clerk/clerk-react";
import loginImage from "../assets/login_pic.jpg"; // Ensure the correct image path

const LoginModal = ({ onClose }) => {
  const { isLoaded, user } = useUser();

  // If the user is authenticated, close the modal
  useEffect(() => {
    if (isLoaded && user) {
      onClose();
    }
  }, [isLoaded, user, onClose]);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full sm:w-[800px] h-full sm:h-[460px] max-w-full max-h-full overflow-hidden relative flex flex-col sm:flex-row">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl z-10"
        >
          ×
        </button>

        {/* Left side: Image */}
        <div
          className="w-full sm:w-1/2 h-[250px] sm:h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${loginImage})` }} // Correct reference to loginImage
        >
          {/* You can replace 'your-image-url.jpg' with the path of the image you want to use */}
        </div>

        {/* Right side: SignIn Form */}
        <div className="w-full sm:w-1/2 p-6 sm:p-8 flex justify-center items-center">
          <SignIn signUpUrl="/sign-up" />
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
