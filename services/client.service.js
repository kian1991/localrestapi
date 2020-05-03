const {clientDb} = require('../db');
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
    table = path.replace('api', '').replace(/\//g, '').replace(/[?].*/, '');
    const responseBody = {}; // body erstellen
    responseBody.status = 200; // OK
    responseBody.message = MESSAGE_SUCCESS;
    responseBody.data = await clientDb.getContent(table, query);
    return responseBody;
  } catch (e) {
    console.error(e);
    // Tabelle nicht gefunden
    const responseBody = {}; // body erstellen
    responseBody.status = 404; // OK
    responseBody.message = MESSAGE_NO_SUCH_TABLE;
    return responseBody;
  }
};


const createContent = async (table, body) => {
  try {
    // Response Body erstellen und zurückgeben
    const responseBody = {}; // body erstellen
    responseBody.status = 201; // CREATED
    responseBody.message = MESSAGE_CREATED;
    responseBody.data = {
      tableNames: await clientDb.getContent(),
    };
    return responseBody;
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteConent = async (table, query) => { // todo
  try {
    await adminDb.deleteTable(name);
    const responseBody = {}; // body erstellen
    responseBody.status = 200; // OK
    responseBody.message = MESSAGE_DELETED;
    responseBody.data = {
      tableNames: await adminDb.getTableNames(),
    };
    return responseBody;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  getContent,
  deleteConent,
  createContent,
};
