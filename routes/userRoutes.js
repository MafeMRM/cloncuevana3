const express = require('express');
const userService = require('../Service/userService');
const { verifyToken } = require('../utils/auth');
const router = express.Router();

// Aplicar middleware de autenticación a todas las rutas
router.use(verifyToken);

// GET /users - Obtener todos los usuarios (solo para administradores)
router.get('/', async (req, res) => {
  try {
    const result = await userService.getAll();

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

// GET /users/profile - Obtener perfil del usuario autenticado
router.get('/profile', async (req, res) => {
  try {
    const result = await userService.getById(req.user._id);

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

// GET /users/:id - Obtener usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const result = await userService.getById(req.params.id);

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

// GET /users/email/:email - Buscar usuario por email
router.get('/email/:email', async (req, res) => {
  try {
    const result = await userService.getByEmail(req.params.email);

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

// PUT /users/profile - Actualizar perfil del usuario autenticado
router.put('/profile', async (req, res) => {
  try {
    const { email, password } = req.body;
    const updateData = {};

    if (email !== undefined) updateData.email = email;
    if (password !== undefined) updateData.password = password;

    const result = await userService.updateProfile(req.user._id, updateData);

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

// PUT /users/:id/verify - Verificar usuario
router.put('/:id/verify', async (req, res) => {
  try {
    const result = await userService.verifyUser(req.params.id);

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