const BASE_URL = 'http://localhost';
const PORT = ':3000';

const API_URL = `${BASE_URL + PORT}/admin/table/`;

const ENDPOINTS = {
  get: {
    method: 'GET',
  },
  delete: {
    method: 'DELETE',
  },
  create: {
    method: 'PUT',
  },
};

export { API_URL, ENDPOINTS };
