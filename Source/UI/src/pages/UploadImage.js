import React, { useState } from "react";
import { UploadCloud, User, FileText, Info } from "lucide-react";

function UploadImage() {
  const [isHovered, setIsHovered] = useState(false);
  const [submittedPatients, setSubmittedPatients] = useState([]);
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
      setPatientDetails({ ...patientDetails, image: file, imageError: "" });
    } else {
      setPatientDetails({
        ...patientDetails,
        image: null,
        imageError: "Invalid file type. Please upload a .jpg, .jpeg, or .png image.",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails({ ...patientDetails, [name]: value });
  };

  const validateForm = () => {
    let valid = true;
    if (!patientDetails.name.trim()) {
      setPatientDetails((prev) => ({
        ...prev,
        nameError: "Patient name is required",
      }));
      valid = false;
    }
    if (!patientDetails.age.trim() || isNaN(patientDetails.age) || patientDetails.age <= 0) {
      setPatientDetails((prev) => ({
        ...prev,
        ageError: "Please enter a valid age",
      }));
      valid = false;
    }
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmittedPatients([...submittedPatients, patientDetails]);
      setPatientDetails({
        name: "",
        age: "",
        gender: "male",
        medicalHistory: "",
        image: null,
        imageError: "",
        nameError: "",
        ageError: "",
      });
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-4 text-center">
        Patient Upload <span className="text-teal-400">&</span> Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Panel - Upload Image & Patient Form */}
        <div className="p-4 bg-white shadow-lg rounded-2xl">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <User /> Enter Patient Details
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={patientDetails.name}
              onChange={handleInputChange}
              placeholder="Patient Name"
              className="w-full p-3 border rounded"
              required
            />
            {patientDetails.nameError && (
              <p className="text-red-600">{patientDetails.nameError}</p>
            )}

            <input
              type="number"
              name="age"
              value={patientDetails.age}
              onChange={handleInputChange}
              placeholder="Patient Age"
              className="w-full p-3 border rounded"
              required
            />
            {patientDetails.ageError && (
              <p className="text-red-600">{patientDetails.ageError}</p>
            )}

            <select
              name="gender"
              value={patientDetails.gender}
              onChange={handleInputChange}
              className="w-full p-3 border rounded"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <textarea
              name="medicalHistory"
              value={patientDetails.medicalHistory}
              onChange={handleInputChange}
              placeholder="Medical History"
              className="w-full p-3 border rounded"
              rows="3"
            ></textarea>

            <div className="mt-6">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <UploadCloud /> Upload Patient Image
              </h3>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`w-full h-40 flex justify-center items-center border-4 ${
                  isHovered ? "border-blue-500" : "border-dashed border-gray-300"
                } rounded-lg transition-transform ${
                  isHovered ? "scale-105" : "scale-100"
                }`}
              >
                <label className="flex flex-col justify-center items-center cursor-pointer">
                  <FileText className="text-gray-500" size={40} />
                  <span>Drag & Drop or Click to Upload</span>
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
              {patientDetails.imageError && (
                <p className="text-red-600 mt-2">{patientDetails.imageError}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right Panel - Submitted Patient List */}
        <div className="mt-6">
          <h4 className="text-xl font-semibold flex items-center gap-2">
            <Info /> Submitted Patient Details
          </h4>
          <ul className="mt-2 space-y-3 max-h-64 overflow-y-auto">
            {submittedPatients.map((patient, index) => (
              <li key={index} className="p-3 bg-gray-100 rounded-lg shadow">
                <p>
                  <strong>Name:</strong> {patient.name}
                </p>
                <p>
                  <strong>Age:</strong> {patient.age}
                </p>
                <p>
                  <strong>Gender:</strong> {patient.gender}
                </p>
                <p>
                  <strong>Medical History:</strong> {patient.medicalHistory}
                </p>
              </li>
            ))}
            {submittedPatients.length === 0 && (
              <p className="text-gray-500">No patient details submitted yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UploadImage;
