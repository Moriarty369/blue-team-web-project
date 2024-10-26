import { Router } from 'express'
import { authJWT } from '../middlewares/index.js';
import {getUserByIdCtrl} from '../controllers/userController.js';

const router = Router();

// -_- ---------- Ruta para vista user-profile---------- -_- //
router.get("/user-profile/:id", authJWT.verifyJWT, authJWT.isUser, getUserByIdCtrl);

export default router;