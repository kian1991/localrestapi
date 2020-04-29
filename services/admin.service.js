const {adminDb} = require('../db');
const {
  MESSAGE_CREATED,
  MESSAGE_DELETED,
  MESSAGE_SUCCESS,
} = require('../constants');

const createTable = async (table) => {
  try {
    // Tabelle anlegen
    await adminDb.createTable(table);
    // Daten in Tabelle schreiben
    await adminDb.insertDataIntoTable(table);

    // Response Body erstellen und zurückgeben
    const responseBody = {}; // body erstellen
    responseBody.status = 201; // CREATED
    responseBody.message = MESSAGE_CREATED;
    responseBody.data = {
      tableNames: await adminDb.getTableNames(),
    };
    return responseBody;
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteTable = async (name) => {
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

const getTableNames = async () => {
  try {
    const responseBody = {}; // body erstellen
    responseBody.status = 200; // OK
    responseBody.message = MESSAGE_SUCCESS;
    responseBody.data = {
      tableNames: await adminDb.getTableNames(),
    };
    return responseBody;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  createTable,
  deleteTable,
  getTableNames,
};
