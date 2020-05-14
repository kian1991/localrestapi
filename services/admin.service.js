const { adminDb } = require('../db');
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
    responseBody.data = await adminDb.getTableNames();

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
    responseBody.data = await adminDb.getTableNames();
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
    responseBody.data = await adminDb.getTableNames();
    return responseBody;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getTable = async (reqPath) => {
  // Slashes und query aus Tabellennamen entfernen
  const tableName = reqPath.replace('/admin/table/', '');
  try {
    if (tableName) {
      const responseBody = {}; // body erstellen
      responseBody.status = 200; // OK
      responseBody.message = MESSAGE_SUCCESS;
      const tableData = await adminDb.getTable(tableName);
      responseBody.data = {
        table: {
          name: tableName,
          header: tableData.header,
          data: tableData.data,
        },
      };
      return responseBody;
    }
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
};

module.exports = {
  createTable,
  deleteTable,
  getTableNames,
  getTable,
};
