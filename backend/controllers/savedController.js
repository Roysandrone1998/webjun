const SavedResource = require('../models/SavedResource');

// @desc    Guardar un recurso en favoritos
// @route   POST /api/saved
const saveResource = async (req, res) => {
    try {
        const { contentId } = req.body;
        const saved = await SavedResource.create({
            user: req.user._id,
            content: contentId
        });
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ message: "Ya guardaste este recurso o el ID es inválido" });
    }
};

// @desc    Obtener recursos guardados del usuario
// @route   GET /api/saved
const getSavedResources = async (req, res) => {
    try {
        // El .populate('content') es MAGIA: te trae todos los datos del video/post automáticamente
        const saved = await SavedResource.find({ user: req.user._id })
                                         .populate('content'); 
        res.json(saved);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { saveResource, getSavedResources };