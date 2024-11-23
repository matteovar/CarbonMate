# Use a imagem oficial do Node.js
FROM node:22

# Defina o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Exponha a porta que o servidor Node.js estará rodando
EXPOSE 5000

# Comando para iniciar o servidor
CMD ["node", "server.js"]