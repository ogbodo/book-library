var Admin = require('./Admin');

test('Admin can be created', function() {
  var admin = new Admin('Izuking Ogbodo');
  expect(admin.getFullName()).toBe('Izuking Ogbodo');
});
