# Dockerfile
FROM node:22

WORKDIR /back-end

COPY . . 

RUN npm install

EXPOSE 5000

CMD ["node", "server.js"]