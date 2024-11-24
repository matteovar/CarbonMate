# Dockerfile
FROM node:22

WORKDIR /back-end

COPY . . 

RUN rm -rf  node_modules

RUN npm install

EXPOSE 5000

CMD ["cpm", "start"]