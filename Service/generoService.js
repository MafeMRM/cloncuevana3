const BaseService = require('./baseService');
const Genero = require('../models/generoModel');

class GeneroService extends BaseService {
  constructor() {
    super(Genero);
  }

  async getByName(name) {
    try {
      const genero = await this.model.findOne({ 
        name: { $regex: name, $options: 'i' }
      });
      
      if (!genero) {
        return {
          success: false,
          message: 'Género no encontrado'
        };
      }

      return {
        success: true,
        data: genero
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al buscar género'
      };
    }
  }

  async getByEstado(estado) {
    try {
      const generos = await this.model.find({ estado });
      
      return {
        success: true,
        data: generos
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al obtener géneros por estado'
      };
    }
  }
}

module.exports = new GeneroService();