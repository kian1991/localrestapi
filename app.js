const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');

// Express konfiguration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Konfigurationsoberfläche
app.use(express.static('public'));

app.use('/', routes);

app.listen(3000, () => console.log('Example app listening on port 3000!'));

module.exports = {
    app,
};