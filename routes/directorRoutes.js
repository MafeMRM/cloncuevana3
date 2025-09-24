const express = require('express');
const directorService = require('../Service/directorService');
const router = express.Router();

// GET /directores - Obtener todos los directores
router.get('/', async (req, res) => {
  try {
    const { estado } = req.query;
    let result;

    if (estado !== undefined) {
      result = await directorService.getByEstado(estado === 'true');
    } else {
      result = await directorService.getAll();
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

// GET /directores/:id - Obtener director por ID
router.get('/:id', async (req, res) => {
  try {
    const result = await directorService.getById(req.params.id);

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

// GET /directores/search/:name - Buscar director por nombre
router.get('/search/:name', async (req, res) => {
  try {
    const result = await directorService.getByName(req.params.name);

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

// POST /directores - Crear nuevo director
router.post('/', async (req, res) => {
  try {
    const { name, estado } = req.body;

    if (!name || estado === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Nombre y estado son requeridos'
      });
    }

    const result = await directorService.create({ name, estado });

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

// PUT /directores/:id - Actualizar director
router.put('/:id', async (req, res) => {
  try {
    const { name, estado } = req.body;
    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (estado !== undefined) updateData.estado = estado;

    const result = await directorService.update(req.params.id, updateData);

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

// DELETE /directores/:id - Eliminar director
router.delete('/:id', async (req, res) => {
  try {
    const result = await directorService.delete(req.params.id);

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