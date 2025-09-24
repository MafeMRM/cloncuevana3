const express = require('express');
const productoraService = require('../Service/productoraService');
const router = express.Router();

// GET /productoras - Obtener todas las productoras
router.get('/', async (req, res) => {
  try {
    const { estado } = req.query;
    let result;

    if (estado !== undefined) {
      result = await productoraService.getByEstado(estado === 'true');
    } else {
      result = await productoraService.getAll();
    }

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// GET /productoras/:id - Obtener productora por ID
router.get('/:id', async (req, res) => {
  try {
    const result = await productoraService.getById(req.params.id);

    if (!result.success) {
      return res.status(404).json(result);
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// GET /productoras/search/:name - Buscar productora por nombre
router.get('/search/:name', async (req, res) => {
  try {
    const result = await productoraService.getByName(req.params.name);

    if (!result.success) {
      return res.status(404).json(result);
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// GET /productoras/slogan/:slogan - Buscar productora por slogan
router.get('/slogan/:slogan', async (req, res) => {
  try {
    const result = await productoraService.searchBySlogan(req.params.slogan);

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// POST /productoras - Crear nueva productora
router.post('/', async (req, res) => {
  try {
    const { name, estado, slogan, description } = req.body;

    if (!name || estado === undefined || !slogan || !description) {
      return res.status(400).json({
        success: false,
        message: 'Nombre, estado, slogan y descripción son requeridos'
      });
    }

    const result = await productoraService.create({ name, estado, slogan, description });

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// PUT /productoras/:id - Actualizar productora
router.put('/:id', async (req, res) => {
  try {
    const { name, estado, slogan, description } = req.body;
    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (estado !== undefined) updateData.estado = estado;
    if (slogan !== undefined) updateData.slogan = slogan;
    if (description !== undefined) updateData.description = description;

    const result = await productoraService.update(req.params.id, updateData);

    if (!result.success) {
      return res.status(404).json(result);
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// DELETE /productoras/:id - Eliminar productora
router.delete('/:id', async (req, res) => {
  try {
    const result = await productoraService.delete(req.params.id);

    if (!result.success) {
      return res.status(404).json(result);
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

module.exports = router;