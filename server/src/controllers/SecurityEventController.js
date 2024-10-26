import SecurityLog from '../models/securityEventModel.js';

// Controlador para crear un nuevo registro de seguridad
export const createSecurityLog = async (req, res) => {
    try {
        // Crea un objeto nuevo de SecurityLog con los datos de la solicitud
        const newSecurityLog = new SecurityLog({
            ...req.body, // Copia todos los campos de req.body
            requestParams: req.query, // Agrega los parámetros de la solicitud a requestParams
            timestamp: new Date() // Añade la fecha actual como timestamp
        });
        
        // Guarda el registro de seguridad en la base de datos
        await newSecurityLog.save();
        
        // Devuelve una respuesta con el registro de seguridad creado
        res.status(201).json(newSecurityLog);
    } catch (error) {
        // Maneja cualquier error que pueda ocurrir durante el proceso
        res.status(500).json({ message: error.message });
    }
};

// Controlador para obtener todos los registros de seguridad
 export const getAllSecurityLogs = async (req, res) => {
     try {
        const securityLogs = await SecurityLog.find();
        res.status(200).json(securityLogs);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los registros de seguridad', error: error.message });
     }
 };



// Controlador para bloquear una IP
export const blockIP = async (req, res) => {
    const userId = req.params.id; // Obtener el ID del usuario de los parámetros de la solicitud
    const { isBlocked, clientIP } = req.body; // Obtener isBlocked e IP del cuerpo de la solicitud
    
    try {
        // Actualizar todos los registros con la IP especificada para establecer isBlocked como true
        const result = await SecurityLog.findOneAndUpdate({ _id: userId }, { isBlocked: true });
        if (result) {
            // Devolver un mensaje de éxito si se encontró y actualizó el registro
            res.status(200).json({ message: `La IP asociada al usuario con ID ${userId} ha sido bloqueada` });
        } else {
            // Devolver un mensaje de error si no se encontró el registro
            res.status(404).json({ message: `No se encontró ningún registro con la IP especificada` });
        }
    } catch (error) {
        // Manejar errores
        console.error('Error al bloquear la IP:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};



  
  // Controlador para desbloquear una IP
  export const unlockIP = async (req, res) => {
    const userId = req.params.id; // Obtener el ID del usuario de los parámetros de la solicitud
    const { isBlocked, clientIP } = req.body;
    try {
        // Actualizar todos los registros con la IP especificada para establecer isBlocked como true
        const result = await SecurityLog.findOneAndUpdate({ _id: userId }, { isBlocked: false });
        if (result) {
            // Devolver un mensaje de éxito si se encontró y actualizó el registro
            res.status(200).json({ message: `La IP asociada al usuario con ID ${userId} ha sido desbloqueada` });
        } else {
            // Devolver un mensaje de error si no se encontró el registro
            res.status(404).json({ message: `No se encontró ningún registro con la IP especificada` });
        }
    } catch (error) {
        // Manejar errores
        console.error('Error al desbloquear la IP:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
  


