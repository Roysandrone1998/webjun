const express = require('express');
const router = express.Router();
const { crearContenido, obtenerContenidos, eliminarContenido } = require('../controllers/contentController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(obtenerContenidos) // Cualquiera puede ver los recursos
    .post(protect, admin, crearContenido); // SOLO el admin con token válido puede crear
router.route('/:id')
    .delete(protect, admin, eliminarContenido); // <-- Solo el admin protegido puede borrar
module.exports = router;