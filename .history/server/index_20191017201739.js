const http = require('http');
const port = process.env.NODE_PORT || 3000;
const version = process.env.VERSION || 'unknown';

const requestHandler = (request, response) => {
  response.setHeader('Content-Type', 'application/json');
  response.statusCode = 200;
  const out = { message: 'Your friendly JSON server', 'version': version };
  response.end(JSON.stringify(out));
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    console.error('oops', err);
  }
  console.log(`server v.${version} is listening on ${port}`);
});