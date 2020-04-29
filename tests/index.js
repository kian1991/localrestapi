const {
  testAdminAddRoute,
  testAdminDeleteRoute,
} = require('./routes/admin.routes.test');

const {testAdminDb} = require('./db/admin.db.test');

console.log('TESTS INITIATED');
console.log('Testing DB...');
testAdminDb();
console.log('Testing Endpoints (Routes)');
let result = testAdminDeleteRoute();
result = testAdminAddRoute();
console.info(result ? 'All Tests succeded' : 'Some Tests failed');
