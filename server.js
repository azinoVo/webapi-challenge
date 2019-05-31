const express = require('express');
const server = express();
const projectRouter = require('./data/routes/projectRoutes');
const actionRoutes = require('./data/routes/actionRoutes');

server.use(express.json());

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.get('/', (req, res) => {
  res.send(`<h2>Welcome to the Projects! Time to take Action!</h2>`)
});

server.use('/api/projects', logger, projectRouter);
server.use('/api/actions', logger, actionRoutes);


function logger(req, res, next) {
  console.log(`${req.method} method made from ${req.url} at ${new Date().toISOString()}`)
  next();
};

module.exports = server;
