import { Canvas } from "@react-three/fiber";
import { useState, Suspense } from "react";
import Loader from "../components/Loader.jsx";

import Island from "../models/Island.jsx";
import Sky from "../models/Sky.jsx";
import { Plane } from "../models/Plane.jsx";
import HomeInfo from "../components/HomeInfo";

const Home = () => {
  const [isRotating, setIsRotating] = useState();
  const [currentStage, setCurrentStage] = useState(1);

  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPosition, rotation];
  };

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.2, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const [islandScale, islandPosition, islandRotation] =
    adjustIslandForScreenSize();

  const [planeScale, planePosition] = adjustPlaneForScreenSize();

  return (
    <section className="relative h-screen w-screen">
      <HomeInfo currentStage={currentStage} />

      <Canvas camera={{ near: 0.1, far: 1000 }}>
        <Suspense fallback={<Loader isRotating={isRotating} />}>
          <directionalLight position={[1, 1, 0.5]} intensity={2} />
          <ambientLight intensity={0.6} />
          <hemisphereLight
            skyColor={"#344feb"}
            groundColor={"#000000"}
            intensity={2}
          />

          <Sky isRotating={isRotating} />

          <Island
            scale={islandScale}
            position={islandPosition}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />

          <Plane
            scale={planeScale}
            position={planePosition}
            rotation={[0, 20, 0]}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
