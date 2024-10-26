// -_- -------------- Aqui se definen las rutas de los productos para luego utilizarlas en config/app.js -------------- -_-
import { Router } from "express";
import * as productsCtrl from "../controllers/productsController.js";
import { authJWT } from "../middlewares/index.js";

const router = Router();

router.get("/", productsCtrl.getProducts);

router.get("/:id", productsCtrl.getProductById);

router.post(
  "/",
  [authJWT.verifyJWT, authJWT.isAdmin],
  productsCtrl.createProduct
);

router.put("/:id", authJWT.verifyJWT, productsCtrl.updateProductByID);

router.delete(
  "/:id",
  [authJWT.verifyJWT, authJWT.isAdmin],
  productsCtrl.deleteProduct
);

export default router;
