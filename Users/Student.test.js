var Student = require('./Student');

//Functionalities of Admin with respect to own account
describe('All about Admin own account functionalities', function() {
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
      console.log(student);

      expect(student.getLastName()).toBe('Joshua');
    });

    test('For the case of Matric Number', function() {
      student.updateMatricNumber('8902311230');
      expect(student.matricNumber).toBe('8902311230');
    });
  });
});
