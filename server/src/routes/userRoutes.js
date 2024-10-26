import { Router } from 'express';
import * as UserCtrl from '../controllers/userController.js';
import { authJWT, verifySignup } from '../middlewares/index.js';


const router = Router(); 

router.get('/', authJWT.verifyJWT, authJWT.isAdmin , UserCtrl.getUsersCtrl, );
router.get("/:id", authJWT.verifyJWT, authJWT.isAdmin, UserCtrl.getUserByIdCtrl );
router.post('/', authJWT.verifyJWT, authJWT.isAdmin, verifySignup.checkRolesExisted, UserCtrl.createUserCtrl);
router.put("/:id", authJWT.verifyJWT, authJWT.isAdmin, UserCtrl.updateUserByIdCtrl );
router.delete("/:id",authJWT.verifyJWT, authJWT.isAdmin, UserCtrl.deleteUserByIdCtrl);



export default router;
