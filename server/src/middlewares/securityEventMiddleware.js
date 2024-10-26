import SecurityLog from '../models/securityEventModel.js';

export const logSecurity = async (req, res, next) => {
    try {
        // Verifica si la IP está bloqueada
        const isBlocked = await checkIfIPisBlocked(req.ip);

        // Si la IP está bloqueada, registra el intento de acceso
        if (isBlocked) {
            const newLog = new SecurityLog({
                timestamp: new Date(),
                eventType: 'Blocked Access Attempt',
                clientIP: req.ip,
                requestPath: req.path,
                requestParams: req.params,
                userAgent: req.get('User-Agent'), 
                sessionID: req.sessionID,
                httpMethod: req.method, 
                httpStatus: res.statusCode, 
                requestHeaders: req.headers, 
                responseHeaders: res.headers, 
                requestBody: req.body, 
                actionsTaken: 'Blocked',
                securityCheckResult: 'Blocked'
            });

            await newLog.save();
            return res.status(403).json({ message: 'Acceso bloqueado. Esta IP está en la lista de IPs maliciosas.' });
        }

        // Si la IP no está bloqueada, registra el acceso normal
        const normalLog = new SecurityLog({
            timestamp: new Date(),
            eventType: 'Access',
            clientIP: req.ip,
            requestPath: req.path,
            requestParams: req.params,
            userAgent: req.get('User-Agent'), 
            sessionID: req.sessionID,
            httpMethod: req.method, 
            httpStatus: res.statusCode, 
            requestHeaders: req.headers, 
            responseHeaders: res.headers, 
            requestBody: req.body, 
            actionsTaken: 'Allow',
            securityCheckResult: 'Allowed'
        });

        await normalLog.save();
        next();
    } catch (error) {
        console.error('Error al crear el registro de seguridad:', error);
        next(error);
    }
};

// Función para verificar si la IP está bloqueada
const checkIfIPisBlocked = async (ip) => {
    // Aquí implementa la lógica para verificar si la IP está en la lista de IPs maliciosas y está bloqueada.
    // Por ejemplo, puedes consultar tu base de datos o almacenamiento de IPs bloqueadas.
    // Retorna true si la IP está bloqueada, de lo contrario retorna false.
    // Implementa la lógica de acuerdo a cómo estés manejando la lista de IPs maliciosas en tu aplicación.
    return false; // Por defecto, no se bloquea la IP
};
