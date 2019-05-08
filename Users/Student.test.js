var Student = require('./Student');

test('Student can be created', function() {
  var student = new Student(
    'Solomon Izukerberg',
    'Mathematics',
    '200L',
    '2041200015',
    'Male'
  );
  expect(student.getFullName()).toBe('Solomon Izukerberg');
});
