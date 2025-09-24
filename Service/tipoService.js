const BaseService = require('./baseService');
const Tipo = require('../models/tipoModel');

class TipoService extends BaseService {
  constructor() {
    super(Tipo);
  }

  async getByName(name, userId) {
    try {
      const tipo = await this.model.findOne({ 
        name: { $regex: name, $options: 'i' }, 
        userId 
      }).populate('userId', 'email');
      
      if (!tipo) {
        return {
          success: false,
          message: 'Tipo no encontrado'
        };
      }

      return {
        success: true,
        data: tipo
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al buscar tipo'
      };
    }
  }

  async searchByDescription(descripcion, userId) {
    try {
      const tipos = await this.model.find({ 
        descripcion: { $regex: descripcion, $options: 'i' }, 
        userId 
      }).populate('userId', 'email');
      
      return {
        success: true,
        data: tipos
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al buscar tipos por descripción'
      };
    }
  }
}

module.exports = new TipoService();