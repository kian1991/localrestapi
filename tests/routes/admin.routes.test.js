const { router } = require('../../routes');
const fetch = require('node-fetch');

const url = 'http://localhost:3000/admin/table';
const testData = {
    table: {
        name: 'testtable',
        header: ['head1', 'head2', 'head3', 'head4'],
        data: [
            ['data1', 'data2', 'data3', 'data4'],
            ['data1', 'data2', 'data3', 'data4'],
            ['data1', 'data2', 'data3', 'data4'],
            ['data1', 'data2', 'data3', 'data4'],
            ['data1', 'data2', 'data3', 'data4'],
            ['data1', 'data2', 'data3', 'data4'],
            ['data1', 'data2', 'data3', 'data4'],
            ['data1', 'data2', 'data3', 'data4'],
            ['data1', 'data2', 'data3', 'data4'],
            ['data1', 'data2', 'data3', 'data4'],
            ['data1', 'data2', 'data3', 'data4'],
            ['data1', 'data2', 'data3', 'data4'],
            ['data1', 'data2', 'data3', 'data4'],
        ],
    },
};

const requestRoute = (method, body) => {
    fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': body.length,
            },
            body: JSON.stringify(body),
        })
        .then((res, err) => {
            return res.json();
        })
        .then((json) => {
            console.info(method, json);
            if (json.status === 200 && json.status === 201) {
                return true;
            } else {
                return false;
            }
        });
};

// Test Routes: ADD
const testAdminAddRoute = async() => {
    const body = testData;
    const method = 'PUT';
    return requestRoute(method, body);
};

const testAdminDeleteRoute = async() => {
    const body = { tableName: testData.table.name };
    const method = 'DELETE';
    return requestRoute(method, body);
};

module.exports = {
    testAdminAddRoute,
    testAdminDeleteRoute,
};