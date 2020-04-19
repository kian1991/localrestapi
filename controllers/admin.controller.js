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
const getTableNames = async(req, res, next) => {
    try {
        const responseBody = await adminService.getTableNames();
        res.status(201).json(responseBody);
        next();
    } catch (e) {
        console.log(e.message);
        res.sendStatus(500) && next(e);
    }
};

const createTable = async(req, res, next) => {
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
        console.log(e.message);
        res.sendStatus(500) && next(e);
    }
};

const deleteTable = async(req, res, next) => {
    const { tableName } = req.body;
    try {
        console.log(req.body);
        if (typeof tableName === 'undefined') {
            // Requestbody hat falsches Format
            return res
                .status(400)
                .json({ status: 400, message: MESSAGE_FORMAT_ERROR }); // BAD REQUEST
        }
        const responseBody = await adminService.deleteTable(tableName);
        res.status(201).json(responseBody);
        next();
    } catch (e) {
        console.log(e.message);
        res.sendStatus(500) && next(e);
    }
};

module.exports = {
    createTable,
    deleteTable,
    getTableNames,
};