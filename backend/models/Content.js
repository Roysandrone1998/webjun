const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  section: { type: String, required: true },  // acompañantes, pacientes, propositos
  category: { type: String, required: true }, // herramienta, informe, cuerpo-nutricion, etc.
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);