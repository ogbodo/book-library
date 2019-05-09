var Teacher = require('./Teacher');

//Functionalities of Teacher with respect to own account
describe('All about Admin own account functionalities', function() {
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
  describe('Teacher details can be updated', function() {
    var teacher = new Teacher(
      'Ayo',
      'Abidemi',
      'Dev/16/340',
      'Female',
      'Social Science',
      'Political Science'
    );

    test('For the case of first name', function() {
      teacher.updateFirstName('Fola');
      expect(teacher.getFirstName()).toBe('Fola');
    });

    test('For the case of first name', function() {
      teacher.updateFirstName('Fola');
      expect(teacher.getFirstName()).toBe('Fola');
    });

    test('For the case of last name', function() {
      teacher.updateLastName('Tolu');
      expect(teacher.getLastName()).toBe('Tolu');
    });

    test('For the case of StaffId', function() {
      teacher.updateStaffId('Dev/89/0023');
      expect(teacher.staffId).toBe('Dev/89/0023');
    });
  });
});
