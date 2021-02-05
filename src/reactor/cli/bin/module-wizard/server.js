const open = require('open');
const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const serve = function (port) {
    const url = `http://localhost:${port}`;

    app.listen(port, () => {
        console.log(`Mongez module builder is serving at ${url}`);
    });

    let openOptions = {};

    open(url, openOptions);
};

module.exports = { app, serve };