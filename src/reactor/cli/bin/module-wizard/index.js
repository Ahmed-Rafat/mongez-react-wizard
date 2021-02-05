const { app, serve } = require('./server');

const createModule = require('./createModule');

const port = 2311;

app.get('/', function (req, res) {
    res.sendFile('./builder/index.html');
});

app.post('/create-module', createModule);

module.exports = function () {
    serve(port);
};