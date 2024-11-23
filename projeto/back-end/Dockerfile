# Use uma imagem base do Node.js
FROM node:22

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Expões a porta que a aplicação usará
EXPOSE 5000

# Comando para iniciar a aplicação
CMD ["node", "server.js"]