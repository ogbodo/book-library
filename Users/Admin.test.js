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

    // test('For the case where admin wants to get users when none exists', function() {
    //   expect(admin.getAllAdmins()).toBeTruthy();
    // });
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
      '200'
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

    describe('Admin can read other users by Matric Number or Staff Id', function() {
      var admin = new Admin('Matthias', ' Ogbonna', 'Male');

      var student = new Student(
        'Mary',
        'Godwin',
        '45302312004',
        'Femal',
        'Science',
        'Physics',
        '400'
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

    describe('Admin can delete other users', function() {
      var admin = new Admin('Matthias', ' Ogbonna', 'Male');

      var student = new Student(
        'Lydia',
        'Habbiba',
        '90128780',
        'Femal',
        'Social Science',
        'Political Science',
        '100'
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

      test('For the case of deleting a teacher', function() {
        expect(admin.deleteUser(teacher)).toBeTruthy();
      });

      test('For the case of deleting all teacher', function() {
        expect(admin.deleteAllTeacher()).toBeTruthy();
      });

      test('For the case of deleting all student', function() {
        expect(admin.deleteAllStudent()).toBeTruthy();
      });

      describe('For the case where admin wants to delete users when none exists', function() {
        test('For the case of deleting all student', function() {
          expect(admin.deleteAllStudent()).toBeTruthy();
        });

        test('For the case of deleting all teacher', function() {
          expect(admin.deleteAllTeacher()).toBeFalsy();
        });
      });
    });
  });
});

//Functionalities of Admin with respect to the Library
describe('All about Admin as the librarian', function() {
  var admin = new Admin('Matthias', ' Ogbonna', 'Male');

  test('Admin can add new books into the library', function() {
    expect(
      admin.addBook('What Men Want', 'Journal', 'Izuking Ogbodo').title
    ).toBe('What Men Want');
  });

  describe('Admin can perform retrieval of books', function() {
    admin.addBook('Chike the River', 'Literature', 'Chinuwa Achebe');

    test('Admin can get books by title', function() {
      expect(admin.getBooksByTitle('Chike the River').length).toBe(1);
    });

    test('Admin trying to get books by none existing title', function() {
      expect(admin.getBooksByTitle('The angel and devil')).toBeFalsy();
    });

    test('Admin can get books by author', function() {
      admin.addBook('What Women Want', 'Magazine', 'Izuking Ogbodo');
      admin.addBook('What Women Want', 'Magazine', 'Izuking Ogbodo');
      expect(admin.getBooksByAuthor('Izuking Ogbodo').length).toBe(3);
    });

    test('Admin trying to get books by none existing author', function() {
      expect(admin.getBooksByAuthor('David Ayo')).toBeFalsy();
    });

    test('Admin can get books by date added', function() {
      admin.addBook('What Women Want', 'Magazine', 'Treasure Ogbonna');
      admin.addBook('What Women Want', 'Magazine', 'Treasure Ogbonna');
      expect(admin.getBooksByDate(new Date().toLocaleDateString()).length).toBe(
        9
      );
    });

    test('Admin trying to get books by none existing date', function() {
      expect(admin.getBooksByDate('5/9/2020')).toBeFalsy();
    });

    test('Admin can get all books', function() {
      expect(admin.getAllBooks().length).toBe(9);
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

  describe('Admin can perform lending of books', function() {
    admin.addBook('Become a Good Librarian', 'Journal', 'Mcan long');

    test('For the case where admin demands for book and its available', function() {
      expect(
        admin.lendBook(admin, 'Become a Good Librarian', 'Mcan long').userId
      ).toBe(admin.id);
    });

    var student = new Student(
      'Lydia',
      'Habbiba',
      '90128780',
      'Femal',
      'Social Science',
      'Political Science',
      '100'
    );

    var teacher = new Teacher(
      'Ashemole',
      'Mike',
      'Dev/98/0023',
      'Male',
      'Science',
      'Mathematics'
    );

    describe('Between Admin and two users', function() {
      describe('Priority between teacher and student users', function() {
        admin.addBook('Security Tips', 'Article', 'Ben Mark');

        test('For the case where a student and teacher demands for a book and its available', function() {
          expect(
            admin.lendBook([student, teacher], 'Security Tips', 'Ben Mark')
              .userId
          ).toEqual(teacher.id);
        });

        describe('Priority between teachers', function() {
          test('For the case where two teachers demands for a book and its available', function() {
            admin.addBook('Security Tips Part 2', 'Article', 'Ben Mark');

            var secondTeacher = new Teacher(
              'Ayo',
              'James',
              'Dev/61/223',
              'Male',
              'Science',
              'Agric'
            );

            expect(
              admin.lendBook(
                [teacher, secondTeacher],
                'Security Tips Part 2',
                'Ben Mark'
              ).userId
            ).toEqual(teacher.id);
          });
        });

        describe('Priority between students', function() {
          test('For the case where two students of same levels demands for a book and its available', function() {
            admin.addBook('Security Tips Part 3', 'Article', 'Ben Mark');
            var firstStudent = new Student(
              'James',
              'John',
              '76600001',
              'Male',
              'Science',
              'Chemistry',
              '100'
            );
            var secondStudent = new Student(
              'Lydia',
              'Habbiba',
              '2211123',
              'Femal',
              'Social Science',
              'Political Science',
              '100'
            );

            expect(
              admin.lendBook(
                [firstStudent, secondStudent],
                'Security Tips Part 3',
                'Ben Mark'
              ).userId
            ).toEqual(firstStudent.id);
          });
        });
      });

      describe('Priority between Senior and Junior students', function() {
        var juniorStudent = new Student(
          'Lydia',
          'Habbiba',
          '90128780',
          'Femal',
          'Social Science',
          'Political Science',
          '100'
        );
        var seniorStudent = new Student(
          'James',
          'John',
          '4522091',
          'Male',
          'Science',
          'Chemistry',
          '200'
        );
        admin.addBook('Computer Basics', 'Textbook', 'King Solomon');

        test('For the case where two students demands for a book and its available', function() {
          expect(
            admin.lendBook(
              [juniorStudent, seniorStudent],
              'Computer Basics',
              'King Solomon'
            ).userId
          ).toEqual(seniorStudent.id);
        });
      });
    });

    describe('Between Admin and three or more users', function() {
      var secondTeacher = new Teacher(
        'Ayo',
        'James',
        'Dev/61/223',
        'Male',
        'Science',
        'Agric'
      );
      test('For the case where two teachers and a student demands for a book and its available', function() {
        admin.addBook('Security Tips Part 4', 'Article', 'Ben Mark');

        expect(
          admin.lendBook(
            [student, teacher, secondTeacher],
            'Security Tips Part 4',
            'Ben Mark'
          ).userId
        ).toEqual(teacher.id);
      });

      test('For the case where two student and a teacher demands for a book and its available', function() {
        admin.addBook('Security Tips Part 5', 'Article', 'Ben Mark');
        var seniorStudent = new Student(
          'James',
          'John',
          '4522091',
          'Male',
          'Science',
          'Chemistry',
          '200'
        );

        expect(
          admin.lendBook(
            [student, seniorStudent, secondTeacher],
            'Security Tips Part 5',
            'Ben Mark'
          ).userId
        ).toEqual(secondTeacher.id);
      });
    });
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

/**
 * ALSO, LATER SEE IF ALL THE IF...ELSE PARTS CAN BE REPLACED WITH REGEX
 * RENAME ALL THE FILES NAME AND FOLDERS AT LAST TO START WITH LOWER CASE LETTER
 * Dont add users with same matric number or staff number
 */
