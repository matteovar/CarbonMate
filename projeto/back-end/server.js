const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');  // Arquivo de rotas para login e cadastro
const User = require('./models/User');  // Modelo de usuário

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve os arquivos estáticos da pasta 'view', que está fora da pasta 'back-end'
// Usando path.join para garantir que o caminho seja resolvido corretamente
app.use(express.static(path.join(__dirname, '..', 'view')));

// Conexão com o MongoDB Atlas
const uri = process.env.MONGO_URL || 'mongodb://mongo-carbonmate:27017/carbonmate';
console.log('String de conexão:', uri); // Log para verificar a string de conexão

mongoose.connect(uri)
.then(() => console.log('Conectado ao MongoDB Atlas'))
.catch(err => console.error('Erro ao conectar ao MongoDB Atlas:', err));

app.use('/api/users', userRoutes);

// Rota inicial (opcional)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'view', 'index.html'));  // Ajuste o caminho aqui também
});

// Rota para servir arquivos JSON estáticos (opcional)
app.get('/data/:filename', (req, res) => {
  const filePath = path.join(__dirname, '..', 'model', req.params.filename);
  res.sendFile(filePath);
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});