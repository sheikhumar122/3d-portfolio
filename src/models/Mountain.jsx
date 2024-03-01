import React, { useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import scene from '../assets/3d/mountain.glb';
import { Night } from "./Night";
// import { Helicopter } from "./Helicopter";

export function Mountain({ isRotating, setIsRotating,  setCurrentStage, ...props }) {
  const mountainRef = useRef();
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(scene);

  const lastX = useRef(0);
  const lastY = useRef(0);
  const rotationSpeed = useRef([0, 0]);
  const dampingFactor = 0.95;

  

  const handlePointerDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
 setIsRotating(true);

    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;
    lastX.current = clientX;
    lastY.current = clientY;
  };

  const handlePointerUp = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  
  const handlePointerMove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isRotating) {
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;
  
      const deltaX = (clientX - lastX.current) / viewport.width;
      const deltaY = (clientY - lastY.current) / viewport.height;
  
      // Invert deltaY to correct the rotation direction
      mountainRef.current.rotation.x += deltaY * 0.01 * Math.PI;
      mountainRef.current.rotation.y += -deltaX * 0.01 * Math.PI;
  
      lastX.current = clientX;
      lastY.current = clientY;
  
      rotationSpeed.current = [-deltaX * 0.01 * Math.PI, -deltaY * 0.01 * Math.PI, 0];
    }
  };
  
  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);

      mountainRef.current.rotation.y += 0.005 * Math.PI;
      rotationSpeed.current = 0.007;
    } else if (event.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);

      mountainRef.current.rotation.y -= 0.005 * Math.PI;
      rotationSpeed.current = -0.007;
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current[0] *= dampingFactor;
      rotationSpeed.current[1] *= dampingFactor;

      if (Math.abs(rotationSpeed.current[0]) < 0.001) {
        rotationSpeed.current[0] = 0;
      }
      if (Math.abs(rotationSpeed.current[1]) < 0.001) {
        rotationSpeed.current[1] = 0;
      }

      mountainRef.current.rotation.x += rotationSpeed.current[1];
      mountainRef.current.rotation.y += rotationSpeed.current[0];

      const normalizedRotation =
      ((mountainRef.current.rotation.y % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    

    // Set the current stage based on the island's orientation
    switch (true) {
    //   case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
    //     setCurrentStage(4);
    //     break;
    //   case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
    //     setCurrentStage(3);
    //     break;
    case (
        (normalizedRotation >= 2.4 && normalizedRotation <= 4.25) 
      ):
        setCurrentStage(2);
        break;
      case normalizedRotation >= 1.3 && normalizedRotation <= 2.4:
        setCurrentStage(1);
        break;
      default:
        setCurrentStage(null);
    }
    }
  });


  return (
    <group ref={mountainRef} scale={[9, 15, 7]} rotation={[Math.PI, 0, 0]} {...props}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials.material_0}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_3.geometry}
        material={materials.material_0}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials.material_0}
      />
      <Night />
  {/* <Helicopter /> */}

    </group>
  );
}

useGLTF.preload(scene);
