import jwt from "jsonwebtoken";
import { env } from "process";
import UserModel from "../models/userModel";
import Role from "../models/rolesModel";

export const verifyJWT = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token)
      return res.status(403).json({ message: "No has dado un token" });
    // -_- Extraemos el token con el secret key y lo guardamos en la variable decoded -_- //
    const decoded = jwt.verify(token, env.JWT_SECRET);
    console.log(decoded);
    // -_- Guardamos el id del usuario en la propiedad userId del objeto req -_- //
    req.userId = decoded.id;
    // -_- Buscamos al usuario por el id y excluimos la contraseña ya que no la necesitamos porque ya tenemos el token -_- //
    const user = await UserModel.findById(req.userId, { password: 0 });
    console.log(user);
    // -_- Si el usuario no existe, enviamos un mensaje de error -_- //
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    console.log(token);
    next();
  } catch (error) {
    return res.status(401).json({ message: "No estas autorizad@!" });
  }
};
// -_- ---------- Comprobamos si es admin ---------- -_- //
export const isAdmin = async (req, res, next) => {
  console.log(req.userId);
  const user = await UserModel.findById(req.userId);
  const admin = await Role.find ({ _id: { $in: user.roles } });
    console.log(admin);
    for (let i = 0; i < admin.length; i++) {
        if (admin[i].name === "admin") {
            next();
            return;
        }
        }
        return res.status(403).json({ message: "Requiere rol de administrador" });

};

// -_- ---------- Comprobamos si es user ---------- -_- //  
export const isUser = async (req, res, next) => {
  const user = await UserModel.findById(req.userId);
  const userRole = await Role.find ({ _id: { $in: user.roles } });
  console.log(userRole);
  for (let i = 0; i < userRole.length; i++) {
    if (userRole[i].name === "user") {
      next();
      return;
    }
  }
  return res.status(403).json({ message: "Requiere rol de usuario" });
};



















// -_- ---------- FUTURA IMPLEMENTACIÓN ------ NO MVP ------ Comprobamos si es seller ---------- -_- //
// export const isSeller = async (req, res, next) => {
//   const user = await UserModel.findById(req.userId);
//   const seller= await Role.find ({ _id: { $in: user.roles } });
  
//   for (let i = 0; i < seller.length; i++) {
//     if (seller[i].name === "seller") {
//       next();
//       return;
//     }
//   }
//   return res.status(403).json({ message: "Requiere rol de vendedor" });
// };

// -_- ---------- FINAL DE FUTURA IMPLEMENTACIÓN ------ NO MVP ------ Comprobamos si es seller ---------- -_- //