const crypto = require('crypto');
const User = require('../models/usersModel');
const { generateToken } = require('../utils/auth');

// Función para hashear contraseñas usando crypto nativo
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

// Función para verificar contraseñas
function verifyPassword(password, hashedPassword) {
  const [salt, hash] = hashedPassword.split(':');
  const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === verifyHash;
}


class AuthService {
  async register(email, password) {
    try {
      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return { 
          success: false, 
          message: 'El email ya está registrado' 
        };
      }

      // Hashear la contraseña
      const hashedPassword = hashPassword(password);

      // Crear nuevo usuario
      const newUser = new User({
        email,
        password: hashedPassword
      });

      const savedUser = await newUser.save();
      
      // Generar token
      const token = generateToken(savedUser._id);

      return {
        success: true,
        data: {
          user: {
            id: savedUser._id,
            email: savedUser.email,
            verified: savedUser.verified
          },
          token
        }
      };
    } catch (error) {
      return { 
        success: false, 
        message: error.message || 'Error al registrar usuario' 
      };
    }
  }

  async login(email, password) {
    try {
      // Buscar usuario con contraseña
      const user = await User.findOne({ email }).select('+password');
      
      if (!user) {
        return { 
          success: false, 
          message: 'Credenciales inválidas' 
        };
      }

      // Verificar contraseña
      const isValidPassword = verifyPassword(password, user.password);
      
      if (!isValidPassword) {
        return { 
          success: false, 
          message: 'Credenciales inválidas' 
        };
      }

      // Generar token
      const token = generateToken(user._id);

      return {
        success: true,
        data: {
          user: {
            id: user._id,
            email: user.email,
            verified: user.verified
          },
          token
        }
      };
    } catch (error) {
      return { 
        success: false, 
        message: error.message || 'Error al iniciar sesión' 
      };
    }
  }
}

module.exports = new AuthService();