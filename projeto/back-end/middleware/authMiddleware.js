const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log('Cabeçalho Authorization:', authHeader); // Adiciona log para ver o cabeçalho
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        console.log('Token não encontrado');
        return res.sendStatus(401); // Retorna 401 se não encontrar token
    }

    jwt.verify(token, 'secretkey', (err, user) => {
        if (err) {
            console.log('Erro na verificação do token:', err);
            return res.sendStatus(403); // Retorna 403 se o token for inválido
        }
        req.user = user;
        next();
    });
};

module.exports = authMiddleware;