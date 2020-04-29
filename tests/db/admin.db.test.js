const {adminDb} = require('../../db');

// testing methods
const testData = {
  table: {
    name: 'users',
    header: ['first_name', 'last_name', 'age', 'job'],
    data: [
      ['John', 'Doe', '43', 'Developer'],
      ['Anna', 'Richards', '27', 'Designer'],
      ['Celine', 'Monroe', '37', 'Accountant'],
    ],
  },
};

const testAdminDb = () => {
  console.info('CREATE', adminDb.createTable(testData.table));
  // console.info('DELETE', adminDb.deleteTable(testData.table.name));
  console.info('GET', adminDb.getTableNames());
};

module.exports = {
  testAdminDb,
};
