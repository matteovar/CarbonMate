const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// Rota de cadastro
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Verifica se o usuário já existe
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'Email já cadastrado!' });
  }

  // Criptografa a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Cria o novo usuário
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: 'Usuário criado com sucesso!' });
});

// Rota de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Email ou senha inválidos!' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Email ou senha inválidos!' });
  }

  // Gera o token de autenticação
  const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });

  res.json({ token });
});

// Rota para pegar os dados do usuário
router.get('/profile', async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Captura o token JWT do cabeçalho

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, 'secretkey'); // Verifica o token
        const user = await User.findById(decoded.id); // Encontra o usuário com o ID decodificado
        
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        res.json({ name: user.name, email: user.email }); // Retorna os dados do usuário
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
});

module.exports = router;