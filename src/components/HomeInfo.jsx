import React from "react";
import { Link } from "react-router-dom";

const InfoBox = ({ text, link }) => (
  <div className="relative w-96 rounded-xl bg-blue-500 p-4 pb-8 text-center text-white shadow-md">
    <p>{text}</p>
    <Link
      to={link}
      className="absolute -bottom-8 left-0 right-0 mx-auto w-72 rounded-lg bg-white p-4 font-bold text-blue-600"
    >
      Learn more
    </Link>
  </div>
);

const renderContent = {
  1: (
    <div className="w-96 rounded-xl bg-blue-500 p-6 text-center text-white shadow-md">
      <p>
        Hello, i'm <span className="font-bold">Fajar</span>
      </p>
      <p>
        Feel free to talk about your future projects. Just get me on e-mail.
        Thanks !
      </p>
    </div>
  ),
  2: <h1>2</h1>,
  3: <h1>3</h1>,
  4: (
    <InfoBox
      text="This compilation represents a showcase of projects I've successfully undertaken"
      link="/project"
    />
  ),
};

const HomeInfo = ({ currentStage }) => {
  console.log(currentStage);

  return (
    <div className="absolute top-48 z-10 flex w-full items-center justify-center">
      {renderContent[currentStage]}
    </div>
  );
};

export default HomeInfo;
