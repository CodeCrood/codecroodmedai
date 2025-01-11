import React, { useState, useEffect } from "react";
import { FaFileAlt } from "react-icons/fa";

function UploadImage() {
  const [isHovered, setIsHovered] = useState(false);
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    age: "",
    gender: "male",
    medicalHistory: "",
    image: null,
    imageError: "",
    nameError: "",
    ageError: "",
  });

  const [history, setHistory] = useState([patientDetails]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const supportedTypes = ["image/jpeg", "image/png", "image/jpg"];

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsHovered(true);
  };

  const handleDragLeave = () => {
    setIsHovered(false);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    validateFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsHovered(false);
    const file = e.dataTransfer.files[0];
    validateFile(file);
  };

  const validateFile = (file) => {
    if (file && supportedTypes.includes(file.type)) {
      updatePatientDetails({
        ...patientDetails,
        image: file,
        imageError: "",
      });
    } else {
      updatePatientDetails({
        ...patientDetails,
        image: null,
        imageError: "Invalid file type. Please upload a .jpg, .jpeg, or .png image.",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Age validation
    if (name === "age") {
      const age = Number(value);
      if (age < 0 || age > 120) {
        updatePatientDetails({
          ...patientDetails,
          [name]: value,
          ageError: "Age must be between 0 and 120",
        });
        return;
      } else {
        updatePatientDetails({
          ...patientDetails,
          [name]: value,
          ageError: "", // Clear the error if valid
        });
        return;
      }
    }

    // Name validation
    if (name === "name") {
      if (value.length < 3) {
        updatePatientDetails({
          ...patientDetails,
          [name]: value,
          nameError: "Name must be at least 3 characters long",
        });
        return;
      } else {
        updatePatientDetails({
          ...patientDetails,
          [name]: value,
          nameError: "", // Clear the error if valid
        });
        return;
      }
    }

    updatePatientDetails({
      ...patientDetails,
      [name]: value,
    });
  };


  const updatePatientDetails = (newDetails) => {
    const newHistory = history.slice(0, historyIndex + 1);
    setHistory([...newHistory, newDetails]);
    setHistoryIndex(newHistory.length);
    setPatientDetails(newDetails);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setPatientDetails(prevState);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setPatientDetails(nextState);
      setHistoryIndex(historyIndex + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        handleUndo();
      } else if (e.ctrlKey && e.key === "y") {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [history, historyIndex]);

  const validateForm = () => {
    let valid = true;
    let nameError = "";
    let ageError = "";

    if (patientDetails.name.trim() === "") {
      nameError = "Patient name is required";
      valid = false;
    }

    if (patientDetails.age.trim() === "") {
      ageError = "Patient age is required";
      valid = false;
    } else if (isNaN(patientDetails.age) || patientDetails.age <= 0) {
      ageError = "Please enter a valid age";
      valid = false;
    }

    updatePatientDetails({
      ...patientDetails,
      nameError,
      ageError,
    });

    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Patient Details:", patientDetails);
    }
  };

  return (
    <div className="min-h-screen h-auto p-6 bg-gray-50">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-4 text-center animate-pulse transition-all duration-300 ease-in-out hover:text-blue-500">
        Upload Image & Patient Details
      </h2>


      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Patient Details</h3>

          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700">
              Patient Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={patientDetails.name}
              onChange={handleInputChange}
              className={`mt-2 block w-full p-3 rounded-md border ${patientDetails.nameError ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Enter patient name"
              required
            />

            {patientDetails.nameError && (
              <span className="text-red-600 text-sm">{patientDetails.nameError}</span>
            )}
          </div>


          <div>
            <label htmlFor="age" className="block text-lg font-medium text-gray-700">
              Patient Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={patientDetails.age}
              onChange={handleInputChange}
              className={`mt-2 block w-full p-3 rounded-md border ${patientDetails.ageError ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Enter patient age"
              required
            />
            {patientDetails.ageError && (
              <span className="text-red-600 text-sm">{patientDetails.ageError}</span>
            )}
          </div>

          <div>
            <label htmlFor="gender" className="block text-lg font-medium text-gray-700">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={patientDetails.gender}
              onChange={handleInputChange}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="medicalHistory" className="block text-lg font-medium text-gray-700">
              Medical History
            </label>
            <textarea
              id="medicalHistory"
              name="medicalHistory"
              value={patientDetails.medicalHistory}
              onChange={handleInputChange}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter patient's medical history (optional)"
              rows="4"
            ></textarea>
          </div>

          <div className="mt-6">
            <h4 className="text-xl font-medium text-gray-800 mb-4">Upload Image (JPG, PNG)</h4>
            <div
              className={`w-full h-40 flex flex-col justify-center items-center border-4 ${isHovered ? "border-blue-500" : "border-dashed border-gray-300"
                } rounded-lg p-8 transition-all duration-300 ease-in-out transform ${isHovered ? "scale-105 shadow-lg" : "scale-100"
                }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex justify-center mb-4">
                <p className="text-gray-600 text-center text-lg">
                  Drag & drop .jpg or .png files here or click to upload.
                </p>
              </div>
              <div className="flex justify-center">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileSelect}
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer px-6 py-3 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                >
                  <FaFileAlt className="text-white text-lg" />
                  <span>Browse Files</span>
                </label>
              </div>
            </div>
            {patientDetails.image && (
              <div className="mt-4 text-center">
                <span className="text-gray-800">Image Uploaded: {patientDetails.image.name}</span>
              </div>
            )}
            {patientDetails.imageError && (
              <div className="mt-4 text-center text-red-600">{patientDetails.imageError}</div>
            )}
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Submit Details
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UploadImage;
