import { Router } from "express";
import { findAllProductos, addProductos, updateProductos, deleteProductos } from "../controllers/productos.controllers.js";
import upload from "../middlewares/upload.middleware.js"
const router = Router();

//ruta findAll productos
router.get("/", findAllProductos);

//ruta post productos
router.post("/", upload, addProductos);

// ruta put productos
router.put("/:id", upload ,updateProductos);

// ruta delete productos
router.delete("/:id", deleteProductos);
// ruta destroy productos
router.delete("/:id/destroy", deleteProductos);



export default router;
