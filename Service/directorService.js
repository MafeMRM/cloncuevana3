const BaseService = require('./baseService');
const Director = require('../models/directorModel');

class DirectorService extends BaseService {
  constructor() {
    super(Director);
  }

  async getByName(name) {
    try {
      const director = await this.model.findOne({ 
        name: { $regex: name, $options: 'i' }
      });
      
      if (!director) {
        return {
          success: false,
          message: 'Director no encontrado'
        };
      }

      return {
        success: true,
        data: director
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al buscar director'
      };
    }
  }

  async getByEstado(estado) {
    try {
      const directores = await this.model.find({ estado });
      
      return {
        success: true,
        data: directores
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al obtener directores por estado'
      };
    }
  }
}

module.exports = new DirectorService();