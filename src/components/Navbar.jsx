import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="absolute top-4 z-10 flex w-full items-center justify-between  px-16">
      <NavLink
        to="/"
        className="flex items-center justify-center rounded-lg bg-white "
      >
        <span className="bg-gradient-to-tr from-teal-500 to-sky-900 bg-clip-text p-4 text-xl font-bold text-transparent">
          FK
        </span>
      </NavLink>
      <nav className="flex gap-3">
        <NavLink to="/About">About</NavLink>
        <NavLink to="/Project">Project</NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
