var Admin = require('./Admin');
var Teacher = require('./Teacher');
var Student = require('./Student');

/**TODO RENAME ALL THE PROJECT FOLDERS TO START WITH LOWER CASES */

//Functionalities of Admin with respect to own account
describe('All about Admin own account functionalities', function() {
  test('Admin can be created', function() {
    var admin = new Admin('Izuking', 'Ogbodo', 'Male');
    expect(admin.getFirstName()).toBe('Izuking');
  });

  describe('Admin details can be updated', function() {
    var admin = new Admin('Treasure', ' Ogbonna', 'Female');

    test('For the case of first name', function() {
      admin.updateFirstName('Natasha');
      expect(admin.getFirstName()).toBe('Natasha');
    });

    test('For the case of last name', function() {
      admin.updateLastName('Ade');
      expect(admin.getLastName()).toBe('Ade');
    });
  });

  test('Admin account can be deleted', function() {
    var admin = new Admin('Matthias', ' King', 'Male');
    expect(admin.deleteAccount()).toBeTruthy();
  });

  test('Admin details can be read', function() {
    var admin = new Admin('Matthias ', 'Ogbonna', 'Male');
    expect(admin.retrieveDetails()).toEqual(admin);
  });
});

//Functionalities of Admin with respect to students and teachers
describe('All about Admin and other users', function() {
  describe('Admin can perform group search on all users', function() {
    var admin = new Admin('Matthias', ' Ogbonna', 'Male');

    test('For the case of Admin to get all teachers', function() {
      expect(admin.getAllTeachers()).toBeTruthy();
    });

    test('For the case of Admin to get all students', function() {
      expect(admin.getAllStudents()).toBeTruthy();
    });

    test('For the case of Admin to get all admins', function() {
      expect(admin.getAllAdmins()).toBeTruthy();
    });
  });

  describe('Admin can perform search on other users', function() {
    var admin = new Admin('Matthias', ' Ogbonna', 'Male');

    var student = new Student(
      'Solomon',
      'Izukerberg',
      '2041200015',
      'Male',
      'Science',
      'Mathematics',
      '200L'
    );

    var teacher = new Teacher(
      'David',
      'Mogbeyi',
      'Dev/1/340',
      'Male',
      'Science',
      'Computer Science'
    );

    test('For the case student by id', function() {
      expect(admin.searchUserByID(student.id)).toEqual(student);
    });

    test('For the case teacher by id', function() {
      expect(admin.searchUserByID(teacher.id)).toEqual(teacher);
    });

    test('For the case student by id', function() {
      expect(admin.searchUserByID(student.id)).toEqual(student);
    });

    test('For the case of wrong id', function() {
      expect(admin.searchUserByID('100')).toBeFalsy();
    });

    test('For the case teacher by first name', function() {
      expect(admin.searchUserByName('David')).toBeTruthy();
    });

    test('For the case teacher by last name', function() {
      expect(admin.searchUserByName('Mogbeyi')).toBeTruthy();
    });

    test('For the case student by first name', function() {
      expect(admin.searchUserByName('Solomon')).toBeTruthy();
    });

    test('For the case student by last name', function() {
      expect(admin.searchUserByName('Izukerberg')).toBeTruthy();
    });

    test('For the case of wrong name', function() {
      expect(admin.searchUserByName('Josephat')).toBeFalsy();
    });

    describe('Admin can delete other users', function() {
      var admin = new Admin('Matthias', ' Ogbonna', 'Male');

      var student = new Student(
        'Lydia',
        'Habbiba',
        '90128780',
        'Femal',
        'Social Science',
        'Political Science',
        '100L'
      );

      var teacher = new Teacher(
        'Ashemole',
        'Mike',
        'Dev/98/0023',
        'Male',
        'Science',
        'Mathematics'
      );
      test('For the case of deleting a student', function() {
        expect(admin.deleteUser(student)).toBeTruthy();
      });

      test('For the case of deleting a staff', function() {
        expect(admin.deleteUser(teacher)).toBeTruthy();
      });
    });

    describe('Admin can read other users by Matric Number or Staff Id', function() {
      var admin = new Admin('Matthias', ' Ogbonna', 'Male');

      var student = new Student(
        'Mary',
        'Godwin',
        '45302312004',
        'Femal',
        'Science',
        'Physics',
        '400L'
      );

      var teacher = new Teacher(
        'Adedayo',
        'Olagunju',
        'Dev/0012/4321',
        'Male',
        'Art',
        'English'
      );
      test('For the case of reading a student by Matric Number', function() {
        expect(admin.readStudent(student.matricNumber)).toEqual(student);
      });

      test('For the case of reading a teacher by staffId', function() {
        expect(admin.readTeacher(teacher.staffId)).toEqual(teacher);
      });

      test('For the case of reading a student by wrong Matric Number', function() {
        expect(admin.readStudent('111110000899')).toBeFalsy();
      });

      test('For the case of reading a teacher by wrong staffId', function() {
        expect(admin.readTeacher('dev/000/00018')).toBeFalsy();
      });
    });
  });
});

//Functionalities of Admin with respect to the Library
describe('All about Admin as the librarian', function() {
  var admin = new Admin('Matthias', ' Ogbonna', 'Male');

  test('Admin can add new books into the library', function() {
    expect(
      admin.addBook('What Men Want', 'Journal', 'Izuking Ogbodo')
    ).toBeTruthy();
  });

  describe('Admin can perform retrieval of books', function() {
    test('Admin can get books by title', function() {
      admin.addBook('Chike the River', 'Literature', 'Chinuwa Achebe');
      expect(admin.getBooksByTitle('Chike the River')).toBeTruthy();
    });

    test('Admin trying to get books by none existing title', function() {
      expect(admin.getBooksByTitle('The angel and devil')).toBeFalsy();
    });

    test('Admin can get books by author', function() {
      admin.addBook('What Women Want', 'Magazine', 'Izuking Ogbodo');
      expect(admin.getBooksByAuthor('Izuking Ogbodo')).toBeTruthy();
    });

    test('Admin trying to get books by none existing author', function() {
      expect(admin.getBooksByAuthor('David Ayo')).toBeFalsy();
    });

    test('Admin can get books by date added', function() {
      admin.addBook('What Women Want', 'Magazine', 'Izuking Ogbodo');
      expect(
        admin.getBooksByDate(new Date().toLocaleDateString())
      ).toBeTruthy();
    });

    test('Admin trying to get books by none existing date', function() {
      expect(admin.getBooksByDate('5/9/2020')).toBeFalsy();
    });

    test('Admin can get all books', function() {
      expect(admin.getAllBooks()).toBeTruthy();
    });
  });

  test('Admin can update a book title', function() {
    var newBook = admin.addBook(
      'Chike the River',
      'Literature',
      'Chinuwa Achebe'
    );
    expect(admin.updateBookTitle(newBook, 'What I Need').title).toBe(
      'What I Need'
    );
  });

  describe('Admin can perform deletion of books', function() {
    test('Admin can delete a book', function() {
      var newBook = admin.addBook(
        'Chike the River',
        'Literature',
        'Chinuwa Achebe'
      );
      expect(admin.deleteBook(newBook)).toBeTruthy();
    });
    test('Admin can delete all book', function() {
      expect(admin.deleteBooks()).toBe(0);
    });
  });
});

/**TODO add methods for book like getTitle() etc
 * ALSO, LATER SEE IF ALL THE IF...ELSE PARTS CAN BE REPLACED WITH REGEX.
 */
