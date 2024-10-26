import { ROLES } from '../models/rolesModel';
import UserModel from '../models/userModel';


// -_- ------------- comprobamos si el usuario ya existe ------------- -_- //
export const schemaValidator = (schema) => (req, res, next) => { 
   try {
    schema.parse(req.body);
    next();
   } catch (error) {
    return res.status(400).json({
        error: error.errors.map(error => error.message)
    });
   }
}



export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    // Username
    const user = await UserModel.findOne({
        username: req.body.name
    });
    if (user) return res.status(400).json({
        message: "El usuario ya existe"
    });
    // Email
    const email = await UserModel.findOne({
        email: req.body.email
    });
    if (email) return res.status(400).json({
        message: "El email ya existe"
    });
    next();
}

export const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                return res.status(400).json({
                    message: `Rol: ${req.body.roles[i]} no existe`
                });
            }
        }
    }
    next();
}