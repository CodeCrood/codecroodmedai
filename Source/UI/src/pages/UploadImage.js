import React, { useState, useEffect } from "react";
import { UploadCloud, User, Calendar, FileText, Undo, Redo } from "lucide-react";

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

  const handleDragLeave = () => setIsHovered(false);

  const handleFileSelect = (e) => validateFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsHovered(false);
    validateFile(e.dataTransfer.files[0]);
  };

  const validateFile = (file) => {
    if (file && supportedTypes.includes(file.type)) {
      updatePatientDetails({ ...patientDetails, image: file, imageError: "" });
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
    if (name === "age" && (Number(value) < 0 || Number(value) > 120)) {
      updatePatientDetails({ ...patientDetails, [name]: value, ageError: "Age must be between 0 and 120" });
      return;
    }
    if (name === "name" && value.length < 3) {
      updatePatientDetails({ ...patientDetails, [name]: value, nameError: "Name must be at least 3 characters long" });
      return;
    }
    updatePatientDetails({ ...patientDetails, [name]: value, ageError: "", nameError: "" });
  };

  const updatePatientDetails = (newDetails) => {
    const newHistory = history.slice(0, historyIndex + 1);
    setHistory([...newHistory, newDetails]);
    setHistoryIndex(newHistory.length);
    setPatientDetails(newDetails);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setPatientDetails(history[historyIndex - 1]);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setPatientDetails(history[historyIndex + 1]);
      setHistoryIndex(historyIndex + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "z") handleUndo();
      else if (e.ctrlKey && e.key === "y") handleRedo();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [history, historyIndex]);

  const validateForm = () => {
    let valid = true;
    let nameError = "";
    let ageError = "";
    if (!patientDetails.name.trim()) {
      nameError = "Patient name is required";
      valid = false;
    }
    if (!patientDetails.age.trim() || isNaN(patientDetails.age) || patientDetails.age <= 0) {
      ageError = "Please enter a valid age";
      valid = false;
    }
    updatePatientDetails({ ...patientDetails, nameError, ageError });
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) console.log("Patient Details:", patientDetails);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h2 className="text-3xl font-extrabold text-gray-800 text-center animate-pulse">Upload Image & Patient Details</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Patient Information Panel */}
        <div className="p-6 bg-white shadow-lg rounded-2xl">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <User /> Patient Details
          </h3>
          <label className="block text-lg">Patient Name</label>
          <input type="text" name="name" value={patientDetails.name} onChange={handleInputChange} className="mt-2 block w-full p-3 rounded border" placeholder="Enter patient name" required />
          {patientDetails.nameError && <span className="text-red-600 text-sm">{patientDetails.nameError}</span>}

          <label className="block text-lg mt-4">Patient Age</label>
          <input type="number" name="age" value={patientDetails.age} onChange={handleInputChange} className="mt-2 block w-full p-3 rounded border" placeholder="Enter patient age" required />
          {patientDetails.ageError && <span className="text-red-600 text-sm">{patientDetails.ageError}</span>}

          <label className="block text-lg mt-4">Gender</label>
          <select name="gender" value={patientDetails.gender} onChange={handleInputChange} className="mt-2 block w-full p-3 border rounded">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <label className="block text-lg mt-4">Medical History</label>
          <textarea name="medicalHistory" value={patientDetails.medicalHistory} onChange={handleInputChange} className="mt-2 block w-full p-3 border rounded" placeholder="Enter patient's medical history" rows="4"></textarea>
        </div>

        {/* Upload Image Panel */}
        <div className="p-6 bg-white shadow-lg rounded-2xl">
          <h4 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <UploadCloud /> Upload Image (JPG, PNG)
          </h4>
          <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={`w-full h-40 flex justify-center items-center border-4 ${isHovered ? "border-blue-500" : "border-dashed border-gray-300"} rounded-lg transition-transform ${isHovered ? "scale-105" : "scale-100"}`}>
            <label className="flex flex-col justify-center items-center cursor-pointer">
              <FileText className="text-gray-500" size={40} />
              <span>Drag & Drop or Click to Upload</span>
              <input type="file" onChange={handleFileSelect} className="hidden" accept="image/*" />
            </label>
          </div>
          {patientDetails.imageError && <span className="text-red-600 text-sm">{patientDetails.imageError}</span>}
        </div>
      </form>
    </div>
  );
}

export default UploadImage;
