const express = require('express');
const router = express.Router();
const { getNotes, createNote } = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');

// Aplicamos 'protect' a todas las rutas de este archivo
router.route('/')
    .get(protect, getNotes)   // GET para leer
    .post(protect, createNote); // POST para crear

module.exports = router;