import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import { Home, About, Project } from "./pages";

export const App = () => {
  return (
    <main className="">
      <Router>
        <Navbar className="" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Project />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </main>
  );
};
