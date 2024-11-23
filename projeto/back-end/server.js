const express = require('express');
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

// Conexão com o MongoDB Atlas
const uri = process.env.MONGO_URL || 'mongodb+srv://Matteo:Matteo03@cluster0.qmljj.mongodb.net/nome_do_banco_de_dados?retryWrites=true&w=majority';
console.log('String de conexão:', uri); // Log para verificar a string de conexão

mongoose.connect(uri)
.then(() => console.log('Conectado ao MongoDB Atlas'))
.catch(err => console.error('Erro ao conectar ao MongoDB Atlas:', err));

app.use('/api/users', userRoutes);

// Rota inicial (opcional)
app.get('/', (req, res) => {
  res.send('API do CarbonMate');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});