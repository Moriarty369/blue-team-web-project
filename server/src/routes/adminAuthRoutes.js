import express from 'express';
// -_- -------- Ruta por optimizar -------- -_- //
import * as adminAuthCtrl from '../controllers/authController.js';

const router = express.Router();

router.post('/signin', adminAuthCtrl.adminSignIn);

export default router;
