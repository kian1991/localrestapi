const {clientDb} = require('../../db');

// testing methods
const testData = {
  name: 'Kian',
  age: '29',
};

const table = 'users';

const testClientDb = () => {
  console.info('CREATE', clientDb.createContent(table, testData));
  // console.info('DELETE', adminDb.deleteTable(testData.table.name));
  console.info('GET', clientDb.getContent(table) );
};

testClientDb();

module.exports = {
  testClientDb,
};
