FROM node:5.2.0-slim
ADD . /app
ADD ./posts /srv/data
WORKDIR /app
RUN npm install
ENTRYPOINT ["node", "index.js"]