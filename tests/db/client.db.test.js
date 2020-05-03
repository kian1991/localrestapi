const {clientDb} = require('../../db');

// testing methods
const testData = {
  first_name: 'Kian',
  last_name: 'Lütke',
  age: '29',
  job: 'Student',
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
