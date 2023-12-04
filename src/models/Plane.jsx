import { useAnimations, useGLTF } from "@react-three/drei";

import planeScene from "../assets/3d/plane.glb";
import { useEffect, useRef } from "react";

export const Plane = ({ isRotating, ...props }) => {
  const ref = useRef();
  const { scene, animations } = useGLTF(planeScene);
  const { actions } = useAnimations(animations, ref);

  // useEffect(() => {
  //   console.log(isRotating);
  //   if (isRotating) {
  //     actions["Take 001"].play();
  //   } else {
  //     actions["Take 001"].stop();
  //   }
  // }, [actions, isRotating]);

  useEffect(() => {
    actions["Take 001"].play();
  }, [actions]);

  return (
    <mesh {...props} ref={ref}>
      <primitive object={scene} />
    </mesh>
  );
};
