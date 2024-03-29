var Student = require('../constructors/student'); //Import the Student object
var Admin = require('../constructors/admin'); //Import the Admin object

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
      student.updatePersonalDetails(
        'Ebuka',
        'Joshua',
        'Female',
        'Art',
        'Visual and Creative Art'
      );
      expect(student.getFirstName()).toBe('Ebuka');
      expect(student.getLastName()).toBe('Joshua');
      expect(student.gender).toBe('Female');
      expect(student.faculty).toBe('Art');
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

  test('For the case where student wants to return a book', function() {
    expect(student.returnBorrowedbook(book2.id)).toBeTruthy();
  });
});
