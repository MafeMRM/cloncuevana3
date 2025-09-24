const BaseService = require('./baseService');
const Productora = require('../models/productoraModel');

class ProductoraService extends BaseService {
  constructor() {
    super(Productora);
  }

  async getByName(name) {
    try {
      const productora = await this.model.findOne({ 
        name: { $regex: name, $options: 'i' }
      });
      
      if (!productora) {
        return {
          success: false,
          message: 'Productora no encontrada'
        };
      }

      return {
        success: true,
        data: productora
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al buscar productora'
      };
    }
  }

  async getByEstado(estado) {
    try {
      const productoras = await this.model.find({ estado });
      
      return {
        success: true,
        data: productoras
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al obtener productoras por estado'
      };
    }
  }

  async searchBySlogan(slogan) {
    try {
      const productoras = await this.model.find({ 
        slogan: { $regex: slogan, $options: 'i' }
      });
      
      return {
        success: true,
        data: productoras
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al buscar productoras por slogan'
      };
    }
  }
}

module.exports = new ProductoraService();