const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const {verifyToken} = require('./utils/auth');


const app = express();

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((error) => {
    console.error('Error conectando a MongoDB:', error);
  });


app.use(express.json());
app.use(cors());
// Importar rutas
const authRoutes = require('./routes/authRoutes');
const directorRoutes = require('./routes/directorRoutes');
const generoRoutes = require('./routes/generoRoutes');
const postRoutes = require('./routes/postRoutes');
const productoraRoutes = require('./routes/productoraRoutes');
const tipoRoutes = require('./routes/tipoRoutes');
const userRoutes = require('./routes/userRoutes');

// Configurar rutas
app.use('/api/auth', authRoutes);
app.use('/api/directores', directorRoutes);
app.use('/api/generos', generoRoutes);
app.use('/api/posts',  postRoutes);
app.use('/api/productoras', productoraRoutes);
app.use('/api/tipos', tipoRoutes);
app.use('/api/users', userRoutes);

// ruta privada
  //app.use('/api/directores', verifyToken, directorRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});






module.exports = app;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});