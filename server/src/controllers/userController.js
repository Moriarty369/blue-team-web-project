import User from '../models/userModel.js';
import Role from '../models/rolesModel.js'; 
import bcrypt from 'bcryptjs';

// -_- ------------- obtener TODOS los usuarios ------------- -_- //
export const getUsersCtrl = async (req, res) => {
  try {
    // Consulta todos los usuarios en la base de datos
    const users = await User.find();

    // Devuelve los usuarios encontrados como respuesta JSON
    res.json(users);
  } catch (error) {
    // Si hay algún error, devuelve un error al cliente
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
};

// -_- ------------- crear un usuario ------------- -_- //
export const createUserCtrl = async (req, res) => {
  try {
    // Obtener los datos del usuario del cuerpo de la solicitud
    const userData = req.body;

    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    // Verificar si se enviaron roles en la solicitud
    if (userData.roles && userData.roles.length > 0) {
      // Buscar los roles enviados en la base de datos
      const foundRoles = await Role.find({ name: { $in: userData.roles } });

      // Verificar si se encontraron roles
      if (foundRoles.length > 0) {
        // Asignar los roles encontrados al usuario
        userData.roles = foundRoles.map(role => role._id);
      } else {
        // Si no se encontraron roles, asignar el rol de usuario por defecto
        const defaultRole = await Role.findOne({ name: 'user' });
        userData.roles = [defaultRole._id];
      }
    } else {
      // Si no se enviaron roles, asignar el rol de usuario por defecto
      const defaultRole = await Role.findOne({ name: 'user' });
      userData.roles = [defaultRole._id];
    }

    // Crear un nuevo usuario en la base de datos
    const newUser = await User.create(userData);

    // Devolver el usuario recién creado como respuesta
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};


// -_- ------------- obtener un usuario por id ------------- -_- //
export const getUserByIdCtrl = async (req, res) => {
  const userId = req.params.id; // Obtener el ID del usuario de los parámetros de la solicitud
  
  try {
    // Buscar el usuario por su ID
    const user = await User.findById(userId);
    
    // Verificar si el usuario existe
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Devolver el usuario encontrado como respuesta
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};


// -_- ------------- actualizar un usuario por id ------------- -_- //
export const updateUserByIdCtrl = async (req, res) => {
  const userId = req.params.id; // Obtener el ID del usuario de los parámetros de la solicitud
  const userData = req.body; // Obtener los datos del usuario de la solicitud body
  
  try {
    // Buscar y actualizar el usuario por su ID
    const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
    
    // Verificar si el usuario existe
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Devolver el usuario actualizado como respuesta
    res.status(200).json({ message: 'Usuario actualizado correctamente', user: updatedUser });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
// -_- ------------- eliminar un usuario por id ------------- -_- //
export const deleteUserByIdCtrl = async (req, res) => {
  const userId = req.params.id; // Obtener el ID del usuario de los parámetros de la solicitud
  try {
    // Buscar y eliminar el usuario por su ID
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado correctamente', user: deletedUser });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};


