import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Header from '../../components/particles/Header';

// Foto de usuario por defecto
const defaultUserImage = "https://estaticos-cdn.prensaiberica.es/clip/5d9f03c7-0efd-443a-bdd1-c3b09d76f0b8_16-9-discover-aspect-ratio_default_0.webp";

const UserProfile = () => {
  const API_BASE_URL = "http://localhost:4000/api/profile";
  // const API_BASE_URL = "https://fcommerce-server.onrender.com/api/profile";
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = JSON.parse(localStorage.getItem("accessToken")).token;

      console.log("Token de autorización user profile:", token); // Debugging
      if (token) {
        try {
          // Decodificar el token para obtener el ID del usuario
          const decodedToken = jwtDecode(token);
          console.log("Token decodificado:", decodedToken); // Debugging
          const userId = decodedToken.id;
          console.log("ID del usuario traido del token:", userId); // Debugging
          console.log("ID del usuario:", userId); // Debugging
          
          // Agregar el ID del usuario a la URL de la solicitud
          const url = `${API_BASE_URL}/user-profile/${userId}`;
          
          const response = await axios.get(url, {
            headers: {
              "x-access-token": token,
            },
          });
          
          setUser(response.data.user);
          console.log("Perfil de usuario:", response.data); // Debugging
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        console.error("No se encontró el token de autorización en el localStorage");
      }
    };

    fetchUserProfile();
  }, []); // Empty dependency array ensures this effect runs only once
  
  return (
    <>
      <Header />
      <div className="bg-gradient-to-b from-yellow-300 to-pink-400 min-h-screen flex items-center justify-center  mb-0">
      <div className="bg-blue-200 min-h-screen flex items-center justify-center h-100vh">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <img src={defaultUserImage} alt="Foto de usuario" className="w-24 h-24 rounded-full border-4 border-purple-400" />
        </div>
        {user ? (
          <>
            <h1 className="text-3xl font-semibold mb-4 text-purple-800">¡Bienvenido {user.username}!</h1>
            <p className="text-gray-700 text-lg mb-8">Es genial tenerte aquí.</p>
            <div className="bg-purple-100 rounded-lg p-4">
              <h3 className="text-2xl font-semibold mb-2">Nombre: {user.name}</h3>
              <h3 className="text-2xl font-semibold mb-2">Apellido: {user.lastname}</h3>
              <h3 className="text-2xl font-semibold mb-2">Nombre de usuario: {user.username}</h3>
              <h3 className="text-2xl font-semibold mb-2">Email: {user.email}</h3>
              <h3 className="text-2xl font-semibold mb-2">Teléfono: {user.mobile}</h3>
              <h3 className="text-2xl font-semibold mb-2">Rol ID: {user.roles} <span className='text-red-500'> para descubir que rol tienes asignado contacta con el admin o intenta hackearnos</span></h3>
            </div>
          </>
        ) : (
          <p className="text-xl text-gray-700">Cargando...</p>
        )}
      </div>
    </div>
    </div>
 
    </>
  );
};

export default UserProfile;
