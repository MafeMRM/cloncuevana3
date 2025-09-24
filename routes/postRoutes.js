const express = require('express');
const postService = require('../Service/postService');
const router = express.Router();

// ...existing code for GET routes...

router.get('/', async (req, res) => {
  try {
    const result = await postService.getAll();

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

// POST /posts - Crear nuevo post
router.post('/', async (req, res) => {
  try {
    const { name, URL, directorId, estreno, generoId, productoraId, sinopsis } = req.body;

    // Validar que directorId y generoId sean arrays
    if (!Array.isArray(directorId) || !Array.isArray(generoId)) {
      return res.status(400).json({
        success: false,
        message: 'directorId y generoId deben ser arrays'
      });
    }

    // Validar que los arrays no estén vacíos y que todos los campos requeridos existan
    if (!name || !URL || directorId.length === 0 || !estreno || 
        generoId.length === 0 || !productoraId || !sinopsis) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos y los arrays no pueden estar vacíos'
      });
    }

    const result = await postService.create({
      name,
      URL,
      directorId,
      estreno,
      generoId,
      productoraId,
      sinopsis
    });

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

// PUT /posts/:id - Actualizar post
router.put('/:id', async (req, res) => {
  try {
    const { name, URL, directorId, estreno, generoId, productoraId, sinopsis } = req.body;
    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (URL !== undefined) updateData.URL = URL;
    if (directorId !== undefined) {
      if (!Array.isArray(directorId)) {
        return res.status(400).json({
          success: false,
          message: 'directorId debe ser un array'
        });
      }
      updateData.directorId = directorId;
    }
    if (estreno !== undefined) updateData.estreno = estreno;
    if (generoId !== undefined) {
      if (!Array.isArray(generoId)) {
        return res.status(400).json({
          success: false,
          message: 'generoId debe ser un array'
        });
      }
      updateData.generoId = generoId;
    }
    if (productoraId !== undefined) updateData.productoraId = productoraId;
    if (sinopsis !== undefined) updateData.sinopsis = sinopsis;

    const result = await postService.update(req.params.id, updateData);

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

// ...existing code for DELETE route...
router.delete('/:id', async (req, res) => {
  try {
    const result = await postService.delete(req.params.id);

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