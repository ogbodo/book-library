var Teacher = require('./Teacher');

test('Teacher can be created', function() {
  var teacher = new Teacher(
    'David',
    'Mogbeyi',
    'Dev/1/340',
    'Male',
    'Science',
    'Computer Science'
  );
  expect(teacher.getFirstName()).toBe('David');
});
