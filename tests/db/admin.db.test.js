const { adminDb } = require('../../db');

// testing methods
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

const testAdminDb = () => {
    console.info('CREATE', adminDb.createTable(testData.table));
    console.info('DELETE', adminDb.deleteTable(testData.table.name));
    console.info('GET', adminDb.getTableNames());
};

module.exports = {
    testAdminDb,
};