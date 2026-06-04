const mongoose = require('mongoose');

const savedResourceSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content', // Referencia al modelo que ya tenés
        required: true
    }
}, { timestamps: true });

// Evitamos que el mismo usuario guarde el mismo recurso dos veces
savedResourceSchema.index({ user: 1, content: 1 }, { unique: true });

module.exports = mongoose.model('SavedResource', savedResourceSchema);