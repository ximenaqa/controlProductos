const mongoose = require('mongoose');
const productoSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    codigo: String,
    cantidad: Number,
    fecha_compra: Date,
    fecha_venc: Date,
    proveedor: String,
    precio_compra: Number,
    precio_venta: Number
});

const Producto = mongoose.model('Producto', productoSchema, 'producto');
module.exports = Producto;