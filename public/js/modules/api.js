import { API_URL, ENDPOINTS, HEADERS } from './constants.js';

const getTableNames = () => {
    return new Promise((resolve, reject) => {
        fetch(API_URL + ENDPOINTS.get.path)
            .then((response) => response.json())
            .then((json) => resolve(json))
            .catch((err) => reject(err));
    });
}

const createTable = (tableJson) => {
    return new Promise((resolve, reject) => {
        fetch(API_URL + ENDPOINTS.create.path, {
                method: ENDPOINTS.create.method,
                Headers: {
                    HEADERS
                },
                body: JSON.stringify(tableJson)
            })
            .then((response) => response.json())
            .then((json) => resolve(json))
            .catch((err) => reject(err));
    });
};

const deleteTable = (tableName) => {
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}${ENDPOINTS.delete.path}?name=${tableName}`, {
                method: ENDPOINTS.delete.method,
            })
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