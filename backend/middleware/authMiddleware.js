const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Obtener el token del header (Bearer XXXXXXX)
            token = req.headers.authorization.split(' ')[1];

            // Decodificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Agregar el usuario al objeto request (menos el password)
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            res.status(401).json({ message: 'No autorizado, token fallido' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'No autorizado, no hay token' });
    }
};

// Middleware para verificar si es ADMIN
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401).json({ message: 'No autorizado como administrador' });
    }
};

module.exports = { protect, admin };
