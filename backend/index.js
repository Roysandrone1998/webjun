
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

// --- 1. IMPORTAR TODAS LAS RUTAS ---
const authRoutes = require('./routes/authRoutes');
const savedRoutes = require('./routes/savedRoutes');
const noteRoutes = require('./routes/noteRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const contentRoutes = require('./routes/contentRoutes'); // <-- 1. IMPORTAMOS LAS RUTAS DE CONTENIDO

const app = express();

// Conectar a la Base de Datos
connectDB();

const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

// Middlewares
app.use(cors());
app.use(express.json()); // Para leer JSON en el body de las peticiones

// --- 2. CONECTAR LAS RUTAS A LA API ---
app.use('/api/auth', authRoutes);
app.use('/api/saved', savedRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/content', contentRoutes); // <-- 2. CONECTAMOS EL ENDPOINT PARA EL PANEL

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API de Webjun funcionando perfectamente 🚀');
});

// --- 3. LEVANTAR SERVIDOR ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});