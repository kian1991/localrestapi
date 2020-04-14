const { db } = require('./connection');

const createTable = (table) => {
    // Tabelle löschen falls vorhanden, um neue Daten zu schreiben
    deleteTable(table.name);
    let sqlString = `CREATE TABLE ${table.name}(
    id INTEGER PRIMARY KEY AUTOINCREMENT,`;
    // Über die Header inkrementieren und den sqlString erweitern
    table.header.forEach((colName) => {
        sqlString += `${colName} TEXT,`;
    });
    // abschließendes Komma entfernen und SQL-Befehl schließen
    sqlString = sqlString.substring(0, sqlString.length - 1);
    sqlString += ');';
    const statement = db.prepare(sqlString);
    return statement.run();
};

const deleteTable = (tableName) => {
    const sqlString = `DROP TABLE IF EXISTS ${tableName}`;
    const statement = db.prepare(sqlString);
    return statement.run();
};

const insertDataIntoTable = (table) => {
    const insert = (valueString) => {
        const sqlString = `INSERT INTO ${table.name} ('${table.header.join(
      "','"
    )}') VALUES (${valueString});`;
        return db.prepare(sqlString);
    };

    const insertMany = db.transaction((tableData) => {
        tableData.forEach((values) => {
            valueString = `'${values.join("','")}'`;
            insert(valueString).run();
        });
    });

    return insertMany(table.data);
};

const getTableNames = () => {
    const statement = db.prepare(
        `SELECT name FROM sqlite_master WHERE type='table' AND name != 'sqlite_sequence';`
    );
    const result = statement.all();
    return result.map((entry) => entry.name);
};

module.exports = {
    createTable,
    deleteTable,
    insertDataIntoTable,
    getTableNames,
};