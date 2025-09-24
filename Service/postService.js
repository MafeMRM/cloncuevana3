const BaseService = require('./baseService');
const Post = require('../models/postsModel');

class PostService extends BaseService {
  constructor() {
    super(Post);
  }

  async getAll(filters = {}) {
    try {
      const posts = await this.model.find(filters)
        .populate('directorId', 'name estado')
        .populate('generoId', 'name descripcion estado')
        .populate('productoraId', 'name slogan estado');

      return {
        success: true,
        data: posts
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al obtener los posts'
      };
    }
  }

  async getById(id) {
    try {
      const post = await this.model.findById(id)
        .populate('directorId', 'name estado')
        .populate('generoId', 'name descripcion estado')
        .populate('productoraId', 'name slogan estado');

      if (!post) {
        return {
          success: false,
          message: 'Post no encontrado'
        };
      }

      return {
        success: true,
        data: post
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al obtener el post'
      };
    }
  }

  async getByGenero(generoId) {
    try {
      const posts = await this.model.find({ generoId: { $in: [generoId] } })
        .populate('directorId', 'name estado')
        .populate('generoId', 'name descripcion estado')
        .populate('productoraId', 'name slogan estado');

      return {
        success: true,
        data: posts
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al obtener posts por género'
      };
    }
  }

  async getByDirector(directorId) {
    try {
      const posts = await this.model.find({ directorId: { $in: [directorId] } })
        .populate('directorId', 'name estado')
        .populate('generoId', 'name descripcion estado')
        .populate('productoraId', 'name slogan estado');

      return {
        success: true,
        data: posts
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al obtener posts por director'
      };
    }
  }

  async getByProductora(productoraId) {
    try {
      const posts = await this.model.find({ productoraId })
        .populate('directorId', 'name estado')
        .populate('generoId', 'name descripcion estado')
        .populate('productoraId', 'name slogan estado');

      return {
        success: true,
        data: posts
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al obtener posts por productora'
      };
    }
  }

  async searchByName(name) {
    try {
      const posts = await this.model.find({
        name: { $regex: name, $options: 'i' }
      })
        .populate('directorId', 'name estado')
        .populate('generoId', 'name descripcion estado')
        .populate('productoraId', 'name slogan estado');

      return {
        success: true,
        data: posts
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al buscar posts'
      };
    }
  }
}

module.exports = new PostService();