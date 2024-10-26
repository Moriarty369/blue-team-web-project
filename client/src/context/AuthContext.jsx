import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuth debe estar dentro de un AuthProvider al ser instanciado."
    );
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const signinContext = async (user) => {
    try {
      const res = await fetch("https://fcommerce-server.onrender.com/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (res.ok) {
        const userToken = await res.json();
        const { token, role } = userToken;
        setUser(true);
        setRole(role);
        localStorage.setItem("accessToken", token);
        localStorage.setItem("userRole", role);
        return res;
      } else {
        console.error("Error en el login de la cuenta:", res.statusText);
        alert("Error de usuario ❌");
      }
    } catch (error) {
      console.error("Error en la solicitud de login:", error);
    }
  };

  const adminSigninContext = async (user) => {
    try {
      const res = await fetch("https://fcommerce-server.onrender.com/api/auth/admin/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (res.ok) {
        const userToken = await res.json();
        const { token, role } = userToken;
        setUser(true);
        setRole(role);
        localStorage.setItem("accessToken", token);
        localStorage.setItem("userRole", role);
        return res;
      } else {
        console.error("Error en el login sudo su de la cuenta:", res.statusText);
        alert("No tienes permisos de Administrador o te has equivocado en correo y/o contraseña ❌");
      }
    } catch (error) {
      console.error("Error en la solicitud de login:", error);
    }
  };

  const signupContext = async (user) => {
    try {
      const res = await fetch("https://fcommerce-server.onrender.com/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (res.ok) {
        const userToken = await res.json();
        const { token, role } = userToken;
        setUser(true);
        setRole(role);
        localStorage.setItem("accessToken", token);
        localStorage.setItem("userRole", role);
        return res;
      } else {
        console.error("Error en la creación de la cuenta:", res.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud de creación de cuenta:", error);
    }
  };

  const signoutContext = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        signinContext,
        adminSigninContext,
        signupContext,
        signoutContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
