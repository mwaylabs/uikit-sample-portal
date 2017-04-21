// server.js
var jsonServer = require('json-server');
var server = jsonServer.create();
var seed = require('./seed.json');
var router = jsonServer.router(seed);
var middlewares = jsonServer.defaults();


server.use(middlewares);
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use(function (req, res, next) {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
    req.body.modifiedAt = Date.now();
  }
  if (req.method === 'PUT') {
    req.body.modifiedAt = Date.now();
  }
  console.log(req.method, req.body);
  // Continue to JSON Server router
  next();
});

server.use('/api', router);
server.listen(3000, function () {
  console.log('JSON Server is running')
});
