const Content = require('../models/Content');

// @desc    Crear nuevo contenido (Solo Admin)
// @route   POST /api/content
const crearContenido = async (req, res) => {
    try {
        // Recibimos solo los campos del nuevo formulario
        const { title, description, section, category } = req.body;

        // Validamos que no vengan vacíos
        if (!title || !description || !section || !category) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const nuevoContenido = await Content.create({
            title,
            description,
            section,
            category,
            createdBy: req.user._id // Se obtiene del middleware protect
        });

        res.status(201).json(nuevoContenido);
    } catch (error) {
        console.error("Error en crearContenido:", error);
        res.status(500).json({ message: 'Error al crear el contenido en el servidor' });
    }
};

// @desc    Obtener todo el contenido (Público)
// @route   GET /api/content
const obtenerContenidos = async (req, res) => {
    try {
        const contenidos = await Content.find().sort({ createdAt: -1 });
        res.json(contenidos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los contenidos' });
    }
};
const eliminarContenido = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscamos el recurso por ID
        const contenido = await Content.findById(id);

        if (!contenido) {
            return res.status(404).json({ message: 'El contenido no existe o ya fue eliminado' });
        }

        // Lo removemos de la base de datos
        await Content.findByIdAndDelete(id);

        res.json({ message: 'Contenido eliminado correctamente de la base de datos 🚀' });
    } catch (error) {
        console.error("Error en eliminarContenido:", error);
        res.status(500).json({ message: 'Error al eliminar el contenido en el servidor' });
    }
};
module.exports = { crearContenido, obtenerContenidos, eliminarContenido };