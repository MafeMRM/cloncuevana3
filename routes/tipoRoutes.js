const express = require('express');
const tipoService = require('../Service/tipoService');
const { verifyToken } = require('../utils/auth');
const router = express.Router();

// Aplicar middleware de autenticación a todas las rutas
router.use(verifyToken);

// GET /tipos - Obtener todos los tipos
router.get('/', async (req, res) => {
  try {
    const result = await tipoService.getAll(req.user._id);

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

// GET /tipos/:id - Obtener tipo por ID
router.get('/:id', async (req, res) => {
  try {
    const result = await tipoService.getById(req.params.id, req.user._id);

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

// GET /tipos/search/:name - Buscar tipo por nombre
router.get('/search/:name', async (req, res) => {
  try {
    const result = await tipoService.getByName(req.params.name, req.user._id);

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

// GET /tipos/descripcion/:descripcion - Buscar tipos por descripción
router.get('/descripcion/:descripcion', async (req, res) => {
  try {
    const result = await tipoService.searchByDescription(req.params.descripcion, req.user._id);

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

// POST /tipos - Crear nuevo tipo
router.post('/', async (req, res) => {
  try {
    const { name, descripcion } = req.body;

    if (!name || !descripcion) {
      return res.status(400).json({
        success: false,
        message: 'Nombre y descripción son requeridos'
      });
    }

    const result = await tipoService.create({ name, descripcion }, req.user._id);

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

// PUT /tipos/:id - Actualizar tipo
router.put('/:id', async (req, res) => {
  try {
    const { name, descripcion } = req.body;
    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (descripcion !== undefined) updateData.descripcion = descripcion;

    const result = await tipoService.update(req.params.id, updateData, req.user._id);

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

// DELETE /tipos/:id - Eliminar tipo
router.delete('/:id', async (req, res) => {
  try {
    const result = await tipoService.delete(req.params.id, req.user._id);

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