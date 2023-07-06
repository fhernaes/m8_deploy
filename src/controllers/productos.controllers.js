import Producto from "../models/Producto.models.js";
import fs from "fs";

export const findAllProductos = async(req, res) => {
    try {
        let productos = await Producto.findAll({
            attributes: {exclude: ["createdAt", "updatedAt"]}
        });
        res.json({code: 200, message:"OK", data: productos})
    } catch (error) {
        res.status(500).json({code: 500, message: "Error al consultar los productos."})
    }
};

export const addProductos = async (req, res) => {
    //console.log(req.body);
    let { nombre, descripcion, precio } = req.body;
    //req.nombreImagen -> viene desde middleware
    //req.pathImagen ->viene desde middleware
    try {
        let nuevoProducto = {
            nombre,
            descripcion,
            precio: Number(precio),
            img: req.nombreImagen,
            rutaImagen: `/public/uploads/${req.nombreImagen}`,
        };

        let productoCreado = await Producto.create(nuevoProducto);

        res.status(201).json({
            code: 201,
            message: "Producto creado con éxito.",
            data: productoCreado,
        });
    } catch (error) {
        console.log(error);
        fs.unlinkSync(req.pathImagen); //elimina la imagen
        res.status(500).json({code: 500, message:"Error al crear el producto en la base de datos."})
    }

};
// update productos
export const updateProductos = async (req, res) => {
 let { nombre, descripcion, precio } = req.body;
    let { id } = req.params;
    try {
        let updateProducto = {
            nombre,
            descripcion,
            precio: Number(precio),
            img: req.nombreImagen,
            rutaImagen: `/public/uploads/${req.nombreImagen}`,
        }
        let productoModificado = await Producto.update(updateProducto, {
            where: { id: id },
        });
        
        // Consultar el producto actualizado
        let productoActualizado = await Producto.findByPk(id, {
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        
        res.status(200).json({
            code: 200,
            message: "Producto modificado con éxito.",
            data: productoActualizado,
        });
        

    } catch (error) {
        console.log(error);
        fs.unlinkSync(req.pathImagen); //elimina la imagen
        res.status(500).json({code: 500, message:"Error al modificar el producto en la base de datos."})
    }
};
// delete productos
export const deleteProductos = async (req, res) => {
    let { id } = req.params;
    try {
        let productoEliminado = await Producto.findByPk(id, {
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        
        await Producto.destroy({
            where: { id: id },
        });
        
        res.status(200).json({
            code: 200,
            message: "Producto eliminado con éxito.",
            data: productoEliminado,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({code: 500, message:"Error al eliminar el producto en la base de datos."})
    }
}