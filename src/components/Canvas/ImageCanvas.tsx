import React from "react";
import "./ImageCanvas.sass";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import axios from "axios";

const Scene: React.FC<{ vertex: string; fragment: string }> = ({
  vertex,
  fragment,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const canvas = document.querySelector("canvas");
  const canvasWidth = canvas ? canvas.clientWidth : 4;
  const canvasHeight = canvas ? canvas.clientHeight : 3;

  // Load the noise texture and update the shader uniform
  /*  const noiseTexture = useTexture("noise2.png"); */
  useFrame((state) => {
    let time = state.clock.getElapsedTime();

    // start from 20 to skip first 20 seconds ( optional )
    if (meshRef.current) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.iTime.value =
        time + 20;
    }
  });

  // Define the shader uniforms with memoization to optimize performance
  const uniforms = useMemo(
    () => ({
      iTime: {
        type: "f",
        value: 1.0,
      },
      iResolution: {
        type: "v2",
        value: new THREE.Vector2(),
      },
      /*        iChannel0: {
        type: "t",
        value: noiseTexture,
      }, */
    }),
    []
  );

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[canvasWidth, canvasHeight]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};
const ImageCanvas: React.FC = () => {
  // State variables to store the vertex and fragment shaders as strings
  const [vertex, setVertex] = useState("");
  const [fragment, setFragment] = useState("");

  // Fetch the shaders once the component mounts
  useEffect(() => {
    // fetch the vertex and fragment shaders from public folder
    axios
      .get("/vertexShader.glsl", { headers: { "Content-Type": "text/plain" } })
      .then((res) => setVertex(res.data));
    axios.get("/fragmentShader.glsl").then((res) => setFragment(res.data));
  }, []);
  if (vertex == "" || fragment == "") return null;

  return (
    <div className="canvas-container">
      <Canvas id="canvas">
        <Scene vertex={vertex} fragment={fragment} />
      </Canvas>
    </div>
  );
};

export default ImageCanvas;
