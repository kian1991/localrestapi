const {db} = require('./connection');

const getContent = (table, query) => {
  let sqlString = `SELECT * FROM ${table}`;
  if (query && Object.keys(query).length > 0) {
    // Key und Value auslesen
    const key = Object.keys(query)[0];
    const value = query[key];
    sqlString += ` WHERE ${key} = '${value}';`;
  }
  const statement = db.prepare(sqlString);
  return statement.all();
};

const createContent = (table, body) => {
  const keys = Object.keys(body);
  const vals = keys.map((key) => body[key]);

  // SQL Statement aufbauen
  const sqlString = `INSERT INTO ${table} (${keys.join(', ')}) 
  VALUES ('${vals.join('\', \'')}')`;

  console.log(sqlString);
  return db.exec(sqlString);
};

const deleteContent = (table, query) => {
  return;
};


module.exports = {
  createContent,
  deleteContent,
  getContent,
};
