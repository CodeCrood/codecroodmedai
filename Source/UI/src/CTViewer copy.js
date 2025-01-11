import React, { useState, useRef, useEffect } from "react";
import * as nifti from "nifti-reader-js";
import vtkImageData from "@kitware/vtk.js/Common/DataModel/ImageData";
import vtkDataArray from "@kitware/vtk.js/Common/Core/DataArray";
import vtkVolumeMapper from "@kitware/vtk.js/Rendering/Core/VolumeMapper";
import vtkVolume from "@kitware/vtk.js/Rendering/Core/Volume";
import vtkRenderer from "@kitware/vtk.js/Rendering/Core/Renderer";
import vtkRenderWindow from "@kitware/vtk.js/Rendering/Core/RenderWindow";
import vtkRenderWindowInteractor from "@kitware/vtk.js/Rendering/Core/RenderWindowInteractor";

// NIFTI file reading and rendering component
const GrayscaleCTViewer = () => {
  const [file, setFile] = useState(null);
  const renderContainerRef = useRef(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const dataBuffer = e.target.result; // The result is an ArrayBuffer, which works for nifti.isNIFTI

        // Check if the file is a valid NIFTI file
        if (nifti.isNIFTI(dataBuffer)) {
          const header = nifti.readHeader(dataBuffer);
          const image = nifti.readImage(header, dataBuffer);

          // Process the NIFTI file (log data for debugging)
          console.log("Header:", header);
          console.log("Image Data:", image);

          // Render the 3D volume using vtk.js
          renderVolume(image, header);
        } else {
          alert("Invalid NIFTI file. Please upload a valid .nii file.");
        }
      };

      reader.readAsArrayBuffer(file); // This ensures the result is an ArrayBuffer
    }
  }, [file]);
  const renderVolume = (imageData, header) => {
    const dims = header.dims;
    const width = dims[1];
    const height = dims[2];
    const depth = dims[3];
  
    console.log("Header Dimensions:", dims);
    console.log("Image Data Byte Length:", imageData.byteLength);
  
    // Use the correct typed array
    const flattenedImageData = new Float32Array(imageData);
  
    const expectedSize = width * height * depth;
    console.log("Flattened Image Data Length:", flattenedImageData.length);
    console.log("Expected Size:", expectedSize);
  
    if (flattenedImageData.length !== expectedSize) {
      console.error("Image data size mismatch:", flattenedImageData.length, "vs", expectedSize);
      return;
    }
  
    const vtkImage = vtkImageData.newInstance();
    vtkImage.setDimensions(width, height, depth);
  
    const scalars = vtkDataArray.newInstance({
      name: "scalars",
      numberOfComponents: 1,
      values: flattenedImageData,
    });
    vtkImage.getPointData().setScalars(scalars);
  
    const volumeMapper = vtkVolumeMapper.newInstance();
    volumeMapper.setInputData(vtkImage);
  
    const volume = vtkVolume.newInstance();
    volume.setMapper(volumeMapper);
  
    const renderer = vtkRenderer.newInstance();
    const renderWindow = vtkRenderWindow.newInstance();
    renderWindow.addRenderer(renderer);
  
    const container = renderContainerRef.current;
  
    const interactor = vtkRenderWindowInteractor.newInstance();
    interactor.setView(renderWindow);
    interactor.initialize();
    interactor.bindEvents(container);
  
    renderer.addActor(volume);
    renderer.resetCamera();
    renderWindow.render();
  };
  
  return (
    <div>
      {/* File Upload UI */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="file-upload">Upload CT Scan (.nii): </label>
        <input
          id="file-upload"
          type="file"
          accept=".nii"
          onChange={handleFileChange}
        />
      </div>

      {/* Rendering Container */}
      <div
        ref={renderContainerRef}
        style={{
          width: "100%",
          height: "500px",
          backgroundColor: "#000",
        }}
      />
    </div>
  );
};

export default GrayscaleCTViewer;
