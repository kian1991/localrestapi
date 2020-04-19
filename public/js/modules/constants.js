const BASE_URL = 'http://localhost';
const PORT = ':3000';

const API_URL = BASE_URL + PORT;
const HEADERS = {
    'Content-Type': 'application/json',
};

const ENDPOINTS = {
    get: {
        path: '/admin/table',
        method: 'GET',
    },
    delete: {
        path: '/admin/table',
        method: 'DELETE',
    },
    create: {
        path: '/admin/table',
        method: 'PUT',
    },
};

export { API_URL, ENDPOINTS, HEADERS };