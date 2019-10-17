FROM node:5.2.0-slim
ADD . /app
WORKDIR /app
RUN npm install
ENTRYPOINT ["node", "index.js"]