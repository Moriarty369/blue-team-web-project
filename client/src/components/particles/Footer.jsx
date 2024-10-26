import React from "react";
import { Link } from "react-router-dom";
import { FbIcon, IgIcon, LnkdIcon, XIcon } from "../../assets/icons";

const Footer = () => {
  return (
    <footer className="w-full py-10 px-8 text-sm font-dark bg-black bottom-0">

  <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between">
      {/* Redes sociales */}
      <ul className="flex items-center gap-3 mb-4 sm:mb-0">
        <li>
          <FbIcon className="text-pink-500" /> {/* Color para Facebook */}
        </li>
        <li>
          <IgIcon className="text-pink-500" /> {/* Color para Instagram */}
        </li>
        <li>
          <LnkdIcon className="text-blue-700" /> {/* Color para LinkedIn */}
        </li>
        <li>
          <XIcon className="text-yellow-500" /> {/* Color para otra red social */}
        </li>
      </ul>
  
      {/* Texto de copyright */}
      <div className="hidden sm:block text-red-700 text-lg mx-auto mb-4 sm:mb-0">
      <span>Pruebas proteccion de rutas 🔬 -------- 🔬 -------- ➡</span>
    </div>
  
      {/* Enlaces de contacto */}
      <div className="text-center">
        <div>
          <Link
            to="/user-profile"
            className="text-white hover:text-red-700 text-lg mr-4 sm:mr-0"
          >
            Perfil de usuario
          </Link>
        </div>
        <div>
          <Link
            to="/admin/dashboard"
            className="text-white hover:text-red-700 text-lg"
          >
            Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  </footer>
  
  );
};

export default Footer;
