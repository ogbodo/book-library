var Teacher = require('./Teacher'); //Import the Teacher class
var Admin = require('./Admin'); //Import the Admin class

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

    test('For the case of personal details', function() {
      teacher.updatePersonalDetails('Fola', 'Tolu');
      expect(teacher.getFirstName()).toBe('Fola');
      expect(teacher.getLastName()).toBe('Tolu');
    });

    test('For the case of StaffId', function() {
      teacher.updateStaffId('Dev/89/0023');
      expect(teacher.staffId).toBe('Dev/89/0023');
    });

    test('For the case of Gender', function() {
      teacher.updateGender('Male');
      expect(teacher.gender).toBe('Male');
    });

    test('For the case of Faculty', function() {
      teacher.updateFaculty('Science');
      expect(teacher.faculty).toBe('Science');
    });

    test('For the case of Department', function() {
      teacher.updateDepartment('Biology');
      expect(teacher.department).toBe('Biology');
    });
  });

  test('Teacher details can be read', function() {
    var teacher = new Teacher(
      'Bamidele',
      'Olamide',
      'Dev/12/310',
      'Male',
      'Social Science',
      'Political Science'
    );

    expect(teacher.retrieveDetails()).toEqual(teacher);
  });

  test('Teacher account can be deleted', function() {
    var teacher = new Teacher(
      'Ayo',
      'Olamide',
      'Dev/102/910',
      'Female',
      'Social Science',
      'Political Science'
    );
    expect(teacher.deleteAccount()).toBeTruthy();
  });
});

describe('Teacher borrowing book', function() {
  var teacher = new Teacher(
    'Ashemole',
    'Mike',
    'Dev/98/0023',
    'Male',
    'Science',
    'Mathematics'
  );

  var admin = new Admin('Izuking', 'Ogbodo', 'Male');

  var book1 = admin.addBook('What Women Want', 'Magazine', 'Treasure Ogbonna');
  var book2 = admin.addBook('Chike the River', 'Literature', 'Chinuwa Achebe');

  test('For the case where a teacher demands for book and its available', function() {
    expect(teacher.borrowBook(book1.id).userId).toBe(teacher.id);
  });

  test('For the case where same teacher demands for another book and its available', function() {
    expect(teacher.borrowBook(book2.id).userId).toBe(teacher.id);
  });

  test('For the case where same teacher demands for another copy of same book but its unavailable', function() {
    expect(teacher.borrowBook(book1.id)).toBe('Book Taken');
  });

  test('For the case where teacher wants to return a book', function() {
    expect(teacher.returnBorrowedbook(book2.id)).toBeTruthy();
  });
});
