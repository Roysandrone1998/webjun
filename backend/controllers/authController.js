const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generar Token JWT
const generateToken = (id) => {
    // Si por alguna razón el .env no carga, usamos un fallback temporal para que no tire 500
    const secret = process.env.JWT_SECRET || 'clave_secreta_de_emergencia_123';
    return jwt.sign({ id }, secret, { expiresIn: '30d' });
};

// @desc    Registrar usuario
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) return res.status(400).json({ message: 'El usuario ya existe' });

        // Forzamos el rol 'user' por seguridad
        const user = await User.create({ name, email, password, role: 'user' });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch (error) {
        // Un console.log acá te va a mostrar el error real en la terminal de la derecha de tu VS Code
        console.error('Error interno en registerUser:', error); 
        res.status(500).json({ message: error.message });
    }
};

// @desc    Login usuario
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error('Error interno en loginUser:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser };