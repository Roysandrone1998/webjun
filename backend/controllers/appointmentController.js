const Appointment = require('../models/Appointment');

// @desc    Obtener turnos de un mes específico para el usuario logueado
// @route   GET /api/appointments?month=5&year=2026
const getAppointments = async (req, res) => {
    try {
        const { month, year } = req.query;

        if (!month || !year) {
            return res.status(400).json({ message: 'Mes y año son requeridos' });
        }

        // Definimos el rango del mes solicitado en UTC/Hora Local
        // Recordá que en JS los meses van de 0 a 11, pero acá asumimos que el front manda 1 para Enero, 2 para Febrero, etc.
        const startOfMonth = new Date(year, month - 1, 1);
        const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999); // Último segundo del último día del mes

        const appointments = await Appointment.find({
            user: req.user._id,
            date: {
                $gte: startOfMonth,
                $lte: endOfMonth
            }
        }).sort({ date: 1, time: 1 });

        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los turnos' });
    }
};

// @desc    Crear un nuevo turno en la agenda
// @route   POST /api/appointments
const createAppointment = async (req, res) => {
    try {
        const { title, time, category, dateStr } = req.body; // 'dateStr' vendrá como "2026-06-04" desde el front

        if (!title || !time || !dateStr) {
            return res.status(400).json({ message: 'Faltan campos obligatorios' });
        }

        const newAppointment = await Appointment.create({
            user: req.user._id,
            title,
            time,
            category,
            date: new Date(dateStr) // Lo parseamos a formato Date de MongoDB
        });

        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la anotación' });
    }
};

module.exports = { getAppointments, createAppointment };