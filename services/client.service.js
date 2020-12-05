const { clientDb } = require('../db');
const {
  MESSAGE_CREATED,
  MESSAGE_FAILED,
  MESSAGE_NO_SUCH_TABLE,
  MESSAGE_DELETED,
  MESSAGE_SUCCESS,
} = require('../constants');

const getContent = async (path, query) => {
  try {
    // Slashes und query aus Tabellennamen entfernen
    path = path.replace('api', '').replace(/\//g, '').replace(/[?].*/, '');
    const responseBody = {}; // body erstellen
    responseBody.status = 200; // OK
    responseBody.message = MESSAGE_SUCCESS;
    responseBody.data = await clientDb.getContent(path, query);
    return responseBody;
  } catch (e) {
    // Tabelle nicht gefunden
    const responseBody = {}; // body erstellen
    responseBody.status = 404; // OK
    responseBody.message = MESSAGE_NO_SUCH_TABLE;
    return responseBody;
  }
};

const createContent = async (table, body) => {
  try {
    table = table.replace('/api/', '');
    await clientDb.createContent(table, body);
    // Response Body erstellen und zurückgeben
    const responseBody = {}; // body erstellen
    responseBody.status = 201; // CREATED
    responseBody.message = MESSAGE_CREATED;
    responseBody.data = await clientDb.getContent(table);
    return responseBody;
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteContent = async (path, query) => {
  try {
    // Slashes und query aus Tabellennamen entfernen
    path = path.replace('api', '').replace(/\//g, '').replace(/[?].*/, '');
    await clientDb.deleteContent(path, query);
    const responseBody = {}; // body erstellen
    responseBody.status = 200; // OK
    responseBody.message = MESSAGE_SUCCESS;
    responseBody.data = clientDb.getContent(path);
    return responseBody;
  } catch (e) {
    console.log(e);
    // Tabelle nicht gefunden
    const responseBody = {}; // body erstellen
    responseBody.status = 404; // OK
    responseBody.message = MESSAGE_NO_SUCH_TABLE;
    return responseBody;
  }
};

module.exports = {
  getContent,
  deleteContent,
  createContent,
};
