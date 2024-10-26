import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { signoutContext } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signoutContext();
    navigate("/");
  };

  return localStorage.getItem("accessToken") ||
    localStorage.getItem("adminToken") ? (
    <button className="text-white hover:text-red-700" onClick={handleLogout}>Cerrar Sesión</button>
  ) : null;
};

export default LogoutButton;
