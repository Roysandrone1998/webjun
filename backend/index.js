const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

// --- 1. IMPORTAR TODAS LAS RUTAS ---
const authRoutes = require('./routes/authRoutes');
const savedRoutes = require('./routes/savedRoutes');
const noteRoutes = require('./routes/noteRoutes'); // <-- FALTA ESTA (Diario/Notas)
// const contentRoutes = require('./routes/contentRoutes'); // <-- Por si el admin sube contenido

const app = express();

// Conectar a la Base de Datos
connectDB();

const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

// Middlewares
app.use(cors());
app.use(express.json());

// --- 2. CONECTAR LAS RUTAS A LA API ---
app.use('/api/auth', authRoutes);
app.use('/api/saved', savedRoutes);
app.use('/api/notes', noteRoutes); // <-- CONECTAMOS LA RUTA DE NOTAS

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API de Webjun funcionando perfectamente 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});