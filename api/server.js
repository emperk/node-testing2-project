const express = require('express');
const authorsRouter = require('../api/authors/authors-router');
const server = express();

server.use(express.json())
server.use('/api/authors', authorsRouter)

module.exports = server