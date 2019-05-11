var Teacher = require('./Teacher');
var Admin = require('./Admin');

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

  admin.addBook('What Women Want', 'Magazine', 'Treasure Ogbonna');
  admin.addBook('What Women Want', 'Magazine', 'Treasure Ogbonna');
  admin.addBook('Chike the River', 'Literature', 'Chinuwa Achebe');
  admin.addBook('What Men Want', 'Journal', 'Izuking Ogbodo');

  test('For the case where a student demands for book and its available', function() {
    expect(teacher.borrowBook('Chike the River', 'Chinuwa Achebe').userId).toBe(
      teacher.id
    );
  });

  test('For the case where same student demands for another book and its available', function() {
    expect(
      teacher.borrowBook('What Women Want', 'Treasure Ogbonna').userId
    ).toBe(teacher.id);
  });

  test('For the case where same user demands for another copy of same book but its unavailable', function() {
    expect(teacher.borrowBook('Chike the River', 'Chinuwa Achebe')).toBe(
      'Book Taken'
    );
  });

  test('For the case where same user demands for a book that is not in the library', function() {
    expect(teacher.borrowBook('Software Mastering', 'Izuchukwu Ogbodo')).toBe(
      'Not Found'
    );
  });

  test('For the case where teacher wants to return a book', function() {
    expect(
      teacher.returnBorrowedbook('Chike the River', 'Chinuwa Achebe')
    ).toBeTruthy();
  });
});
