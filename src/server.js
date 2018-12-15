const http = require('http');
const express = require('express');
const app = express();


const server = http.createServer(app);

app.get('/', (req, res) => {
    res.send('Hello world!');
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});