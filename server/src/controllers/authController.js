import UserModel from '../models/userModel.js'
import jwt from 'jsonwebtoken';
import Role from '../models/rolesModel.js';

export const signUp = async (req, res) => {
    console.log('el signup controller ha empezado a funcionar')
    console.log(req.body)
    const { name, lastname, username, email, mobile, password, roles } = req.body;
    const hashedPassword = await UserModel.encryptPassword(password); // Esperamos a que se resuelva la promesa para enviarla a la base de datos

    
    const newUser = new UserModel({
        name,
        lastname,
        username,
        email,
        mobile,
        password: hashedPassword, // Asignamos el valor cifrado de la contraseña luego de esperar a que se resuelva la promesa
    })
    console.log(newUser)

    // -_- Verificar si los roles enviados existen en la base de datos (por el _id de la tabla roles) y asignarlos al usuario, si no tiene un rol se le asigna por defecto el rol de usuario -_-
     if (roles) {
         const foundRoles = await Role.find({ name: { $in: roles } });
         newUser.roles = foundRoles.map(role => role._id);
     } else {
         const role = await Role.findOne({ name: 'user' });
         newUser.roles = [role._id];
     }
    const savedUser = await newUser.save();
    //console.log(savedUser)

    // -_- Generar un token de autenticación
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
        expiresIn: 86400 // 24 horas de duración
    });
    // -_- Enviar el token generado como respuesta al cliente
    res.status(200).json({ token });


}
// -_- ------------------- Iniciar sesión SOLO si eres usuario ------------------- -_- //
export const signIn = async (req, res) => {
    const userFound = await UserModel.findOne({ email: req.body.email }).populate('roles'); //populate('roles') para traer los roles del usuario por el id de la tabla roles
    
    // -_- Verificar si el usuario existe y si la contraseña es correcta
    if (!userFound) return res.status(400).json({ message: 'Usuario no encontrado' });
    const isPasswordMatched = await UserModel.comparePassword(req.body.password, userFound.password);
    
   
    if (!isPasswordMatched) return res.status(401).json({ token: null, message: 'Contraseña incorrecta' });
    
    const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET, {
        expiresIn: 86400 // 24 horas de duración
    });

    // -_- Verificar si el usuario tiene el rol adecuado para iniciar sesión (en este caso, solo los user pueden iniciar sesión)
      const isUser = userFound.roles.some(role => role.name === 'user');
      if (!isUser) {
          return res.status(403).json({ message: 'Sólo los usuarios pueden iniciar sesión, intenta registrarte primero, o si eres Administrador sigue el enlace de abajo ( tambien si eres hacker intenta hackear ;) )' });
      }

    //* console.log(userFound)

    // -_- ------------------- Enviamos el token generado como respuesta al cliente ------------------- -_- //
    res.json({ token, message: 'Usuario encontrado implementando el token en la respuesta' });
}

// -_- ------------------- Iniciar sesión SOLO si eres administrador ------------------- -_- //
export const adminSignIn = async (req, res) => {
    try {
        const adminFound = await UserModel.findOne({ email: req.body.email }).populate('roles');

        // Verificar si el usuario existe
        if (!adminFound) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si la contraseña es correcta
        const isPasswordMatched = await UserModel.comparePassword(req.body.password, adminFound.password);
        if (!isPasswordMatched) {
            return res.status(401).json({ token: null, message: 'Contraseña incorrecta' });
        }

        // Verificar si el usuario tiene el rol de administrador para iniciar sesión
        const isAdmin = adminFound.roles.some(role => role.name === 'admin');
        if (!isAdmin) {
            return res.status(403).json({ message: 'No tienes permiso para iniciar sesión como administrador, intenta como usuario o vendedor en el otro formulario' });
        }

        // Generar token de autenticación
        const token = jwt.sign({ id: adminFound._id }, process.env.JWT_SECRET, { expiresIn: 86400 });

        // Enviar respuesta con token
        res.json({ token, message: 'Inicio de sesión exitoso como administrador' });
    } catch (error) {
        // Manejar errores internos del servidor
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

