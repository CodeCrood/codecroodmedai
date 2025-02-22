import React, { useState, useRef } from "react";

// Modal component for displaying images in full screen
const Modal = ({ src, alt, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState(1); // Zoom level for the modal image
  const [isDragging, setIsDragging] = useState(false); // Track dragging state
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // Image position offset
  const imageRef = useRef(null); // Reference to the image element

  // Zoom In/Out functionality
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.1, 3)); // Max zoom level 3
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.1, 0.5)); // Min zoom level 0.5

  // Mouse drag start
  const handleMouseDown = (e) => {
    setIsDragging(true);
    const { clientX, clientY } = e;
    setOffset({ x: clientX, y: clientY });
  };

  // Mouse drag move
  const handleMouseMove = (e) => {
    if (isDragging) {
      const dx = e.clientX - offset.x;
      const dy = e.clientY - offset.y;
      setOffset({ x: e.clientX, y: e.clientY });
      if (imageRef.current) {
        imageRef.current.style.transform = `translate(${dx}px, ${dy}px) scale(${zoomLevel})`;
      }
    }
  };

  // Mouse drag end
  const handleMouseUp = () => setIsDragging(false);

  // Close modal on Escape key
  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="relative w-full h-full bg-white p-4 rounded-lg shadow-2xl overflow-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-700 p-2 rounded-full transition-all duration-300 transform hover:scale-110"
          style={{ zIndex: 1000 }} // Ensure it appears on top
        >
          X
        </button>

        {/* Image container */}
        <div
          className="flex justify-center items-center h-full"
          onMouseDown={handleMouseDown} // Start drag on mouse down
        >
          <img
            ref={imageRef}
            src={src}
            alt={alt}
            className="w-full h-full object-contain rounded-lg transition-all duration-500"
            style={{ transform: `scale(${zoomLevel})` }}
          />
        </div>

        {/* Zoom In/Out buttons positioned at the bottom-left */}
        <div className="absolute bottom-4 left-4 flex space-x-4 z-50">
          <button
            onClick={handleZoomIn}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

function ShowImages() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const openModal = (src) => {
    setModalImage(src);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen w-full overflow-auto bg-gray-50 p-6 ">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center animate-pulse transition-all duration-300 ease-in-out hover:text-blue-500">
        Tumor Segmentation
      </h2>




      <div className="grid sm:grid-cols-1 md:grid-cols-1 gap-8">
        {/* Original CT Slice */}
        <div
          className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
          onClick={() => openModal("/ctimage.png")}
        >
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Original CT Slice</h3>
          <img
            src="/ctimage.png"
            alt="Original CT"
            className="w-full rounded-lg transition-all duration-500 transform hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>

      {/* Modal for image zoom */}
      {isModalOpen && <Modal src={modalImage} alt="Segmented Tumor" onClose={closeModal} />}

      <div className="mt-8 text-center">
        <p className="text-lg text-gray-600">Click on the images to view them in full screen.</p>
        <p className="text-lg text-gray-600">Use the Zoom In/Zoom Out buttons for better visualization.</p>
      </div>
    </div>
  );
}

export default ShowImages;
