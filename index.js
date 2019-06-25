const express = require('express');
require('./api/models/database');
const apiRouter = require('./api/routes/index');
const PORT = process.env.PORT || 8000;

var app = express();
app.use(express.json());
app.use('/', apiRouter);

var server = app.listen(PORT, () => console.log("Server running on port - " + server.address().port));

module.exports = app;