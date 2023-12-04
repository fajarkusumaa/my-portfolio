/* eslint-disable react/no-unknown-property */
import { useRef, useEffect, useState } from "react";

import { useFrame, useThree } from "@react-three/fiber";
import { a, useSpring } from "@react-spring/three";

import islandScene from "../assets/3d/island.glb";
import { useGLTF } from "@react-three/drei";

const Island = ({
  isRotating,
  setIsRotating,
  setCurrentStage,
  currentFocusPoint,
  cameraRef,
  ...props
}) => {
  const islandRef = useRef();

  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(islandScene);

  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.92;

  const { camera } = useThree();

  // Handle pointer (mouse or touch) down event
  // Handle pointer (mouse or touch) down event
  const handlePointerDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);

    // Calculate the clientX based on whether it's a touch event or a mouse event
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;

    // Store the current clientX position for reference
    lastX.current = clientX;
  };

  // Handle pointer (mouse or touch) up event
  const handlePointerUp = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  const { position: springPosition } = useSpring({
    position: isRotating ? [0, 2, 10] : [0, 0, 5],
    config: { mass: 5, tension: 120, friction: 120 },
  });

  const handlePointerMove = (event) => {
    // Handle pointer (mouse or touch) move event
    event.stopPropagation();
    event.preventDefault();
    if (isRotating) {
      // If rotation is enabled, calculate the change in clientX position
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;

      // calculate the change in the horizontal position of the mouse cursor or touch input,
      // relative to the viewport's width
      const delta = (clientX - lastX.current) / viewport.width;

      // Update the island's rotation based on the mouse/touch movement
      islandRef.current.rotation.y += delta * 0.01 * Math.PI;

      // Update the reference for the last clientX position
      lastX.current = clientX;

      // Update the rotation speed
      rotationSpeed.current = delta * 0.01 * Math.PI;

      // Camera movement

      // Camera movement with rounded values
      const roundedX =
        Math.round(springPosition.animation.values[1]._value * 1000) / 1000;
      const roundedZ =
        Math.round(springPosition.animation.values[2]._value * 1000) / 1000;
      camera.position.set(0, roundedX, roundedZ);
    } else {
      // Camera movement with rounded values
      const roundedX =
        Math.round(springPosition.animation.values[1]._value * 1000) / 1000;
      const roundedZ =
        Math.round(springPosition.animation.values[2]._value * 1000) / 1000;
      camera.position.set(0, roundedX, roundedZ);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);
      islandRef.current.rotation.y += 0.01 * Math.PI;
    } else if (e.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);
      islandRef.current.rotation.y -= 0.01 * Math.PI;
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      setIsRotating(true);
    }
  };

  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;

      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      islandRef.current.rotation.y += rotationSpeed.current;
    } else {
      const rotation = islandRef.current.rotation.y;

      // Ensure the rotation value is positive and within the range [0, 2 * Math.PI)
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });

  // useEffect(() => {
  //   setIsRotating(true);

  //   const rotateIsland = () => {
  //     islandRef.current.rotation.y -= 0.001 * Math.PI;

  //     const normalizedRotation =
  //       ((islandRef.current.rotation.y % (2 * Math.PI)) + 2 * Math.PI) %
  //       (2 * Math.PI);

  //     switch (true) {
  //       case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
  //         setCurrentStage(4);
  //         break;
  //       case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
  //         setCurrentStage(3);
  //         break;
  //       case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
  //         setCurrentStage(2);
  //         break;
  //       case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
  //         setCurrentStage(1);
  //         break;
  //       default:
  //         setCurrentStage(null);
  //     }

  //     requestAnimationFrame(rotateIsland);
  //   };

  //   rotateIsland(); // Start the auto-rotation
  // }, [islandRef, setCurrentStage]);

  useEffect(() => {
    // Add event listeners for pointer and keyboard events
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Remove event listeners when component unmounts
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  return (
    // {Island 3D model from: https://sketchfab.com/3d-models/foxs-islands-163b68e09fcc47618450150be7785907}

    <a.group ref={islandRef} {...props}>
      <mesh
        geometry={nodes.polySurface944_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface945_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface946_tree2_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface947_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface948_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface949_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.pCube11_rocks1_0.geometry}
        material={materials.PaletteMaterial001}
      />
    </a.group>
  );
};

export default Island;
