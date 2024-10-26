import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../atoms/LogoutButton/LogoutButton";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className="bg-black flex items-center justify-between xl:justify-start w-full py-4 px-8 lg:px-4 xl:px-8 h-auto xl:h-[15vh] z-50">
     <nav className={`xl:flex flex-col xl:flex-row m-auto justify-between w-100 xl:items-center ${isOpen ? 'block' : 'hidden'}`}>
        <Link to="/" className="text-white mx-10 hover:text-lime-700 text-lg">
          Home
        </Link>
        <Link to="/register" className="text-white mx-10 hover:text-lime-700 text-lg">
          Registrarse
        </Link>
        <Link to="/contact" className="text-white mx-10 hover:text-lime-700 text-lg">
          Contacto
        </Link>

        <Link to="/login" className="text-white mx-10 hover:text-lime-700 text-lg">
          Iniciar sesión
        </Link>
        <Link
          to="/admin/login"
          className="text-white mx-10 hover:text-red-700 text-lg"
        >
          Admin
        </Link>
      <LogoutButton  />
      </nav>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="xl:hidden text-2xl p-2"
      ></button>
       <div>
        {/* Menú hamburguesa */}
      <div className="block xl:hidden">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>
      
      
       
     
    </div>
    </header>
  );
};

export default Header;
