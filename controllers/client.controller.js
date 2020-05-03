const { clientService } = require('../services');
const { MESSAGE_FORMAT_ERROR } = require('../constants');

/* Der Request-Body enthält folgende Struktur:

*/
const getContent = async (req, res, next) => {
  // Tabellenname lässt sich aus übergebenen Pfad ableiten
  const reqPath = req.originalUrl;
  const { query } = req;
  try {
    const responseBody = await clientService.getContent(reqPath, query);
    if (responseBody.status === '404') { // Tabelle nicht gefunden
      res.status(404).json(responseBody);
      next();
    }
    res.status(200).json(responseBody);
    next();
  } catch (e) {
    res.sendStatus(500) && next(e);
  }
};

const createContent = async (req, res, next) => {
  const { body } = req;
  try {
    if (typeof body === 'undefined') {
      // Requestbody hat falsches Format
      return res
        .status(400)
        .json({ status: 400, message: MESSAGE_FORMAT_ERROR }); // BAD REQUEST
    }
    const responseBody = await clientService.createContent(body);
    res.status(201).json(responseBody);
    next();
  } catch (e) {
    res.sendStatus(500) && next(e);
  }
};

const deleteContent = async (req, res, next) => {
  const { query } = req;
  try {
    if (typeof name === 'undefined') {
      // Requestbody hat falsches Format
      return res
        .status(400)
        .json({ status: 400, message: MESSAGE_FORMAT_ERROR }); // BAD REQUEST
    }
    const responseBody = await clientService.deleteContent(query);
    res.status(201).json(responseBody);
    next();
  } catch (e) {
    res.sendStatus(500) && next(e);
  }
};

module.exports = {
  createContent,
  deleteContent,
  getContent,
};
