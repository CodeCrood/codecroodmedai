import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";


const StylizedPlanet = () => {
  const gltf = useGLTF("../../public/scene.gltf"); // Replace with the correct path to your GLTF file

  return <primitive object={gltf.scene} scale={1.5} />;
};

const PlanetViewer = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <StylizedPlanet />
      <OrbitControls />
    </Canvas>
  );
};

export default PlanetViewer;
