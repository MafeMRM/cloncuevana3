const express = require('express');
const generoService = require('../Service/generoService');
const router = express.Router();

// GET /generos - Obtener todos los géneros
router.get('/', async (req, res) => {
  try {
    const { estado } = req.query;
    let result;

    if (estado !== undefined) {
      result = await generoService.getByEstado(estado === 'true');
    } else {
      result = await generoService.getAll();
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

// GET /generos/:id - Obtener género por ID
router.get('/:id', async (req, res) => {
  try {
    const result = await generoService.getById(req.params.id);

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

// GET /generos/search/:name - Buscar género por nombre
router.get('/search/:name', async (req, res) => {
  try {
    const result = await generoService.getByName(req.params.name);

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

// POST /generos - Crear nuevo género
router.post('/', async (req, res) => {
  try {
    const { name, estado, descripcion } = req.body;

    if (!name || estado === undefined || !descripcion) {
      return res.status(400).json({
        success: false,
        message: 'Nombre, estado y descripción son requeridos'
      });
    }

    const result = await generoService.create({ name, estado, descripcion });

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

// PUT /generos/:id - Actualizar género
router.put('/:id', async (req, res) => {
  try {
    const { name, estado, descripcion } = req.body;
    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (estado !== undefined) updateData.estado = estado;
    if (descripcion !== undefined) updateData.descripcion = descripcion;

    const result = await generoService.update(req.params.id, updateData);

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

// DELETE /generos/:id - Eliminar género
router.delete('/:id', async (req, res) => {
  try {
    const result = await generoService.delete(req.params.id);

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