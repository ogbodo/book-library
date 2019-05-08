var Admin = require('./Admin');

test('Admin can be created', function() {
  var admin = new Admin('Izuking Ogbodo');
  expect(admin.getFullName()).toBe('Izuking Ogbodo');
});

test('Admin details can be updated', function() {
  var admin = new Admin('Treasure Ogbonna');
  admin.updateFullName('Natasha Micheal');
  expect(admin.getFullName()).toBe('Natasha Micheal');
});

test('Admin account can be deleted', function() {
  var admin = new Admin('Matthias King');
  expect(admin.deleteAccount()).toBeTruthy();
});

test('Admin details can be read', function() {
  var admin = new Admin('Matthias Ogbonna');
  expect(admin.retrieveDetails()).toEqual(admin);
});
