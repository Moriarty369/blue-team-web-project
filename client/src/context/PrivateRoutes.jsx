import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = ({ redirectPath = '/daddasdas' }) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
export const AdminPrivateRoute = ({ redirectPath = '/dsfsdfsdfsd' }) => {
  const token = localStorage.getItem('adminToken');

  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};



// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from './AuthContext'; // Importa tu hook personalizado

// export default function PrivateRoute({ children }) {
//     const { user } = useAuth(); // Obtén el usuario del contexto de autenticación
//     const isAuthenticated = user && user.loggedIn;
//     const isAdmin = user && user.isAdmin;
  
//     // Si el usuario está autenticado y es un administrador, permitir acceso
//     if (isAuthenticated && isAdmin) {
//       return children;
//     }
  
//     // Si el usuario está autenticado pero no es un administrador, redirigir al dashboard regular
//     if (isAuthenticated && !isAdmin) {
//       return <Navigate to="/dashboard" />;
//     }
  
//     // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
//     return <Navigate to="/login" />;
//   }


