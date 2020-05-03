const { adminService } = require('../services');
const { MESSAGE_FORMAT_ERROR } = require('../constants');

/* Der Request-Body enthält folgende Struktur:
{
  table: {
      name: "users",
      header: ["name", "age"],
      data: [
      ["Jason", "32"],
      ["Anna", "21"],
      ["Joe", "18"],
      ["Alice", "62"]
      ]
  }
}
*/
const getTableNames = async (req, res, next) => {
  try {
    const responseBody = await adminService.getTableNames();
    res.status(201).json(responseBody);
    next();
  } catch (e) {
    res.sendStatus(500);
    next(e);
  }
};

const getTable = async (req, res, next) => {
  // Tabellenname lässt sich aus übergebenen Pfad ableiten
  const reqPath = req.originalUrl;
  try {
    const responseBody = await adminService.getTable(reqPath);
    res.status(201).json(responseBody);
    next();
  } catch (e) {
    res.sendStatus(500);
    next(e);
  }
};

const createTable = async (req, res, next) => {
  const { table } = req.body;
  try {
    if (typeof table === 'undefined') {
      // Requestbody hat falsches Format
      return res
        .status(400)
        .json({ status: 400, message: MESSAGE_FORMAT_ERROR }); // BAD REQUEST
    }
    const responseBody = await adminService.createTable(table);
    res.status(201).json(responseBody);
    next();
  } catch (e) {
    res.sendStatus(500);
    next(e);
  }
};

const deleteTable = async (req, res, next) => {
  const { name } = req.query;
  try {
    if (typeof name === 'undefined') {
      // Requestbody hat falsches Format
      return res
        .status(400)
        .json({ status: 400, message: MESSAGE_FORMAT_ERROR }); // BAD REQUEST
    }
    const responseBody = await adminService.deleteTable(name);
    res.status(201).json(responseBody);
    next();
  } catch (e) {
    res.sendStatus(500);
    next(e);
  }
};

module.exports = {
  createTable,
  deleteTable,
  getTableNames,
  getTable,
};
