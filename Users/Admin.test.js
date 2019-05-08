var Admin = require('./Admin');
var Teacher = require('./Teacher');
var Student = require('./Student');

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

describe('Admin can perform search on other users', function() {
  var admin = new Admin('Matthias Ogbonna');

  test('For the case student', function() {
    var student = new Student(
      'Solomon Izukerberg',
      '2041200015',
      'Male',
      'Science',
      'Mathematics',
      '200L'
    );

    expect(admin.searchUserByID(student.id)).toEqual(student);
  });
  test('For the case teacher', function() {
    var teacher = new Teacher(
      'Mr. David Mogbeyi',
      'Male',
      'Dev/1/340',
      'Science',
      'Computer Science'
    );
    expect(admin.searchUserByID(teacher.id)).toEqual(teacher);
  });
});
