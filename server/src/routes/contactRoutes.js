import { Router } from "express";
import * as contactCtrl from "../controllers/contactController.js";
// -_- ------------ Middleware para validar el esquema de los datos, recibe como parámetro el schema  ---------------- -_-  
import { contactSchemValidator } from '../middlewares/contactValidator.js';
// -_- ------------ Schemas que serán validados por el middleware schemaValidator recibidos como parámetros ---------------- -_-
import { contactSchema } from "../schemas/contactSchema.js";



const router = Router();
// OJO POR IMPLEMENTAR ESQUEMA DE VALIDACIÓN DE DATOS
// router.post( "/form", contactSchemValidator(contactSchema),  contactCtrl.createContact);
router.post( "/form",  contactCtrl.createContact);

export default router;