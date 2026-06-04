const Note = require('../models/Note');

// @desc    Obtener todas las notas del usuario logueado
// @route   GET /api/notes
const getNotes = async (req, res) => {
    try {
        // Buscamos solo las notas donde el campo 'user' coincida con el ID del usuario logueado
        const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las notas' });
    }
};

// @desc    Crear una nueva nota
// @route   POST /api/notes
const createNote = async (req, res) => {
    try {
        const { content, dateStr } = req.body;

        if (!content) {
            return res.status(400).json({ message: 'El contenido de la nota es obligatorio' });
        }

        const note = await Note.create({
            user: req.user._id,
            content,
            dateStr
        });

        res.status(201).json(note);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la nota' });
    }
};

module.exports = { getNotes, createNote };