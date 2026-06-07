const express = require('express');
const router = express.Router();
const { getAppointments, createAppointment } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // Protegemos todos los endpoints de la agenda

router.route('/')
    .get(getAppointments)
    .post(createAppointment);

module.exports = router;