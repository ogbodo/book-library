var Teacher = require('./Teacher');

test('Teacher can be created', function() {
  var teacher = new Teacher(
    'Mr. David Mogbeyi',
    'Male',
    'Dev/1/340',
    'Science',
    'Computer Science'
  );
  expect(teacher.getFullName()).toBe('Mr. David Mogbeyi');
});
