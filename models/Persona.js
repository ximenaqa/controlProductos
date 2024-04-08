const mongoose = require('mongoose');
const personaSchema = new mongoose.Schema({
    nombre: String,
    apellidos: String,
    documento: Number,
    genero: String,
    email: String,
    fecha_nac: Date,
    direccion: String,
    telefono: Number
})

const Persona = mongoose.model('Persona', personaSchema, 'persona');
module.exports = Persona;