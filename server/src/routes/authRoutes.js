// -_- ------------ Endpoint para login y registro de usuarios ---------------- -_-
import { Router } from 'express';
import * as authCtrl from '../controllers/authController.js';
import { verifySignup } from '../middlewares/index.js';
// -_- ------------ Middleware para validar el esquema de los datos, recibe como parámetro el schema  ---------------- -_-  
import { schemaValidator } from '../middlewares/signupValidator.js';
// -_- ------------ Schemas que serán validados por el middleware schemaValidator recibidos como parámetros ---------------- -_-
import {  signinSchema, signupSchema } from '../schemas/authSchema.js';



const router = Router();
// -_- ------------------- Ruta de autenticación para login SOLO usuario ------------------- -_- //
router.post('/signin', schemaValidator(signinSchema), authCtrl.signIn)

// -_- ------------------- Ruta de autenticación para registro de usuario ------------------- -_- //
router.post('/signup', schemaValidator(signupSchema), [verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted], authCtrl.signUp)


export default router;



