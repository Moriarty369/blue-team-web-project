import express from 'express';
import {  getAllSecurityLogs, blockIP, unlockIP } from '../controllers/SecurityEventController.js'; // Asegúrate de tener la ruta correcta


const router = express.Router();

// Ruta para obtener todos los registros de seguridad
router.get('/logs', getAllSecurityLogs)

// -_- ------------- Rutas para IP maliciosas ------------- -_- //



// Ruta para bloquear una IP
router.put('/block/:id', blockIP);

// Ruta para desbloquear una IP
 router.put('/unlock/:id', unlockIP );
export default router;
