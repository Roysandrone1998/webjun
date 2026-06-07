const express = require('express');
const router = express.Router();
const { crearContenido, obtenerContenidos } = require('../controllers/contentController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(obtenerContenidos) // Cualquiera puede ver los recursos
    .post(protect, admin, crearContenido); // SOLO el admin con token válido puede crear

module.exports = router;