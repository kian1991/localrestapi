import { API_URL, ENDPOINTS } from './constants.js';
import { tableToJson } from './util.js';

const getTables = () => new Promise((resolve, reject) => {
  fetch(API_URL)
    .then((response) => response.json())
    .then((json) => resolve(json))
    .catch((err) => reject(err));
});

const getTableByName = (tableName) => new Promise((resolve, reject) => {
  fetch(`${API_URL}${tableName}`)
    .then((response) => response.json())
    .then((json) => resolve(json))
    .catch((err) => reject(err));
});

const createTable = (tableJson) => new Promise((resolve, reject) => {
  const body = JSON.stringify(tableJson);
  fetch(API_URL, {
    method: ENDPOINTS.create.method,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': body.length,
    },
    body,
  })
    .then((response) => response.json())
    .then((json) => resolve(json))
    .catch((err) => reject(err));
});

const deleteTable = (tableName) => new Promise((resolve, reject) => {
  fetch(`${API_URL}?name=${tableName}`, {
    method: ENDPOINTS.delete.method,
  })
    .then((response) => response.json())
    .then((json) => resolve(json))
    .catch((err) => reject(err));
});

export {
  getTables,
  createTable,
  deleteTable,
  getTableByName,
};
