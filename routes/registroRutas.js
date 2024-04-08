const express = require('express');
const rutas = express.Router();
const ProductoModel = require('../models/Products');

// listar todos los registros
rutas.get('/', async (req, res) => {
    try {
        const producto = await ProductoModel.find();
        res.json(producto);
    } catch (error) {
        res.status(404).json({mensaje: error.mensaje})
    }
});

// Agregar registro
rutas.post('/agregar', async (req, res) => {
    const newPerson = new ProductoModel({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        codigo: req.body.codigo,
        cantidad: req.body.cantidad,
        fecha_compra: req.body.fecha_compra,
        fecha_venc: req.body.fecha_venc,
        proveedor: req.body.proveedor,
        precio_compra: req.body.precio_compra,
        precio_venta: req.body.precio_venta
    });
    try {
        const guardarproducto = await newPerson.save();
        res.status(201).json(guardarproducto);
    } catch (error) {
        res.status(404).json({mensaje: error.mensaje})
    }
});

// Editar Registro
rutas.put('/editar/:id', async (req, res) => {
    try {
        const actualizarProducto = await ProductoModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(201).json(actualizarProducto);
    } catch (error) {
        res.status(404).json({mensaje: error.mensaje})
    }
});

// Eliminar registro
rutas.delete('/eliminar/:id', async (req, res) => {
    console.log(req.params.id);
    try {
        const eliminarProducto = await ProductoModel.findByIdAndDelete(req.params.id);
        res.json({mensaje: 'producto eliminada correctamente'});
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});

//lisar por id
rutas.get('/producto/:id', async (req, res) => {
    try {
        const producto = await ProductoModel.findOne({_id: req.params.id});
        res.json(producto);
    } catch (error) {
        res.status(404).json({mensaje: error.mensaje})
    }
});

// Listar todos los productos con un stock menor a (:cantidad)
rutas.get('/control-stock/:cantidad', async (req, res) => {
    try {
        const producto = await ProductoModel.find({cantidad: {$lte: req.params.cantidad }})
        res.json(producto);
    } catch (error) {
        res.status(404).json({mensaje: error.mensaje})
    }
});


// Listar productos caducados
rutas.get('/productos-caducados', async (req, res) => {
    try {
        const producto = await ProductoModel.find({fecha_venc: {$lte: new Date() }})
        res.json(producto);
    } catch (error) {
        res.status(404).json({mensaje: error.mensaje})
    }
});

// Ordenar lista de productos por fecha de compra
rutas.get('/ordenar-compra', async (req, res) => {
    try {
        const producto = await ProductoModel.find().sort({fecha_compra: 1});
        res.json(producto);
    } catch (error) {
        res.status(404).json({mensaje: error.mensaje})
    }
});

// Ordenar lista de productos por nombre
rutas.get('/ordenar', async (req, res) => {
    try {
        const producto = await ProductoModel.find().sort({nombre: 1});
        res.json(producto);
    } catch (error) {
        res.status(404).json({mensaje: error.mensaje})
    }
});

//listar productos filtradas por campo codigo
rutas.post('/listain', async (req, res) => {
    try {
        const producto = await ProductoModel.find({codigo: {$in: req.body }})
        console.log(producto);
        res.json(producto);
    } catch (error) {
        res.status(404).json({mensaje: error.mensaje})
    }
});

//listar filtro de coincidencias
rutas.get('/filtro-nombre/:texto', async (req, res) => {
    try {
        const producto = await ProductoModel.find( { $text: { $search: req.params.texto } } )
        res.json(producto);
    } catch (error) {
        res.status(404).json({mensaje: error.mensaje})
    }
});

module.exports = rutas;