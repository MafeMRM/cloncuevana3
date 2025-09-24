const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');

// Middleware para verificar JWT
const verifyToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token de acceso requerido' 
      });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token inválido' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: 'Token inválido' 
    });
  }
};

// Generar JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
};

module.exports = {
  verifyToken,
  generateToken
};