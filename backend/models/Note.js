const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    dateStr: { 
        type: String // Para guardar el formato "29 DE MAYO DE 2026..."
    }
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);