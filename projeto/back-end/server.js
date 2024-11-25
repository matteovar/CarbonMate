const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');  // Arquivo de rotas para login e cadastro

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Servir arquivos estáticos (HTML, CSS, JS) da pasta view
app.use(express.static(path.join(__dirname, 'view')));

// Conexão com o MongoDB Atlas
const uri = process.env.MONGO_URL || 'mongodb+srv://Matteo03:Matteo03@cluster0.qmljj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri)
  .then(() => console.log('Conectado ao MongoDB Atlas'))
  .catch(err => console.error('Erro ao conectar ao MongoDB Atlas:', err));

app.use('/api/users', userRoutes);

// Rota para arquivos JSON estáticos (opcional)
app.get('/data/:filename', (req, res) => {
  const filePath = path.join(__dirname, '..', 'model', req.params.filename);
  res.sendFile(filePath);
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
