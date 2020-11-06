const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');
const { PORT, APP_NAME } = require('./constants');

// Express konfiguration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Konfigurationsoberfläche
app.use(express.static('public'));

app.use('/', routes);

app.listen(PORT, () =>
  console.log(
    `${APP_NAME} läuft über Port: ${PORT}. Besuchen Sie http://localhost:${PORT} um auf die Konfiguartionsoberfläche zu gelangen.`
  )
);

module.exports = {
  app,
};
