var Student = require('./Student');

test('Student can be created', function() {
  var student = new Student(
    'Solomon Izukerberg',
    '2041200015',
    'Male',
    'Science',
    'Mathematics',
    '200L'
  );
  expect(student.getFullName()).toBe('Solomon Izukerberg');
});
