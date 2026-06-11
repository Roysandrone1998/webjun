const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true, // No permite correos duplicados
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
    },
    role: {
        type: String,
        enum: ['User', 'admin'], // Solo permite estos dos valores
        default: 'User' // Si no se especifica, por defecto es usuario común
    }
}, {
    timestamps: true // Nos crea automáticamente los campos createdAt y updatedAt
});

// Middleware de Mongoose: Encriptar contraseña antes de guardar el usuario
// Middleware de Mongoose: Encriptar contraseña antes de guardar el usuario
UserSchema.pre('save', async function() { // <-- Sacamos 'next' de acá
    // Si la contraseña no fue modificada, seguimos de largo
    if (!this.isModified('password')) return; // <-- Sacamos next()

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        // <-- No hace falta llamar a next() acá, al ser async Mongoose sabe que terminó
    } catch (error) {
        throw error; // <-- En vez de next(error), tiramos el error para que lo ataje el controlador
    }
});

// Método para comparar contraseñas cuando el usuario intente loguearse
UserSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);


