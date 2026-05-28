const mongoose = require('mongoose');

const contentSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { 
        type: String, 
        required: true, 
        enum: ['video', 'post', 'image'] 
    },
    url: { type: String, required: true }, // URL de Cloudinary o Youtube
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);