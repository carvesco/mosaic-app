import React from "react";
import "./ImageCanvas.sass";
import { useEffect, useMemo, useRef, useState, useContext } from "react";
import { ImageContext } from "../../ImageContext";
import { useTexture, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import axios from "axios";

interface dimensionsProps {
  width?: number;
  height?: number;
}

const Scene: React.FC<{
  vertex: string;
  fragment: string;
  dimensions: dimensionsProps;
  texture: string;
}> = ({ vertex, fragment, dimensions, texture }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const canvas = document.querySelector("canvas");
  const [imgTexture, setImgTexture] = useState<THREE.Texture | undefined>(
    useTexture(texture)
  );

  const loadTexture = (url: string) => {
    const loader = new THREE.TextureLoader();
    return loader.load(url);
  };
  useEffect(() => {
    /* const newTexture = loadTexture(texture);
    setImgTexture(newTexture);
    console.log(texture); */
    if (meshRef.current) {
      const newTexture = loadTexture(texture);
      (
        meshRef.current.material as THREE.ShaderMaterial
      ).uniforms.iChannel0.value = newTexture;
    }
  }, [texture]);

  // Load the texture and update the shader uniform
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
        value: new THREE.Vector2(dimensions.width, dimensions.height),
        /* value: new THREE.Vector2(600, 700), */
      },
      iChannel0: {
        type: "t",
        value: imgTexture,
      },
    }),
    [texture]
  );

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[dimensions.width, dimensions.height]} />
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
  const { imageCanvas, setImageCanvas } = useContext(ImageContext);
  // State variables to store the vertex and fragment shaders as strings
  const [vertex, setVertex] = useState("");
  const [fragment, setFragment] = useState("");
  const [imageDimensions, setImageDimensions] = useState({
    width: 4,
    height: 3,
  });

  // Fetch the shaders once the component mounts
  useEffect(() => {
    // fetch the vertex and fragment shaders from public folder
    axios
      .get("/vertexShader.glsl", { headers: { "Content-Type": "text/plain" } })
      .then((res) => setVertex(res.data));
    axios.get("/fragmentShader.glsl").then((res) => setFragment(res.data));
  }, [imageCanvas]);

  useEffect(() => {
    const img = new Image();
    img.src = imageCanvas;
    img.onload = () => {
      setImageDimensions({
        width: (img.width * 2) / 3,
        height: (img.height * 2) / 3,
      });
    };
    console.log(imageDimensions);
  }, [imageCanvas]);
  if (vertex == "" || fragment == "") return null;

  return (
    <div
      className="canvas-container"
      style={{
        width: imageDimensions.width,
        height: imageDimensions.height,
      }}
    >
      {/* <img src={imageCanvas} alt={`Uploaded image`} className="image-canvas" /> */}
      <Canvas
        id="canvas"
        key={imageCanvas}
        orthographic // set the camera to orthographic
      >
        <Scene
          vertex={vertex}
          fragment={fragment}
          dimensions={imageDimensions}
          texture={imageCanvas}
        />
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
};

export default ImageCanvas;
