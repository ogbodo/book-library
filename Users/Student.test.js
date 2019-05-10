var Student = require('./Student');

//Functionalities of Student with respect to own account
describe('All about Student own account functionalities', function() {
  test('Student can be created', function() {
    var student = new Student(
      'Solomon',
      'Izukerberg',
      '2041200015',
      'Male',
      'Science',
      'Mathematics',
      '200L'
    );
    expect(student.getFirstName()).toBe('Solomon');
  });

  describe('Student details can be updated', function() {
    var student = new Student(
      'Samuel',
      'Micheal',
      '7782310091',
      'Male',
      'Science',
      'Chemistry',
      '300L'
    );

    test('For the case of first name', function() {
      student.updateFirstName('Ebuka');
      expect(student.getFirstName()).toBe('Ebuka');
    });

    test('For the case of last name', function() {
      student.updateLastName('Joshua');

      expect(student.getLastName()).toBe('Joshua');
    });

    test('For the case of Matric Number', function() {
      student.updateMatricNumber('8902311230');
      expect(student.matricNumber).toBe('8902311230');
    });

    test('For the case of Gender', function() {
      student.updateGender('Female');
      expect(student.gender).toBe('Female');
    });

    test('For the case of Faculty', function() {
      student.updateFaculty('Art');
      expect(student.faculty).toBe('Art');
    });

    test('For the case of Department', function() {
      student.updateDepartment('Visual and Creative Art');
      expect(student.department).toBe('Visual and Creative Art');
    });

    test('For the case of Level', function() {
      student.updateLevel('400L');
      expect(student.level).toBe('400L');
    });
  });
  test('Student details can be read', function() {
    var student = new Student(
      'Samuel',
      'Micheal',
      '7782310091',
      'Male',
      'Science',
      'Chemistry',
      '300L'
    );
    expect(student.retrieveDetails()).toEqual(student);
  });

  test('Student account can be deleted', function() {
    var student = new Student(
      'Samuel',
      'Micheal',
      '7782310091',
      'Male',
      'Science',
      'Chemistry',
      '300L'
    );
    expect(student.deleteAccount()).toBeTruthy();
  });
});
