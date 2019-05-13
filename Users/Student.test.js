var Student = require('./Student'); //Import the Student class
var Admin = require('./Admin'); //Import the Admin class

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
    test('For the case of personal details', function() {
      student.updatePersonalDetails('Ebuka', 'Joshua');
      expect(student.getFirstName()).toBe('Ebuka');
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
});

describe('Student borrowing book', function() {
  var student = new Student(
    'Samuel',
    'Micheal',
    '7782310091',
    'Male',
    'Science',
    'Chemistry',
    '300L'
  );
  var admin = new Admin('Izuking', 'Ogbodo', 'Male');

  var book1 = admin.addBook('What Women Want', 'Magazine', 'Treasure Ogbonna');
  var book2 = admin.addBook('Chike the River', 'Literature', 'Chinuwa Achebe');

  test('For the case where a student demands for book and its available', function() {
    expect(student.borrowBook(book2.id).userId).toBe(student.id);
  });

  test('For the case where same student demands for another book and its available', function() {
    expect(student.borrowBook(book1.id).userId).toBe(student.id);
  });

  test('For the case where same student demands for another copy of same book but its unavailable', function() {
    expect(student.borrowBook(book2.id)).toBe('Book Taken');
  });

  test('For the case where same student demands for a book that is not in the library', function() {
    expect(student.borrowBook('Software Mastering', 'Izuchukwu Ogbodo')).toBe(
      'Not Found'
    );
  });

  test('For the case where student wants to return a book', function() {
    expect(student.returnBorrowedbook(book2.id)).toBeTruthy();
  });
});
