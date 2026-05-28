const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Definir los endpoints
router.post('/register', registerUser);
router.post('/login', loginUser);

// ¡EL PASO CLAVE QUE FALTABA!
module.exports = router;