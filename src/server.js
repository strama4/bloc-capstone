const http = require('http');
const express = require('express');
const app = express();

const mainConfig = require('./config/main-config');

const server = http.createServer(app);

mainConfig.init(app, express);

app.get('/', (req, res) => {
    res.render('static/landing')
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});