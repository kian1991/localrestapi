import { API_URL, ENDPOINTS } from './constants.js';


const _request = (endpoint, body = {}) =>
    fetch(API_URL + endpoint.path, {
        method: endpoint.method,
        headers: {
            'Content-Type': 'application/json',
        },
    });

const _postRequest = (endpoint, body = {}) =>
    fetch(API_URL + endpoint.path, {
        method: endpoint.method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

const getTableNames = new Promise((resolve, reject) => {
    _request(ENDPOINTS.get)
        .then((response) => response.json())
        .then((json) => resolve(json))
        .catch((err) => reject(err));
});

const createTable = (tableJson) => {
    return new Promise((resolve, reject) => {
        _request(ENDPOINTS.create, tableJson)
            .then((response) => response.json())
            .then((json) => resolve(json))
            .catch((err) => reject(err));
    });
};

const deleteTable = (tableName) => {
    return new Promise((resolve, reject) => {
        _request(ENDPOINTS.delete, { tableName: tableName })
            .then((response) => response.json())
            .then((json) => resolve(json))
            .catch((err) => reject(err));
    });
};

exports {
    getTableNames,
    createTable,
    deleteTable
}