const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

// Importar Rutas
const authRoutes = require('./routes/authRoutes');

const app = express();

// Conectar a la Base de Datos
connectDB();
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
// Middlewares
app.use(cors());
app.use(express.json()); // Para leer JSON en el body de las peticiones

// Rutas de la API
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API de Webjun funcionando perfectamente 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});