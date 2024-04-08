const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const tareasRutas = require('./routes/registroRutas')

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('conexion con mongo exitosa');
        app.listen(PORT,() => { console.log('Servidor funcionando en el puerto: ', PORT)})
    }).catch(error => {console.log('error de conexion con MONGODB', error)});

app.use('/ruta-registro', tareasRutas)
