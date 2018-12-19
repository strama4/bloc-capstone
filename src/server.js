const http = require('http');
const app = require('./app');
const port = normalizePort(process.env.PORT || "3000");

app.set("port", port);

function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}


const server = http.createServer(app);



app.get('/', (req, res) => {
    res.render('static/landing')
});

server.listen(port, () => {
    console.log('Server is listening on port 3000');
});