FROM node:5.2.0-slim
COPY . /app
WORKDIR /app
RUN npm install
ENTRYPOINT ["node", "/app/index.js"]