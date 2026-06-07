const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: { // El texto de la anotación (ej: "Consulta con Sandra")
        type: String,
        required: true
    },
    time: { // Guardamos la hora (ej: "10:00")
        type: String,
        required: true
    },
    category: { // El tipo de cita que tenías en el select
        type: String,
        enum: ['Cita médica', 'Movimiento consciente', 'Espacio personal'],
        default: 'Cita médica'
    },
    date: { 
        type: Date, // Usamos tipo Date nativo para poder indexar y filtrar por rangos de meses
        required: true
    }
}, { timestamps: true });

// Indexamos para que las búsquedas por usuario y fecha vuelen
appointmentSchema.index({ user: 1, date: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);