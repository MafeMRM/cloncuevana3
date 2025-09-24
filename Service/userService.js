const BaseService = require('./baseService');
const User = require('../models/usersModel');
const crypto = require('crypto');

// Función para hashear contraseñas usando crypto nativo
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

class UserService extends BaseService {
  constructor() {
    super(User);
  }

  async getAll() {
    try {
      const users = await this.model.find({}, '-password');
      
      return {
        success: true,
        data: users
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al obtener usuarios'
      };
    }
  }

  async getById(id) {
    try {
      const user = await this.model.findById(id, '-password');
      
      if (!user) {
        return {
          success: false,
          message: 'Usuario no encontrado'
        };
      }

      return {
        success: true,
        data: user
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al obtener usuario'
      };
    }
  }

  async updateProfile(id, data) {
    try {
      // Si se incluye password, hashearlo
      if (data.password) {
        data.password = hashPassword(data.password);
      }

      const updatedUser = await this.model.findByIdAndUpdate(
        id,
        data,
        { new: true, runValidators: true, select: '-password' }
      );

      if (!updatedUser) {
        return {
          success: false,
          message: 'Usuario no encontrado'
        };
      }

      return {
        success: true,
        data: updatedUser
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al actualizar usuario'
      };
    }
  }

  async getByEmail(email) {
    try {
      const user = await this.model.findOne({ email }, '-password');
      
      if (!user) {
        return {
          success: false,
          message: 'Usuario no encontrado'
        };
      }

      return {
        success: true,
        data: user
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al buscar usuario'
      };
    }
  }

  async verifyUser(id) {
    try {
      const user = await this.model.findByIdAndUpdate(
        id,
        { verified: true },
        { new: true, select: '-password' }
      );

      if (!user) {
        return {
          success: false,
          message: 'Usuario no encontrado'
        };
      }

      return {
        success: true,
        data: user
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al verificar usuario'
      };
    }
  }
}

module.exports = new UserService();