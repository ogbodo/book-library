var Admin = require('./Admin');

test('Admin can be created', function() {
  var admin = new Admin('Izuking Ogbodo');
  expect(admin.getFullName()).toBe('Izuking Ogbodo');
});

test('Admin details can be updated', function() {
  var admin = new Admin('Izuking Ogbodo');
  admin.updateFullName('Solomon Izuchukwu Ogbodo');
  expect(admin.getFullName()).toBe('Solomon Izuchukwu Ogbodo');
});
