var User = require('./User');
var BookLibrary = require('../Library/BookLibrary');
var InheritProperty = require('./Interface/InheritProperty');
var databaseHandler = require('../Library/database/Database');

function Admin(firstName, lastName, gender) {
  User.call(this, firstName, lastName, gender, 'ADMIN');
}
InheritProperty(User, Admin);

Admin.prototype.searchUserByID = function(id) {
  var users = this.getUsers();
  for (var index = 0; index < users.length; index++) {
    if (users[index].id === id) {
      return users[index];
    }
  }
  return false;
};

Admin.prototype.searchUserByName = function(name) {
  var users = this.getUsers(),
    results = [];
  for (var index = 0; index < users.length; index++) {
    if (users[index].firstName === name || users[index].lastName === name) {
      results.push(users[index]);
    }
  }
  return results.length === 0 ? false : results;
};

Admin.prototype.deleteUser = function(user) {
  var users = this.getUsers();
  for (var index = 0; index < users.length; index++) {
    if (users[index].id === user.id) {
      users.splice(index, 1);
      return true;
    }
  }
};

Admin.prototype.deleteAllTeacher = function() {
  return deleteUsers('TEACHER');
};

Admin.prototype.deleteAllStudent = function() {
  return deleteUsers('STUDENT');
};

Admin.prototype.readStudent = function(matricNumber) {
  var users = this.getUsers();
  for (var index = 0; index < users.length; index++) {
    if (users[index].matricNumber === matricNumber) {
      return users[index];
    }
  }
  return false;
};

Admin.prototype.readTeacher = function(staffId) {
  var users = this.getUsers();
  for (var index = 0; index < users.length; index++) {
    if (users[index].staffId === staffId) {
      return users[index];
    }
  }
  return false;
};

Admin.prototype.getUsers = function() {
  return databaseHandler['users'];
};

Admin.prototype.getAllTeachers = function() {
  return getUserSets('TEACHER');
};

Admin.prototype.getAllStudents = function() {
  return getUserSets('STUDENT');
};

Admin.prototype.getAllAdmins = function() {
  return getUserSets('ADMIN');
};

Admin.prototype.addBook = function(title, category, author) {
  return BookLibrary.prototype.create(title, category, author);
};

Admin.prototype.getBooksByTitle = function(title) {
  return BookLibrary.prototype.getByTitle(title);
};

Admin.prototype.getBooksByAuthor = function(author) {
  return BookLibrary.prototype.getByAuthor(author);
};

Admin.prototype.getBooksByDate = function(date) {
  return BookLibrary.prototype.getByDate(date);
};

Admin.prototype.getAllBooks = function() {
  return BookLibrary.prototype.getBooks();
};

Admin.prototype.updateBookTitle = function(book, newTitle) {
  return BookLibrary.prototype.updateTitle(book, newTitle);
};

Admin.prototype.deleteBook = function(book) {
  return BookLibrary.prototype.delete(book);
};

Admin.prototype.deleteBooks = function() {
  return BookLibrary.prototype.deleteAll();
};

function getMaximumValue(firstPerson, secondPerson) {
  if (firstPerson.level >= secondPerson.level) {
    return firstPerson;
  }

  return secondPerson;
}

function getThePerson(firstPerson, secondPerson) {
  if (firstPerson.userType === 'TEACHER') {
    return firstPerson;
  }
  if (secondPerson.userType === 'TEACHER') {
    return secondPerson;
  }

  return getMaximumValue(firstPerson, secondPerson);
}

Admin.prototype.prioritizeCollector = function(users) {
  var rightPerson = users[0];

  for (let index = 1; index < users.length; index++) {
    rightPerson = getThePerson(rightPerson, users[index]);
  }

  return rightPerson;
};

Admin.prototype.lendBook = function(user, title, author) {
  if (user.constructor === Array) {
    user = this.prioritizeCollector(user);
  }
  var isAvailable = this.recordLendActivity(title, author);

  if (!isAvailable) {
    return 'Book Taken';
  }
  var book = BookLibrary.prototype.get(title, author);

  if (book === 'Not Found') {
    return book;
  }

  var collectors = databaseHandler['collectors'];

  var currentUserCollections = collectors[user.id];

  var dateIssued = new Date().toLocaleDateString();

  if (!currentUserCollections) {
    currentUserCollections = [];

    var borrowedBook = {
      bookId: book.id,
      dateIssued: dateIssued,
      userId: user.id
    };

    currentUserCollections.push(borrowedBook);

    collectors[user.id] = currentUserCollections;

    return borrowedBook;
  }

  var borrowedBook = {
    bookId: book.id,
    dateIssued: dateIssued,
    userId: user.id
  };

  currentUserCollections.push(borrowedBook);

  collectors[user.id] = currentUserCollections;

  return borrowedBook;
};

Admin.prototype.recordLendActivity = function(title, author) {
  var catalog = BookLibrary.prototype.recordBookRelease(title, author);

  return catalog;
};

function getUserSets(userType) {
  var users = Admin.prototype.getUsers(),
    usersFound = [];
  for (var index = 0; index < users.length; index++) {
    if (users[index].userType == userType) {
      usersFound.push(users[index]);
    }
  }

  return usersFound;
}

function deleteUsers(userType) {
  var users = Admin.prototype.getUsers(),
    madeDeletion = false;

  for (var index = 0; index < users.length; index++) {
    if (users[index].userType === userType) {
      users.splice(index, 1);
      madeDeletion = true;
    }
  }

  return madeDeletion;
}

module.exports = Admin;
