class BaseService {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const newItem = new this.model({
        ...data,
        fechaCreacion: new Date().toISOString(),
        fechaActualizacion: new Date().toISOString()
      });

      const savedItem = await newItem.save();
      return {
        success: true,
        data: savedItem
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al crear el registro'
      };
    }
  }

  async getAll(filters = {}) {
    try {
      const items = await this.model.find(filters);
      
      return {
        success: true,
        data: items
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al obtener los registros'
      };
    }
  }

  async getById(id) {
    try {
      const item = await this.model.findById(id);
      
      if (!item) {
        return {
          success: false,
          message: 'Registro no encontrado'
        };
      }

      return {
        success: true,
        data: item
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al obtener el registro'
      };
    }
  }

  async update(id, data) {
    try {
      const updatedItem = await this.model.findByIdAndUpdate(
        id,
        { 
          ...data, 
          fechaActualizacion: new Date().toISOString() 
        },
        { new: true, runValidators: true }
      );

      if (!updatedItem) {
        return {
          success: false,
          message: 'Registro no encontrado'
        };
      }

      return {
        success: true,
        data: updatedItem
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al actualizar el registro'
      };
    }
  }

  async delete(id) {
    try {
      const deletedItem = await this.model.findByIdAndDelete(id);

      if (!deletedItem) {
        return {
          success: false,
          message: 'Registro no encontrado'
        };
      }

      return {
        success: true,
        message: 'Registro eliminado correctamente'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al eliminar el registro'
      };
    }
  }
}

module.exports = BaseService;