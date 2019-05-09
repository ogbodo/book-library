var Admin = require('./Admin');
var Teacher = require('./Teacher');
var Student = require('./Student');

/**TODO RENAME ALL THE PROJECT FOLDERS TO START WITH LOWER CASES */
test('Admin can be created', function() {
  var admin = new Admin('Izuking', 'Ogbodo');
  expect(admin.getFirstName()).toBe('Izuking');
});

describe('Admin details can be updated', function() {
  var admin = new Admin('Treasure', ' Ogbonna');

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
  var admin = new Admin('Matthias', ' King');
  expect(admin.deleteAccount()).toBeTruthy();
});

test('Admin details can be read', function() {
  var admin = new Admin('Matthias ', 'Ogbonna');
  expect(admin.retrieveDetails()).toEqual(admin);
});

describe('Admin can perform search on other users', function() {
  var admin = new Admin('Matthias', ' Ogbonna');

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
    var admin = new Admin('Matthias', ' Ogbonna');

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
    var admin = new Admin('Matthias', ' Ogbonna');

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

    // test('For the case of deleting a staff', function() {
    //   expect(admin.deleteUser(teacher)).toBeTruthy();
    // });
  });
});

/**TODO add methods for book like getTitle() etc */
